import { createError, getQuery } from 'h3'
import { defineCachedEventHandler } from 'nitropack/runtime'
import { cacheKey } from '#server/utils/cache'
import {
  handleMusicKitError,
  MUSICKIT_CACHE_MAX_AGE,
  parseCatalogIds,
  useMusicKit,
} from '#server/utils/musickit'

const MAX_PLAYLIST_IDS = 25

export default defineCachedEventHandler(
  async (event) => {
    const ids = parseCatalogIds(getQuery(event).ids, MAX_PLAYLIST_IDS)
    if (!ids) throw createError({ status: 400, statusText: 'Bad Request' })

    const { request } = useMusicKit()
    try {
      return await request<MusicKit.Relationship<MusicKit.Playlists>>(
        '/catalog/us/playlists',
        { params: { ids } },
      )
    }
    catch (error) {
      handleMusicKitError(error)
    }
  },
  {
    name: 'musickit-playlists',
    maxAge: MUSICKIT_CACHE_MAX_AGE,
    swr: true,
    getKey: event =>
      cacheKey(parseCatalogIds(getQuery(event).ids, MAX_PLAYLIST_IDS) ?? ''),
  },
)
