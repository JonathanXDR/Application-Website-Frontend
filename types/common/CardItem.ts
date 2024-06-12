import type { BadgeType } from './Badge'
import type { BasicSizeType } from './BasicSize'
import type { DateType } from './Date'
import type { ExtendedPropsType } from './ExtendedProps'
import type { GraphType } from './Graph'
import type { IconType } from './Icon'

export interface CardItemType extends ExtendedPropsType {
  variant?: 'card' | 'article'
  componentSize?: BasicSizeType | 'full'
  alignment?: 'start' | 'center' | 'end'
  hover?: 'auto' | 'true' | 'false'
  cover?: string
  badge?: BadgeType
  loading?: boolean
  graphs?: GraphType
  date?: DateType
  icon?: IconType
}
