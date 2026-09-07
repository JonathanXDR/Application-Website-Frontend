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
      // The full REST repo object would otherwise land in every prerendered
      // projects payload, once per locale.
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
