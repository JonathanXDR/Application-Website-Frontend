import type { DateType } from "./Date";

export interface InfoType {
  loading?: boolean;
  date?: DateType;

  location?: string;
  supervisor?: string;
  department?: string;

  language?: string;
  license?: string;
  // forks?: number
  // networks?: number
  // watchers?: number
  // stars?: number
  // issues?: number
  // pullRequests?: number
  // subscribers?: number
  // tags?: number
  // commits?: number
  // branches?: number
  // contributors?: number
}
