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

export function handleGitHubError(error: unknown): never {
  if (error instanceof RequestError) {
    throw createError({
      status: error.status,
      statusMessage: error.message,
    })
  }
  // Log the original error server side but never copy raw internal
  // messages into the public response.
  console.error('[github]', error)
  throw createError({
    status: 500,
    statusMessage: 'Internal Server Error',
  })
}
