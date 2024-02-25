import type { ExtendedPropsType } from './ExtendedProps'

export interface CardItemType extends ExtendedPropsType {
  variant?: 'card' | 'article'
  size?: 'small' | 'medium' | 'large' | 'full'
  alignment?: 'start' | 'center' | 'end'
  hover?: 'auto' | 'true' | 'false'
  cover?: string
  graphs?: {
    donut?: boolean
    bar?: boolean
  }
  date?: {
    formatOptions: Intl.DateTimeFormatOptions
    nowKey: 'created' | 'updated'
  }
}
