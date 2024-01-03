import type { ListRepoIssuesResponse } from '../GitHub/Issue'
import type { DateType } from './Date'

export type InfoType = {
  location?: string
  supervisor?: string
  department?: string

  language?: string
  license?: string
  forks?: number
  networks?: number
  watchers?: number
  stars?: number
  issues?: ListRepoIssuesResponse[]
  subscribers?: number
  date?: DateType
}
