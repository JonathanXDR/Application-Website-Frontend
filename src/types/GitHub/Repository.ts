import type { Endpoints } from '@octokit/types'

type ListUserReposResponse = Endpoints['GET /users/{username}/repos']['response']
export type Repository = ListUserReposResponse['data']
