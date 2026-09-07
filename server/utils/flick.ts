import { $fetch } from 'ofetch'
import type { H3Event } from 'h3'
import type { QueryObject } from 'ufo'

// The OpenAPI document declares `servers: [{ url: '/api/beta' }]`, a relative
// URL with no host, so the origin only exists in the prose documentation.
export const FLICK_BASE_URL = 'https://flickmovies.com/api/beta'

// Cache time for the Flick-backed endpoints. Every route reads the same single
// account, so caching keeps the key's 60/minute and 5,000/day budget away from
// visitor traffic. Fifteen minutes matches the GitHub routes.
export const FLICK_CACHE_MAX_AGE = 60 * 15

// Upper bound on a single Flick request, matching the Apple Music client. The
// API is a beta with no published availability target, so a stalled connection
// must not park an SSR render or a prerender pass.
const FLICK_REQUEST_TIMEOUT_MS = 5_000

// Flick validates `limit` upstream (1-100, default 50). `page` has a
// documented minimum of 1 and no maximum, so the ceiling below is ours: it
// bounds the owner's request quota and the cache-key cardinality.
const FLICK_DEFAULT_LIMIT = 50
const FLICK_MAX_LIMIT = 100
const FLICK_MAX_PAGE = 50

// Warn once the key's daily budget drops to a tenth of its 5,000 requests.
// Nothing else reads the quota headers, and an exhausted budget would surface
// only as an opaque 503, because `mapUpstreamStatus` folds Flick's 429 into
// one. The minute window refills within sixty seconds, so it is not watched.
const FLICK_QUOTA_WARN_THRESHOLD = 500

// Flick wraps every error, validation included, in an `error` object carrying
// a `code` and a `message`. Only the `code` is ever logged, never the
// free-text `message`, which quotes the caller's input back. The `detail`
// fallback covers FastAPI's own 404 for a path outside the beta router, which
// this client never builds.
function describeFlickError(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined

  const body = data as Partial<FlickErrorBody & FlickAppErrorBody>

  if (body.error && typeof body.error.code === 'string') return body.error.code
  if (typeof body.detail === 'string') return body.detail

  return undefined
}

// Flick reports the remaining quota on every response its authenticated beta
// router produces, including its 400s and 404s. The header is absent only when
// the key is missing or rejected, or the path falls outside that router.
// `Number(null)` is 0, so the null check has to come first or a headerless
// response would look like an exhausted budget.
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
  // place. Nitro runs a cached route's `getKey` before its handler, so a
  // route that rejects a param there answers 400 before the credential is
  // read. No Flick data is served either way. Only the concealing 404 is
  // lost.
  const apiKey = requireCredential(
    useRuntimeConfig().flickApiKey,
    'flickApiKey',
  )

  function request<T = unknown>(
    path: string,
    options?: FlickRequestOptions,
  ): Promise<T> {
    // ofetch's `$fetch` imported directly rather than the Nitro-typed
    // global, as in `server/utils/musickit.ts`.
    return $fetch<T>(`${FLICK_BASE_URL}${path}`, {
      // The bearer form is Flick's documented default. It also accepts
      // `X-API-Key`.
      headers: { Authorization: `Bearer ${apiKey}` },
      params: options?.params,
      // `AbortSignal.timeout` rather than ofetch's `timeout` option, which
      // clears its timer as soon as `fetch()` resolves, leaving the body read
      // uncovered while a slow-streaming response parks an SSR render. A
      // signal aborts the body stream too, and ofetch skips its own timer
      // whenever one is supplied. Matches `server/utils/octokit.ts`.
      signal: AbortSignal.timeout(FLICK_REQUEST_TIMEOUT_MS),
      onResponse: ({ response }) => warnOnLowFlickQuota(response.headers),
      // Fail fast, as in `server/utils/musickit.ts`: ofetch's default retry
      // would spend two of the minute's 60 requests on one rate-limited call.
      // Flick sends `Retry-After` on a 429, but honoring it would mean
      // sleeping inside a render.
      retry: 0,
    })
  }

  return { request }
}

// Called from both a cached route's handler and its `getKey`, as in
// `server/utils/octokit.ts`.
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

/**
 * Exported so a route can raise the same 400 the normalizers raise, for a
 * cross-field rule they cannot see, such as `tmdb_id` needing `media_type`.
 */
export function invalidFlickParam(): never {
  throw createError({
    status: 400,
    statusText: 'Bad Request',
  })
}

// Every normalizer below shares one contract: an omitted param returns
// `undefined` and its filter disappears from the upstream request, while a
// param that is present but invalid throws a 400. Silently dropping an invalid
// filter would answer with a *broader* result set than the caller asked for
// and give no signal: `min_rating=50` would return every review rather than
// none. `page` and `limit` are the deliberate exception, clamped above because
// they bound the owner's quota rather than selecting rows.

// Returns the value as the literal union rather than a widened `string`. Each
// caller's `as const` constant is what preserves the literals. The `const`
// type parameter only earns its keep for an array written inline.
export function flickEnum<const T extends string>(
  value: unknown,
  allowed: readonly T[],
): T | undefined {
  if (value === undefined) return undefined
  if (!allowed.includes(value as T)) invalidFlickParam()
  return value as T
}

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

// Integer variant, for params the spec types as `integer`. A fractional value
// is rejected rather than truncated: `1999.5` would resolve a different title.
export function flickInteger(
  value: unknown,
  min: number,
  max: number,
): number | undefined {
  const parsed = flickNumber(value, min, max)
  if (parsed !== undefined && !Number.isInteger(parsed)) invalidFlickParam()
  return parsed
}

// Absent means "no filter", which is not the same as `false`, so only the two
// documented spellings are accepted.
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
// `\w` plus `-` covers Flick's UUIDs and prefixed slugs while excluding `.`
// and `/`, and `$` without the `m` flag is strict end-of-input, so a trailing
// newline cannot smuggle a second segment past the check.
export function flickPathId(value: unknown): string | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string' || !/^[\w-]{1,64}$/.test(value)) {
    invalidFlickParam()
  }
  return value
}

// Turns an absent *required* param into the same 400 an invalid one raises.
// Every normalizer signals absence the same way, so this composes with any
// of them.
export function requireFlickParam<T>(value: T | undefined): T {
  if (value === undefined) invalidFlickParam()
  return value
}

export function handleFlickError(error: unknown): never {
  // An `H3Error` we threw ourselves passes through unchanged, as in
  // `server/utils/octokit.ts`.
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
    // The statuses Flick uses for our own credential and quota state: 401 for
    // a missing, malformed, unknown, or revoked key, 403 `pro_required`, and
    // 429 `rate_limited`.
    console.error(
      '[flick]',
      err.status,
      err.statusText,
      describeFlickError(err.data),
    )
    throw createError(mapUpstreamStatus(err.status, 'Flick API Error'))
  }
  // No HTTP status means the request never completed, as in
  // `server/utils/musickit.ts`.
  console.error('[flick]', error)
  throw createError({ status: 502, statusText: 'Flick API Error' })
}
