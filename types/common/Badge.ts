import type { ColorType } from './Color'
import type { LinkType } from './Link'

export interface BadgeType extends LinkType {
  variant?: keyof HTMLElementTagNameMap
  size?: 'small' | 'medium' | 'large'
  colors?: ColorType
  border?: boolean
  hover?: boolean
}
