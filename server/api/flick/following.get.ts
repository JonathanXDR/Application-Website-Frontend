import { defineCachedEventHandler } from 'nitropack/runtime'
import { cacheKey } from '#server/utils/cache'
import {
  FLICK_CACHE_MAX_AGE,
  getFlickPageQuery,
  handleFlickError,
  useFlick,
} from '#server/utils/flick'
import type { FlickFollowedUser } from '#shared/types/services/flick/profile'
import type { FlickPaginated } from '#shared/types/services/flick/response'

// Most recently followed first. Serves other people's profiles to anonymous
// visitors.
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
