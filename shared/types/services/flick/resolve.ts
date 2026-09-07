import type {
  FlickMedia,
  FlickResolvableMediaType,
} from '#shared/types/services/flick/media'

export type FlickResolveConfidence = 'high' | 'medium' | 'low'

export interface FlickResolveCandidate
  extends Pick<FlickMedia, 'tmdb_id' | 'title' | 'year' | 'poster_url'> {
  media_type: FlickResolvableMediaType
  /** 0-1. Pair with `confidence` rather than thresholding it directly. */
  score: number
  confidence: FlickResolveConfidence
}

// Echo of the query, with unsupplied narrowing params normalized to null
export interface FlickResolveQuery {
  title: string
  year: number | null
  media_type: FlickResolvableMediaType | null
}

export interface FlickResolveResult {
  query: FlickResolveQuery
  match: FlickResolveCandidate | null
  /** Up to five ranked alternatives, including `match`. */
  candidates: FlickResolveCandidate[]
}
