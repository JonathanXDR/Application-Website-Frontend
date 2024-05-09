import type { CardItemType } from './CardItem'

export interface LanguageBarType extends CardItemType {
  progress: number
  status?: string[]
}
