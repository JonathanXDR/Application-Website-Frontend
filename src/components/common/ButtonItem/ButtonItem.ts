import type { IconType } from '@/types/common/Icon'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ButtonItem',
  props: {
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      required: false,
      default: 'button'
    },
    variant: {
      type: String as PropType<'primary' | 'secondary' | 'tertiary'>,
      required: false,
      default: 'primary'
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      required: false,
      default: 'medium'
    },
    borderRadius: {
      type: String as PropType<'reduced' | 'full'>,
      required: false,
      default: 'reduced'
    },
    label: {
      type: String,
      required: true,
      default: undefined
    },
    icon: {
      type: Object as PropType<IconType>,
      required: false,
      default: undefined
    }
  }
})
