import { Octokit } from 'octokit'
import type {
  GetPublicRepositories,
  GetPublicRepositoriesParameters
} from '~/types/services/GitHub/Repository'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetPublicRepositoriesParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /repositories', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetPublicRepositories
  } catch (error) {
    console.error('Error fetching public repositories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch public repositories'
    })
  }
})
