import { defineCachedEventHandler } from 'nitropack/runtime'
import {
  FLICK_CACHE_MAX_AGE,
  handleFlickError,
  useFlick,
} from '#server/utils/flick'
import type { FlickCollection } from '#shared/types/services/flick/response'
import type { FlickWatchingEntry } from '#shared/types/services/flick/watching'

export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickCollection<FlickWatchingEntry>>('/me/watching')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-watching',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
