import { Octokit, RequestError } from 'octokit'
import { GraphqlResponseError } from '@octokit/graphql'
import type { H3Event } from 'h3'

export const GITHUB_API_VERSION = '2026-03-10'

// Cache time for GitHub-backed endpoints. Repository metadata changes
// rarely, and caching keeps the PAT's request quota away from visitor
// traffic while letting prerender and warm instances respond instantly.
export const GITHUB_CACHE_MAX_AGE = 60 * 15

// Upper bound on a single GitHub request. Octokit's fetch has no default
// timeout, so without this a stalled connection would park an SSR render or a
// prerender pass until the platform build timeout. The retry plugin is
// disabled below, so the abort fails the request on its first attempt.
const GITHUB_REQUEST_TIMEOUT_MS = 10_000

let octokit: Octokit | undefined

export function useOctokit() {
  // The token never changes at runtime, and reusing one client keeps
  // connection pooling across requests.
  if (!octokit) {
    const { githubToken } = useRuntimeConfig()
    octokit = new Octokit({
      auth: githubToken,
      // Prepended to Octokit's own `octokit.js/x Node.js/y` agent string.
      // GitHub feeds the User-Agent into its abuse-detection heuristics and
      // asks that the app stay identifiable.
      userAgent: 'jonathan-russ-website',
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      },
      request: {
        // Bounds every REST and GraphQL request, honoring an
        // Octokit-supplied signal if one is ever passed.
        fetch: (
          url: Parameters<typeof globalThis.fetch>[0],
          init?: Parameters<typeof globalThis.fetch>[1],
        ) =>
          globalThis.fetch(url, {
            ...init,
            signal:
              init?.signal ?? AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
          }),
      },
      // Fail fast on every error. Octokit auto-loads the retry and throttling
      // plugins: retry re-issues 5xx and timeout responses three times with
      // backoff, and throttling sleeps until the rate-limit reset, either of
      // which can park an SSR render or a prerender pass for tens of seconds.
      // Disabling retry and returning false from both throttling hooks makes
      // a failed request throw at once, so the page falls back to its loading
      // and empty states while the SWR cache serves the last good payload.
      retry: { enabled: false },
      throttle: {
        onRateLimit: () => false,
        onSecondaryRateLimit: () => false,
      },
    })
  }
  return octokit
}

// Pinning the owner server side stops visitors from turning these endpoints
// into a generic GitHub proxy that burns the token's quota.
export function useGitHubRepoCoordinates() {
  const { githubRepoOwner, githubRepoName } = useRuntimeConfig().public
  return { owner: githubRepoOwner, repo: githubRepoName }
}

export function clampPerPage(value: unknown, fallback = 30) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(Math.trunc(parsed), 1), 100)
}

// GitHub paginates from 1. The upper bound keeps deep pagination from walking
// far into the owner's history on the token's quota.
export function clampPage(value: unknown, fallback = 1, max = 50) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 1) return fallback
  return Math.min(Math.trunc(parsed), max)
}

// A cached route calls this from both its handler and its `getKey`, so the
// cache key can never drift from the value actually sent upstream.
export function getPerPage(event: H3Event, fallback = 30) {
  return clampPerPage(getQuery(event).per_page, fallback)
}

// Normalizes both params for the paginated list routes, single-sourced the
// same way as `getPerPage`.
export function getListQuery(event: H3Event, perPageFallback = 30) {
  const query = getQuery(event)
  return {
    perPage: clampPerPage(query.per_page, perPageFallback),
    page: clampPage(query.page),
  }
}

export function handleGitHubError(error: unknown): never {
  // An `H3Error` we threw ourselves (such as a route's own 404 guard) must
  // pass through unchanged rather than being reclassified below.
  if (isError(error)) throw error

  if (error instanceof RequestError) {
    // The message can carry rate-limit and validation detail, so it is logged
    // server side and the client only ever sees the fixed text.
    console.error('[github]', error.status, error.message)
    throw createError(mapUpstreamStatus(error.status, 'GitHub API Error'))
  }
  // `octokit.graphql` throws `GraphqlResponseError`, not `RequestError`, when
  // GitHub answers with HTTP 200 and a top-level errors array, such as a
  // GraphQL rate limit or a field resolution error. Forwarding the 200 would
  // be misleading, so a valid upstream returning an error payload is a 502.
  if (error instanceof GraphqlResponseError) {
    console.error('[github]', 'graphql', error.errors)
    throw createError({ status: 502, statusText: 'GitHub API Error' })
  }
  // Never copy a raw internal message into the public response.
  console.error('[github]', error)
  throw createError({ status: 500, statusText: 'Internal Server Error' })
}
