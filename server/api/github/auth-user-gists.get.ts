// This endpoint lists gists for the authenticated token, which includes
// secret gists. The response is filtered to public gists so they can
// never leak through this public route, and client query params are no
// longer forwarded verbatim.
export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const query = getQuery(event)

  try {
    const { data } = await octokit.request('GET /gists', {
      per_page: clampPerPage(query.per_page),
      page: Math.min(Math.max(Number(query.page) || 1, 1), 50),
    })
    return data.filter(gist => gist.public)
  }
  catch (error) {
    handleGitHubError(error)
  }
})
