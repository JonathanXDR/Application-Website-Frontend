import type { components } from '@octokit/openapi-types'

export type MinimalRepository = components['schemas']['minimal-repository']

// Projection returned by `/api/github/user-repositories`, narrowed to the
// fields the UI reads to keep the response the page downloads small.
export type MinimalRepositoryCard = Pick<
  MinimalRepository,
  | 'name'
  | 'description'
  | 'html_url'
  | 'created_at'
  | 'updated_at'
  | 'language'
  | 'topics'
  | 'archived'
> & {
  license: { name?: string } | null
}
