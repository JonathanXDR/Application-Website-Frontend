export interface RibbonBar {
  items: {
    description: string;
    links: LinkType[];
  }[];
  loading?: boolean;
}
