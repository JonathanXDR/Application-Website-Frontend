// The username is pinned server side to the configured repository owner.
// Client-supplied query params are ignored on purpose, see the note in
// server/utils/octokit.ts.
export default defineCachedEventHandler(
  async () => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()

    try {
      const { data } = await octokit.request('GET /users/{username}', {
        username: owner,
      })
      return data
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-user',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
