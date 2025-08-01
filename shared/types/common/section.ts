import type { IconItemType } from '#shared/types/components/icon-item'

export interface SectionType {
  id: string
  label?: string
  route?: string
  children?: SectionType[]
  class?: string
  icon?: IconItemType
}
