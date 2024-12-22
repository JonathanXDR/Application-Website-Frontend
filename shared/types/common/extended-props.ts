import type { BasicPropsType } from '#shared/types/common/basic-props'
import type { InfoType } from '#shared/types/common/info'

export interface ExtendedPropsType extends BasicPropsType {
  badges?: string[]
  info?: InfoType
}
