import { generateToken } from '~~/server/utils/generate-token'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const token = generateToken()
  const parameters = getQuery(event)

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/catalog/us/stations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: parameters,
      }
    )
    return response
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
