import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const query = getQuery(event)
  const username = query.username as string | undefined

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is a required parameter'
    })
  }

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching repositories for user ${username}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching repositories'
    })
  }
})
