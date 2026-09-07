import type { FlickMedia } from '#shared/types/services/flick/media'

// A watchlist row. The watchlist is a built-in list that `GET /me/lists`
// deliberately excludes, so it has its own endpoint and its own item shape:
// no `rank` and no `notes`, unlike a custom list item.
export interface FlickWatchlistItem {
  media: FlickMedia
  added_at: string
}
