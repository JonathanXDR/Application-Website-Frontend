import type { IconType } from './icon'
import type { LinkType } from './link'

export interface BasicPropertiesType {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkType[]
}
