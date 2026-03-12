export default defineEventHandler(async (event) => {
  const { request } = useMusicKit()
  const params = getQuery(event)

  try {
    return await request('/catalog/us/stations', { params })
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
