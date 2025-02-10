import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { ColorType } from '#shared/types/common/color'
import type { ExtendedPropsType } from '#shared/types/common/extended-props'
import type { BadgeItemType } from '#shared/types/components/badge-item'
import type { IconItemType } from '#shared/types/components/icon-item'

interface GraphType {
  donut: boolean
  bar: boolean
}

export interface CardItemType extends ExtendedPropsType {
  variant?: 'card' | 'article'
  componentSize?: BasicSizeType | 'full'
  colors?: ColorType
  alignment?: 'start' | 'center' | 'end'
  hover?: boolean | 'auto'
  cover?: string
  badge?: BadgeItemType
  loading?: boolean
  graphs?: GraphType
  icon?: IconItemType & { background?: string }
}
