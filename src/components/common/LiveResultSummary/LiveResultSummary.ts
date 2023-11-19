import Icon from '@/components/common/Icons/Icon.vue'
import { useColorStore } from '@/stores/color'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LiveResultSummary',
  components: {
    Icon
  },
  setup() {
    const colorStore = useColorStore()
    const randomColor = ref(colorStore.randomizeColor().colorVar)
    return {
      randomColor
    }
  }
})
