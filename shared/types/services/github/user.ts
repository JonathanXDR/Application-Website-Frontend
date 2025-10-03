import type { Endpoints } from '@octokit/types'

export type GetUser = Endpoints['GET /users/{username}']['response']['data']
export type GetUserParameters
  = Endpoints['GET /users/{username}']['parameters']
