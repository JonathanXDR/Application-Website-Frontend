import type { Endpoints } from '@octokit/types'

export type GetRepositoryTopics =
  Endpoints['GET /repos/{owner}/{repo}/topics']['response']['data']
