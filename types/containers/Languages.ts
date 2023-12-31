import type { ArticleItemType } from "../common/ArticleItem";
import type { LanguageBarType } from "../common/LanguageBar";

export type Languages = ArticleItemType & {
  languages: LanguageBarType[];
};
