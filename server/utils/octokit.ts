import { Octokit, RequestError } from 'octokit'

export const GITHUB_API_VERSION = '2026-03-10'

// Cache time for GitHub-backed endpoints. Repository metadata changes
// rarely, and caching keeps the PAT's request quota away from visitor
// traffic while letting prerender and warm instances respond instantly.
export const GITHUB_CACHE_MAX_AGE = 60 * 15

let octokit: Octokit | undefined

export function useOctokit() {
  // Module-scope singleton. The token never changes at runtime, and
  // reusing one client keeps connection pooling across requests.
  if (!octokit) {
    const { githubToken } = useRuntimeConfig()
    octokit = new Octokit({
      auth: githubToken,
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      },
      // Fail fast instead of sleeping until the quota resets. The default
      // throttling behavior retries after the reset window, which can park
      // an SSR render or a prerender pass for minutes when the token is
      // rate limited. Returning false makes the request throw immediately,
      // and the calling page falls back to its loading and empty states.
      throttle: {
        onRateLimit: () => false,
        onSecondaryRateLimit: () => false,
      },
    })
  }
  return octokit
}

// The site only ever shows data for the configured repository owner.
// Pinning the value server side stops visitors from turning these
// endpoints into a generic GitHub proxy that burns the token's quota.
export function useGitHubRepoCoordinates() {
  const { githubRepoOwner, githubRepoName } = useRuntimeConfig().public
  return { owner: githubRepoOwner, repo: githubRepoName }
}

// Clamps a client-provided pagination value into GitHub's accepted range.
export function clampPerPage(value: unknown, fallback = 30) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(Math.trunc(parsed), 1), 100)
}

// Clamps a client-provided page number. GitHub paginates from 1, and the
// upper bound keeps deep pagination from walking far into the owner's
// history on the token's quota.
export function clampPage(value: unknown, fallback = 1, max = 50) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 1) return fallback
  return Math.min(Math.trunc(parsed), max)
}

export function handleGitHubError(error: unknown): never {
  if (error instanceof RequestError) {
    // Forward only the upstream status code. The RequestError message can
    // carry rate-limit and validation details, so log it server side and
    // return a fixed client-safe message rather than leaking it to the
    // anonymous caller.
    console.error('[github]', error.status, error.message)
    throw createError({
      status: error.status,
      statusText: 'GitHub API Error',
    })
  }
  // octokit.graphql throws a GraphqlResponseError (not a RequestError) when
  // GitHub answers a query with HTTP 200 but a top-level errors array, for
  // example a GraphQL rate limit or a field resolution error. Without this
  // branch it would collapse into the generic 500 below. The HTTP status is
  // 200 in this case, so forwarding it would be misleading. Return a fixed
  // 502 instead (a valid upstream returned an error payload) and log the
  // structured errors server side. The name check avoids a dual-package-copy
  // instanceof pitfall.
  if (error instanceof Error && error.name === 'GraphqlResponseError') {
    console.error(
      '[github]',
      'graphql',
      (error as { errors?: unknown }).errors,
    )
    throw createError({
      status: 502,
      statusText: 'GitHub API Error',
    })
  }
  // Log the original error server side but never copy raw internal
  // messages into the public response.
  console.error('[github]', error)
  throw createError({
    status: 500,
    statusText: 'Internal Server Error',
  })
}
