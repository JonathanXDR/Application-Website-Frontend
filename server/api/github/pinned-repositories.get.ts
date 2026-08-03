import type { Repository } from '@octokit/graphql-schema'

// Typed shape of the GraphQL selection below. Without it the edges array
// is `any`, and edges.map collapses the handler return type to `any`,
// which previously propagated an implicit any into the projects page.
interface PinnedRepositoriesResponse {
  // `user(login:)` is nullable in the schema, so the type admits null. A
  // deleted or renamed owner actually comes back as a top-level NOT_FOUND
  // error with user null, which octokit.graphql throws and handleGitHubError
  // maps to 502, so the post-call null guard only covers an error-free null
  // that GitHub does not return here. The owner is pinned to a valid login,
  // so neither path fires in production.
  user: {
    pinnedItems: {
      edges: Array<{ node: Repository }>
    }
  } | null
}

const query = `
  query ($username: String!, $perPage: Int!) {
    user(login: $username) {
      pinnedItems(first: $perPage, types: REPOSITORY) {
        edges {
          node {
            ... on Repository {
              name
              description
              url
              # GitHub caps a repo at 20 topics, so 20 returns the full set.
              repositoryTopics(first: 20) {
                nodes {
                  topic {
                    name
                  }
                  url
                }
              }
              primaryLanguage {
                color
                name
              }
              licenseInfo {
                name
                nickname
                url
              }
              forks {
                totalCount
              }
              stargazerCount
              issues(states: [OPEN]) {
                totalCount
              }
              pullRequests(states: [OPEN]) {
                totalCount
              }
              updatedAt
            }
          }
        }
      }
    }
  }
`

const remapProperties = (item: Repository) => {
  const {
    name,
    description,
    url,
    repositoryTopics,
    primaryLanguage,
    licenseInfo,
    forks,
    stargazerCount,
    issues,
    pullRequests,
    updatedAt,
  } = item

  return {
    name,
    description,
    html_url: url,
    topics: repositoryTopics?.nodes?.map(node => node?.topic.name),
    language: primaryLanguage?.name,
    license: licenseInfo,
    forks: forks?.totalCount,
    stars: stargazerCount,
    issues: issues?.totalCount,
    pullRequests: pullRequests?.totalCount,
    updated_at: updatedAt,
  }
}

// The username is pinned server side to the configured repository owner
// and pagination is clamped, see the note in server/utils/octokit.ts. The
// `perPage` query param is camelCase here (unlike the snake_case REST routes)
// to mirror the GraphQL `$perPage` variable below.
const PER_PAGE = 30

export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()
    const perPage = clampPerPage(getQuery(event).perPage, PER_PAGE)

    let response: PinnedRepositoriesResponse
    try {
      response = await octokit.graphql<PinnedRepositoriesResponse>(query, {
        username: owner,
        perPage,
      })
    }
    catch (error) {
      handleGitHubError(error)
    }

    // Defensive fallback for an error-free null user. A deleted or renamed
    // owner returns a NOT_FOUND error mapped to 502 above, so this rarely
    // fires. It stays outside the try so the catch only maps upstream
    // failures and `response` is narrowed by handleGitHubError's never return.
    if (!response.user) {
      throw createError({ status: 404, statusText: 'GitHub API Error' })
    }

    return response.user.pinnedItems.edges.map(edge =>
      remapProperties(edge.node),
    )
  },
  {
    name: 'github-pinned-repositories',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: event =>
      cacheKey(clampPerPage(getQuery(event).perPage, PER_PAGE)),
  },
)
