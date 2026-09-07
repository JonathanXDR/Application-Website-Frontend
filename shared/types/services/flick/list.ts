import type { FlickMedia } from '#shared/types/services/flick/media'

// A custom list the key owner made. The built-in watchlist never appears
// here.
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
// reorders, so a client must not re-sort it.
//
// `rank` is a sparse ordering key, never a position. Appends leave gaps of
// 10000 (10000, 20000, 30000...) so later inserts have room, and moving an
// item to the front sets its rank to 0. Render the array index if a position
// is wanted. `is_ranked` on the parent list is what says whether the order
// carries meaning at all.
export interface FlickListItem {
  media: FlickMedia
  rank: number
  notes: string
  added_at: string
}
