// `ids` is whitelisted and validated server side so this endpoint cannot
// be turned into a generic Apple Music proxy that burns the developer
// token's quota. Apple's catalog playlists endpoint accepts at most 25 ids,
// unlike albums and stations which accept 100.
const MAX_PLAYLIST_IDS = 25

export default defineCachedEventHandler(
  async (event) => {
    const ids = parseCatalogIds(getQuery(event).ids, MAX_PLAYLIST_IDS)
    // Reject an empty or all-invalid id list locally. Apple requires `ids` and
    // would answer 400, and a thrown error is never cached, so forwarding it
    // would spend a developer-token request on every such hit.
    if (!ids) throw createError({ status: 400, statusText: 'Bad Request' })

    const { request } = useMusicKit()
    try {
      return await request<MusicKit.Relationship<MusicKit.Playlists>>(
        '/catalog/us/playlists',
        { params: { ids } },
      )
    }
    catch (error) {
      handleMusicKitError(error)
    }
  },
  {
    name: 'musickit-playlists',
    maxAge: MUSICKIT_CACHE_MAX_AGE,
    swr: true,
    getKey: event =>
      cacheKey(parseCatalogIds(getQuery(event).ids, MAX_PLAYLIST_IDS) ?? ''),
  },
)
