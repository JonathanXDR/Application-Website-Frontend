// Most recently followed first. The only Flick route that returns other
// people's data, so a page rendering it publishes a third party's identity.
export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const params = getFlickPageQuery(event)

    try {
      return await request<FlickPaginated<FlickFollowedUser>>('/me/following', {
        params,
      })
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-following',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const { page, limit } = getFlickPageQuery(event)
      return cacheKey(page, limit)
    },
  },
)
