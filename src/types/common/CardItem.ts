import type { IconType } from './Icon'
import type { LinkType } from './Link'

export type CardItemType = {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  tags: string[]
  links?: LinkType[]
  date?: {
    from?: string
    to?: string
  }
}
