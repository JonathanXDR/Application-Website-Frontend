import type {
  BasicSizeType,
  ColorType,
  ExtendedPropsType,
} from '#shared/types/schemas'
import type { BadgeItemType } from '#shared/types/components/badge-item'
import type { IconItemType } from '#shared/types/components/icon-item'
import type { InfoBarType } from '#shared/types/components/info-bar'

interface GraphType {
  donut: boolean
  bar: boolean
}

export interface CardItemType extends Omit<
  ExtendedPropsType,
  'icon' | 'info' | 'badges'
> {
  icon?: IconItemType & { background?: string }
  info?: InfoBarType
  badges?: BadgeItemType[]
  variant?: 'card' | 'article'
  componentSize?: BasicSizeType | 'full'
  colors?: ColorType
  alignment?: 'start' | 'center' | 'end'
  hover?: boolean | 'auto'
  cover?: string
  badge?: BadgeItemType
  loading?: boolean
  graphs?: GraphType
}
