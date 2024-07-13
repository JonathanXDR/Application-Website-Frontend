import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const params = getQuery(event)

  try {
    const response = await octokit.request('GET /gists', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching authenticated user gists:', error)
    throw error
  }
})
