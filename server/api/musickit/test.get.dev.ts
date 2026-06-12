// The .dev suffix keeps this credential diagnostic out of production
// bundles. Nitro only includes env-suffixed handlers in the matching
// environment.
export default defineEventHandler(async () => {
  const { request } = useMusicKit()

  try {
    return await request('/test')
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
