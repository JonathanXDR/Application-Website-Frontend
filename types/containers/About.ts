import type { CardItemType } from "../common/CardItem";
import type { DateItemType } from "../common/DateItem";

export type About = CardItemType & {
  eyebrow: string;
  dates: DateItemType[];
};
