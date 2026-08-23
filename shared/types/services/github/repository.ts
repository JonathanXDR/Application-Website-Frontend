import type { components } from '@octokit/openapi-types'

export type MinimalRepository = components['schemas']['minimal-repository']

// Projection returned by `/api/github/user-repositories`. The handler
// narrows the upstream `minimal-repository` object to the fields the UI
// reads, which keeps the response the page downloads small. `license` is
// narrowed to its `name` because that is the only field the card reads, so
// the type mirrors that rather than the full license object.
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
