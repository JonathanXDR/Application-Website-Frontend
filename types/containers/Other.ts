import type { ArticleItemType } from "../common/ArticleItem";

export type Other = ArticleItemType & {
  other: ArticleItemType[];
};
