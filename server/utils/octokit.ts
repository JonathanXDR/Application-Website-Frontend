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
// prerender pass until the platform build timeout. With the retry plugin
// disabled below, the abort fails the request on its first attempt and falls
// through handleGitHubError into the page's loading and empty states.
const GITHUB_REQUEST_TIMEOUT_MS = 10_000

let octokit: Octokit | undefined

export function useOctokit() {
  // Module-scope singleton. The token never changes at runtime, and
  // reusing one client keeps connection pooling across requests.
  if (!octokit) {
    const { githubToken } = useRuntimeConfig()
    octokit = new Octokit({
      auth: githubToken,
      // Prepended to Octokit's own `octokit.js/x Node.js/y` agent string.
      // GitHub recommends a descriptive User-Agent and uses it for
      // abuse-detection heuristics and support, so the app stays identifiable.
      userAgent: 'jonathan-russ-website',
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      },
      request: {
        // Bound every REST and GraphQL request with a deterministic timeout.
        // Honor an Octokit-supplied signal if one is ever passed, otherwise
        // abort on our own timeout.
        fetch: (
          url: Parameters<typeof globalThis.fetch>[0],
          init?: Parameters<typeof globalThis.fetch>[1],
        ) =>
          globalThis.fetch(url, {
            ...init,
            signal: init?.signal ?? AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
          }),
      },
      // Fail fast on every error. Octokit auto-loads both the retry and the
      // throttling plugins. The retry plugin otherwise re-issues 5xx and
      // timeout responses three times with backoff, and the throttle plugins
      // sleep until the rate-limit reset, either of which can park an SSR
      // render or a prerender pass for tens of seconds. Disabling retry and
      // returning false from both throttle hooks makes a failed request throw
      // at once so the calling page falls back to its loading and empty states.
      // The SWR cache keeps serving the last good payload meanwhile.
      retry: { enabled: false },
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

// Normalizes the `per_page` query param. A cached route calls this from both
// its handler and its `getKey`, so the clamp and fallback live in one place
// and the cache key can never drift from the value actually sent upstream.
export function getPerPage(event: H3Event, fallback = 30) {
  return clampPerPage(getQuery(event).per_page, fallback)
}

// Normalizes `per_page` and `page` together for the paginated list routes,
// for the same single-source reason as getPerPage.
export function getListQuery(event: H3Event, perPageFallback = 30) {
  const query = getQuery(event)
  return {
    perPage: clampPerPage(query.per_page, perPageFallback),
    page: clampPage(query.page),
  }
}

export function handleGitHubError(error: unknown): never {
  // An H3Error we threw ourselves (such as a route's own 404 guard) must pass
  // through unchanged rather than being reclassified by the branches below.
  if (isError(error)) throw error

  if (error instanceof RequestError) {
    // Log the upstream status and message server side, then map the status for
    // the client: a rate-limit or auth failure reflects our token state, not
    // the caller's request, so it is not forwarded verbatim. The message can
    // carry rate-limit and validation detail, so the client only sees the
    // fixed text.
    console.error('[github]', error.status, error.message)
    throw createError(mapUpstreamStatus(error.status, 'GitHub API Error'))
  }
  // octokit.graphql throws a GraphqlResponseError (not a RequestError) when
  // GitHub answers a query with HTTP 200 but a top-level errors array, for
  // example a GraphQL rate limit or a field resolution error. The HTTP status
  // is 200, so forwarding it would be misleading. Return a fixed 502 instead
  // (a valid upstream returned an error payload) and log the structured errors
  // server side.
  if (error instanceof GraphqlResponseError) {
    console.error('[github]', 'graphql', error.errors)
    throw createError({ status: 502, statusText: 'GitHub API Error' })
  }
  // Log the original error server side but never copy raw internal
  // messages into the public response.
  console.error('[github]', error)
  throw createError({ status: 500, statusText: 'Internal Server Error' })
}
