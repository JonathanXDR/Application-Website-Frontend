import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { ColorType } from '#shared/types/common/color'

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

export interface IconType extends IconifyProps {
  variant?: 'default' | 'outline' | 'fill' | 'custom'
  weight?: BasicSizeType
  colors?: ColorType
  loading?: boolean
  absolute?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  alignment?: 'start' | 'center' | 'end'
}
