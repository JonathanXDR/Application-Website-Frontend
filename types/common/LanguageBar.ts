import type { CardItemType } from './CardItem'

export interface LanguageBarType extends CardItemType {
  progress: string
  status?: string[]
}
