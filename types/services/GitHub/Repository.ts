import type { Endpoints } from '@octokit/types'

export type GetPublicRepositories =
  Endpoints['GET /repositories']['response']['data']

export type GetPublicRepository = GetPublicRepositories[number]

export type GetUserRepositories =
  Endpoints['GET /users/{username}/repos']['response']['data']

export type GetUserRepository = GetUserRepositories[number]

export type GetOwnerRepository =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data']

export type GetPinnedRepository = {
  name: string
  description: string
  html_url: string
  topics: string[]
  language?: string
  license?: {
    name: string
    nickname: string
    url: string
  }
  forks: string[]
  stars: string[]
  issues: string[]
  pullRequests: string[]
  updated_at: string
}
