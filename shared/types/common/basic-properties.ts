import type { IconType } from '#shared/types/common/icon'
import type { LinkType } from '#shared/types/common/link'

export interface BasicPropertiesType {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkType[]
}
