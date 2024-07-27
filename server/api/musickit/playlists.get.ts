export default defineEventHandler(async (event) => {
  const { appleDeveloperToken } = useRuntimeConfig();
  await MusicKit.configure({
    developerToken: appleDeveloperToken,
  });

  const music = MusicKit.getInstance();
  const params = getQuery(event);

  try {
    const response = await music.api.music(`/v1/catalog/us/playlists`, {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
