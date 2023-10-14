import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardTile',
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
