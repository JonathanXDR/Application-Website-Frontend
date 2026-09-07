import type { H3Event } from 'h3'

// One of the owner's reviews by id. Upstream this is
// `GET /me/reviews/{review_id}`. The id arrives as a query param for the same
// reason as in `list-items.get.ts`. Flick answers 404 for a review that does
// not exist or is not the key owner's, and `mapUpstreamStatus` passes a 404
// through unchanged because it is a genuine not-found for the caller.
function getReviewId(event: H3Event) {
  return requireFlickParam(flickPathId(getQuery(event).review_id))
}

export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const reviewId = getReviewId(event)

    try {
      return await request<FlickReview>(`/me/reviews/${reviewId}`)
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-review',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: event => cacheKey(getReviewId(event)),
  },
)
