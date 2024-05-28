import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql'
import type {
  Issue,
  Maybe,
  PullRequest,
  Repository,
  RepositoryTopic,
  User
} from '@octokit/graphql-schema'
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

  const octokit = new Octokit({
    auth: githubToken
  })

  const graphqlInstance = graphql.defaults({
    headers: {
      authorization: `token ${githubToken}`
    }
  })

  const listPublicRepositories = async (
    params: GetPublicRepositoriesParameters
  ): Promise<GetPublicRepositories> => {
    const { since } = params

    try {
      const response = await octokit.request('GET /repositories', {
        since,
        headers: {
          accept: 'application/vnd.github+json'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching public repositories:', error)
      throw error
    }
  }

  const listUserRepositories = async (
    params: GetUserRepositoriesParameters
  ): Promise<GetUserRepositories> => {
    const {
      username,
      type = 'owner',
      sort = 'full_name',
      direction = 'asc',
      per_page = 30,
      page = 1
    } = params

    try {
      const response = await octokit.request('GET /users/{username}/repos', {
        username,
        type,
        sort,
        direction,
        per_page,
        page,
        headers: {
          accept: 'application/vnd.github+json'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching repositories for user ${username}:`, error)
      throw error
    }
  }

  const getRepository = async (
    params: GetOwnerRepositoryParameters
  ): Promise<GetOwnerRepository> => {
    const { owner, repo } = params

    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
        headers: {
          accept: 'application/vnd.github+json'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching repository for owner ${owner}:`, error)
      throw error
    }
  }

  const listRepositoryTags = async (
    params: GetRepositoryTagsParameters
  ): Promise<GetRepositoryTags> => {
    const { owner, repo, per_page = 30, page = 1 } = params

    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
        owner,
        repo,
        per_page,
        page,
        headers: {
          accept: 'application/vnd.github+json'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching tags for repository ${repo}:`, error)
      throw error
    }
  }

  const listRepositoryIssues = async (
    params: GetRepositoryIssuesParameters
  ): Promise<GetRepositoryIssues> => {
    const {
      owner,
      repo,
      milestone,
      state = 'open',
      assignee,
      creator,
      mentioned,
      labels,
      sort = 'created',
      direction = 'desc',
      since,
      per_page = 30,
      page = 1
    } = params

    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        {
          owner,
          repo,
          milestone,
          state,
          assignee,
          creator,
          mentioned,
          labels,
          sort,
          direction,
          since,
          per_page,
          page,
          headers: {
            accept: 'application/vnd.github+json'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error(`Error fetching issues for repository ${repo}:`, error)
      throw error
    }
  }

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
}
  `

    const remapProps = (item: Repository): any => {
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
          repositoryTopics?.nodes?.map(
            (node: Maybe<RepositoryTopic>) => node?.topic.name ?? ''
          ) || [],
        language: primaryLanguage?.name,
        license: licenseInfo,
        forks:
          forks?.nodes?.map((node: Maybe<Repository>) => node?.url ?? '') || [],
        stars:
          stargazers?.nodes?.map((node: Maybe<User>) => node?.url ?? '') || [],
        issues:
          issues?.nodes
            ?.filter((node: Maybe<Issue>) => node != null && !node.closed)
            .map((node: Maybe<Issue>) => node?.url ?? '') || [],
        pullRequests:
          pullRequests?.nodes
            ?.filter((node: Maybe<PullRequest>) => node != null && !node.closed)
            .map((node: Maybe<PullRequest>) => node?.url ?? '') || [],
        updated_at: updatedAt
      }
    }

    try {
      const response = await graphqlInstance<GraphQlQueryResponseData>(query)
      const pinnedRepositories: Repository[] =
        response.user.pinnedItems.edges.map((edge: { node: Repository }) =>
          remapProps(edge.node)
        )
      return pinnedRepositories
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
