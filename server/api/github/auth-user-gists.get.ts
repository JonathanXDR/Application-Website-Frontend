import type { GetAuthenticatedUserGistParameters } from '#shared/types/services/github/gist'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetAuthenticatedUserGistParameters = getQuery(event)

  try {
    const { data } = await octokit.request('GET /gists', parameters)
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
