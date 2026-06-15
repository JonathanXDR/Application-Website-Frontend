// Owner and repo are pinned server side to the configured repository
// coordinates and pagination is clamped, see the note in
// server/utils/octokit.ts. Client owner/repo are no longer forwarded, so
// the token cannot be used to read issues from arbitrary repositories.
// TODO: not consumed by the UI and returns the raw issues array. Remove it or
// keep it as an intentional public proxy, and narrow the response if it gains
// a consumer.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner, repo } = useGitHubRepoCoordinates()
    const query = getQuery(event)
    const perPage = clampPerPage(query.per_page)
    const page = clampPage(query.page)

    try {
      const { data } = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        { owner, repo, per_page: perPage, page },
      )
      return data
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-repository-issues',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const query = getQuery(event)
      const perPage = clampPerPage(query.per_page)
      const page = clampPage(query.page)
      return `issues:${perPage}:${page}`
    },
  },
)
