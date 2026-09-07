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
      // The full tag object would otherwise land in every prerendered payload
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
