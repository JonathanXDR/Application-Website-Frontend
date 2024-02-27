import type { ColorType } from './Color'
import type { SizeType } from './Size'

export interface IconType {
  name: string
  size?: Omit<SizeType, 'xsmall' & 'xlarge'>
  colors?: ColorType
  absolute?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  alignment?: 'start' | 'center' | 'end'
}
