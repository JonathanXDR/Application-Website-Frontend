// The username is pinned server side to the configured repository owner
// and pagination is clamped. See the note in `server/utils/octokit.ts`.
// Other client-supplied query params are ignored on purpose.
const PER_PAGE = 100

export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const { owner } = useGitHubRepoCoordinates()
    const { perPage, page } = getListQuery(event, PER_PAGE)

    try {
      const { data } = await octokit.request('GET /users/{username}/repos', {
        username: owner,
        per_page: perPage,
        page,
      })
      // Narrow to the fields the UI reads. The full REST repo object
      // is large, and with up to 100 repos it was embedded verbatim into
      // every prerendered projects payload across all four locales. The
      // return type ties this projection to the type the page reads so
      // the two cannot drift.
      return data.map((repo): MinimalRepositoryCard => ({
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
      const { perPage, page } = getListQuery(event, PER_PAGE)
      return cacheKey(perPage, page)
    },
  },
)
