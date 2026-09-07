// `ids` is charset-allowlisted server side so this endpoint cannot become a
// generic Apple Music proxy on the developer token's quota.
export default defineCachedEventHandler(
  async (event) => {
    const ids = parseCatalogIds(getQuery(event).ids)
    // Apple's 400 is never cached, so forwarding one costs a request per hit.
    if (!ids) throw createError({ status: 400, statusText: 'Bad Request' })

    const { request } = useMusicKit()
    try {
      return await request<MusicKit.Relationship<MusicKit.Albums>>(
        '/catalog/us/albums',
        { params: { ids } },
      )
    }
    catch (error) {
      handleMusicKitError(error)
    }
  },
  {
    name: 'musickit-albums',
    maxAge: MUSICKIT_CACHE_MAX_AGE,
    swr: true,
    getKey: event => cacheKey(parseCatalogIds(getQuery(event).ids) ?? ''),
  },
)
