import type { IconType } from "./Icon";

export type SectionType = {
  id: string;
  name: string;
  route: string;
  class?: string;
  icon?: IconType;
};
