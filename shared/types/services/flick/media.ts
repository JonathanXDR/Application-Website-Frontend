// Flick identifies a title by its TMDB id together with a media type. The id
// is a string upstream (`'603'`), never a number, and seasons and episodes
// reuse the parent show's id, so the id alone is not a key: the real identity
// is the `(tmdb_id, type, season_number, episode_number)` tuple.
export type FlickMediaType = 'movie' | 'tv' | 'tv_season' | 'tv_episode'

// The subset `GET /resolve` can return. A title string cannot identify a
// single season or episode, so the caller resolves the show and then passes
// `season_number` / `episode_number` to the review endpoints.
export type FlickResolvableMediaType = Extract<FlickMediaType, 'movie' | 'tv'>

// The media object embedded in every Flick response. Responses spell the
// discriminator `type` while request query params spell the same value
// `media_type`, so the two names are deliberately not unified.
//
// `year` and `poster_url` are modelled as nullable even though the
// documented examples always show them populated. Flick derives both from
// TMDB, where an unreleased or obscure title legitimately carries neither,
// and `GET /me/watching` already proves the shape varies by dropping `year`
// entirely. Forcing the null check here is cheaper than a runtime surprise
// against a beta API that documents no guarantees.
export interface FlickMedia {
  tmdb_id: string
  type: FlickMediaType
  title: string
  year: number | null
  poster_url: string | null
  // Present only on `tv_season` and `tv_episode` rows.
  season_number?: number
  episode_number?: number
  show_title?: string
}
