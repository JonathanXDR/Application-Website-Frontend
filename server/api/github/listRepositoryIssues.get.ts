import { Octokit } from 'octokit'
import type {
  GetRepositoryIssues,
  GetRepositoryIssuesParameters
} from '~/types/services/GitHub/Issue'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetRepositoryIssuesParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetRepositoryIssues
  } catch (error) {
    console.error(`Error fetching issues for repository ${params.repo}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch issues for repository ${params.repo}`
    })
  }
})
