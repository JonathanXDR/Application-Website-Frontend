import type { Endpoints } from '@octokit/types'

export type GetUserGists =
  Endpoints['GET /users/{username}/gists']['response']['data']
export type GetUserGist = GetUserGists[number]
export type GetUserGistsParameters =
  Endpoints['GET /users/{username}/gists']['parameters']

export type GetAuthenticatedUserGists =
  Endpoints['GET /gists']['response']['data']
export type GetAuthenticatedUserGist = GetAuthenticatedUserGists[number]
export type GetAuthenticatedUserGistParameters =
  Endpoints['GET /gists']['parameters']
