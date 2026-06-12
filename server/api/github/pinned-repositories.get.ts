import type { GraphQlQueryResponseData } from '@octokit/graphql'
import type { Repository } from '@octokit/graphql-schema'

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
              issues(first: $perPage) {
                nodes {
                  closed
                  url
                }
              }
              pullRequests(first: $perPage) {
                nodes {
                  closed
                  url
                }
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
    issues: issues?.nodes?.filter(node => node && !node.closed).length,
    pullRequests: pullRequests?.nodes?.filter(node => node && !node.closed)
      .length,
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

    try {
      const response = await octokit.graphql<GraphQlQueryResponseData>(query, {
        username: owner,
        perPage,
      })
      return response.user.pinnedItems.edges.map((edge: { node: Repository }) =>
        remapProperties(edge.node),
      )
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-pinned-repositories',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: event => `pinned:${clampPerPage(getQuery(event).perPage, 30)}`,
  },
)
