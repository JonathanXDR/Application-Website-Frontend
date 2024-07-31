import { generateToken } from "~/server/utils/generateToken";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const { authToken, musicUserToken } = generateToken();
  console.log("musicUserToken", musicUserToken);

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Music-User-Token", `${musicUserToken}`);

  try {
    const response = await $fetch<MusicKit.Albums[]>(
      `${config.public.appleMusicBaseUrl}/me/library/albums`,
      {
        headers,
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
