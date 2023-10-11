import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardTile',
  props: {
    card: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      cardOpen: false
    }
  }
})
