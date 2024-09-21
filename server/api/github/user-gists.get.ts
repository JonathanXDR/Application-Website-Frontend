import { Octokit } from 'octokit'
import type { GetUserGistsParameters } from '~/types/services/github/gist'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const parameters: GetUserGistsParameters = getQuery(event)

  try {
    const response = await octokit.request('GET /users/{username}/gists', {
      ...parameters,
      headers: { accept: 'application/vnd.github+json' },
    })
    return response.data
  } catch (error) {
    console.error(
      `Error fetching gists for user ${parameters.username}:`,
      error
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
