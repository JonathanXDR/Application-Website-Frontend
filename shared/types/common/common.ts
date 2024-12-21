import type { CardItemType } from '#shared/types/common/card-item'
import type { RotatingBanner } from '#shared/types/common/rotating-banner'
import type { SectionType } from '#shared/types/common/section'
import type { ShareSheet } from '#shared/types/common/share-sheet'

export interface CommonComponents {
  NavBar: SectionType[]
  RotatingBanner: RotatingBanner
  CardItem: CardItemType
  ShareSheet: ShareSheet
  FooterItem: {
    chooseYourLanguage: string
  }
}
