import type { Endpoints } from "@octokit/types";

export type GetRepositoryTags =
  Endpoints["GET /repos/{owner}/{repo}/tags"]["response"]["data"];
export type GetRepositoryTagsParameters =
  Endpoints["GET /repos/{owner}/{repo}/tags"]["parameters"];
