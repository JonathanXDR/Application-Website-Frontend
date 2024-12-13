import { generateToken } from '~~/server/utils/generate-token'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const { authToken, musicUserToken } = generateToken()

  if (typeof musicUserToken !== 'string') {
    throw new TypeError('Music User Token is not a string')
  }

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/me/library/playlists`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Music-User-Token': musicUserToken,
        },
      },
    )
    return response
  }
  catch (error) {
    console.error('Error fetching user library playlists:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
