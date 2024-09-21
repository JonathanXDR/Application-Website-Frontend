export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const { authToken, musicUserToken } = generateToken()

  if (typeof musicUserToken !== 'string') {
    throw new TypeError('Music User Token is not a string')
  }

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/me/library/songs`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Music-User-Token': musicUserToken,
        },
      }
    )
    return response
  } catch (error) {
    console.error('Error fetching user library songs:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
