import type { ArticleItemType } from '../common/ArticleItem'
import type { DateItemType } from '../common/DateItem'

export type About = ArticleItemType & {
  eyebrow: string
  dates: DateItemType[]
}
