import type { Repository } from '@octokit/graphql-schema'

// Without this shape `edges` is `any` and `edges.map` collapses the handler's
// return type to `any`.
interface PinnedRepositoriesResponse {
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

const PER_PAGE = 30

export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()
    // The query param here is `perPage`, not the `per_page` REST routes take
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

    // Nullable in the schema, but a missing owner arrives as a top-level
    // NOT_FOUND that `handleGitHubError` maps to 502, so this is unreachable.
    // Outside the try so the catch maps upstream failures alone.
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
