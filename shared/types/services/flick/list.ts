import type { FlickMedia } from '#shared/types/services/flick/media'

// A custom list the key owner made, never the built-in watchlist.
export interface FlickList {
  id: string
  title: string
  description: string
  is_ranked: boolean
  num_media: number
  created_at: string
  updated_at: string
}

// An entry in a custom list. A list with `is_ranked` comes back in ascending
// `rank` order, verified against the live API across an insert and two
// reorders, so a client must not re-sort it. `is_ranked` on the parent list
// is what says whether the order carries meaning at all.
export interface FlickListItem {
  media: FlickMedia
  /**
   * Sparse ordering key, never a position: appends leave gaps of 10000 so
   * later inserts have room, and a move to the front sets 0. Render the
   * array index if a position is wanted.
   */
  rank: number
  notes: string
  added_at: string
}
