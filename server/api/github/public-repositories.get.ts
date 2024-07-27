import { Octokit } from "octokit";
import type { GetPublicRepositoriesParameters } from "~/types/services/github/Repository";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const params: GetPublicRepositoriesParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /repositories", {
      ...params,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching public repositories:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
