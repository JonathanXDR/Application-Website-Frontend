import type { GraphQlQueryResponseData } from '@octokit/graphql'
import { graphql } from '@octokit/graphql'
import type { Repository } from '@octokit/graphql-schema'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const { username, per_page = 30 } = getQuery(event)
  const graphqlInstance = graphql.defaults({
    headers: { authorization: `token ${githubToken}` }
  })

  const query = `
    {
      user(login: "${username}") {
        pinnedItems(first: ${per_page}, types: REPOSITORY) {
          edges {
            node {
              ... on Repository {
                name
                description
                url
                repositoryTopics(first: ${per_page}) {
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
                forks(first: ${per_page}) {
                  nodes {
                    url
                  }
                }
                stargazers(first: ${per_page}) {
                  nodes {
                    url
                  }
                }
                issues(first: ${per_page}) {
                  nodes {
                    closed
                    url
                  }
                }
                pullRequests(first: ${per_page}) {
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

  const remapProps = (item: Repository) => {
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
      updatedAt
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
      updated_at: updatedAt
    }
  }

  try {
    const response = await graphqlInstance<GraphQlQueryResponseData>(query)
    return response.user.pinnedItems.edges.map((edge: { node: Repository }) =>
      remapProps(edge.node)
    )
  } catch (error) {
    console.error(
      `Error fetching pinned repositories for user ${username}:`,
      error
    )
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch pinned repositories for user ${username}`
    })
  }
})
