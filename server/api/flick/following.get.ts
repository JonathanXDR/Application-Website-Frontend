// The users the owner follows, most recently followed first. `page` and
// `limit` are clamped to Flick's documented bounds by `getFlickPageQuery`,
// which both the handler and `getKey` call so the cache key can never drift
// from the values actually sent upstream.
//
// This is the one Flick route that returns other people's data: usernames,
// display names and avatar URLs of accounts the owner follows. It is
// implemented because the API layer covers every documented GET endpoint, but
// a page that renders it publishes a third party's identity, not the owner's,
// so treat it as a deliberate choice rather than a default.
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
