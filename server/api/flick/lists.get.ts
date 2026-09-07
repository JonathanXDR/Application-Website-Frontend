// The owner's custom lists. Unpaginated: the endpoint takes no `page` or
// `limit`. The built-in watchlist is excluded upstream and has its own route
// at `/api/flick/watchlist`.
export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickCollection<FlickList>>('/me/lists')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-lists',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
