import { Octokit, RequestError } from 'octokit'

export const GITHUB_API_VERSION = '2026-03-10'

export function useOctokit() {
  const { githubToken } = useRuntimeConfig()
  return new Octokit({
    auth: githubToken,
    headers: {
      'X-GitHub-Api-Version': GITHUB_API_VERSION,
    },
  })
}

export function handleGitHubError(error: unknown): never {
  if (error instanceof RequestError) {
    throw createError({
      status: error.status,
      statusMessage: error.message,
    })
  }
  throw createError({
    status: 500,
    statusMessage:
      error instanceof Error ? error.message : 'Internal Server Error',
  })
}
