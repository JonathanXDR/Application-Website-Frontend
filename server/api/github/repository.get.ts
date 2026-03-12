import type { GetOwnerRepositoryParameters } from '#shared/types/services/github/repository'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetOwnerRepositoryParameters = getQuery(event)

  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}',
      parameters,
    )
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
