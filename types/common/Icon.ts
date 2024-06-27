import type { BasicSizeType } from "./BasicSize";
import type { ColorType } from "./Color";

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
