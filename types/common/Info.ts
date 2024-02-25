import type { ListRepoIssuesResponse } from '../GitHub/Issue'
import type { DateType } from './Date'

export interface InfoType {
  location?: string
  supervisor?: string
  department?: string

  language?: string
  license?: string
  forks?: number
  networks?: number
  watchers?: number
  stars?: number
  issues?: ListRepoIssuesResponse[] | number
  subscribers?: number
  date?: DateType
}
