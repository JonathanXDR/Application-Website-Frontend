import type { components } from '@octokit/openapi-types'
import type { Endpoints } from '@octokit/types'

export type MinimalRepository = components['schemas']['minimal-repository']
export type Repository = components['schemas']['repository']

// Projection returned by /api/github/user-repositories. The handler
// narrows the upstream minimal-repository object to the fields the UI
// consumes, which keeps the prerendered payloads small.
export type MinimalRepositoryCard = Pick<
  MinimalRepository,
  | 'name'
  | 'description'
  | 'html_url'
  | 'created_at'
  | 'updated_at'
  | 'language'
  | 'topics'
  | 'license'
  | 'archived'
>

export type GetPublicRepositoriesParameters
  = Endpoints['GET /repositories']['parameters']

export type GetOwnerRepositoryParameters
  = Endpoints['GET /repos/{owner}/{repo}']['parameters']
