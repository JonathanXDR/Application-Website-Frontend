import type { ColorType } from '#shared/types/common/color'
import type { ExtendedSizeType } from '#shared/types/common/extended-size'
import type { LinkType } from '#shared/types/common/link'

export interface BadgeItemType extends LinkType {
  variant?: keyof HTMLElementTagNameMap
  componentSize?: ExtendedSizeType
  colors?: ColorType
  border?: boolean
  hover?: boolean
  loading?: boolean
  onClick?: () => void
}
