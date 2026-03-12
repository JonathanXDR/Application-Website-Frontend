export default defineEventHandler(async () => {
  const { request } = useMusicKit()

  try {
    return await request('/me/library/songs', { userToken: true })
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
