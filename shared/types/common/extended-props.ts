import type { BasicPropsType } from '#shared/types/common/basic-props'
import type { BadgeItemType } from '#shared/types/components/badge-item'
import type { InfoBarType } from '#shared/types/components/info-bar'

export interface ExtendedPropsType extends BasicPropsType {
  badges?: BadgeItemType[]
  info?: InfoBarType
}
