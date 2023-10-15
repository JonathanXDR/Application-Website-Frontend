import type { CardTileType } from './CardTile'
import type { NavBarLinkType } from './NavBarLink'
import type { RibbonBar } from './RibbonBar'
import type { ShareSheet } from './ShareSheet'

export type CommonComponents = {
  NavBar: NavBarLinkType[]
  RibbonBar: RibbonBar
  CardTile: CardTileType
  ShareSheet: ShareSheet
  FooterItem: {
    chooseYourLanguage: string
  }
}
