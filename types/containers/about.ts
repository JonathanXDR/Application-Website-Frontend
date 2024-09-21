import type { DateItemType } from "../common/DateItem";
import type { ExtendedPropsType as ExtendedPropertiesType } from "../common/ExtendedProps";

export interface About extends ExtendedPropertiesType {
  eyebrow: string;
  dates: DateItemType[];
}
