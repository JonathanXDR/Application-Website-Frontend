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
      // Narrow to the only field the hero reads. The full user object also
      // carries avatar and url fields, counts, timestamps, and plan, which
      // would otherwise be embedded verbatim into every prerendered locale
      // payload.
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
