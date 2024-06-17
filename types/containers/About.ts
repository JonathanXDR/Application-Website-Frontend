import type { DateItemType } from '../common/DateItem'
import type { ExtendedPropsType } from '../common/ExtendedProps'

export interface About extends ExtendedPropsType {
  eyebrow: string
  dates: DateItemType[]
}
