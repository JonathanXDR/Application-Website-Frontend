import { Octokit } from "octokit";
import type { GetRepositoryTagsParameters } from "~/types/services/GitHub/Tag";

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig();
  const octokit = new Octokit({ auth: githubToken });
  const params: GetRepositoryTagsParameters = getQuery(event);

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/tags", {
      ...params,
      headers: { accept: "application/vnd.github+json" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching tags for repository ${params.repo}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
