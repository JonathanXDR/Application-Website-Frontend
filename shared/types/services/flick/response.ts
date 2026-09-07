// Flick returns list data in one of two envelopes, and which one an endpoint
// uses is not negotiable per request. `/me/following`, `/me/reviews`,
// `/me/watchlist`, and `/me/lists/{list_id}/items` accept `page` and `limit`
// and answer with the counters below. `/me/tags`, `/me/lists`, and
// `/me/watching` accept neither and answer with `data` alone, despite the
// documentation's blanket claim that list endpoints paginate. Modeling them
// as two types stops a caller from reading `has_more` off a response that
// never carries it and silently treating `undefined` as "no more pages".
export interface FlickCollection<T> {
  data: T[]
}

export interface FlickPaginated<T> extends FlickCollection<T> {
  page: number
  limit: number
  total: number
  has_more: boolean
}

// Normalized pagination input. Both values are already clamped to Flick's
// documented bounds by the time a handler sees them.
//
// A type alias rather than an interface on purpose: this value is spread
// straight into an ofetch `params` option, whose `QueryObject` demands an
// index signature. TypeScript grants an implicit index signature to a type
// alias but never to an interface, because an interface can be reopened by
// declaration merging and so cannot be proven closed.
export type FlickPageQuery = {
  page: number
  limit: number
}

// The documented machine-readable error codes. Flick's own guidance is to
// match on `code` and never on `message`.
export type FlickErrorCode
  = | 'invalid_request'
    | 'invalid_api_key'
    | 'api_key_revoked'
    | 'pro_required'
    | 'not_found'
    | 'media_not_found'
    | 'rate_limited'
    | 'internal_error'
    | 'api_disabled'

// The beta router's error envelope. The `string & {}` arm keeps editor
// completion for the documented codes while still accepting an undocumented
// one, which a beta API that reserves the right to change shapes will emit
// sooner or later.
export interface FlickErrorBody {
  error: {
    code: FlickErrorCode | (string & {})
    message: string
  }
}

// FastAPI's own error shape, which is what answers a request that never
// reaches Flick's beta router. Observed only on `GET /api/beta` with no
// trailing slash, as `{ "detail": "Not Found" }`. Every path this client
// builds begins with a slash, so it is unreachable today and exists only so
// the error logger degrades gracefully if a future path escapes the router.
//
// It is deliberately NOT the validation shape. Flick wraps validation
// failures in the envelope above and answers 400 `invalid_request`, never a
// FastAPI 422 with a `detail` array, despite the spec declaring one.
export interface FlickAppErrorBody {
  detail: string
}
