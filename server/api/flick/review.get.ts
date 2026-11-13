import type { H3Event } from 'h3'
import { getQuery } from 'h3'
import { defineCachedEventHandler } from 'nitropack/runtime'
import { cacheKey } from '#server/utils/cache'
import {
  FLICK_CACHE_MAX_AGE,
  flickPathId,
  handleFlickError,
  requireFlickParam,
  useFlick,
} from '#server/utils/flick'
import type { FlickReview } from '#shared/types/services/flick/review'

// The id is a query param for the same reason as in `list-items.get.ts`.
// Flick answers 404 for a review that is not the key owner's.
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
