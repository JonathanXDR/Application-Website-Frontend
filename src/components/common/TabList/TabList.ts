import Icon from '@/components/common/Icons/Icon.vue'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'TabList',
  components: {
    Icon
  },
  setup() {
    const items = reactive([
      { id: 'productivity', label: 'Productivity' },
      { id: 'gaming', label: 'Gaming' },
      { id: 'production', label: 'Audio and video production' },
      { id: 'development', label: 'Software development' }
    ])

    return {
      items
    }
  }
})
