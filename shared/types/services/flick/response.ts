// Which envelope an endpoint uses is fixed. `/me/following`, `/me/reviews`,
// `/me/watchlist`, and `/me/lists/{list_id}/items` accept `page` and `limit`
// and answer with the counters below. `/me/tags`, `/me/lists`, and
// `/me/watching` accept neither and answer with `data` alone, despite the
// documentation's blanket claim that list endpoints paginate.
export interface FlickCollection<T> {
  data: T[]
}

export interface FlickPaginated<T> extends FlickCollection<T> {
  page: number
  limit: number
  total: number
  has_more: boolean
}

// Already clamped by the time a handler sees it.
//
// A type alias rather than an interface on purpose: this value is spread
// straight into an ofetch `params` option, whose `QueryObject` demands an
// index signature, which TypeScript grants only to a type alias.
export type FlickPageQuery = {
  page: number
  limit: number
}

// Match on `code`, never on `message`, per Flick's own guidance
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

// The `string & {}` arm keeps editor completion for the documented codes
// while still accepting an undocumented one.
export interface FlickErrorBody {
  error: {
    code: FlickErrorCode | (string & {})
    message: string
  }
}

// FastAPI's own error shape, returned when a request never reaches Flick's
// beta router (observed on `GET /api/beta` with no trailing slash). Every
// path this client builds begins with a slash, so it exists only for graceful
// degradation if a future path escapes the router.
//
// Deliberately not the validation shape: Flick wraps validation failures in
// the envelope above and answers 400 `invalid_request`, never a FastAPI 422
// with a `detail` array, despite the spec declaring one.
export interface FlickAppErrorBody {
  detail: string
}
