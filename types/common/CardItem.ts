import type { IconType } from "./Icon";
import type { InfoType } from "./Info";
import type { LinkType } from "./Link";

export interface CardItemType {
  icon?: IconType;
  eyebrow?: string;
  title: string;
  description?: string;
  tags?: string[];
  links?: LinkType[];
  info?: InfoType;
}
