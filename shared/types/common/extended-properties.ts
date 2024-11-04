import type { BasicPropertiesType } from "#shared/types/common/basic-properties";
import type { InfoType } from "#shared/types/common/info";

export interface ExtendedPropertiesType extends BasicPropertiesType {
  badges?: string[];
  info?: InfoType;
}
