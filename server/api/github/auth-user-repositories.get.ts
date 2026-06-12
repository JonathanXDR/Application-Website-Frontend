// This endpoint lists repositories for the authenticated token. The
// visibility is forced to public so a broadly scoped token can never
// expose private repository metadata through this public route, and
// client query params are no longer forwarded verbatim.
export default defineEventHandler(async (event) => {
  const octokit = useOctokit()
  const query = getQuery(event)

  try {
    const { data } = await octokit.request('GET /user/repos', {
      visibility: 'public',
      per_page: clampPerPage(query.per_page),
      page: Math.min(Math.max(Number(query.page) || 1, 1), 50),
    })
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
