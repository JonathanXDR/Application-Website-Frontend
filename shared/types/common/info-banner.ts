import type { LinkType } from '#shared/types/common/link'

export interface InfoBanner {
  items: {
    description: string
    links: LinkType[]
  }[]
  loading?: boolean
}
