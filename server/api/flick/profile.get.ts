import { defineCachedEventHandler } from 'nitropack/runtime'
import {
  FLICK_CACHE_MAX_AGE,
  handleFlickError,
  useFlick,
} from '#server/utils/flick'
import type { FlickProfile } from '#shared/types/services/flick/profile'

export default defineCachedEventHandler(
  async () => {
    const { request } = useFlick()

    try {
      return await request<FlickProfile>('/me')
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-profile',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: () => 'owner',
  },
)
