// Only `term` is forwarded and it is coerced to a trimmed string, so the
// endpoint stays a fixed catalog search rather than a generic proxy.
const parseTerm = (value: unknown): string =>
  (Array.isArray(value) ? value[0] : String(value ?? '')).trim()

export default defineCachedEventHandler(
  async (event) => {
    const { request } = useMusicKit()
    const term = parseTerm(getQuery(event).term)

    try {
      return await request('/catalog/us/search', {
        params: { term, types: 'albums,playlists,songs' },
      })
    }
    catch (error) {
      handleMusicKitError(error)
    }
  },
  {
    name: 'musickit-search',
    maxAge: MUSICKIT_CACHE_MAX_AGE,
    swr: true,
    getKey: event => `search:${parseTerm(getQuery(event).term)}`,
  },
)
