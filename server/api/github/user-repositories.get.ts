import type { GetUserRepositoriesParameters } from '#shared/types/services/github/repository'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetUserRepositoriesParameters = getQuery(event)

  try {
    const { data } = await octokit.request(
      'GET /users/{username}/repos',
      parameters,
    )
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
