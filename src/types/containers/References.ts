import type { ArticleItem } from '../common/ArticleItem'

export type References = ArticleItem & {
  references: ArticleItem[]
}
