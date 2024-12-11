import { Octokit } from 'octokit'
import type { GetAuthenticatedUserGistParameters } from '#shared/types/services/github/gist'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const parameters: GetAuthenticatedUserGistParameters = getQuery(event)

  try {
    const response = await octokit.request('GET /gists', {
      ...parameters,
      headers: { accept: 'application/vnd.github+json' },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching authenticated user gists:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
