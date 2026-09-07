import type { H3Event } from 'h3'

const RESOLVABLE_MEDIA_TYPES = [
  'movie',
  'tv',
] as const satisfies readonly FlickResolvableMediaType[]

// Flick's documented bounds
const MAX_TITLE_LENGTH = 200
const MIN_YEAR = 1870
const MAX_YEAR = 2100

// `title` is free-form text, so the title length cap, the `/api/**` rate
// limiter in `nuxt.config.ts` and the SWR cache are what bound the owner's
// quota.
function getResolveQuery(event: H3Event) {
  const query = getQuery(event)
  return {
    title: requireFlickParam(flickString(query.title, MAX_TITLE_LENGTH)),
    year: flickInteger(query.year, MIN_YEAR, MAX_YEAR),
    media_type: flickEnum(query.media_type, RESOLVABLE_MEDIA_TYPES),
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const params = getResolveQuery(event)

    try {
      return await request<FlickResolveResult>('/resolve', { params })
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-resolve',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const { title, year, media_type: mediaType } = getResolveQuery(event)
      return cacheKey(title, year ?? '', mediaType ?? '')
    },
  },
)
