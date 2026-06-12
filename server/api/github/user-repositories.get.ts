// The username is pinned server side to the configured repository owner
// and pagination is clamped, see the note in server/utils/octokit.ts.
// Other client-supplied query params are ignored on purpose.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()
    const query = getQuery(event)
    const perPage = clampPerPage(query.per_page, 100)
    const page = Math.min(Math.max(Number(query.page) || 1, 1), 50)

    try {
      const { data } = await octokit.request('GET /users/{username}/repos', {
        username: owner,
        per_page: perPage,
        page,
      })
      // Narrow to the fields the UI consumes. The full REST repo object
      // is large, and with up to 100 repos it was embedded verbatim into
      // every prerendered projects payload across all four locales.
      return data.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        language: repo.language,
        topics: repo.topics,
        license: repo.license ? { name: repo.license.name } : null,
        archived: repo.archived,
      }))
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-user-repositories',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const query = getQuery(event)
      const perPage = clampPerPage(query.per_page, 100)
      const page = Math.min(Math.max(Number(query.page) || 1, 1), 50)
      return `repos:${perPage}:${page}`
    },
  },
)
