import type { DateItemType } from '../common/date-item'
import type { ExtendedPropertiesType } from '../common/extended-properties'

export interface About extends ExtendedPropertiesType {
  eyebrow: string
  dates: DateItemType[]
}
