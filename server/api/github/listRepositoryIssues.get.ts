import { defineEventHandler, getQuery } from 'h3'
import { Octokit } from 'octokit'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const { owner, repo, ...params } = getQuery(event)

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching issues for repository ${repo}:`, error)
    throw error
  }
})
