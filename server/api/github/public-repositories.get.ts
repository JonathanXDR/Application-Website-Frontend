// Hardened: this route previously proxied `GET /repositories` (a firehose
// over every public repo on GitHub) with raw client query params. It now
// forwards only a clamped per_page, drops the `since` enumeration cursor,
// and is cached, so it cannot be used to walk GitHub's public-repo space on
// the token's quota. Unused by the UI and a candidate for removal.
// TODO: not consumed by the UI and returns the raw repositories array. Remove
// it or keep it as an intentional public proxy.
export default defineCachedEventHandler(
  async (event) => {
    const octokit = useOctokit()
    const perPage = clampPerPage(getQuery(event).per_page)

    try {
      const { data } = await octokit.request('GET /repositories', {
        per_page: perPage,
      })
      return data
    }
    catch (error) {
      handleGitHubError(error)
    }
  },
  {
    name: 'github-public-repositories',
    maxAge: GITHUB_CACHE_MAX_AGE,
    swr: true,
    getKey: event => `public-repos:${clampPerPage(getQuery(event).per_page)}`,
  },
)
