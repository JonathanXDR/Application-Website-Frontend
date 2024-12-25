import type { BadgeItemType } from '#shared/types/common/badge-item'
import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { ColorType } from '#shared/types/common/color'
import type { GraphType } from '#shared/types/common/graph'
import type { IconType } from '#shared/types/common/icon'
import type { ExtendedPropsType } from '~~/shared/types/common/extended-props'

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
  icon?: IconType & {
    background?: string
  }
}
