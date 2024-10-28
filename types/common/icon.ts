import type { BasicSizeType } from "~~/types/common/basic-size";
import type { ColorType } from "~~/types/common/color";

export interface IconType {
  name: string;
  variant?: "default" | "outline" | "fill" | "custom";
  componentSize?: BasicSizeType;
  colors?: ColorType;
  loading?: boolean;
  absolute?: boolean;
  position?: "top" | "right" | "bottom" | "left";
  alignment?: "start" | "center" | "end";
}
