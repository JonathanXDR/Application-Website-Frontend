import type { ColorType } from './Color'
import type { IconType } from './Icon'

export interface BadgeType {
  icon?: IconType
  title: string
  size?: 'small' | 'medium' | 'large'
  colors?: ColorType
  border?: boolean
  hover?: boolean
}
