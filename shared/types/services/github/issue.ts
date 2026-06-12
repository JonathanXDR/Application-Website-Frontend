import type { Endpoints } from '@octokit/types'

export type GetRepositoryIssuesParameters
  = Endpoints['GET /repos/{owner}/{repo}/issues']['parameters']
