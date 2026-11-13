import { defineCachedEventHandler } from 'nitropack/runtime'
import {
  FLICK_CACHE_MAX_AGE,
  handleFlickError,
  useFlick,
} from '#server/utils/flick'
import type { FlickCollection } from '#shared/types/services/flick/response'
import type { FlickList } from '#shared/types/services/flick/list'

// The built-in watchlist is excluded upstream and has its own route at
// `/api/flick/watchlist`.
export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickCollection<FlickList>>('/me/lists')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-lists',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
