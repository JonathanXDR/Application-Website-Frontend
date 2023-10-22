import type { CardTileType } from './CardTile'
import type { RibbonBar } from './RibbonBar'
import type { SectionType } from './Section'
import type { ShareSheet } from './ShareSheet'

export type CommonComponents = {
  NavBar: SectionType[]
  RibbonBar: RibbonBar
  CardTile: CardTileType
  ShareSheet: ShareSheet
  FooterItem: {
    chooseYourLanguage: string
  }
}
