import type { ArticleItemType } from "../common/ArticleItem";
import type { CardTileType } from "../common/CardTile";

export type Technologies = ArticleItemType & {
  technologies: CardTileType[];
};
