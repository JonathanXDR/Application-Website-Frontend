import type { IconItemType } from '#shared/types/components/icon-item'

export interface LinkItemType {
  title: string
  url?: string
  icon?: IconItemType
  loading?: boolean
}
