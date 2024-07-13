import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const query = getQuery(event)
  const owner = query.owner as string | undefined
  const repo = query.repo as string | undefined

  if (!owner || !repo) {
    throw new Error('Owner and repo are required parameters')
  }

  const params = { ...query }
  delete params.owner
  delete params.repo

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching repository for owner ${owner}:`, error)
    throw error
  }
})
