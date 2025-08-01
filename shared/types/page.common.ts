import type { BasicPropsType } from './basic-props.common'

export interface PageType extends BasicPropsType {
  id: string
  label: string
  statusCode?: number
}
