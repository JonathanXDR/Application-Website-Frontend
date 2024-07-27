export default defineEventHandler(async () => {
  const { appleDeveloperToken } = useRuntimeConfig();
  await MusicKit.configure({
    developerToken: appleDeveloperToken,
  });

  const music = MusicKit.getInstance();
  await music.authorize();

  try {
    const response = await music.api.music(`/v1/me/library/playlists`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user library playlists:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
