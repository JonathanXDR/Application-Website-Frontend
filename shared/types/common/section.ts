import type { IconType } from '#shared/types/common/icon'

export interface SectionType {
  id: string
  label?: string
  route?: string
  children?: SectionType[]
  class?: string
  icon?: IconType
}
