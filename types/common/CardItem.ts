import type { ExtendedPropsType } from './ExtendedProps'
import type { SizeType } from './Size'
import type { BadgeType } from './Badge'

export interface CardItemType extends ExtendedPropsType {
  variant?: 'card' | 'article'
  size?: Omit<SizeType, 'xsmall' & 'xlarge'> | 'full'
  alignment?: 'start' | 'center' | 'end'
  hover?: 'auto' | 'true' | 'false'
  cover?: string
  badge?: BadgeType
  graphs?: {
    donut?: boolean
    bar?: boolean
  }
  date?: {
    formatOptions: Intl.DateTimeFormatOptions
    nowKey: 'created' | 'updated'
  }
}
