import type { Endpoints } from '@octokit/types'

export type ListRepoTagsResponse = Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data']
