import type { IconType } from './Icon'

export interface SectionType {
  id: string
  name: string
  route: string
  class?: string
  icon?: IconType
}
