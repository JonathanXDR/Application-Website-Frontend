export default defineEventHandler(async (event) => {
  const { request } = useMusicKit()
  const { term } = getQuery(event)

  try {
    return await request('/catalog/us/search', {
      params: { term, types: 'albums,playlists,songs' },
    })
  }
  catch (error) {
    handleMusicKitError(error)
  }
})
