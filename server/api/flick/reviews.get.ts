import type { H3Event } from 'h3'

// The owner's reviews. Every filter is optional and they combine with AND
// upstream. A Flick review is a unified watch-event record rather than an
// opinion: the same row covers a rated review, a text-only review and a bare
// watch log, which is what `rated` and `is_log` distinguish.

// `as const` preserves the literals `flickEnum` infers from, and `satisfies`
// checks each entry against its domain union, so a typo or a value Flick does
// not accept fails the build here. It deliberately does not claim more than
// that: `satisfies` checks only that every listed entry belongs to the union,
// never that the list covers it, so a media type or sort field added to
// `shared/types/services/flick` still compiles here and silently stops being
// an accepted filter. Widening a union means revisiting this file by hand.
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

// Flick's documented caps for the two free-form filters, and the rating
// scale's bounds. The scale is 0-10 with decimals, not a five-star integer.
const MAX_TAG_LENGTH = 64
const MAX_TMDB_ID_LENGTH = 32
const MIN_RATING = 0
const MAX_RATING = 10

// Normalizes every filter once, for both the handler and `getKey`. Each
// helper returns `undefined` only for an absent param and throws a 400 for an
// invalid one. The `undefined` matters beyond tidiness: ofetch drops an
// `undefined` param but serializes `null` and `''` as a bare key, which Flick
// rejects.
function getReviewsQuery(event: H3Event) {
  const query = getQuery(event)
  const mediaType = flickEnum(query.media_type, MEDIA_TYPES)

  // `tmdb_id` only filters when paired with a media type, because the id
  // alone is ambiguous across movie and tv, and Flick answers a lone id with
  // `400 media_type is required when filtering by tmdb_id`. Rejecting it here
  // matches that. Dropping the id instead would answer 200 with the entire
  // library where the caller asked for one title, and nothing in the envelope
  // would say a filter had been discarded.
  if (query.tmdb_id !== undefined && mediaType === undefined) invalidFlickParam()

  return {
    ...getFlickPageQuery(event),
    media_type: mediaType,
    tmdb_id: flickString(query.tmdb_id, MAX_TMDB_ID_LENGTH),
    tag: flickString(query.tag, MAX_TAG_LENGTH),
    min_rating: flickNumber(query.min_rating, MIN_RATING, MAX_RATING),
    max_rating: flickNumber(query.max_rating, MIN_RATING, MAX_RATING),
    rated: flickBoolean(query.rated),
    // Upstream defaults, restated so the cache key is built from the values
    // actually sent rather than from an absent param.
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
      // Fixed positions, so two filters that differ only in which field was
      // set still produce distinct keys.
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
