// Only `term` is forwarded, trimmed and length-capped, so this stays a fixed
// catalog search and the cache key stays bounded.
const MAX_TERM_LENGTH = 100
const parseTerm = (value: unknown): string => {
  const raw = Array.isArray(value) ? value[0] : value
  return String(raw ?? '').trim().slice(0, MAX_TERM_LENGTH)
}

// Raw catalog search shape. @types/musickit-js only ships an SDK-wrapped
// envelope, so the per-type results are composed here from its `SearchResult`.
interface CatalogSearchResponse {
  results: {
    albums?: MusicKit.SearchResult<MusicKit.Albums>
    playlists?: MusicKit.SearchResult<MusicKit.Playlists>
    songs?: MusicKit.SearchResult<MusicKit.Songs>
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const term = parseTerm(getQuery(event).term)
    // Apple requires a non-empty term and would answer 400. Reject locally so
    // an empty search never spends an uncached developer-token request.
    if (!term) throw createError({ status: 400, statusText: 'Bad Request' })

    const { request } = useMusicKit()
    try {
      return await request<CatalogSearchResponse>('/catalog/us/search', {
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
    getKey: event => cacheKey(parseTerm(getQuery(event).term)),
  },
)
