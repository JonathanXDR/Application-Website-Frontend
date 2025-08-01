import { Octokit } from 'octokit'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig()
  const octokit = new Octokit({ auth: githubToken })
  const parameters: GetRepositoryTagsParameters = getQuery(event)

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
      ...parameters,
      headers: { accept: 'application/vnd.github+json' },
    })
    return response.data
  }
  catch (error) {
    console.error(
      `Error fetching tags for repository ${parameters.repo}:`,
      error,
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
