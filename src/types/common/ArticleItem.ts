import type { Link } from './Link'

export type ArticleItem = {
  title: string
  date?: string
  description: string
  links?: Link[]
  icon?: string
}
