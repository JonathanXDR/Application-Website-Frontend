import type { Endpoints } from '@octokit/types'

export type Repository = Endpoints['GET /users/{username}/repos']['response']
