import type {
  ColorType,
  ExtendedSizeType,
  LinkItemType,
} from '#shared/types/schemas'

export interface BadgeItemType extends LinkItemType {
  variant?: keyof HTMLElementTagNameMap
  componentSize?: ExtendedSizeType
  colors?: ColorType
  border?: boolean
  hover?: boolean
  loading?: boolean
  onClick?: () => void
}
