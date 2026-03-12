import type { GetUserGistsParameters } from '#shared/types/services/github/gist'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetUserGistsParameters = getQuery(event)

  try {
    const { data } = await octokit.request(
      'GET /users/{username}/gists',
      parameters,
    )
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
