import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { ExtendedPropertiesType } from '#shared/types/common/extended-properties'

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
