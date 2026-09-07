// Seasons and episodes reuse the parent show's TMDB id, so identity is the
// `(tmdb_id, type, season_number, episode_number)` tuple, not the id alone.
export type FlickMediaType = 'movie' | 'tv' | 'tv_season' | 'tv_episode'

// The subset `GET /resolve` can return: a title string cannot identify a
// single season or episode.
export type FlickResolvableMediaType = Extract<FlickMediaType, 'movie' | 'tv'>

// Responses spell the discriminator `type` while request query params spell
// the same value `media_type`, so the two names are deliberately not unified.
//
// `year` and `poster_url` are nullable even though every documented example
// shows them populated: Flick derives both from TMDB, and `GET /me/watching`
// already drops `year`.
export interface FlickMedia {
  tmdb_id: string
  type: FlickMediaType
  title: string
  year: number | null
  poster_url: string | null
  // Present only on `tv_season` and `tv_episode` rows
  season_number?: number
  episode_number?: number
  show_title?: string
}
