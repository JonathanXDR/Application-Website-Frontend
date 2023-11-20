import type { IconType } from './Icon'
import type { LinkType } from './Link'

export type CardItemType = {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  tags?: string[]
  links?: LinkType[]
  info?: {
    date?: {
      from?: string
      to?: string
    }
    language?: string
    license?: string
    location?: string
    department?: string
  }
}
