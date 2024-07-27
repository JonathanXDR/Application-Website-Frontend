export default defineEventHandler(async () => {
  const { appleDeveloperToken } = useRuntimeConfig();
  await MusicKit.configure({
    developerToken: appleDeveloperToken,
  });

  const music = MusicKit.getInstance();
  await music.authorize();

  try {
    const response = await music.api.music(`/v1/me/library/songs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user library songs:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
