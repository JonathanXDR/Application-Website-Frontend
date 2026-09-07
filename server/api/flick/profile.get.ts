// The profile of the account that owns the Flick API key. There is nothing to
// pin server side the way the GitHub routes pin the repository owner: the key
// itself is the scope.
//
// The payload is returned whole rather than projected like the GitHub routes:
// it is six small fields and no UI reads it yet.
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
