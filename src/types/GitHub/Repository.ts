import type { Endpoints } from '@octokit/types'

export type GetRepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data']
export type ListPublicReposResponse = Endpoints['GET /repositories']['response']['data']
export type ListUserRepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data']
