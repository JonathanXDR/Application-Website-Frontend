import type { BasicPropsType as BasicPropertiesType } from './BasicProps'
import type { InfoType } from './Info'

export interface ExtendedPropertiesType extends BasicPropertiesType {
  badges?: string[]
  info?: InfoType
}
