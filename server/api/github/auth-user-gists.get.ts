// This endpoint lists gists for the authenticated token, which includes
// secret gists. The response is filtered to public gists so they can
// never leak through this public route, and client query params are no
// longer forwarded verbatim. It 404s when no token is configured rather
// than proxying an upstream 401.
// TODO: not consumed by the UI and returns the raw gists array. Remove it or
// keep it as an intentional public proxy, and narrow the response if it gains
// a consumer.
export default defineEventHandler(async (event) => {
  requireCredential(useRuntimeConfig().githubToken, 'githubToken')
  const octokit = useOctokit()
  const query = getQuery(event)

  try {
    const { data } = await octokit.request('GET /gists', {
      per_page: clampPerPage(query.per_page),
      page: clampPage(query.page),
    })
    return data.filter(gist => gist.public)
  }
  catch (error) {
    handleGitHubError(error)
  }
})
