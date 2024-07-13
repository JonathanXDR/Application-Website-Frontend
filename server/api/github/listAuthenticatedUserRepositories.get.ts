import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const params = getQuery(event)

  try {
    const response = await octokit.request('GET /user/repos', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching authenticated user repositories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching authenticated user repositories'
    })
  }
})
