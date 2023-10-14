import type { Repository } from '@/types/GitHub/Repository'
import { Octokit } from 'octokit'

export async function fetchUserRepos(username: string): Promise<Repository> {
  const octokit = new Octokit()
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username,
      per_page: 100
    })
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching repos: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while fetching repos.')
    }
  }
}

export function sortProjects(projects: Repository) {
  const personal: Repository = []
  const school: Repository = []

  projects.forEach((project) => {
    const schoolProjectPattern = /^(M\d+|UEK-\d+)-Portfolio$|^(TBZ|UEK)-Modules$/i
    ;(schoolProjectPattern.test(project.name) ? school : personal).push(project)
  })

  return { personal, school }
}
