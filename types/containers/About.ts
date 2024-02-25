import type { DateItemType } from '../common/DateItem'
import type { CardItemType } from '../common/ExtendedProps'

export interface About extends CardItemType {
  eyebrow: string
  dates: DateItemType[]
}
