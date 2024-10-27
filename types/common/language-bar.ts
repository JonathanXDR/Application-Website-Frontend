import type { BasicSizeType } from "~~/types/common/basic-size";
import type { ExtendedPropertiesType } from "~~/types/common/extended-properties";

export interface LanguageBarType extends ExtendedPropertiesType {
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
