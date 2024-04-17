import type { Credits } from '~/types/TMDB/Credits'
import type { Media, MediaType } from '~/types/TMDB/Media'
import type { PageResult } from '~/types/TMDB/PageResult'
import type { Person } from '~/types/TMDB/Person'
export default defineNuxtPlugin(() => {
  // const apiBaseUrl = 'http://localhost:3001'
  const apiBaseUrl = 'https://movies-proxy.vercel.app'

  const generateCacheKey = (
    url: string,
    params: Record<string, any> = {}
  ): string => {
    return JSON.stringify({ url, params })
  }

  const _fetchTMDB = async (
    url: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ) => {
    if (params.language == null) {
      const locale = useNuxtApp().$i18n.locale
      params.language = unref(locale)
    }

    return await $fetch(url, {
      baseURL: `${apiBaseUrl}/tmdb`,
      params
    })
  }

  const fetchTMDB = (
    url: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Promise<any> => {
    const key = generateCacheKey(url, params)

    const cache = useState<any>(`tmdb-cache-${key}`, () => null)

    if (cache.value) {
      return Promise.resolve(cache.value)
    }

    const promise = _fetchTMDB(url, params)
      .then(res => {
        cache.value = res
        return res
      })
      .catch(e => {
        cache.value = null
        throw e
      })

    cache.value = promise

    return promise
  }

  const listMedia = (
    type: MediaType,
    query: string,
    page: number
  ): Promise<PageResult<Media>> => {
    return fetchTMDB(`${type}/${query}`, { page })
  }

  const getMedia = (type: MediaType, id: string): Promise<Media> => {
    return fetchTMDB(`${type}/${id}`, {
      append_to_response:
        'videos,credits,images,external_ids,release_dates,combined_credits',
      include_image_language: 'en'
    })
  }

  const getRecommendations = (
    type: MediaType,
    id: string,
    page = 1
  ): Promise<PageResult<Media>> => {
    return fetchTMDB(`${type}/${id}/recommendations`, { page })
  }

  const getTvShowEpisodes = (id: string, season: string) => {
    return fetchTMDB(`tv/${id}/season/${season}`)
  }

  const getTrending = (media: string, page = 1) => {
    return fetchTMDB(`trending/${media}/week`, { page })
  }

  const getMediaByGenre = (
    media: string,
    genre: string,
    page = 1
  ): Promise<PageResult<Media>> => {
    return fetchTMDB(`discover/${media}`, {
      with_genres: genre,
      page
    })
  }

  const getCredits = (id: string | number, type: string): Promise<Credits> => {
    return fetchTMDB(`person/${id}/${type}`)
  }

  const getGenreList = (
    media: string
  ): Promise<{ name: string; id: number }[]> => {
    return fetchTMDB(`genre/${media}/list`).then(res => res.genres)
  }

  const getPerson = (id: string): Promise<Person> => {
    return fetchTMDB(`person/${id}`, {
      append_to_response: 'images,combined_credits,external_ids',
      include_image_language: 'en'
    })
  }

  const searchShows = (query: string, page = 1) => {
    return fetchTMDB('search/multi', { query, page, include_adult: false })
  }

  return {
    provide: {
      listMedia,
      getMedia,
      getRecommendations,
      getTvShowEpisodes,
      getTrending,
      getMediaByGenre,
      getCredits,
      getGenreList,
      getPerson,
      searchShows
    }
  }
})
