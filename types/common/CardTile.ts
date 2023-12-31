import type { ArticleItemType } from "./ArticleItem";

export type CardTileType = ArticleItemType & {
  progress: number;
  learned: string;
  enhanced: string;
  color1: string;
  color2: string;
};
