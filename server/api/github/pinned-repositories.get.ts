import type { Repository } from '@octokit/graphql-schema'

// Typed shape of the GraphQL selection below. Without it the edges array
// is `any`, and edges.map collapses the handler return type to `any`,
// which previously propagated an implicit any into the projects page.
interface PinnedRepositoriesResponse {
  // `user(login:)` is nullable in the GraphQL schema. A renamed or deleted
  // owner resolves to null with no GraphQL error, so the handler guards it
  // before walking the selection.
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
              repositoryTopics(first: $perPage) {
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
              stargazers {
                totalCount
              }
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
    stargazers,
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
    stars: stargazers?.totalCount,
    issues: issues?.totalCount,
    pullRequests: pullRequests?.totalCount,
    updated_at: updatedAt,
  }
}

// The username is pinned server side to the configured repository owner
// and pagination is clamped, see the note in server/utils/octokit.ts.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()
    const perPage = clampPerPage(getQuery(event).perPage, 30)

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

    // Guard after the upstream call (not inside the try) so this 404 reaches
    // the client instead of being recaught and downgraded to a 500 by
    // handleGitHubError.
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
    getKey: event => `pinned:${clampPerPage(getQuery(event).perPage, 30)}`,
  },
)
