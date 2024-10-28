import type { IconType } from "~~/types/common/icon";

export interface ItemType {
  id: string;
  category?: string;
  label?: string;
  icon?: IconType;
}
