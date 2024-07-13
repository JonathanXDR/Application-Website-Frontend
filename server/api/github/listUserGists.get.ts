import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const { username, ...params } = getQuery(event)

  try {
    const response = await octokit.request('GET /users/{username}/gists', {
      username,
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching gists for user ${username}:`, error)
    throw error
  }
})
