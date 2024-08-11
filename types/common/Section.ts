import type { IconType } from "./Icon";

export interface SectionType {
  id: string;
  name: string;
  route: string;
  page: string;
  class?: string;
  icon?: IconType;
}
