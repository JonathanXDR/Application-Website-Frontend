import Icon from '@/components/common/Icons/Icon.vue'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CardTile',
  components: {
    Icon
  },
  props: {
    size: {
      type: String as PropType<'small' | 'large' | 'full'>,
      required: false,
      default: 'medium'
    }
  }
})
