import type { DateItemType } from "~~/types/common/date-item";
import type { ExtendedPropertiesType } from "~~/types/common/extended-properties";

export interface About extends ExtendedPropertiesType {
  eyebrow: string;
  dates: DateItemType[];
}
