import type { LinkType } from '#shared/types/common/link'

export interface RibbonBar {
  items: {
    description: string
    links: LinkType[]
  }[]
  loading?: boolean
}
