import type { FlickMedia } from '#shared/types/services/flick/media'

// Where the row came from. `api` would mark anything this integration wrote.
export type FlickReviewSource = 'app' | 'import' | 'api'

export type FlickWatchContextSource = 'theater' | 'home' | 'onTheGo'
export type FlickWatchContextCinemaType = 'cinema' | 'driveIn'
export type FlickWatchContextMedium
  = | 'streaming'
    | 'physical'
    | 'broadcast'
    | 'download'

export type FlickWatchContextPlace
  = | 'plane'
    | 'outside'
    | 'friends'
    | 'hotel'
    | 'commute'

export type FlickWatchContextDevice
  = | 'tv'
    | 'projector'
    | 'desktop'
    | 'laptop'
    | 'tablet'
    | 'phone'
    | 'seatback'

// "How you watched": a sparse facet bag where only what was set is stored.
// `source` is the top-level context and the rest are sub-facets beneath one
// of them, but Flick does not enforce the combinations, so a discriminated
// union would reject payloads the API itself accepts. The free-text facets
// are capped at 200 characters upstream.
export interface FlickWatchContext {
  source?: FlickWatchContextSource | null
  cinema_type?: FlickWatchContextCinemaType | null
  format?: string | null
  theater?: string | null
  auditorium?: string | null
  showtime?: string | null
  seat?: string | null
  medium?: FlickWatchContextMedium | null
  service?: string | null
  edition?: string | null
  channel?: string | null
  place?: FlickWatchContextPlace | null
  device?: FlickWatchContextDevice | null
}

// The frozen, explicit set of episodes a TV review counts as watched. Only
// meaningful on `tv` and `tv_season` reviews. `seasons` maps a season number,
// as a string key where `'0'` is Specials, to the covered episode numbers.
// An absent season is not covered, and an empty map covers nothing.
//
// Undocumented in Flick's prose reference and absent from its response
// example, but present on every review row the live API returns (280/280 in
// this account, all null) and defined in the spec's write schemas.
export interface FlickCoverageScope {
  v: number
  seasons: Record<string, number[]>
}

// A Flick review is a unified watch-event record, not necessarily an opinion:
// the same row type covers a rated review, a text-only review, and a bare
// watch log.
export interface FlickReview {
  id: string
  media: FlickMedia
  /** 0-10 with decimals (`9.2`), not a five-star integer. Null when unrated. */
  rating: number | null
  review: string | null
  watched_date: string
  created_at: string
  tags: string[]
  watch_context: FlickWatchContext | null
  /** User ids only. Rendering names means joining against `/me/following`. */
  watched_with: string[]
  coverage_scope: FlickCoverageScope | null
  source: FlickReviewSource
  /**
   * True only for a bare watch log: no rating, no text, no photos. A
   * rating-only row is `false`, so this is not the inverse of
   * `rating === null`.
   */
  is_log: boolean
}

export type FlickReviewSort = 'created_at' | 'watched_date' | 'rating'
export type FlickReviewOrder = 'asc' | 'desc'
