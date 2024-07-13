import { Octokit } from 'octokit'
import type {
  GetAuthenticatedUserRepositories,
  GetAuthenticatedUserRepositoriesParameters
} from '~/types/services/GitHub/Repository'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetAuthenticatedUserRepositoriesParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /user/repos', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetAuthenticatedUserRepositories
  } catch (error) {
    console.error('Error fetching authenticated user repositories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch authenticated user repositories'
    })
  }
})
