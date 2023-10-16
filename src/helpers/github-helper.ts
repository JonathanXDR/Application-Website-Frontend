import type { GetRepoResponse, ListPublicReposResponse } from '@/types/GitHub/Repository'
import type { ListRepoTagsResponse } from '@/types/GitHub/Tag'
import { Octokit } from 'octokit'

export function sortProjects(projects) {
  const personal = []
  const school = []

  projects.forEach((project) => {
    const schoolProjectPattern = /^(M\d+|UEK-\d+)-Portfolio$|^(TBZ|UEK)-Modules$/i
    ;(schoolProjectPattern.test(project.name) ? school : personal).push(project)
  })

  return { personal, school }
}

/**
 * List public repositories
 * @param since - A repository ID to list repositories created after it.
 */
export async function listPublicRepositories(since?: number): Promise<ListPublicReposResponse> {
  const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
  })

  try {
    const response = await octokit.request('GET /repositories', {
      since,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to list public repositories:', error)
    throw error
  }
}

/**
 * Get a specific repository
 * @param owner - The account owner of the repository.
 * @param repo - The name of the repository.
 */
export async function getRepository(owner: string, repo: string): Promise<GetRepoResponse> {
  const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
  })

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
    console.error(`Failed to get repository ${owner}/${repo}:`, error)
    throw error
  }
}

/**
 * List repository tags
 * @param owner - The account owner of the repository.
 * @param repo - The name of the repository.
 * @param perPage - The number of results per page.
 * @param page - Page number of the results to fetch.
 */
export async function listRepositoryTags(
  owner: string,
  repo: string,
  perPage: number = 30,
  page: number = 1
): Promise<ListRepoTagsResponse> {
  const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
  })

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
    console.error(`Failed to list tags for repository ${owner}/${repo}:`, error)
    throw error
  }
}
