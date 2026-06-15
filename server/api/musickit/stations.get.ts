// `ids` is whitelisted and validated server side so this endpoint cannot
// be turned into a generic Apple Music proxy that burns the developer
// token's quota.
export default defineCachedEventHandler(
  async (event) => {
    const { request } = useMusicKit()
    const ids = parseCatalogIds(getQuery(event).ids)

    try {
      return await request('/catalog/us/stations', { params: { ids } })
    }
    catch (error) {
      handleMusicKitError(error)
    }
  },
  {
    name: 'musickit-stations',
    maxAge: MUSICKIT_CACHE_MAX_AGE,
    swr: true,
    getKey: event => `stations:${parseCatalogIds(getQuery(event).ids) ?? ''}`,
  },
)
