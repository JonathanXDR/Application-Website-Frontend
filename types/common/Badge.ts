import type { ColorType } from './Color'
import type { LinkType } from './Link'

export interface BadgeType extends LinkType {
  variant?: keyof HTMLElementTagNameMap
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  colors?: ColorType
  border?: boolean
  hover?: boolean
  loading?: boolean
  onClick?: () => void
}
