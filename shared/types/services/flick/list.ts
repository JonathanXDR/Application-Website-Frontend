import type { FlickMedia } from '#shared/types/services/flick/media'

// Never the built-in watchlist
export interface FlickList {
  id: string
  title: string
  description: string
  is_ranked: boolean
  num_media: number
  created_at: string
  updated_at: string
}

// A ranked list comes back in ascending `rank` order, so a client must not
// re-sort it. `is_ranked` on the parent list says whether that order carries
// meaning at all.
export interface FlickListItem {
  media: FlickMedia
  /**
   * Sparse ordering key, never a position: appends leave gaps of 10000 and a
   * move to the front sets 0. Render the array index for a position.
   */
  rank: number
  notes: string
  added_at: string
}
