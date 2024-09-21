import type { BasicPropertiesType } from './basic-properties'
import type { InfoType } from './info'

export interface ExtendedPropertiesType extends BasicPropertiesType {
  badges?: string[]
  info?: InfoType
}
