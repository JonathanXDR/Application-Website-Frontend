import type { ColorType } from "./color";
import type { ExtendedSizeType } from "./extended-size";
import type { LinkType } from "./link";

export interface BadgeItemType extends LinkType {
  variant?: keyof HTMLElementTagNameMap;
  componentSize?: ExtendedSizeType;
  colors?: ColorType;
  border?: boolean;
  hover?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
