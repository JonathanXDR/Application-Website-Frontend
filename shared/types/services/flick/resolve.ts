import type {
  FlickMedia,
  FlickResolvableMediaType,
} from '#shared/types/services/flick/media'

export type FlickResolveConfidence = 'high' | 'medium' | 'low'

// The identity fields are picked from `FlickMedia`, but the rest cannot be
// shared: this shape spells the discriminator `media_type` where a media
// object spells it `type`, narrows it to the two resolvable kinds, and adds
// the match-quality pair.
export interface FlickResolveCandidate
  extends Pick<FlickMedia, 'tmdb_id' | 'title' | 'year' | 'poster_url'> {
  media_type: FlickResolvableMediaType
  /** 0-1. Pair it with `confidence` rather than thresholding it directly. */
  score: number
  confidence: FlickResolveConfidence
}

// Echo of the query, with unsupplied narrowing params normalized to null.
export interface FlickResolveQuery {
  title: string
  year: number | null
  media_type: FlickResolvableMediaType | null
}

// A fuzzy, best-effort lookup rather than an authority. `match` is the
// strongest candidate, or null when nothing plausible turned up.
export interface FlickResolveResult {
  query: FlickResolveQuery
  match: FlickResolveCandidate | null
  /** Up to five ranked alternatives, including `match`. */
  candidates: FlickResolveCandidate[]
}
