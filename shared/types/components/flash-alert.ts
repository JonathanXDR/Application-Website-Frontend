import type { BasicPropsType } from '#shared/types/schemas'
import type { IconItemType } from '#shared/types/components/icon-item'

// `icon` is the rich component icon (IconItemType carries the `variant`
// the alert switches on), so it replaces the plain content icon inherited
// from BasicPropsType.
export interface FlashAlertType extends Omit<BasicPropsType, 'icon'> {
  icon?: IconItemType
  variant?:
    | 'deprecated'
    | 'experiment'
    | 'important'
    | 'note'
    | 'tip'
    | 'warning'
}
