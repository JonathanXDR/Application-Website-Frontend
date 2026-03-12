import type { GetRepositoryIssuesParameters } from '#shared/types/services/github/issue'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetRepositoryIssuesParameters = getQuery(event)

  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/issues',
      parameters,
    )
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
