// Shows with in-progress episode or season activity, most recent first.
// Unpaginated: the endpoint takes no `page` or `limit`. See
// `shared/types/services/flick/watching.ts` for what the counters mean.
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
