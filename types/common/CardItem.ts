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

export interface Test {
  variant?: 'card' | 'article'
  componentSize?: 'small' | 'medium' | 'large' | 'full'
  alignment?: 'start' | 'center' | 'end'
  hover?: 'auto' | 'true' | 'false'
  cover?: string
  badge?: {
    variant?: keyof HTMLElementTagNameMap
    componentSize?: 'small' | 'medium' | 'large' | 'full' | 'xsmall' | 'xlarge'
    colors?: {
      primary?: string
      secondary?: string
      tertiary?: string
    }
    border?: boolean
    hover?: boolean
    loading?: boolean
    onClick?: () => void
  }
  loading?: boolean
  graphs?: {
    donut: boolean
    bar: boolean
  }
  date?: {
    date?: string | null | Date
    formatOptions: () => Intl.DateTimeFormatOptions
    nowKey?: 'created' | 'updated'
    duration?: {
      from?: string
      to?: string
    }
  }
  icon?: {
    name: string
    variant?: 'default' | 'outline' | 'fill' | 'custom'
    componentSize?: 'small' | 'medium' | 'large'
    colors?: {
      primary?: string
      secondary?: string
      tertiary?: string
    }

    loading?: boolean
    absolute?: boolean
    position?: 'top' | 'right' | 'bottom' | 'left'
    alignment?: 'start' | 'center' | 'end'
  }
}
