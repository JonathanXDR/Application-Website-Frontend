import type { BasicSizeType } from "./BasicSize";
import type { ExtendedPropsType } from "./ExtendedProps";

export interface LanguageBarType extends ExtendedPropsType {
  progress: number;
  componentSize?: BasicSizeType | "full";
  loading?: boolean;
  width?: "full" | "compact";
  hover?: "auto" | "true" | "false";
  direction?: "left" | "right";
  divider?: {
    direction: "left" | "right" | "center";
  };
}
