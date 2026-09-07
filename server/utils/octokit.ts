import { Octokit, RequestError } from 'octokit'
import { GraphqlResponseError } from '@octokit/graphql'
import type { H3Event } from 'h3'

export const GITHUB_API_VERSION = '2026-03-10'

export const GITHUB_CACHE_MAX_AGE = 60 * 15

// Octokit's fetch has no default timeout, so a stalled connection would park
// an SSR render or a prerender pass until the platform build timeout.
const GITHUB_REQUEST_TIMEOUT_MS = 10_000

let octokit: Octokit | undefined

export function useOctokit() {
  // The token never changes at runtime, so the client is built once
  if (!octokit) {
    const { githubToken } = useRuntimeConfig()
    octokit = new Octokit({
      auth: githubToken,
      userAgent: 'jonathan-russ-website',
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION,
      },
      request: {
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
      // Octokit auto-loads the retry and throttling plugins: retry re-issues
      // 5xx and timeout responses three times with backoff, and throttling
      // sleeps until the rate-limit reset, either of which can park an SSR
      // render or a prerender pass for tens of seconds. Failing at once lets
      // the page fall back to its loading and empty states while the SWR
      // cache serves the last good payload.
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

// The upper bound keeps deep pagination from walking far into the owner's
// history on the token's quota.
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

export function getListQuery(event: H3Event, perPageFallback = 30) {
  const query = getQuery(event)
  return {
    perPage: clampPerPage(query.per_page, perPageFallback),
    page: clampPage(query.page),
  }
}

export function handleGitHubError(error: unknown): never {
  if (isError(error)) throw error

  if (error instanceof RequestError) {
    // The message can carry rate-limit and validation detail, so it stays
    // out of the response.
    console.error('[github]', error.status, error.message)
    throw createError(mapUpstreamStatus(error.status, 'GitHub API Error'))
  }
  // `octokit.graphql` throws `GraphqlResponseError`, not `RequestError`, when
  // GitHub answers HTTP 200 with a top-level errors array, such as a GraphQL
  // rate limit. Forwarding the 200 would be misleading, so it becomes a 502.
  if (error instanceof GraphqlResponseError) {
    console.error('[github]', 'graphql', error.errors)
    throw createError({ status: 502, statusText: 'GitHub API Error' })
  }
  console.error('[github]', error)
  throw createError({ status: 500, statusText: 'Internal Server Error' })
}
