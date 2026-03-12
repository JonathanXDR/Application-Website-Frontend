export default defineEventHandler(async () => {
  const { request } = useMusicKit()

  try {
    return await request('/test')
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
