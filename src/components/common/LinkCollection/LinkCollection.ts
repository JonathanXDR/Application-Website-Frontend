import Icon from '@/components/common/Icons/Icon.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LinkCollection',
  components: {
    Icon
  },
  props: {
    links: {
      type: Array as () => any[],
      required: true,
      default: () => []
    }
  }
})
