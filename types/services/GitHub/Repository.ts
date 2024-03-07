import type { Endpoints } from '@octokit/types'

// No authentication required
export type GetPublicRepositories =
  Endpoints['GET /repositories']['response']['data']

export type GetUserRepositories =
  Endpoints['GET /users/{username}/repos']['response']['data']

// Authentication required
export type GetOwnerRepositories =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data']
