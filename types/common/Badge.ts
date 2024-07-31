export interface BadgeType extends LinkType {
  variant?: keyof HTMLElementTagNameMap;
  componentSize?: ExtendedSizeType;
  colors?: ColorType;
  border?: boolean;
  hover?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
