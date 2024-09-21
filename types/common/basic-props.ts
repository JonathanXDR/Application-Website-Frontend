import type { IconType } from './Icon'
import type { LinkType } from './Link'

export interface BasicPropertiesType {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkType[]
}
