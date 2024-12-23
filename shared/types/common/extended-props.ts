import type { BadgeItemType } from '#shared/types/common/badge-item'
import type { BasicPropsType } from '#shared/types/common/basic-props'
import type { InfoType } from '#shared/types/common/info'

export interface ExtendedPropsType extends BasicPropsType {
  badges?: BadgeItemType[]
  info?: InfoType
}
