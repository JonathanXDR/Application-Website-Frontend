import jwt from 'jsonwebtoken'
import { $fetch } from 'ofetch'
import type { QueryObject } from 'ufo'

export const APPLE_MUSIC_BASE_URL = 'https://api.music.apple.com/v1'

// Caching keeps the developer token's request quota away from visitor
// traffic. Library endpoints are per user and stay uncached.
export const MUSICKIT_CACHE_MAX_AGE = 60 * 15

// A stalled upstream must not hang an SSR render or a prerender pass
const MUSICKIT_REQUEST_TIMEOUT_MS = 5_000

// Apple caps the ids per multi-resource catalog endpoint: albums and stations
// take 100, playlists take 25, so a caller passes the matching limit.
const MAX_CATALOG_IDS = 100

// The charset allowlist and the id cap keep the catalog endpoints from
// becoming a generic Apple Music proxy on the developer token's quota.
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

// ES256 signing on every request wastes CPU for a token valid for a day
let cachedAuthToken: { token: string, expiresAt: number } | undefined

function generateAuthToken(): string {
  const now = Date.now()
  if (cachedAuthToken && now < cachedAuthToken.expiresAt - 60 * 60 * 1000) {
    return cachedAuthToken.token
  }

  const config = useRuntimeConfig()
  // Without this guard an unset key reaches `jwt.sign` and throws before the
  // handler try block, surfacing a raw 500 rather than the concealing 404.
  const privateKey = Buffer.from(
    requireCredential(
      config.appleDeveloperPrivateKey,
      'appleDeveloperPrivateKey',
    ),
    'base64',
  ).toString()

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
          statusText: 'Music User Token Required',
        })
      }
      headers['Music-User-Token'] = musicUserToken
    }

    // ofetch's `$fetch` imported directly keeps this off the Nitro
    // internal-route typing that the global `$fetch` carries.
    return $fetch<T>(`${APPLE_MUSIC_BASE_URL}${path}`, {
      headers,
      params: options?.params,
      timeout: MUSICKIT_REQUEST_TIMEOUT_MS,
      // ofetch retries a GET once by default and its `retryStatusCodes`
      // include 429 with a zero delay, re-issuing a rate-limited response
      // with no backoff.
      retry: 0,
    })
  }

  return { request }
}

export function handleMusicKitError(error: unknown): never {
  if (isError(error)) throw error

  if (
    error
    && typeof error === 'object'
    && typeof (error as { status?: unknown }).status === 'number'
  ) {
    const err = error as {
      status: number
      statusText?: string
      data?: { errors?: Array<{ detail?: string }> }
    }
    console.error(
      '[musickit]',
      err.status,
      err.statusText,
      err.data?.errors?.[0]?.detail,
    )
    throw createError(mapUpstreamStatus(err.status, 'MusicKit API Error'))
  }
  // No HTTP status means the request never completed, so this is a gateway
  // error rather than ours.
  console.error('[musickit]', error)
  throw createError({ status: 502, statusText: 'MusicKit API Error' })
}
