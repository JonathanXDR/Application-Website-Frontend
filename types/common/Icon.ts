import type { ColorType } from './Color'

export interface IconType {
  name: string
  size?: 'small' | 'medium' | 'large'
  colors?: ColorType
}
