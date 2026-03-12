export default defineEventHandler(async () => {
  const { request } = useMusicKit()

  try {
    return await request('/me/library/albums', { userToken: true })
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
