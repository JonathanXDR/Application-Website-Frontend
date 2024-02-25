export interface IconType {
  name: string
  size?: 'small' | 'medium' | 'large'
  colors?: {
    primary?: string
    secondary?: string
    tertiary?: string
  }
  position?: 'top' | 'right' | 'bottom' | 'left'
  alignment?: 'start' | 'center' | 'end'
}
