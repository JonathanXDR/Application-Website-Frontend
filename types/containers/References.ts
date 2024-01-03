import type { CardItemType } from '../common/CardItem'

export type References = CardItemType & {
  references: CardItemType[]
}
