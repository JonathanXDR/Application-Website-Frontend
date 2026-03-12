import type { GetRepositoryTagsParameters } from '#shared/types/services/github/tag'

export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const parameters: GetRepositoryTagsParameters = getQuery(event)

  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/tags',
      parameters,
    )
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
