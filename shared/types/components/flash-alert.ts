import type { BasicPropsType } from '#shared/types/common/basic-props'

export interface FlashAlertType extends BasicPropsType {
  variant?:
    | 'deprecated'
    | 'experiment'
    | 'important'
    | 'note'
    | 'tip'
    | 'warning'
}
