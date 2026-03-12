import type { GetPublicRepositoriesParameters } from '#shared/types/services/github/repository'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetPublicRepositoriesParameters = getQuery(event)

  try {
    const { data } = await octokit.request('GET /repositories', parameters)
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
