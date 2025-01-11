import type { IconType } from '#shared/types/common/icon'
import type { LinkType } from '#shared/types/common/link'

export interface ItemType {
  id: string
  category?: string
  label?: string
  links?: LinkType[]
  icon?: IconType
}
