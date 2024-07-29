export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const params = getQuery(event);

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/catalog/us/albums`,
      {
        headers: {
          Authorization: `Bearer ${config.appleDeveloperToken}`,
        },
        params,
      },
    );
    return response;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
