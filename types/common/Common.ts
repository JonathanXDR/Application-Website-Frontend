import type { CardItemType } from './CardItem'
import type { RibbonBar } from './RibbonBar'
import type { SectionType } from './Section'
import type { ShareSheet } from './ShareSheet'

export type CommonComponents = {
  NavBar: SectionType[]
  RibbonBar: RibbonBar
  CardTile: CardItemType
  ShareSheet: ShareSheet
  FooterItem: {
    chooseYourLanguage: string
  }
}
