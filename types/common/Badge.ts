import type { ColorType } from './Color'
import type { LinkType } from './Link'
import type { SizeType } from './Size'

export interface BadgeType extends LinkType {
  variant?: keyof HTMLElementTagNameMap
  size?: Omit<SizeType, 'xsmall' & 'xlarge'>
  colors?: ColorType
  border?: boolean
  hover?: boolean
  onClick?: () => void
}
