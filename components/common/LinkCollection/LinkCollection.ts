import Icon from '@/components/common/Icons/Icon.vue'
import type { LinkType } from '@/types/common/Link'
import { defineComponent, toRefs, type PropType } from 'vue'

export default defineComponent({
  name: 'LinkCollection',
  components: {
    Icon
  },
  props: {
    links: {
      type: Array as PropType<LinkType[]>,
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
