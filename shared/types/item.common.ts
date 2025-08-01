import type { BasicPropsType } from './basic-props.common'

export interface ItemType extends BasicPropsType {
  id: string
  category?: string
  label?: string
}
