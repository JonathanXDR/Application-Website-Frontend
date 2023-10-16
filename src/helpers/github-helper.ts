import type { GetRepoResponse, ListPublicReposResponse } from '@/types/GitHub/Repository'
import type { ListRepoTagsResponse } from '@/types/GitHub/Tag'
import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
})

export async function listPublicRepositories(since?: number): Promise<ListPublicReposResponse> {
  try {
    const response = await octokit.request('GET /repositories', {
      since,
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching public repositories:', error)
    throw error
  }
}

export async function listUserRepositories(
  username: string,
  type?: string = 'owner',
  sort?: string = 'full_name',
  direction?: string = 'asc',
  perPage?: number = 30,
  page?: number = 1
): Promise<ListUserReposResponse> {
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username,
      type,
      sort,
      direction,
      per_page: perPage,
      page,
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching repositories for user ${username}:`, error)
    throw error
  }
}

export async function getRepository(owner: string, repo: string): Promise<GetRepoResponse> {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching repository for owner ${owner}:`, error)
    throw error
  }
}

export async function listRepositoryTags(
  owner: string,
  repo: string,
  perPage?: number = 30,
  page?: number = 1
): Promise<ListRepoTagsResponse> {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
      owner,
      repo,
      per_page: perPage,
      page,
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching tags for repository ${repo}:`, error)
    throw error
  }
}
