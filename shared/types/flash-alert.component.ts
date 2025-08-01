import type { BasicPropsType } from './basic-props.common'

export interface FlashAlertType extends BasicPropsType {
  variant?:
    | 'deprecated'
    | 'experiment'
    | 'important'
    | 'note'
    | 'tip'
    | 'warning'
}
