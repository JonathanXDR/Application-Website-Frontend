import type { BadgeItemType } from './badge-item.component'
import type { BasicSizeType } from './basic-size.common'
import type { ColorType } from './color.common'
import type { ExtendedPropsType } from './extended-props.common'
import type { IconItemType } from './icon-item.component'

interface GraphType {
  donut: boolean
  bar: boolean
}

export interface CardItemType extends ExtendedPropsType {
  variant?: 'card' | 'article'
  componentSize?: BasicSizeType | 'full'
  colors?: ColorType
  alignment?: 'start' | 'center' | 'end'
  hover?: boolean | 'auto'
  cover?: string
  badge?: BadgeItemType
  loading?: boolean
  graphs?: GraphType
  icon?: IconItemType & { background?: string }
}
