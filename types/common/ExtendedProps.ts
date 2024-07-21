import type { BasicPropsType } from "./BasicProps";
import type { InfoType } from "./Info";

export interface ExtendedPropsType extends BasicPropsType {
  badges?: string[];
  info?: InfoType;
}
