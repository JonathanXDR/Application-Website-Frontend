import type { ExtendedPropsType } from './ExtendedProps'

export interface LanguageBarType extends ExtendedPropsType {
  progress: string
  badge?: string
  status?: string[]
}
