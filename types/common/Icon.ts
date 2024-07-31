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
