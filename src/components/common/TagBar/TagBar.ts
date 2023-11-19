import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagBar',
  props: {
    tags: {
      type: Array,
      required: true,
      default: () => []
    }
  }
})
