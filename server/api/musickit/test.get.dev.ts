// Nitro only bundles an env-suffixed handler in the matching environment, so
// `.dev` keeps this credential check out of production. The storefronts
// endpoint needs only the developer token, so a 200 confirms the signing key,
// Key ID, and Team ID.
export default defineEventHandler(async () => {
  const { request } = useMusicKit()

  try {
    return await request<MusicKit.Relationship<MusicKit.Storefronts>>(
      '/storefronts/us',
    )
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
