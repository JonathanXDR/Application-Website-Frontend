import type { Endpoints } from '@octokit/types'

export type GetRepositoryIssues =
  Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']
