// Owner and repo are pinned server side to the configured repository
// coordinates and pagination is clamped, see the note in
// server/utils/octokit.ts.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner, repo } = useGitHubRepoCoordinates()
    const perPage = getPerPage(event)

    try {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/tags', {
        owner,
        repo,
        per_page: perPage,
      })
      // Narrow to the only field the release banner reads. The full tag
      // object also carries commit, archive URLs, and node_id, which would
      // otherwise be embedded verbatim into every prerendered locale payload.
      return data.map(tag => ({ name: tag.name }))
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-repository-tags',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: event => cacheKey(getPerPage(event)),
  },
)
