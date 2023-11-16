import type { IconType } from './Icon'
import type { LinkType } from './Link'

export type CardItemType = {
  eyebrow?: string
  title: string
  date?: {
    from?: string
    to?: string
  }
  description?: string
  tags: string[]
  links?: LinkType[]
  icon?: IconType
}
