export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickProfile>('/me')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-profile',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
