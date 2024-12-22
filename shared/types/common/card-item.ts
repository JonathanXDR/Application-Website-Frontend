import type { BadgeItemType } from '#shared/types/common/badge-item'
import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { ColorType } from '#shared/types/common/color'
import type { ExtendedPropertiesType } from '#shared/types/common/extended-properties'
import type { GraphType } from '#shared/types/common/graph'
import type { IconType } from '#shared/types/common/icon'

export interface CardItemType extends ExtendedPropertiesType {
  variant?: 'card' | 'article'
  componentSize?: BasicSizeType | 'full'
  colors?: ColorType
  alignment?: 'start' | 'center' | 'end'
  hover?: 'auto' | 'true' | 'false'
  cover?: string
  badge?: BadgeItemType
  loading?: boolean
  graphs?: GraphType
  icon?: IconType & {
    background?: string
  }
}
