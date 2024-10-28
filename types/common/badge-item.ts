import type { ColorType } from "~~/types/common/color";
import type { ExtendedSizeType } from "~~/types/common/extended-size";
import type { LinkType } from "~~/types/common/link";

export interface BadgeItemType extends LinkType {
  variant?: keyof HTMLElementTagNameMap;
  componentSize?: ExtendedSizeType;
  colors?: ColorType;
  border?: boolean;
  hover?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
