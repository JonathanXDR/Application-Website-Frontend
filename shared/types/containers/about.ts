import type { DateItemType } from "#shared/types/common/date-item";
import type { ExtendedPropertiesType } from "#shared/types/common/extended-properties";

export interface About extends ExtendedPropertiesType {
  eyebrow: string;
  dates: DateItemType[];
}
