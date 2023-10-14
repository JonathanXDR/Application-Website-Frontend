import type { Link } from './Link'
import type { NavBarLink } from './NavBarLink'

export type CommonComponents = {
  NavBar: NavBarLink[]
  RibbonBar: {
    description: string
    links: Link[]
  }
  CardTile: {
    firstEncounter: string
    enhanced: string
  }
  ShareSheet: {
    links: Link[]
  }
  FooterItem: {
    chooseYourLanguage: string
  }
}
