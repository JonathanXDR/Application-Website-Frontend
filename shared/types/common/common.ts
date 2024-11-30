import type { CardItemType } from '#shared/types/common/card-item'
import type { RibbonBar } from '#shared/types/common/ribbon-bar'
import type { SectionType } from '#shared/types/common/section'
import type { ShareSheet } from '#shared/types/common/share-sheet'

export interface CommonComponents {
  NavBar: SectionType[]
  RibbonBar: RibbonBar
  CardItem: CardItemType
  ShareSheet: ShareSheet
  FooterItem: {
    chooseYourLanguage: string
  }
}
