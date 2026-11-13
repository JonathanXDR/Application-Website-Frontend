import { defineCachedEventHandler } from 'nitropack/runtime'
import {
  FLICK_CACHE_MAX_AGE,
  handleFlickError,
  useFlick,
} from '#server/utils/flick'
import type { FlickCollection } from '#shared/types/services/flick/response'
import type { FlickTag } from '#shared/types/services/flick/tag'

export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickCollection<FlickTag>>('/me/tags')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-tags',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
