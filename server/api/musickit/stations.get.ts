import { createError, getQuery } from 'h3'
import { defineCachedEventHandler } from 'nitropack/runtime'
import { cacheKey } from '#server/utils/cache'
import {
  handleMusicKitError,
  MUSICKIT_CACHE_MAX_AGE,
  parseCatalogIds,
  useMusicKit,
} from '#server/utils/musickit'

export default defineCachedEventHandler(
  async (event) => {
    const ids = parseCatalogIds(getQuery(event).ids)
    if (!ids) throw createError({ status: 400, statusText: 'Bad Request' })

    const { request } = useMusicKit()
    try {
      return await request<MusicKit.Relationship<MusicKit.Stations>>(
        '/catalog/us/stations',
        { params: { ids } },
      )
    }
    catch (error) {
      handleMusicKitError(error)
    }
  },
  {
    name: 'musickit-stations',
    maxAge: MUSICKIT_CACHE_MAX_AGE,
    swr: true,
    getKey: event => cacheKey(parseCatalogIds(getQuery(event).ids) ?? ''),
  },
)
