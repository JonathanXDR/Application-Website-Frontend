import type { ArticleItemType } from './ArticleItem'

export type CardTileType = ArticleItemType & {
  progress: number
  firstEncounter: string
  enhanced: string
  color1: string
  color2: string
}
