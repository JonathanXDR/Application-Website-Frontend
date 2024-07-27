export default defineEventHandler(async (event) => {
  const { appleDeveloperToken } = useRuntimeConfig();
  await MusicKit.configure({
    developerToken: appleDeveloperToken,
  });

  const music = MusicKit.getInstance();
  const params = getQuery(event);
  const searchTerm = params.term;

  try {
    const response = await music.api.music(`/v1/catalog/us/search`, {
      term: searchTerm,
      types: "albums,playlists,songs",
    });
    return response.data;
  } catch (error) {
    console.error("Error searching music:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
