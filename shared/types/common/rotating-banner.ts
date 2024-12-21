import type { LinkType } from '#shared/types/common/link'

export interface RotatingBanner {
  items: {
    description: string
    links: LinkType[]
  }[]
  loading?: boolean
}
