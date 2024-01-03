import type { Endpoints } from "@octokit/types";

export type ListRepoIssuesResponse =
  Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0];
