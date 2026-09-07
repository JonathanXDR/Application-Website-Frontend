// Shows with in-progress episode or season activity, most recent first.
// Unpaginated: the endpoint takes no `page` or `limit`.
//
// The `episode_count` and `season_count` counters are the rows logged since
// the owner's last reset, not lifetime totals and not progress against the
// show's real length, so a consumer must not render them as a completion
// ratio. See `shared/types/services/flick/watching.ts`.
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
