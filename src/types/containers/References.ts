import type { ArticleItemType } from '../common/ArticleItem'

export type References = ArticleItemType & {
  references: ArticleItemType[]
}
