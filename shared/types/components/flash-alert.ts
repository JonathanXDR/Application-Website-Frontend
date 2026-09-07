import type { BasicPropsType } from '#shared/types/schemas'
import type { IconItemType } from '#shared/types/components/icon-item'

export interface FlashAlertType extends Omit<BasicPropsType, 'icon'> {
  icon?: IconItemType
  variant?:
    'deprecated' | 'experiment' | 'important' | 'note' | 'tip' | 'warning'
}
