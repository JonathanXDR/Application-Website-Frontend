const MAX_TERM_LENGTH = 100
const parseTerm = (value: unknown): string => {
  const raw = Array.isArray(value) ? value[0] : value
  return String(raw ?? '').trim().slice(0, MAX_TERM_LENGTH)
}

// @types/musickit-js only ships an SDK-wrapped envelope, so the raw catalog
// shape is composed here from its `SearchResult`.
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
