export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/me/library/albums`,
      {
        headers: {
          Authorization: `Bearer ${config.appleDeveloperToken}`,
          "Music-User-Token": config.appleMusicUserToken,
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error fetching user library albums:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
