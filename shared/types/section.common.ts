import type { IconItemType } from './icon-item.component'

export interface SectionType {
  id: string
  label?: string
  route?: string
  children?: SectionType[]
  class?: string
  icon?: IconItemType
}
