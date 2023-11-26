import Icon from '@/components/common/Icons/Icon.vue'
import { useColorStore } from '@/stores/color'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'LiveResultSummary',
  components: {
    Icon
  },
  props: {
    totalResults: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    },
    pinnedResults: {
      type: Number as PropType<number>,
      required: false,
      default: 0
    }
  },
  setup(props) {
    const colorStore = useColorStore()
    const randomColor = ref(colorStore.randomizeColor().colorVar)
    return {
      randomColor,
      props
    }
  }
})
