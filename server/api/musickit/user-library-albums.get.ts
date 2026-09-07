// Served to anonymous visitors once `appleMusicUserToken` is set.
// TODO: put behind first-party auth before the music feature is enabled.
export default defineEventHandler(async () => {
  requireCredential(
    useRuntimeConfig().appleMusicUserToken,
    'appleMusicUserToken',
  )
  const { request } = useMusicKit()

  try {
    return await request<MusicKit.Relationship<MusicKit.LibraryAlbums>>(
      '/me/library/albums',
      { userToken: true },
    )
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
