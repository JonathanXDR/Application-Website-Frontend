import type { CardTile } from '@/types/common/CardTile'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'CardTile',
  props: {
    card: {
      type: Object as PropType<CardTile>,
      required: true,
      default: () => ({})
    }
  },
  setup() {
    const cardOpen = ref(false)

    return {
      cardOpen
    }
  }
})
