// Most recently added first
export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const params = getFlickPageQuery(event)

    try {
      return await request<FlickPaginated<FlickWatchlistItem>>('/me/watchlist', {
        params,
      })
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-watchlist',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const { page, limit } = getFlickPageQuery(event)
      return cacheKey(page, limit)
    },
  },
)
