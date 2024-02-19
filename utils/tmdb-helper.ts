import type { Credits } from '~/types/TMDB/Credits'
import type { Media, MediaType } from '~/types/TMDB/Media'
import type { PageResult } from '~/types/TMDB/PageResult'
import type { Person } from '~/types/TMDB/Person'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://movies-proxy.vercel.app'

const generateCacheKey = (url: string, params: Record<string, any> = {}): string => JSON.stringify({ url, params })

const _fetchTMDB = async (url: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<any> => {
  if (params.language == null) {
    const locale = useNuxtApp().$i18n.locale
    params.language = unref(locale)
  }

  return await $fetch(url, {
    baseURL: `${apiBaseUrl}/tmdb`,
    params
  })
}

export const fetchTMDB = async (url: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<any> => {
  const key = generateCacheKey(url, params)

  const cache = useState<any>(`tmdb-cache-${key}`, () => null)

  if (cache.value !== null && cache.value !== undefined) {
    return await Promise.resolve(cache.value)
  }

  const promise = _fetchTMDB(url, params)
    .then((res) => {
      cache.value = res
      return res
    })
    .catch((e) => {
      cache.value = null
      throw e
    })

  cache.value = promise

  return await promise
}

export const listMedia = async (type: MediaType, query: string, page: number): Promise<PageResult<Media>> => await fetchTMDB(`${type}/${query}`, { page })

export const getMedia = async (type: MediaType, id: string): Promise<Media> => await fetchTMDB(`${type}/${id}`, {
  append_to_response:
      'videos,credits,images,external_ids,release_dates,combined_credits',
  include_image_language: 'en'
})

export const getRecommendations = async (type: MediaType, id: string, page = 1): Promise<PageResult<Media>> => await fetchTMDB(`${type}/${id}/recommendations`, { page })

export const getTvShowEpisodes = async (id: string, season: string): Promise<any> => await fetchTMDB(`tv/${id}/season/${season}`)

export const getTrending = async (media: string, page = 1): Promise<PageResult<Media>> => await fetchTMDB(`trending/${media}/week`, { page })

export const getMediaByGenre = async (media: string, genre: string, page = 1): Promise<PageResult<Media>> => await fetchTMDB(`discover/${media}`, {
  with_genres: genre,
  page
})

export const getCredits = async (id: string | number, type: string): Promise<Credits> => await fetchTMDB(`person/${id}/${type}`)

export const getGenreList = async (media: string): Promise<Array<{ name: string, id: number }>> => await fetchTMDB(`genre/${media}/list`).then(res => res.genres)

export const getPerson = async (id: string): Promise<Person> => await fetchTMDB(`person/${id}`, {
  append_to_response: 'images,combined_credits,external_ids',
  include_image_language: 'en'
})

export const searchShows = async (query: string, page = 1): Promise<any> => await fetchTMDB('search/multi', { query, page, include_adult: false })
