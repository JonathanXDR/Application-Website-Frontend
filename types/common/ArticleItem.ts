import type { IconType } from './Icon'
import type { LinkType } from './Link'

export type ArticleItemType = {
  title: string
  date?: string
  description?: string
  links?: LinkType[]
  icon?: IconType
}
