import type { FlickMedia } from '#shared/types/services/flick/media'

export type FlickWatchingShow = Pick<
  FlickMedia,
  'tmdb_id' | 'type' | 'title' | 'poster_url'
>

// The abbreviated keys are Flick's own. The live API emits `{ "e": null,
// "s": null, "kind": null, "created_at": null }` for a show with no activity
// since its last reset, rather than omitting the object, so an
// `if (most_recent_review)` guard passes and then reads four nulls.
export interface FlickWatchingRecentReview {
  /** Season number. */
  s: number | null
  /** Episode number. */
  e: number | null
  /**
   * Neither value is enumerated in the spec, so the open arm accepts a third
   * one this beta API may add.
   */
  kind: 'episode' | 'season' | (string & {}) | null
  created_at: string | null
}

// Rows come back most recent first. The counters cover what was logged since
// the last reset, not lifetime totals and not progress against the show's
// real length, so they cannot be rendered as a completion percentage.
export interface FlickWatchingEntry {
  show: FlickWatchingShow
  last_watched_at: string
  last_reset_at: string | null
  manually_completed_at: string | null
  most_recent_review: FlickWatchingRecentReview | null
  episode_count: number
  season_count: number
}
