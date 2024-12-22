import type { IconType } from '#shared/types/common/icon'
import type { LinkType } from '#shared/types/common/link'

export interface BasicPropsType {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkType[]
}
