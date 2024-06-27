import type { components } from "@octokit/openapi-types";
import type { Endpoints } from "@octokit/types";

export type SimpleRepository = components["schemas"]["simple-repository"];
export type MinimalRepository = components["schemas"]["minimal-repository"];
export type FullRepository = components["schemas"]["full-repository"];
export type Repository = components["schemas"]["repository"];

export type GetPublicRepositories =
  Endpoints["GET /repositories"]["response"]["data"];
export type GetPublicRepositoriesParameters =
  Endpoints["GET /repositories"]["parameters"];

export type GetUserRepositories =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type GetUserRepositoriesParameters =
  Endpoints["GET /users/{username}/repos"]["parameters"];

export type GetAuthenticatedUserRepositories =
  Endpoints["GET /user/repos"]["response"]["data"];
export type GetAuthenticatedUserRepositoriesParameters =
  Endpoints["GET /user/repos"]["parameters"];

export type GetOwnerRepositoryParameters =
  Endpoints["GET /repos/{owner}/{repo}"]["parameters"];
export type GetOwnerRepository =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
