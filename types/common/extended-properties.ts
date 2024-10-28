import type { BasicPropertiesType } from "~~/types/common/basic-properties";
import type { InfoType } from "~~/types/common/info";

export interface ExtendedPropertiesType extends BasicPropertiesType {
  badges?: string[];
  info?: InfoType;
}
