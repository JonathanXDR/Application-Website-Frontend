// The owner's distinct review tags with usage counts, most-used first.
// Unpaginated: the endpoint takes no `page` or `limit`.
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
