import { generateToken } from '~~/server/utils/generate-token'

export default defineEventHandler(async (event) => {
  const token = generateToken()
  const parameters = getQuery(event)
  const searchTerm = parameters.term

  try {
    const response = await $fetch(`${APPLE_MUSIC_BASE_URL}/catalog/us/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        term: searchTerm,
        types: 'albums,playlists,songs',
      },
    })
    return response
  }
  catch (error) {
    console.error('Error searching music:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
