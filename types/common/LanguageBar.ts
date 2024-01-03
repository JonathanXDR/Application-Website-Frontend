import type { CardItemType } from "./CardItem";

export type LanguageBarType = CardItemType & {
  progress: string;
  badge?: string;
  status?: string[];
};
