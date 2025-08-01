import type { ColorType } from '#shared/types/common/color'
import type { ExtendedSizeType } from '#shared/types/common/extended-size'
import type { LinkItemType } from '#shared/types/components/link-item'

export interface BadgeItemType extends LinkItemType {
  variant?: keyof HTMLElementTagNameMap
  componentSize?: ExtendedSizeType
  colors?: ColorType
  border?: boolean
  hover?: boolean
  loading?: boolean
  onClick?: () => void
}
