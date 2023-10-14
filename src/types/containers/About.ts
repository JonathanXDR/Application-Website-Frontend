import type { DateItem } from '../common/DateItem'
import type { Link } from '../common/Link'

export type About = {
  eyebrow: string
  title: string
  description: string
  links: Link[]
  dates: DateItem[]
}
