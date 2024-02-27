import type { SizeType } from './Size'

export interface IconType {
  name: string
  size?: Omit<SizeType, 'xsmall' & 'xlarge'>
  colors?: {
    primary?: string
    secondary?: string
    tertiary?: string
  }
  absolute?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  alignment?: 'start' | 'center' | 'end'
}
