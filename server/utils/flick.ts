import { $fetch } from 'ofetch'
import type { H3Event } from 'h3'
import type { QueryObject } from 'ufo'

// The OpenAPI document declares a relative `servers` URL with no host, so the
// origin only exists in Flick's prose documentation.
export const FLICK_BASE_URL = 'https://flickmovies.com/api/beta'

export const FLICK_CACHE_MAX_AGE = 60 * 15

const FLICK_REQUEST_TIMEOUT_MS = 5_000

// Flick validates `limit` upstream (1-100, default 50). `page` has no
// documented maximum, so the ceiling below is ours: it bounds the owner's
// request quota and the cache-key cardinality.
const FLICK_DEFAULT_LIMIT = 50
const FLICK_MAX_LIMIT = 100
const FLICK_MAX_PAGE = 50

// Warns at a tenth of the key's 5,000/day budget. An exhausted budget would
// otherwise surface only as the opaque 503 `mapUpstreamStatus` folds Flick's
// 429 into. The minute window refills within sixty seconds, so it is not
// watched.
const FLICK_QUOTA_WARN_THRESHOLD = 500

// The `code` is logged rather than Flick's free-text `message`, which quotes
// the caller's input back. The `detail` fallback covers FastAPI's own 404 for
// a path outside the beta router.
function describeFlickError(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined

  const body = data as Partial<FlickErrorBody & FlickAppErrorBody>

  if (body.error && typeof body.error.code === 'string') return body.error.code
  if (typeof body.detail === 'string') return body.detail

  return undefined
}

// `Number(null)` is 0, so the null check has to come first or a response
// without the header would look like an exhausted budget.
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
  // Nitro runs a cached route's `getKey` before its handler, so a route that
  // rejects a param there answers 400 before the credential is read. No Flick
  // data is served either way, only the concealing 404 is lost.
  const apiKey = requireCredential(
    useRuntimeConfig().flickApiKey,
    'flickApiKey',
  )

  function request<T = unknown>(
    path: string,
    options?: FlickRequestOptions,
  ): Promise<T> {
    return $fetch<T>(`${FLICK_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: options?.params,
      // `AbortSignal.timeout` rather than ofetch's `timeout` option, which
      // clears its timer as soon as `fetch()` resolves, leaving the body read
      // uncovered while a slow-streaming response parks an SSR render. A
      // signal aborts the body stream too, and ofetch skips its own timer
      // whenever one is supplied.
      signal: AbortSignal.timeout(FLICK_REQUEST_TIMEOUT_MS),
      onResponse: ({ response }) => warnOnLowFlickQuota(response.headers),
      // ofetch's default retry would spend two of the minute's 60 requests on
      // one rate-limited call, and honoring Flick's `Retry-After` would mean
      // sleeping inside a render.
      retry: 0,
    })
  }

  return { request }
}

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

export function invalidFlickParam(): never {
  throw createError({
    status: 400,
    statusText: 'Bad Request',
  })
}

// Every normalizer below shares one contract: an omitted param returns
// `undefined` and its filter disappears from the upstream request, while a
// param that is present but invalid throws a 400. Dropping an invalid filter
// silently would answer with a *broader* result set than the caller asked for:
// `min_rating=50` would return every review rather than none. `page` and
// `limit` are clamped instead, because they bound the owner's quota rather
// than selecting rows.

// The `const` type parameter only matters for an allowlist written inline
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
  // h3 returns an array for a repeated key, ambiguous rather than merely
  // malformed, so it is rejected rather than resolved to one element.
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
  // as a legitimate zero.
  if (value === '' || (typeof value !== 'string' && typeof value !== 'number')) {
    invalidFlickParam()
  }
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    invalidFlickParam()
  }
  return parsed
}

// A fractional value is rejected rather than truncated: `1999.5` would
// resolve a different title.
export function flickInteger(
  value: unknown,
  min: number,
  max: number,
): number | undefined {
  const parsed = flickNumber(value, min, max)
  if (parsed !== undefined && !Number.isInteger(parsed)) invalidFlickParam()
  return parsed
}

export function flickBoolean(value: unknown): boolean | undefined {
  if (value === undefined) return undefined
  if (value === 'true' || value === true) return true
  if (value === 'false' || value === false) return false
  invalidFlickParam()
}

// An allowlisted charset, rather than `encodeURIComponent` alone, is what
// keeps a caller from steering the interpolated request path elsewhere with
// traversal segments or a query or fragment delimiter. `\w` plus `-` covers
// Flick's UUIDs and prefixed slugs while excluding `.` and `/`, and `$`
// without the `m` flag is strict end-of-input, so a trailing newline cannot
// smuggle a second segment past the check.
export function flickPathId(value: unknown): string | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string' || !/^[\w-]{1,64}$/.test(value)) {
    invalidFlickParam()
  }
  return value
}

export function requireFlickParam<T>(value: T | undefined): T {
  if (value === undefined) invalidFlickParam()
  return value
}

export function handleFlickError(error: unknown): never {
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
    console.error(
      '[flick]',
      err.status,
      err.statusText,
      describeFlickError(err.data),
    )
    throw createError(mapUpstreamStatus(err.status, 'Flick API Error'))
  }
  console.error('[flick]', error)
  throw createError({ status: 502, statusText: 'Flick API Error' })
}
