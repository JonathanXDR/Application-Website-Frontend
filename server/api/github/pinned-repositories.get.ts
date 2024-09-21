import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql'
import type { Repository } from '@octokit/graphql-schema'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig()
  const graphqlInstance = graphql.defaults({
    headers: { authorization: `token ${githubToken}` },
  })
  const parameters: { username: string, perPage?: number } = getQuery(event)

  const { username, perPage = 30 } = parameters

  const query = `
    {
      user(login: "${username}") {
        pinnedItems(first: ${perPage}, types: REPOSITORY) {
          edges {
            node {
              ... on Repository {
                name
                description
                url
                repositoryTopics(first: ${perPage}) {
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
                issues(first: ${perPage}) {
                  nodes {
                    closed
                    url
                  }
                }
                pullRequests(first: ${perPage}) {
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
    }`

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

  try {
    const response = await graphqlInstance<GraphQlQueryResponseData>(query)
    return response.user.pinnedItems.edges.map((edge: { node: Repository }) =>
      remapProperties(edge.node)
    )
  } catch (error) {
    console.error(
      `Error fetching pinned repositories for user ${username}:`,
      error
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
