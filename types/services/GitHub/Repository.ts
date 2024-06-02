import type { Endpoints } from '@octokit/types'

export type GetPublicRepositories =
  Endpoints['GET /repositories']['response']['data']
export type GetPublicRepositoriesParameters =
  Endpoints['GET /repositories']['parameters']

export type GetUserRepositories =
  Endpoints['GET /users/{username}/repos']['response']['data']
export type GetUserRepositoriesParameters =
  Endpoints['GET /users/{username}/repos']['parameters']

export type GetAuthenticatedUserRepositories =
  Endpoints['GET /user/repos']['response']['data']
export type GetAuthenticatedUserRepositoriesParameters =
  Endpoints['GET /user/repos']['parameters']

export type GetOwnerRepositoryParameters =
  Endpoints['GET /repos/{owner}/{repo}']['parameters']
export type GetOwnerRepository =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data']
