import type { Endpoints } from '@octokit/types'

export type ListPublicReposResponse = Endpoints['GET /repositories']['response']['data'][0]
export type ListUserReposResponse = Endpoints['GET /users/{username}/repos']['response']['data'][0]
export type ListUserRepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data']
export type GetRepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data']
