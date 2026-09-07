import { $fetch } from 'ofetch'
import type { H3Event } from 'h3'
import type { QueryObject } from 'ufo'

// The OpenAPI document declares `servers: [{ url: '/api/beta' }]`, a relative
// URL with no host, so the origin only exists in the prose documentation.
export const FLICK_BASE_URL = 'https://flickmovies.com/api/beta'

// Cache time for the Flick-backed endpoints. Every route reads the same
// single account, so there is no per-visitor variance to defeat the cache,
// and caching keeps the key's 60/minute and 5,000/day budget away from
// visitor traffic. Fifteen minutes matches the GitHub routes and is well
// inside the daily budget even with a cold cache on every deploy.
export const FLICK_CACHE_MAX_AGE = 60 * 15

// Upper bound on a single Flick request, matching the Apple Music client. The
// API is a beta with no published availability target, so a stalled
// connection must not park an SSR render or a prerender pass.
const FLICK_REQUEST_TIMEOUT_MS = 5_000

// Flick's documented pagination bounds. `limit` is validated upstream
// (1-100, default 50). `page` has a documented minimum of 1 and no maximum,
// so the ceiling below is ours. It bounds both the owner's request quota and
// the cache-key cardinality the way the GitHub page clamp does.
const FLICK_DEFAULT_LIMIT = 50
const FLICK_MAX_LIMIT = 100
const FLICK_MAX_PAGE = 50

// Warn once the key's daily budget drops to a tenth of its 5,000 requests.
// Nothing reads the quota headers otherwise, and an exhausted budget would
// surface only as opaque 503s, because `mapUpstreamStatus` folds Flick's 429
// into one. The minute window is deliberately not watched: it refills within
// sixty seconds, so a transient dip is noise rather than a signal.
const FLICK_QUOTA_WARN_THRESHOLD = 500

// Extracts the machine-readable part of a Flick error body for the server log.
// Flick wraps every error, validation included, as
// `{ error: { code, message } }`, and answers a bad param with 400
// `invalid_request`. Only the `code` is logged, never the free-text `message`,
// which quotes the caller's input back. The `detail` fallback covers FastAPI's
// own 404 for a path outside the beta router, which this client never builds.
function describeFlickError(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined

  const body = data as Partial<FlickErrorBody & FlickAppErrorBody>

  if (body.error && typeof body.error.code === 'string') return body.error.code
  if (typeof body.detail === 'string') return body.detail

  return undefined
}

// Flick reports the key's remaining quota on every response its authenticated
// beta router produces, including its 400s and 404s. The header is absent
// only when the key is missing or rejected, or when the path falls outside
// that router. `Number(null)` is 0, so the null check has to come first or
// every headerless response would look like an exhausted budget.
function warnOnLowFlickQuota(headers: Headers) {
  const remaining = headers.get('x-ratelimit-remaining-day')
  if (remaining === null) return

  const left = Number(remaining)
  if (!Number.isFinite(left) || left > FLICK_QUOTA_WARN_THRESHOLD) return

  console.warn(
    '[flick]',
    `daily quota low: ${left} of ${headers.get('x-ratelimit-limit-day') ?? 'unknown'} requests left`,
  )
}

interface FlickRequestOptions {
  params?: QueryObject
}

