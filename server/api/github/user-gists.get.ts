import { Octokit } from 'octokit'
import type {
  GetUserGists,
  GetUserGistsParameters
} from '~/types/services/GitHub/Gist'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetUserGistsParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /users/{username}/gists', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetUserGists
  } catch (error) {
    console.error(`Error fetching gists for user ${params.username}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch gists for user ${params.username}`
    })
  }
})
