import type { FlickMedia } from '#shared/types/services/flick/media'

// A watching row's show object drops `year`. Composed with `Pick` so the
// field types stay tied to `FlickMedia`.
export type FlickWatchingShow = Pick<
  FlickMedia,
  'tmdb_id' | 'type' | 'title' | 'poster_url'
>

// Pointer at the most recent episode or season row logged for the show. The
// abbreviated keys are Flick's own.
//
// The live API emits `{ "e": null, "s": null, "kind": null, "created_at":
// null }` for a show with no activity since its last reset, rather than
// omitting the object or sending `null` in its place, so an
// `if (most_recent_review)` guard passes and then reads four nulls.
export interface FlickWatchingRecentReview {
  /** Season number. */
  s: number | null
  /** Episode number. */
  e: number | null
  /**
   * Neither named value is enumerated in the spec, so the open arm accepts
   * a third one this beta API may add.
   */
  kind: 'episode' | 'season' | (string & {}) | null
  created_at: string | null
}

// A show with in-progress episode or season activity, most recent first.
// The counters are the episodes and seasons logged *since the last reset*,
// not lifetime totals and not progress against the show's real length, so
// they cannot be rendered as a completion percentage.
export interface FlickWatchingEntry {
  show: FlickWatchingShow
  last_watched_at: string
  last_reset_at: string | null
  manually_completed_at: string | null
  most_recent_review: FlickWatchingRecentReview | null
  episode_count: number
  season_count: number
}
