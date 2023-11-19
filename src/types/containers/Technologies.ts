import type { CardItemType } from '../common/CardItem'
import type { CardTileType } from '../common/CardTile'

export type Technologies = CardItemType & {
  technologies: CardTileType[]
}
