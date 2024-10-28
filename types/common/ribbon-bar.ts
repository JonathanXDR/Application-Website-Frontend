import type { LinkType } from "~~/types/common/link";

export interface RibbonBar {
  items: {
    description: string;
    links: LinkType[];
  }[];
  loading?: boolean;
}
