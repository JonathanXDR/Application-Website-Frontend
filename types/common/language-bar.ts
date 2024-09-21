import type { BasicSizeType } from './BasicSize'
import type { ExtendedPropsType as ExtendedPropertiesType } from './ExtendedProps'

export interface LanguageBarType extends ExtendedPropertiesType {
  progress: number
  componentSize?: BasicSizeType | 'full'
  loading?: boolean
  width?: 'full' | 'compact'
  hover?: 'auto' | 'true' | 'false'
  direction?: 'left' | 'right'
  divider?: {
    direction: 'left' | 'right' | 'center'
  }
}
