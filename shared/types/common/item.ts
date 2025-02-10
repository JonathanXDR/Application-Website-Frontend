import type { BasicPropsType } from '#shared/types/common/basic-props'

export interface ItemType extends BasicPropsType {
  id: string
  category?: string
  label?: string
}
