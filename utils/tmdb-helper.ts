import type { Credits } from '~/types/TMDB/Credits';
import type { Media, MediaType } from '~/types/TMDB/Media';
import type { PageResult } from '~/types/TMDB/PageResult';
import type { Person } from '~/types/TMDB/Person';

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://movies-proxy.vercel.app';

function generateCacheKey(
  url: string,
  params: Record<string, any> = {}
): string {
  return JSON.stringify({ url, params });
}

async function _fetchTMDB(
  url: string,
  params: Record<string, string | number | boolean | undefined> = {}
) {
  if (params.language == null) {
    const locale = useNuxtApp().$i18n.locale;
    params.language = unref(locale);
  }

  return await $fetch(url, {
    baseURL: `${apiBaseUrl}/tmdb`,
    params,
  });
}

export function fetchTMDB(
  url: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<any> {
  const key = generateCacheKey(url, params);

  const cache = useState<any>(`tmdb-cache-${key}`, () => null);

  if (cache.value) {
    return Promise.resolve(cache.value);
  }

  const promise = _fetchTMDB(url, params)
    .then((res) => {
      cache.value = res;
      return res;
    })
    .catch((e) => {
      cache.value = null;
      throw e;
    });

  cache.value = promise;

  return promise;
}

export function listMedia(
  type: MediaType,
  query: string,
  page: number
): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${query}`, { page });
}

export function getMedia(type: MediaType, id: string): Promise<Media> {
  return fetchTMDB(`${type}/${id}`, {
    append_to_response:
      'videos,credits,images,external_ids,release_dates,combined_credits',
    include_image_language: 'en',
  });
}

export function getRecommendations(
  type: MediaType,
  id: string,
  page = 1
): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${id}/recommendations`, { page });
}

export function getTvShowEpisodes(id: string, season: string) {
  return fetchTMDB(`tv/${id}/season/${season}`);
}

export function getTrending(media: string, page = 1) {
  return fetchTMDB(`trending/${media}/week`, { page });
}

export function getMediaByGenre(
  media: string,
  genre: string,
  page = 1
): Promise<PageResult<Media>> {
  return fetchTMDB(`discover/${media}`, {
    with_genres: genre,
    page,
  });
}

export function getCredits(
  id: string | number,
  type: string
): Promise<Credits> {
  return fetchTMDB(`person/${id}/${type}`);
}

export function getGenreList(
  media: string
): Promise<{ name: string; id: number }[]> {
  return fetchTMDB(`genre/${media}/list`).then((res) => res.genres);
}

export function getPerson(id: string): Promise<Person> {
  return fetchTMDB(`person/${id}`, {
    append_to_response: 'images,combined_credits,external_ids',
    include_image_language: 'en',
  });
}

export function searchShows(query: string, page = 1) {
  return fetchTMDB('search/multi', { query, page, include_adult: false });
}
