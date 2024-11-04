import type { GetRepositoryIssuesParameters } from "#shared/types/services/github/issue";
import { Octokit } from "octokit";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const parameters: GetRepositoryIssuesParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      ...parameters,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching issues for repository ${parameters.repo}:`,
      error,
    )
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
