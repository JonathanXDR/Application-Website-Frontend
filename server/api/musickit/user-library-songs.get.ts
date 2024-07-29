export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/me/library/songs`,
      {
        headers: {
          Authorization: `Bearer ${config.appleDeveloperToken}`,
          "Music-User-Token": config.appleMusicUserToken,
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error fetching user library songs:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
