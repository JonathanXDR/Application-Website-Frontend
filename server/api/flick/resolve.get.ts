import type { H3Event } from 'h3'

// Resolves loose metadata (a title, optionally a year and type) to the TMDB
// id and media type the rest of the Flick API expects.
//
// This is the only Flick endpoint whose input is genuinely free-form, so it
// is also the only one a visitor could use to spend the owner's quota on
// arbitrary lookups. Three things bound that: the shared `/api/**` rate
// limiter in `nuxt.config.ts`, the length-capped title below, and the SWR
// cache, which collapses repeats of the same query to one upstream call.
const RESOLVABLE_MEDIA_TYPES = [
  'movie',
  'tv',
] as const satisfies readonly FlickResolvableMediaType[]

// Flick's documented bounds. Only movies and shows resolve here. A specific
// season or episode is reached by resolving the show first.
const MAX_TITLE_LENGTH = 200
const MIN_YEAR = 1870
const MAX_YEAR = 2100

function getResolveQuery(event: H3Event) {
  const query = getQuery(event)
  return {
    // The only required param on this route. `list-items` and `review` guard
    // their ids the same way. Rejecting an empty value here rather than
    // forwarding it saves an upstream round trip for a request Flick would
    // answer with the same 400.
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
