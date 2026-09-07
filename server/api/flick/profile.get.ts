// The profile of the account that owns the Flick API key. Flick has no OAuth
// and no cross-account reads, so there is nothing to pin server side the way
// the GitHub routes pin the repository owner: the key itself is the scope.
//
// The upstream payload is returned whole rather than narrowed to the fields a
// page reads. Unlike the GitHub routes, which trim a large REST object down
// before it is baked into every prerendered locale payload, this response is
// six small fields and no UI consumes it yet, so a projection now would be a
// guess about what a future page needs.
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
