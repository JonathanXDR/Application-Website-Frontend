import { Octokit } from 'octokit'
import type {
  GetRepositoryTags,
  GetRepositoryTagsParameters
} from '~/types/services/GitHub/Tag'

export default defineEventHandler(async event => {
  const { githubToken } = useRuntimeConfig()
  const params = getQuery(event) as GetRepositoryTagsParameters
  const octokit = new Octokit({ auth: githubToken })

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
      ...params,
      headers: { accept: 'application/vnd.github+json' }
    })
    return response.data as GetRepositoryTags
  } catch (error) {
    console.error(`Error fetching tags for repository ${params.repo}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch tags for repository ${params.repo}`
    })
  }
})
