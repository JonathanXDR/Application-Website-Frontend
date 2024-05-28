import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql'
import type { Repository } from '@octokit/graphql-schema'
import type { RequestParameters } from '@octokit/types'
import { Octokit } from 'octokit'
import type {
  GetRepositoryIssues,
  GetRepositoryIssuesParameters
} from '~/types/services/GitHub/Issue'
import type {
  GetOwnerRepository,
  GetOwnerRepositoryParameters,
  GetPublicRepositories,
  GetPublicRepositoriesParameters,
  GetUserRepositories,
  GetUserRepositoriesParameters
} from '~/types/services/GitHub/Repository'
import type {
  GetRepositoryTags,
  GetRepositoryTagsParameters
} from '~/types/services/GitHub/Tag'

export default defineNuxtPlugin(() => {
  const { githubToken } = useRuntimeConfig()

  const octokit = new Octokit({ auth: githubToken })
  const graphqlInstance = graphql.defaults({
    headers: { authorization: `token ${githubToken}` }
  })

  const fetchFromOctokit = async (
    endpoint: string,
    params: RequestParameters,
    logMessage: string
  ) => {
    try {
      const response = await octokit.request(endpoint, params)
      return response.data
    } catch (error) {
      console.error(`Error ${logMessage}:`, error)
      throw error
    }
  }

  const listPublicRepositories = (
    params: GetPublicRepositoriesParameters
  ): Promise<GetPublicRepositories> =>
    fetchFromOctokit(
      'GET /repositories',
      { ...params, headers: { accept: 'application/vnd.github+json' } },
      'fetching public repositories'
    )

  const listUserRepositories = (
    params: GetUserRepositoriesParameters
  ): Promise<GetUserRepositories> =>
    fetchFromOctokit(
      'GET /users/{username}/repos',
      { ...params, headers: { accept: 'application/vnd.github+json' } },
      `fetching repositories for user ${params.username}`
    )

  const getRepository = (
    params: GetOwnerRepositoryParameters
  ): Promise<GetOwnerRepository> =>
    fetchFromOctokit(
      'GET /repos/{owner}/{repo}',
      { ...params, headers: { accept: 'application/vnd.github+json' } },
      `fetching repository for owner ${params.owner}`
    )

  const listRepositoryTags = (
    params: GetRepositoryTagsParameters
  ): Promise<GetRepositoryTags> =>
    fetchFromOctokit(
      'GET /repos/{owner}/{repo}/tags',
      { ...params, headers: { accept: 'application/vnd.github+json' } },
      `fetching tags for repository ${params.repo}`
    )

  const listRepositoryIssues = (
    params: GetRepositoryIssuesParameters
  ): Promise<GetRepositoryIssues> =>
    fetchFromOctokit(
      'GET /repos/{owner}/{repo}/issues',
      { ...params, headers: { accept: 'application/vnd.github+json' } },
      `fetching issues for repository ${params.repo}`
    )

  const listPinnedRepositories = async (params: {
    username: string
    per_page?: number
  }): Promise<Repository[]> => {
    const { username, per_page = 30 } = params

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
        topics:
          repositoryTopics?.nodes?.map(node => node?.topic.name ?? '') || [],
        language: primaryLanguage?.name,
        license: licenseInfo,
        forks: forks?.nodes?.map(node => node?.url ?? '') || [],
        stars: stargazers?.nodes?.map(node => node?.url ?? '') || [],
        issues:
          issues?.nodes
            ?.filter(node => node && !node.closed)
            .map(node => node?.url ?? '') || [],
        pullRequests:
          pullRequests?.nodes
            ?.filter(node => node && !node.closed)
            .map(node => node?.url ?? '') || [],
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
      throw error
    }
  }

  return {
    provide: {
      listPublicRepositories,
      listUserRepositories,
      getRepository,
      listRepositoryTags,
      listRepositoryIssues,
      listPinnedRepositories
    }
  }
})
