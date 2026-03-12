import type { GetAuthenticatedUserRepositoriesParameters } from '#shared/types/services/github/repository'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetAuthenticatedUserRepositoriesParameters
    = getQuery(event)

  try {
    const { data } = await octokit.request('GET /user/repos', parameters)
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
