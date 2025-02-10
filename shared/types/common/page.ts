import type { BasicPropsType } from '#shared/types/common/basic-props'

export interface PageType extends BasicPropsType {
  id: string
  label: string
  statusCode?: number
}
