import { Octokit } from "octokit";
import type { GetOwnerRepositoryParameters } from "~/types/services/github/Repository";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const params: GetOwnerRepositoryParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      ...params,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching repository for owner ${params.owner}:`,
      error,
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
