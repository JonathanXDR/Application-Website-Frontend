import type { ArticleItem } from '../common/ArticleItem'
import type { CardTile } from '../common/CardTile'

export type Technologies = ArticleItem & {
  technologies: CardTile[]
}
