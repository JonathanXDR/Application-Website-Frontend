import type { ExternalIds } from './ExternalIds';
import type { Genre } from './Genre';
import type { Image } from './Image';
import type { Person } from './Person';
import type { Video } from './Video';

export type MediaType = 'movie' | 'tv';

export interface Media {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: MediaType;
  // details
  homepage?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  genres?: Genre[];
  production_companies?: any[];
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Person[];
    crew: Person[];
  };
  images?: {
    backdrops: Image[];
    posters: Image[];
  };
  external_ids?: ExternalIds;
  // cast
  character?: string;
}
