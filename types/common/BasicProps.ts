import type { IconType } from './Icon'
import type { LinkType } from './Link'

export interface BasicPropsType {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkType[]
}
