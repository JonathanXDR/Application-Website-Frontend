import type { QueryObject } from 'ufo'
import jwt from 'jsonwebtoken'

export const APPLE_MUSIC_BASE_URL = 'https://api.music.apple.com/v1'

function generateAuthToken(): string {
  const config = useRuntimeConfig()
  const privateKey = Buffer.from(
    config.appleDeveloperPrivateKey as string,
    'base64',
  ).toString()

  return jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '1d',
    issuer: config.appleDeveloperTeamId as string,
    header: {
      alg: 'ES256',
      kid: config.appleDeveloperKeyId as string,
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
      const musicUserToken = config.appleMusicUserToken as string
      if (!musicUserToken) {
        throw createError({
          statusCode: 401,
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
  if (error && typeof error === 'object' && 'statusCode' in error) {
    const err = error as {
      statusCode: number
      statusMessage?: string
      message?: string
    }
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.statusMessage ?? err.message ?? 'MusicKit API Error',
    })
  }
  throw createError({
    statusCode: 500,
    statusMessage:
      error instanceof Error ? error.message : 'Internal Server Error',
  })
}
