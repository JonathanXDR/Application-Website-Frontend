import type { IconType } from './Icon'
import type { LinkType } from './Link'

export type ArticleItemType = {
  eyebrow?: string
  title: string
  date?: {
    from?: string
    to?: string
  }
  description?: string
  links?: LinkType[]
  icon?: IconType
}
