import { defineCachedEventHandler } from 'nitropack/runtime'
import { cacheKey } from '#server/utils/cache'
import {
  FLICK_CACHE_MAX_AGE,
  getFlickPageQuery,
  handleFlickError,
  useFlick,
} from '#server/utils/flick'
import type { FlickPaginated } from '#shared/types/services/flick/response'
import type { FlickWatchlistItem } from '#shared/types/services/flick/watchlist'

// Most recently added first
export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const params = getFlickPageQuery(event)

    try {
      return await request<FlickPaginated<FlickWatchlistItem>>('/me/watchlist', {
        params,
      })
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-watchlist',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const { page, limit } = getFlickPageQuery(event)
      return cacheKey(page, limit)
    },
  },
)