export function useFlick() {
  // Guarding here rather than in each route keeps the credential check in one
  // place: an unset key answers 404 instead of proxying an upstream 401, so an
  // absent secret can never flip a route from inert to live-but-broken.
  //
  // Nitro runs a cached route's `getKey` before its handler, so a route that
  // *rejects* a param there answers a malformed request with 400 before the
  // credential is ever read. No Flick data is served either way. Only the 404
  // that would otherwise hide the route's existence is lost, which is not what
  // the credential guard protects.
  const apiKey = requireCredential(
    useRuntimeConfig().flickApiKey,
    'flickApiKey',
  )

  function request<T = unknown>(
    path: string,
    options?: FlickRequestOptions,
  ): Promise<T> {
    // External call, so the caller-supplied `T` is the authoritative response
    // type. Importing ofetch's `$fetch` directly keeps this off the Nitro
    // internal-route typing the global `$fetch` carries, as in
    // `server/utils/musickit.ts`.
    return $fetch<T>(`${FLICK_BASE_URL}${path}`, {
      // Flick accepts the key as either a bearer token or `X-API-Key`. The
      // bearer form is the documented default and is what the API's own
      // error message asks for.
      headers: { Authorization: `Bearer ${apiKey}` },
      params: options?.params,
      // `AbortSignal.timeout` rather than ofetch's `timeout` option, which
      // clears its timer as soon as `fetch()` resolves. That is when headers
      // arrive, leaving the body read uncovered, so a slow-streaming response
      // could still park an SSR render. A signal aborts the body stream too,
      // and ofetch skips its own timer whenever one is supplied. Matches the
      // Octokit client in `server/utils/octokit.ts`.
      signal: AbortSignal.timeout(FLICK_REQUEST_TIMEOUT_MS),
      onResponse: ({ response }) => warnOnLowFlickQuota(response.headers),
      // Fail fast, as in `server/utils/musickit.ts`. ofetch retries a GET once
      // by default and its default `retryStatusCodes` include 429 with a zero
      // delay, spending two of the minute's 60 requests on one rate-limited
      // call. Flick sends `Retry-After` on a 429, but honoring it would mean
      // sleeping inside a render, so the request throws instead and the SWR
      // cache keeps serving the last good payload.
      retry: 0,
    })
  }

  return { request }
}

// Normalizes `page` and `limit` for the four paginated Flick endpoints. A
// cached route calls this from both its handler and its `getKey`, so the
// clamp lives in one place and the cache key can never drift from the values
// actually sent upstream.
export function getFlickPageQuery(event: H3Event): FlickPageQuery {
  const query = getQuery(event)
  return {
    page: clampFlickInteger(query.page, 1, 1, FLICK_MAX_PAGE),
    limit: clampFlickInteger(
      query.limit,
      FLICK_DEFAULT_LIMIT,
      1,
      FLICK_MAX_LIMIT,
    ),
  }
}

function clampFlickInteger(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
): number {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(Math.trunc(parsed), min), max)
}

// Every normalizer below shares one contract: a param the caller omitted
// returns `undefined`, so the filter simply disappears from the upstream
// request, while a param that is present but invalid throws a 400.
//
// Silently dropping an invalid filter would answer with a *broader* result
// set than the caller asked for and give no signal that anything was
// ignored: `min_rating=50` would return every review rather than none. Flick
// rejects each of these itself with 400 `invalid_request`, so failing here
// keeps this proxy faithful to the API it fronts.
//
// `page` and `limit` are the deliberate exception, clamped rather than
// rejected by `getFlickPageQuery` above: they bound the owner's quota rather
// than selecting rows, so narrowing an out-of-range value cannot return
// anything the caller did not ask for.
//
// Exported so a route can raise the same 400 for a cross-field rule the
// per-param normalizers cannot see, such as `tmdb_id` needing `media_type`.
export function invalidFlickParam(): never {
  throw createError({
    status: 400,
    statusText: 'Bad Request',
  })
}

// Accepts a value only when it is one of `allowed`, returning it as the
// literal union rather than a widened `string`, so a handler gets
// `'movie' | 'tv'` back. Every caller passes a pre-declared constant, and it
// is the `as const` on that declaration that preserves the literals. The
// `const` type parameter only earns its keep for an array written inline at
// the call site.
export function flickEnum<const T extends string>(
  value: unknown,
  allowed: readonly T[],
): T | undefined {
  if (value === undefined) return undefined
  if (!allowed.includes(value as T)) invalidFlickParam()
  return value as T
}

