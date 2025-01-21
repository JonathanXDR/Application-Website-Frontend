import type { BasicPropsType } from '#shared/types/common/basic-props'

export interface ErrorPageType extends BasicPropsType {
  id: string
  label: string
  statusCode?: number
}
