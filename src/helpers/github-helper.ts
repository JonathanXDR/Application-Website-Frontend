import type {
  GetRepoResponse,
  ListPublicReposResponse,
  ListUserReposResponse
} from '@/types/GitHub/Repository'
import type { ListRepoTagsResponse } from '@/types/GitHub/Tag'
import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
})

export async function listPublicRepositories(params: {
  since?: number
}): Promise<ListPublicReposResponse> {
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

export async function listUserRepositories(params: {
  username: string
  type?: 'all' | 'owner' | 'member' | undefined
  sort?: 'full_name' | 'created' | 'updated' | 'pushed' | undefined
  direction?: 'asc' | 'desc' | undefined
  perPage?: number
  page?: number
}): Promise<ListUserReposResponse> {
  const {
    username,
    type = 'owner',
    sort = 'full_name',
    direction = 'asc',
    perPage = 30,
    page = 1
  } = params

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username,
      type,
      sort,
      direction,
      per_page: perPage,
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

export async function getRepository(params: {
  owner: string
  repo: string
}): Promise<GetRepoResponse> {
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

export async function listRepositoryTags(params: {
  owner: string
  repo: string
  perPage?: number
  page?: number
}): Promise<ListRepoTagsResponse> {
  const { owner, repo, perPage = 30, page = 1 } = params

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
      owner,
      repo,
      per_page: perPage,
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
