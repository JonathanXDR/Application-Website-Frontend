import type { BadgeItemType } from './badge-item.component'
import type { BasicPropsType } from './basic-props.common'
import type { InfoBarType } from './info-bar.component'

export interface ExtendedPropsType extends BasicPropsType {
  badges?: BadgeItemType[]
  info?: InfoBarType
}
