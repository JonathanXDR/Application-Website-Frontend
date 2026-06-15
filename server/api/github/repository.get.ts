// Owner and repo are pinned server side to the configured repository
// coordinates, see the note in server/utils/octokit.ts. Client-supplied
// owner/repo are ignored so the authenticated token cannot be turned into
// a generic GitHub proxy. Cached because repository metadata changes rarely.
// TODO: not consumed by the UI and returns the full REST repository object
// (the heaviest single payload here). Remove it or keep it as an intentional
// public proxy, and narrow the raw response if it gains a consumer.
export default defineCachedEventHandler(
  async () => {
    const octokit = useOctokit()
    const { owner, repo } = useGitHubRepoCoordinates()

    try {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      })
      return data
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-repository',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'repository',
  },
)
