import type { BadgeType } from './Badge'
import type { DateType } from './Date'
import type { ExtendedPropsType } from './ExtendedProps'
import type { GraphType } from './Graph'
import type { IconType } from './Icon'
import type { SizeType } from './Size'

export interface CardItemType extends ExtendedPropsType {
  variant?: 'card' | 'article'
  size?: Exclude<SizeType, 'xsmall' & 'xlarge'> | 'full'
  alignment?: 'start' | 'center' | 'end'
  hover?: 'auto' | 'true' | 'false'
  cover?: string
  badge?: BadgeType
  loading?: boolean
  graphs?: GraphType
  date?: DateType
  icon?: IconType
}
