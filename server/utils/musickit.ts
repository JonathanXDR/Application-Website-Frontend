import jwt from 'jsonwebtoken'
import type { QueryObject } from 'ufo'

export const APPLE_MUSIC_BASE_URL = 'https://api.music.apple.com/v1'

function generateAuthToken(): string {
  const config = useRuntimeConfig()
  const privateKey = Buffer.from(
    config.appleDeveloperPrivateKey,
    'base64',
  ).toString()

  return jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '1d',
    issuer: config.appleDeveloperTeamId,
    header: {
      alg: 'ES256',
      kid: config.appleDeveloperKeyId,
    },
  })
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
          statusMessage: 'Music User Token is required for library access',
        })
      }
      headers['Music-User-Token'] = musicUserToken
    }

    return $fetch<T>(`${APPLE_MUSIC_BASE_URL}${path}`, {
      headers,
      params: options?.params,
    })
  }

  return { request }
}

export function handleMusicKitError(error: unknown): never {
  if (error && typeof error === 'object' && 'status' in error) {
    const err = error as {
      status: number
      statusMessage?: string
      message?: string
    }
    throw createError({
      status: err.status,
      statusMessage: err.statusMessage ?? err.message ?? 'MusicKit API Error',
    })
  }
  throw createError({
    status: 500,
    statusMessage:
      error instanceof Error ? error.message : 'Internal Server Error',
  })
}
