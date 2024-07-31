import { generateToken } from "~/server/utils/generateToken";

export default defineEventHandler(async () => {
  const { authToken } = generateToken();

  const response = await fetch("https://api.music.apple.com/v1/test", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Apple Music API");
  }

  const data = await response.json();
  return data;
});
