import type { ArticleItem } from '../common/ArticleItem'
import type { LanguageBar } from '../common/LanguageBar'

export type Languages = ArticleItem & {
  languages: LanguageBar[]
}
