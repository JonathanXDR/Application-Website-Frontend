import type { ArticleItem } from './ArticleItem'

export type CardTile = ArticleItem & {
  progress: number
  firstEncounter: string
  enhanced: string
  color1: string
  color2: string
}
