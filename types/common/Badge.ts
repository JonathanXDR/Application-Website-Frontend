import type { ColorType } from './Color'
import type { LinkType } from './Link'
import type { SizeType } from './Size'

export interface BadgeType extends LinkType {
  variant?: keyof HTMLElementTagNameMap
  size?: SizeType
  colors?: ColorType
  border?: boolean
  hover?: boolean
  loading?: boolean
  onClick?: () => void
}
