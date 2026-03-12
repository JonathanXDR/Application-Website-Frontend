import type { GetUserParameters } from '#shared/types/services/github/user'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetUserParameters = getQuery(event)

  try {
    const { data } = await octokit.request('GET /users/{username}', parameters)
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
