import type { ExtendedPropertiesType } from "~~/types/common/extended-properties";
import type { LanguageBarType } from "~~/types/common/language-bar";

export interface Languages extends ExtendedPropertiesType {
  languages: LanguageBarType[];
}
