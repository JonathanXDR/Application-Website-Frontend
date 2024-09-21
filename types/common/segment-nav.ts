import type { ExtendedSizeType } from "./ExtendedSize";
import type { ItemType } from "./Item";

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
