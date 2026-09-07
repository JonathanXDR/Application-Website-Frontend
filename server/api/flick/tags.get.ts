export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickCollection<FlickTag>>('/me/tags')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-tags',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
