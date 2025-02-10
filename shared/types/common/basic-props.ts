import type { IconItemType } from '#shared/types/components/icon-item'
import type { LinkItemType } from '#shared/types/components/link-item'

export interface BasicPropsType {
  icon?: IconItemType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkItemType[]
}
