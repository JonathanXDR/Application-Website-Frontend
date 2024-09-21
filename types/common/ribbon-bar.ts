import type { LinkType } from "./Link";

export interface RibbonBar {
  items: {
    description: string;
    links: LinkType[];
  }[];
  loading?: boolean;
}
