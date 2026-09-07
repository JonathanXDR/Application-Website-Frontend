import type { H3Event } from 'h3'

// Filters combine with AND upstream

// `satisfies` does not check coverage, so a media type or sort added to
// `shared/types/services/flick` still compiles here and silently stops being
// an accepted filter.
const MEDIA_TYPES = [
  'movie',
  'tv',
  'tv_season',
  'tv_episode',
] as const satisfies readonly FlickMediaType[]

const SORTS = [
  'created_at',
  'watched_date',
  'rating',
] as const satisfies readonly FlickReviewSort[]

const ORDERS = ['asc', 'desc'] as const satisfies readonly FlickReviewOrder[]

// Flick's documented caps and the 0-10 rating bounds
const MAX_TAG_LENGTH = 64
const MAX_TMDB_ID_LENGTH = 32
const MIN_RATING = 0
const MAX_RATING = 10

// An absent param stays `undefined`: ofetch drops an `undefined` param but
// serializes `null` and `''` as a bare key, which Flick rejects.
function getReviewsQuery(event: H3Event) {
  const query = getQuery(event)
  const mediaType = flickEnum(query.media_type, MEDIA_TYPES)

  // `tmdb_id` only filters when paired with a media type: Flick answers a
  // lone id with `400 media_type is required when filtering by tmdb_id`, and
  // dropping the id instead would answer 200 with the entire library.
  if (query.tmdb_id !== undefined && mediaType === undefined) invalidFlickParam()

  return {
    ...getFlickPageQuery(event),
    media_type: mediaType,
    tmdb_id: flickString(query.tmdb_id, MAX_TMDB_ID_LENGTH),
    tag: flickString(query.tag, MAX_TAG_LENGTH),
    min_rating: flickNumber(query.min_rating, MIN_RATING, MAX_RATING),
    max_rating: flickNumber(query.max_rating, MIN_RATING, MAX_RATING),
    rated: flickBoolean(query.rated),
    // Upstream defaults, restated so the cache key reflects the values sent
    sort: flickEnum(query.sort, SORTS) ?? 'created_at',
    order: flickEnum(query.order, ORDERS) ?? 'desc',
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const params = getReviewsQuery(event)

    try {
      return await request<FlickPaginated<FlickReview>>('/me/reviews', {
        params,
      })
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-reviews',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const query = getReviewsQuery(event)
      // Fixed positions, so two different filter sets never share a key
      return cacheKey(
        query.page,
        query.limit,
        query.media_type ?? '',
        query.tmdb_id ?? '',
        query.tag ?? '',
        query.min_rating ?? '',
        query.max_rating ?? '',
        query.rated === undefined ? '' : String(query.rated),
        query.sort,
        query.order,
      )
    },
  },
)
