import type { Repository } from '@/types/GitHub/Repository'
import { Octokit } from 'octokit'

export async function fetchUserRepos(username: string): Promise<Repository['data']> {
  const octokit = new Octokit()
  const response = await octokit.request('GET /users/{username}/repos', {
    username,
    per_page: 100
  })
  return response.data
}

export function sortProjects(projects: Repository['data']) {
  const personal: Repository['data'] = []
  const school: Repository['data'] = []

  projects.forEach((project) => {
    if (
      project.name.match(/^(M\d+|UEK-\d+)-Portfolio$/i) ||
      project.name.match(/^(TBZ|UEK)-Modules$/i)
    ) {
      school.push(project)
    } else {
      personal.push(project)
    }
  })

  return { personal, school }
}
