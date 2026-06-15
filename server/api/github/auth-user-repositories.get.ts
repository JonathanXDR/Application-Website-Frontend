// This endpoint lists repositories for the authenticated token. The
// visibility is forced to public so a broadly scoped token can never
// expose private repository metadata through this public route, and
// client query params are no longer forwarded verbatim. It 404s when no
// token is configured rather than proxying an upstream 401.
// TODO: not consumed by the UI and returns the raw repositories array. Remove
// it or keep it as an intentional public proxy, and narrow the response if it
// gains a consumer.
export default defineEventHandler(async (event) => {
  requireCredential(useRuntimeConfig().githubToken, 'githubToken')
  const octokit = useOctokit()
  const query = getQuery(event)

  try {
    const { data } = await octokit.request('GET /user/repos', {
      visibility: 'public',
      per_page: clampPerPage(query.per_page),
      page: clampPage(query.page),
    })
    return data
  }
  catch (error) {
    handleGitHubError(error)
  }
})
