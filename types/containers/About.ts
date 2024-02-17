import type { CardItemType } from "../common/CardItem";
import type { DateItemType } from "../common/DateItem";

export interface About extends CardItemType {
  eyebrow: string;
  dates: DateItemType[];
}
