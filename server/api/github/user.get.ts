// The username is pinned server side and client-supplied query params are
// ignored. See the note in `server/utils/octokit.ts`.
export default defineCachedEventHandler(
  async () => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()

    try {
      const { data } = await octokit.request('GET /users/{username}', {
        username: owner,
      })
      // Narrow to the only field the hero reads. The full user object would
      // otherwise land verbatim in every prerendered locale payload.
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
