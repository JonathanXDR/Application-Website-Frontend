// The `.dev` suffix keeps this credential diagnostic out of production
// bundles. Nitro only includes env-suffixed handlers in the matching
// environment. The storefronts endpoint needs only the developer token,
// so a 200 confirms the signing key, Key ID, and Team ID are valid.
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
