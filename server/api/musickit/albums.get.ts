import { generateToken } from '~~/server/utils/generate-token'

export default defineEventHandler(async (event) => {
  const token = generateToken()
  const parameters = getQuery(event)

  try {
    const response = await $fetch(`${APPLE_MUSIC_BASE_URL}/catalog/us/albums`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: parameters,
    })
    return response
  }
  catch (error) {
    console.error('Error fetching albums:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
