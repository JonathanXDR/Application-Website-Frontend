import type { ColorType } from './color.common'
import type { ExtendedSizeType } from './extended-size.common'
import type { LinkItemType } from './link-item.component'

export interface BadgeItemType extends LinkItemType {
  variant?: keyof HTMLElementTagNameMap
  componentSize?: ExtendedSizeType
  colors?: ColorType
  border?: boolean
  hover?: boolean
  loading?: boolean
  onClick?: () => void
}
