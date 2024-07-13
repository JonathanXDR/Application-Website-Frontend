import { Octokit } from "octokit";
import type { GetAuthenticatedUserGistParameters } from "~/types/services/GitHub/Gist";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const params: GetAuthenticatedUserGistParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /gists", {
      ...params,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching authenticated user gists:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
