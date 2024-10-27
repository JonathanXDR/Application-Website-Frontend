import type { CardItemType } from "./card-item";
import type { RibbonBar } from "./ribbon-bar";
import type { SectionType } from "./section";
import type { ShareSheet } from "./share-sheet";

export interface CommonComponents {
  NavBar: SectionType[];
  RibbonBar: RibbonBar;
  CardItem: CardItemType;
  ShareSheet: ShareSheet;
  FooterItem: {
    chooseYourLanguage: string;
  };
}
