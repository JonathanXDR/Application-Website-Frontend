// Returns the site owner's personal Apple Music library via the shared
// Music-User-Token. The route 404s until `appleMusicUserToken` is
// configured. Once it is set the library is served to anonymous visitors.
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
