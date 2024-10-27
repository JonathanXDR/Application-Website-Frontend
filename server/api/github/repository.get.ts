import { Octokit } from "octokit";
import type { GetOwnerRepositoryParameters } from "~~/types/services/github/repository";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const parameters: GetOwnerRepositoryParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      ...parameters,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching repository for owner ${parameters.owner}:`,
      error,
    )
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
