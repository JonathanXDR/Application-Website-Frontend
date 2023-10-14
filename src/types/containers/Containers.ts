import type { ArticleItem } from '../common/ArticleItem'
import type { CardTile } from '../common/CardTile'
import type { LanguageBar } from '../common/LanguageBar'
import type { About } from './About'
import type { CommonContainers } from './Common'

export type Containers = {
  common: CommonContainers
  about: About
  languages: LanguageBar[]
  references: ArticleItem[]
  other: ArticleItem[]
  technologies: CardTile[]
  projects: ArticleItem[]
}
