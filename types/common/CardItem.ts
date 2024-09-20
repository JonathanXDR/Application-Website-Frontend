import type { BadgeType } from "./Badge";
import type { BasicSizeType } from "./BasicSize";
import type { ColorType } from "./Color";
import type { ExtendedPropsType as ExtendedPropertiesType } from "./ExtendedProps";
import type { GraphType } from "./Graph";
import type { IconType } from "./Icon";

export interface CardItemType extends ExtendedPropertiesType {
  variant?: "card" | "article";
  componentSize?: BasicSizeType | "full";
  colors?: ColorType;
  alignment?: "start" | "center" | "end";
  hover?: "auto" | "true" | "false";
  cover?: string;
  badge?: BadgeType;
  loading?: boolean;
  graphs?: GraphType;
  icon?: IconType;
}
