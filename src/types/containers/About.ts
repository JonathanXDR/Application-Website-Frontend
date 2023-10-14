import type { ArticleItem } from '../common/ArticleItem'
import type { DateItem } from '../common/DateItem'

export type About = ArticleItem & {
  eyebrow: string
  dates: DateItem[]
}
