import type { ItemType } from '#shared/types/common/item'

export interface InfoBanner {
  items: Extract<ItemType[], 'label' | 'links'>
  loading?: boolean
}
