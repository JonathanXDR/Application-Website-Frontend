export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = generateToken();
  const params = getQuery(event);
  const searchTerm = params.term;

  try {
    const response = await $fetch(
      `${config.public.appleMusicBaseUrl}/catalog/us/search`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          term: searchTerm,
          types: "albums,playlists,songs",
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error searching music:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
