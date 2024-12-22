import type { DateItemType } from '#shared/types/common/date-item'
import type { ExtendedPropsType } from '~~/shared/types/common/extended-props'

export interface About extends ExtendedPropsType {
  eyebrow: string
  dates: DateItemType[]
}
