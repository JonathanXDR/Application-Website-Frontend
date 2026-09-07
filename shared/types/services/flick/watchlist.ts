import type { FlickMedia } from '#shared/types/services/flick/media'

// A watchlist row.
export interface FlickWatchlistItem {
  media: FlickMedia
  added_at: string
}
