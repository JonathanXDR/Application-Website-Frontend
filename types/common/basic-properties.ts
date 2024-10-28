import type { IconType } from "~~/types/common/icon";
import type { LinkType } from "~~/types/common/link";

export interface BasicPropertiesType {
  icon?: IconType;
  eyebrow?: string;
  title: string;
  description?: string;
  links?: LinkType[];
}
