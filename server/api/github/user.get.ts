export default defineCachedEventHandler(
  async () => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()

    try {
      const { data } = await octokit.request('GET /users/{username}', {
        username: owner,
      })
      // The full user object would land in every prerendered locale payload
      return { bio: data.bio }
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
