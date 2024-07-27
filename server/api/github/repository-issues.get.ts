import { Octokit } from "octokit";
import type { GetRepositoryIssuesParameters } from "~/types/services/github/Issue";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const params: GetRepositoryIssuesParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      ...params,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching issues for repository ${params.repo}:`,
      error,
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
