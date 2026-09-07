import type { FlickMedia } from '#shared/types/services/flick/media'

// The show object on a watching row is narrower than the standard media
// object: it drops `year`. Composing it with `Pick` keeps the field types tied
// to `FlickMedia` so the two cannot drift apart.
export type FlickWatchingShow = Pick<
  FlickMedia,
  'tmdb_id' | 'type' | 'title' | 'poster_url'
>

// Pointer at the most recent episode or season row logged for the show. The
// abbreviated keys are Flick's own: `s` is the season number and `e` the
// episode number.
//
// Every field is nullable, and the object itself is not. The live API emits
// `{ "e": null, "s": null, "kind": null, "created_at": null }` for a show
// with no activity since its last reset, rather than omitting the object or
// sending `null` in its place, so an `if (most_recent_review)` guard passes
// and then reads four nulls. `kind` is `'episode'` in the one documented
// populated example and `season_count` on the parent row implies `'season'`
// exists. Neither is enumerated in the spec, so the open arm accepts a third
// value this beta API may add.
export interface FlickWatchingRecentReview {
  s: number | null
  e: number | null
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
