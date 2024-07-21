import { Octokit } from "octokit";
import type { GetUserGistsParameters } from "~/types/services/GitHub/Gist";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const params: GetUserGistsParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /users/{username}/gists", {
      ...params,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching gists for user ${params.username}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
