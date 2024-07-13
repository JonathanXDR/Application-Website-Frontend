import { Octokit } from 'octokit'
import type {
  GetOwnerRepository,
  GetOwnerRepositoryParameters
} from '~/types/services/GitHub/Repository'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetOwnerRepositoryParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetOwnerRepository
  } catch (error) {
    console.error(`Error fetching repository for owner ${params.owner}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch repository for owner ${params.owner}`
    })
  }
})
