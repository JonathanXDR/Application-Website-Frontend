import type { BasicSizeType } from './basic-size.common'
import type { ExtendedPropsType } from './extended-props.common'

export interface LanguageBarType extends ExtendedPropsType {
  progress: number
  componentSize?: BasicSizeType | 'full'
  loading?: boolean
  width?: 'full' | 'compact'
  hover?: boolean | 'auto'
  direction?: 'left' | 'right'
  divider?: {
    direction: 'left' | 'right' | 'center'
  }
}
