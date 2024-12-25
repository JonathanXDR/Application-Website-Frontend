import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { ExtendedPropsType } from '~~/shared/types/common/extended-props'

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
