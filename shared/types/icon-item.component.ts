import type { BasicSizeType } from './basic-size.common'
import type { ColorType } from './color.common'

type IconifyIconCustomiseCallback = (
  content: string,
  name: string,
  prefix: string,
  provider: string,
) => string

interface IconifyProps {
  name?: string
  mode?: 'svg' | 'css'
  size?: string | number
  customize?: IconifyIconCustomiseCallback
}

export interface IconItemType extends IconifyProps {
  variant?: 'default' | 'outline' | 'fill' | 'custom'
  weight?: BasicSizeType
  colors?: ColorType
  loading?: boolean
  absolute?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  alignment?: 'start' | 'center' | 'end'
}
