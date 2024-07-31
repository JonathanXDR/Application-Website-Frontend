export interface CardItemType extends ExtendedPropsType {
  variant?: "card" | "article";
  componentSize?: BasicSizeType | "full";
  colors?: ColorType;
  alignment?: "start" | "center" | "end";
  hover?: "auto" | "true" | "false";
  cover?: string;
  badge?: BadgeType;
  loading?: boolean;
  graphs?: GraphType;
  icon?: IconType;
}
