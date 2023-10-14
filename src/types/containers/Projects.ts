import type { ArticleItem } from '../common/ArticleItem'

export type Projects = ArticleItem & {
  projects: ArticleItem[]
}
