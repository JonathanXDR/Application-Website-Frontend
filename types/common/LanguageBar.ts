import type { BadgeType } from './Badge'
import type { CardItemType } from './CardItem'

export interface LanguageBarType extends ExtendedPropsType {
  progress: string
  badge?: BadgeType
  status?: string[]
}
