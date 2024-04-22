import type { Endpoints } from '@octokit/types'

export type GetPublicRepositories =
  Endpoints['GET /repositories']['response']['data']

export type GetPublicRepository =
  Endpoints['GET /repositories']['response']['data'][number]

export type GetUserRepositories =
  Endpoints['GET /users/{username}/repos']['response']['data']

export type GetUserRepository =
  Endpoints['GET /users/{username}/repos']['response']['data'][number]

export type GetOwnerRepository =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data']
