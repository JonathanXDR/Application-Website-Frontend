import type { GetRepositoryIssues } from '../GitHub/Issue'
import type { DateType } from './Date'

export interface InfoType {
  [key: string]: any
  location?: string
  supervisor?: string
  department?: string

  language?: string
  license?: string
  forks?: number
  networks?: number
  watchers?: number
  stars?: number
  issues?: GetRepositoryIssues[]
  subscribers?: number
  date?: DateType
}
