import { Octokit } from 'octokit'
import type {
  GetAuthenticatedUserGistParameters,
  GetAuthenticatedUserGists
} from '~/types/services/GitHub/Gist'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetAuthenticatedUserGistParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /gists', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetAuthenticatedUserGists
  } catch (error) {
    console.error('Error fetching authenticated user gists:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch authenticated user gists'
    })
  }
})
