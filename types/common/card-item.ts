import type { BadgeItemType } from "~~/types/common/badge-item";
import type { BasicSizeType } from "~~/types/common/basic-size";
import type { ColorType } from "~~/types/common/color";
import type { ExtendedPropertiesType } from "~~/types/common/extended-properties";
import type { GraphType } from "~~/types/common/graph";
import type { IconType } from "~~/types/common/icon";

export interface CardItemType extends ExtendedPropertiesType {
  variant?: "card" | "article";
  componentSize?: BasicSizeType | "full";
  colors?: ColorType;
  alignment?: "start" | "center" | "end";
  hover?: "auto" | "true" | "false";
  cover?: string;
  badge?: BadgeItemType;
  loading?: boolean;
  graphs?: GraphType;
  icon?: IconType;
}
