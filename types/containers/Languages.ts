import type { CardItemType } from "../common/CardItem";
import type { LanguageBarType } from "../common/LanguageBar";

export type Languages = CardItemType & {
  languages: LanguageBarType[];
};
