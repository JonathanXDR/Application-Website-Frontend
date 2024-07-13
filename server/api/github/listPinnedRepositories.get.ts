import { graphql } from '@octokit/graphql'
import type { Repository } from '@octokit/graphql-schema'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const query = getQuery(event)
  const username = query.username as string | undefined
  const per_page = (query.per_page as string)
    ? parseInt(query.per_page as string)
    : 30

  if (!username) {
    throw new Error('Username is a required parameter')
  }

  const graphqlInstance = graphql.defaults({
    headers: { authorization: `token ${githubToken}` }
  })

  const graphqlQuery = `
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
    const response: {
      user: { pinnedItems: { edges: { node: Repository }[] } }
    } = await graphqlInstance(graphqlQuery)
    return response.user.pinnedItems.edges.map(edge => remapProps(edge.node))
  } catch (error) {
    console.error(
      `Error fetching pinned repositories for user ${username}:`,
      error
    )
    throw error
  }
})
