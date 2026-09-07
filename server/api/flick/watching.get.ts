export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickCollection<FlickWatchingEntry>>('/me/watching')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-watching',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
