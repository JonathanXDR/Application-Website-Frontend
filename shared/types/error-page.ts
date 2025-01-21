import type { BasicPropsType } from './common/basic-props'

export interface ErrorPageType extends BasicPropsType {
  id: string
  label: string
  statusCode?: number
}
