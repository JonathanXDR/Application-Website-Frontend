import type { IconItemType } from './icon-item.component'
import type { LinkItemType } from './link-item.component'

export interface BasicPropsType {
  icon?: IconItemType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkItemType[]
}
