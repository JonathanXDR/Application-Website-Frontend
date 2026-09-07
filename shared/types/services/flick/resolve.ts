import type {
  FlickMedia,
  FlickResolvableMediaType,
} from '#shared/types/services/flick/media'

export type FlickResolveConfidence = 'high' | 'medium' | 'low'

// A resolve hit. It carries the same four identity fields as `FlickMedia`, so
// they are picked from it rather than restated, the way `FlickWatchingShow`
// narrows the same object. The rest cannot be shared: this shape spells the
// discriminator `media_type` where a media object spells it `type`, narrows
// it to the two resolvable kinds, and adds the match-quality pair.
export interface FlickResolveCandidate
  extends Pick<FlickMedia, 'tmdb_id' | 'title' | 'year' | 'poster_url'> {
  media_type: FlickResolvableMediaType
  // 0-1. Pair it with `confidence` rather than thresholding it directly.
  score: number
  confidence: FlickResolveConfidence
}

// Echo of the query that produced the result, with the optional narrowing
// params normalized to null when they were not supplied.
export interface FlickResolveQuery {
  title: string
  year: number | null
  media_type: FlickResolvableMediaType | null
}

// A fuzzy, best-effort lookup rather than an authority. `match` is the
// strongest candidate or null when nothing plausible turned up, and
// `candidates` holds up to five ranked alternatives including the match.
export interface FlickResolveResult {
  query: FlickResolveQuery
  match: FlickResolveCandidate | null
  candidates: FlickResolveCandidate[]
}
