import { generateToken } from '~~/server/utils/generate-token'

export default defineEventHandler(async () => {
  const token = generateToken()

  const response = await fetch(`${APPLE_MUSIC_BASE_URL}/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data from Apple Music API')
  }

  const data = await response.json()
  return data
})
