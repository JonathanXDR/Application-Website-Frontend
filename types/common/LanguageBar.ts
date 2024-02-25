import type { CardItemType } from './ExtendedProps'

export interface LanguageBarType extends CardItemType {
  progress: string
  badge?: string
  status?: string[]
}
