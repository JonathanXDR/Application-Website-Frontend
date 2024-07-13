import { Octokit } from 'octokit'
import type {
  GetUserRepositories,
  GetUserRepositoriesParameters
} from '~/types/services/GitHub/Repository'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetUserRepositoriesParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetUserRepositories
  } catch (error) {
    console.error(
      `Error fetching repositories for user ${params.username}:`,
      error
    )
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch repositories for user ${params.username}`
    })
  }
})
