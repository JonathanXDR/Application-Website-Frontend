// `ids` is whitelisted and validated server side so this endpoint cannot
// be turned into a generic Apple Music proxy that burns the developer
// token's quota.
export default defineCachedEventHandler(
  async (event) => {
    const { request } = useMusicKit()
    const ids = parseCatalogIds(getQuery(event).ids)

    try {
      return await request('/catalog/us/playlists', { params: { ids } })
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
      `playlists:${parseCatalogIds(getQuery(event).ids) ?? ''}`,
  },
)
