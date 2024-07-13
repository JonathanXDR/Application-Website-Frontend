import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const query = getQuery(event)
  const owner = query.owner as string | undefined
  const repo = query.repo as string | undefined

  if (!owner || !repo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Owner and repo are required parameters'
    })
  }

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching issues for repository ${repo}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching issues'
    })
  }
})
