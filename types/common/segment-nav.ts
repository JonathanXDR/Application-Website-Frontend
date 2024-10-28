import type { ExtendedSizeType } from "~~/types/common/extended-size";
import type { ItemType } from "~~/types/common/item";

export interface SegmentNavType {
  items: ItemType[];
  componentSize?: Exclude<ExtendedSizeType, "xlarge">;
  label?: "icon" | "text" | "combination";
  focus?: boolean;
  separator?: boolean;
  shadow?: boolean;
  grayLabels?: boolean;
  gap?: string;
  padding?: string;
  outerPadding?: number;
  selectedItem?: string;
  onSelect?: (id: string) => void;
}
