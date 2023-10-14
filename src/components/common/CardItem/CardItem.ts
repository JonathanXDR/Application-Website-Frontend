import Icon from '@/components/common/Icons/Icon.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardTile',
  components: {
    Icon
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string): boolean => ['small', 'large', 'full'].includes(value)
  },
  data() {
    return {
      cardOpen: false
    }
  }
})
