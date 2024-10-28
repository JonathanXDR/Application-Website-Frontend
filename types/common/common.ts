import type { CardItemType } from "~~/types/common/card-item";
import type { RibbonBar } from "~~/types/common/ribbon-bar";
import type { SectionType } from "~~/types/common/section";
import type { ShareSheet } from "~~/types/common/share-sheet";

export interface CommonComponents {
  NavBar: SectionType[];
  RibbonBar: RibbonBar;
  CardItem: CardItemType;
  ShareSheet: ShareSheet;
  FooterItem: {
    chooseYourLanguage: string;
  };
}
