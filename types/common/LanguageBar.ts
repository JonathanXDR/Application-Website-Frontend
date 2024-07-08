import type { ExtendedPropsType } from "./ExtendedProps";

export interface LanguageBarType extends ExtendedPropsType {
  progress: number;
  status?: string[];
}
