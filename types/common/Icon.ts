import type { ColorType } from './Color'
import type { SizeType } from './Size'

export interface IconType {
  name: string
  variant?: 'default' | 'outline' | 'fill' | 'custom'
  size?: Exclude<SizeType, 'xsmall' & 'xlarge'>
  colors?: ColorType
  loading?: boolean
  absolute?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  alignment?: 'start' | 'center' | 'end'
}