// Trims a free-form string param, rejecting one that is empty or over the
// documented upstream length cap.
export function flickString(
  value: unknown,
  maxLength: number,
): string | undefined {
  if (value === undefined) return undefined
  // h3 returns an array for a repeated key, which is ambiguous rather than
  // merely malformed, so it is rejected rather than resolved to one element.
  if (typeof value !== 'string') invalidFlickParam()
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLength) invalidFlickParam()
  return trimmed
}

// Rejects a bounded numeric param outside Flick's documented range rather
// than clamping it: a rating filter quietly moved from 50 to 10 would answer
// a question the caller never asked.
export function flickNumber(
  value: unknown,
  min: number,
  max: number,
): number | undefined {
  if (value === undefined) return undefined
  // `Number('')` is 0, which would slip an empty param past the range check
  // as a legitimate zero, so it is excluded before the coercion.
  if (value === '' || (typeof value !== 'string' && typeof value !== 'number')) {
    invalidFlickParam()
  }
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    invalidFlickParam()
  }
  return parsed
}

// Integer variant, for params the spec types as `integer` rather than
// `number`. A fractional value is rejected rather than truncated: quietly
// turning `1999.5` into `1999` would resolve a different title.
export function flickInteger(
  value: unknown,
  min: number,
  max: number,
): number | undefined {
  const parsed = flickNumber(value, min, max)
  if (parsed !== undefined && !Number.isInteger(parsed)) invalidFlickParam()
  return parsed
}

// Parses a tri-state boolean filter. Absent means "no filter", which is not
// the same as `false`, so only the two documented spellings are accepted.
export function flickBoolean(value: unknown): boolean | undefined {
  if (value === undefined) return undefined
  if (value === 'true' || value === true) return true
  if (value === 'false' || value === false) return false
  invalidFlickParam()
}

// Validates an opaque Flick identifier before it is interpolated into a
// request path. An allowlisted charset, rather than `encodeURIComponent`
// alone, is what keeps a caller from steering the request at a different
// upstream path with traversal segments or a query or fragment delimiter.
// Flick's ids are UUIDs and prefixed slugs such as `list_abc`, both of which
// the pattern covers. `\w` plus the explicit `-` excludes `.` and `/`, and
// JavaScript's `$` without the `m` flag is strict end-of-input, unlike some
// other dialects, so a trailing newline cannot smuggle a second segment past
// the check.
export function flickPathId(value: unknown): string | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string' || !/^[\w-]{1,64}$/.test(value)) {
    invalidFlickParam()
  }
  return value
}

// Turns an absent *required* param into the same 400 the normalizers raise
// for an invalid one. They all signal absence the same way, so this composes
// with any of them.
export function requireFlickParam<T>(value: T | undefined): T {
  if (value === undefined) invalidFlickParam()
  return value
}

export function handleFlickError(error: unknown): never {
  // An H3Error we threw ourselves, such as the `requireCredential` 404 or a
  // route's own parameter guard, must pass through unchanged rather than
  // being reclassified as an upstream failure below.
  if (isError(error)) throw error

  if (
    error
    && typeof error === 'object'
    && typeof (error as { status?: unknown }).status === 'number'
  ) {
    const err = error as {
      status: number
      statusText?: string
      data?: unknown
    }
    // Log the upstream status and error code server side, then map the status
    // for the client. A 401 (missing, malformed, unknown, or revoked key), a
    // 403 `pro_required`, and a 429 `rate_limited` all describe *our*
    // credential or quota state with Flick rather than anything the anonymous
    // caller did, so `mapUpstreamStatus` collapses them to gateway errors.
    console.error(
      '[flick]',
      err.status,
      err.statusText,
      describeFlickError(err.data),
    )
    throw createError(mapUpstreamStatus(err.status, 'Flick API Error'))
  }
  // No HTTP status means the request never completed: DNS, connection, or our
  // own timeout. Report it as a gateway error rather than implying our server
  // broke, and never copy the raw message into the public response.
  console.error('[flick]', error)
  throw createError({ status: 502, statusText: 'Flick API Error' })
}
