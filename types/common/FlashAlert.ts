export interface FlashAlertType {
  variant?:
    | "deprecated"
    | "experiment"
    | "important"
    | "note"
    | "tip"
    | "warning";
  title?: string;
  description: string;
  icon?: IconType;
}
