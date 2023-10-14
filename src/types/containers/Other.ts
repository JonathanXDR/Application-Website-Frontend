import type { ArticleItem } from '../common/ArticleItem'

export type Other = ArticleItem & {
  other: ArticleItem[]
}
