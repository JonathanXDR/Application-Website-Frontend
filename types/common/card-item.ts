import type { BadgeItemType } from "./badge-item";
import type { BasicSizeType } from "./basic-size";
import type { ColorType } from "./color";
import type { ExtendedPropertiesType } from "./extended-properties";
import type { GraphType } from "./graph";
import type { IconType } from "./icon";

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
