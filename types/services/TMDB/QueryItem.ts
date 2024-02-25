import type { MediaType } from './Media'

export interface QueryItem {
  type: MediaType
  title: string
  query: string
}
