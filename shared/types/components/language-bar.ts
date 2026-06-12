import type { BasicSizeType, ExtendedPropsType } from '#shared/types/schemas'

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
