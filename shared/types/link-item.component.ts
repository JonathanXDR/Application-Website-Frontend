import type { IconItemType } from './icon-item.component'

export interface LinkItemType {
  title: string
  url?: string
  icon?: IconItemType
  loading?: boolean
}
