import type { LinkType } from "./link";

export interface RibbonBar {
  items: {
    description: string;
    links: LinkType[];
  }[];
  loading?: boolean;
}
