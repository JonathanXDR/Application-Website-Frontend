import jwt from 'jsonwebtoken'
import type { QueryObject } from 'ufo'

export const APPLE_MUSIC_BASE_URL = 'https://api.music.apple.com/v1'

// Cache time for the public Apple Music catalog endpoints. Catalog data is
// stable, so caching keeps the developer token's request quota away from
// visitor traffic. Library endpoints are per user and stay uncached.
export const MUSICKIT_CACHE_MAX_AGE = 60 * 15

// Normalizes a client-supplied id list into a clean comma-separated string
// of Apple catalog ids. Returns undefined when nothing valid was passed,
// so handlers never forward arbitrary query params to the upstream API.
export function parseCatalogIds(value: unknown): string | undefined {
  const raw = Array.isArray(value) ? value.join(',') : String(value ?? '')
  const ids = raw
    .split(',')
    .map(id => id.trim())
    .filter(id => /^[a-z0-9.-]+$/i.test(id))
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

  const token = jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '1d',
    issuer: config.appleDeveloperTeamId,
    header: {
      alg: 'ES256',
      kid: config.appleDeveloperKeyId,
    },
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

    // Cast past the Nitro internal-route augmentation of the global
    // $fetch. This is an external call to the Apple Music API, so the
    // caller supplied T is the authoritative response type.
    return $fetch<T>(`${APPLE_MUSIC_BASE_URL}${path}`, {
      headers,
      params: options?.params,
    }) as Promise<T>
  }

  return { request }
}

export function handleMusicKitError(error: unknown): never {
  if (
    error
    && typeof error === 'object'
    && typeof (error as { status?: unknown }).status === 'number'
  ) {
    const err = error as {
      status: number
      statusMessage?: string
    }
    // Forward only the upstream status code, never the upstream message,
    // for the same reason as handleGitHubError.
    console.error('[musickit]', err.status, err.statusMessage)
    throw createError({
      status: err.status,
      statusText: 'MusicKit API Error',
    })
  }
  // Log the original error server side but never copy raw internal
  // messages into the public response.
  console.error('[musickit]', error)
  throw createError({
    status: 500,
    statusText: 'Internal Server Error',
  })
}
