import Icon from '@/components/common/Icons/Icon.vue'
import type { Link } from '@/types/common/Link'
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'LinkCollection',
  components: {
    Icon
  },
  props: {
    links: {
      type: Array as () => Link[],
      required: true,
      default: () => []
    }
  },
  setup(props) {
    const { links } = toRefs(props)
    return {
      links
    }
  }
})
