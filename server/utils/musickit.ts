import jwt from 'jsonwebtoken'
import { $fetch } from 'ofetch'
import type { QueryObject } from 'ufo'

export const APPLE_MUSIC_BASE_URL = 'https://api.music.apple.com/v1'

// Cache time for the public Apple Music catalog endpoints. Catalog data is
// stable, so caching keeps the developer token's request quota away from
// visitor traffic. Library endpoints are per user and stay uncached.
export const MUSICKIT_CACHE_MAX_AGE = 60 * 15

// Upper bound on a single Apple Music request, mirroring the GitHub client's
// timeout so a stalled upstream cannot hang an SSR render or a prerender pass.
const MUSICKIT_REQUEST_TIMEOUT_MS = 5_000

// Apple caps the ids per multi-resource catalog endpoint: albums and stations
// take 100, playlists take 25. The caller passes the matching limit so trimming
// respects the upstream cap and bounds the cache-key cardinality the way the
// GitHub pagination clamps do.
const MAX_CATALOG_IDS = 100

// Normalizes a client-supplied id list into a clean comma-separated string
// of Apple catalog ids. Returns undefined when nothing valid was passed,
// so handlers never forward arbitrary query params to the upstream API.
export function parseCatalogIds(
  value: unknown,
  maxIds = MAX_CATALOG_IDS,
): string | undefined {
  const raw = Array.isArray(value) ? value.join(',') : String(value ?? '')
  const ids = raw
    .split(',')
    .map(id => id.trim())
    .filter(id => /^[a-z0-9.-]+$/i.test(id))
    .slice(0, maxIds)
  return ids.length ? ids.join(',') : undefined
}

// Module-scope cache for the signed developer token. ES256 signing on
// every request wastes CPU for a token that stays valid for a day. The
// token is re-signed an hour before expiry.
let cachedAuthToken: { token: string, expiresAt: number } | undefined

function generateAuthToken(): string {
  const now = Date.now()
  if (cachedAuthToken && now < cachedAuthToken.expiresAt - 60 * 60 * 1000) {
    return cachedAuthToken.token
  }

  const config = useRuntimeConfig()
  // Guard the signing key the same way the library routes guard the user
  // token. Without this an unset key reaches jwt.sign as an empty string and
  // throws before the handler try block, surfacing a raw 500. Routing it
  // through requireCredential keeps an unconfigured catalog endpoint inert
  // (404) instead of live but broken.
  const privateKey = Buffer.from(
    requireCredential(
      config.appleDeveloperPrivateKey,
      'appleDeveloperPrivateKey',
    ),
    'base64',
  ).toString()

  // `keyid` sets the JWT `kid` header that tells Apple which MusicKit key
  // signed the token. `algorithm` stays the single source of truth for `alg`.
  const token = jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '1d',
    issuer: config.appleDeveloperTeamId,
    keyid: config.appleDeveloperKeyId,
  })

  cachedAuthToken = { token, expiresAt: now + 24 * 60 * 60 * 1000 }
  return token
}

interface MusicKitRequestOptions {
  params?: QueryObject
  userToken?: boolean
}

export function useMusicKit() {
  const config = useRuntimeConfig()
  const authToken = generateAuthToken()

  function request<T = unknown>(
    path: string,
    options?: MusicKitRequestOptions,
  ): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${authToken}`,
    }

    if (options?.userToken) {
      const musicUserToken = config.appleMusicUserToken
      if (!musicUserToken) {
        throw createError({
          status: 401,
          statusText: 'Music User Token is required for library access',
        })
      }
      headers['Music-User-Token'] = musicUserToken
    }

    // External call to the Apple Music API, so the caller supplied T is the
    // authoritative response type. Importing ofetch's $fetch directly keeps
    // this off the Nitro internal-route typing that the global $fetch carries.
    return $fetch<T>(`${APPLE_MUSIC_BASE_URL}${path}`, {
      headers,
      params: options?.params,
      timeout: MUSICKIT_REQUEST_TIMEOUT_MS,
      // Fail fast. ofetch retries a GET once by default and its default
      // retryStatusCodes include 429 with a zero delay, so a rate-limited
      // response would be re-issued at once with no backoff. retry 0 surfaces
      // the error immediately, matching the GitHub client.
      retry: 0,
    })
  }

  return { request }
}

export function handleMusicKitError(error: unknown): never {
  // An H3Error we threw ourselves (such as the Music-User-Token guard below)
  // must pass through unchanged. ofetch's FetchError is not an H3Error, so it
  // continues to the upstream branch. Only our own createError calls match.
  if (isError(error)) throw error

  if (
    error
    && typeof error === 'object'
    && typeof (error as { status?: unknown }).status === 'number'
  ) {
    const err = error as {
      status: number
      statusText?: string
      // Apple returns structured errors at `data.errors[]` with code/title/
      // detail. ofetch parses the body onto `err.data`.
      data?: { errors?: Array<{ detail?: string }> }
    }
    // Log the upstream status plus Apple's specific detail server side for
    // diagnosability, then map the status for the client the same way as
    // handleGitHubError. The detail is never copied into the public response.
    console.error(
      '[musickit]',
      err.status,
      err.statusText,
      err.data?.errors?.[0]?.detail,
    )
    throw createError(mapUpstreamStatus(err.status, 'MusicKit API Error'))
  }
  // No HTTP status means a transport failure reaching Apple Music (DNS,
  // connection, or our own timeout). The only code wrapped in the calling
  // try blocks is the upstream request, so report it as a gateway error
  // rather than implying our own server broke. Log it but never leak detail.
  console.error('[musickit]', error)
  throw createError({ status: 502, statusText: 'MusicKit API Error' })
}
