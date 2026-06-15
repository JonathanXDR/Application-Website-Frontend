// Username is pinned server side to the configured repository owner and
// pagination is clamped, see the note in server/utils/octokit.ts. The
// response is filtered to public gists for parity with auth-user-gists, and
// client query params are no longer forwarded verbatim.
// TODO: not consumed by the UI and returns the raw gists array. Remove it or
// keep it as an intentional public proxy, and narrow the response if it gains
// a consumer.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()
    const query = getQuery(event)
    const perPage = clampPerPage(query.per_page)
    const page = clampPage(query.page)

    try {
      const { data } = await octokit.request('GET /users/{username}/gists', {
        username: owner,
        per_page: perPage,
        page,
      })
      return data.filter(gist => gist.public)
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-user-gists',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const query = getQuery(event)
      const perPage = clampPerPage(query.per_page)
      const page = clampPage(query.page)
      return `user-gists:${perPage}:${page}`
    },
  },
)
