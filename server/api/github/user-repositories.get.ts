import { Octokit } from 'octokit'
import type { GetUserRepositoriesParameters } from '~/types/services/github/repository'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const parameters: GetUserRepositoriesParameters = getQuery(event)

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      ...parameters,
      headers: { accept: 'application/vnd.github+json' },
    })
    return response.data
  } catch (error) {
    console.error(
      `Error fetching repositories for user ${parameters.username}:`,
      error
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
