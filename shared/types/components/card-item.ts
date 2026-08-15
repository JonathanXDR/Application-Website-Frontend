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

// Component card prop. It layers the render-rich versions of `icon`,
// `info`, and `badges` over the derived content shape: section components
// add fields the content schema does not carry, such as `icon.position`,
// the date formatter on `info`, and badge click handlers. Those fields
// force the component variants (`IconItemType`, `InfoBarType`,
// `BadgeItemType`) in place of the plain content atoms.
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
