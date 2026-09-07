import type { Repository } from '@octokit/graphql-schema'

// Typed shape of the GraphQL selection below. Without it `edges` is `any` and
// `edges.map` collapses the handler's return type to `any`.
interface PinnedRepositoriesResponse {
  // Nullable in the schema, but a deleted or renamed owner comes back as a
  // top-level NOT_FOUND error that `handleGitHubError` maps to 502, so an
  // error-free null is unreachable in practice.
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

// The username is pinned server side and pagination is clamped. See the note
// in `server/utils/octokit.ts`. The `perPage` query param is camelCase here,
// unlike the snake_case REST routes, to mirror the GraphQL `$perPage` above.
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

    // Defensive only, see `PinnedRepositoriesResponse`. It stays outside the
    // try so the catch maps upstream failures alone and `response` is narrowed
    // by `handleGitHubError`'s `never` return.
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
