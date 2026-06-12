// Owner and repo are pinned server side to the configured repository
// coordinates and pagination is clamped, see the note in
// server/utils/octokit.ts.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner, repo } = useGitHubRepoCoordinates()
    const perPage = clampPerPage(getQuery(event).per_page)

    try {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/tags', {
        owner,
        repo,
        per_page: perPage,
      })
      return data
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-repository-tags',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: event => `tags:${clampPerPage(getQuery(event).per_page)}`,
  },
)
