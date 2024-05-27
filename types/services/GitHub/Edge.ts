export type PinnedRepositoryEdge = {
  name: string
  description: string
  url: string
  repositoryTopics: {
    nodes: {
      topic: {
        name: string
      }
    }[]
  }
  primaryLanguage?: {
    color: string
    name: string
  }
  licenseInfo?: {
    name: string
    nickname: string
    url: string
  }
  forks: {
    nodes: {
      url: string
    }[]
  }
  stargazers: {
    nodes: {
      url: string
    }[]
  }
  issues: {
    nodes: {
      closed: boolean
      url: string
    }[]
  }
  pullRequests: {
    nodes: {
      closed: boolean
      url: string
    }[]
  }
  updatedAt: string
}
