import type { CardTile } from './CardTile'
import type { NavBarLink } from './NavBarLink'
import type { RibbonBar } from './RibbonBar'
import type { ShareSheet } from './ShareSheet'

export type CommonComponents = {
  NavBar: NavBarLink[]
  RibbonBar: RibbonBar
  CardTile: CardTile
  ShareSheet: ShareSheet
  FooterItem: {
    chooseYourLanguage: string
  }
}
