import type { CardTileType } from '@/types/common/CardTile'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'CardTile',
  props: {
    card: {
      type: Object as PropType<CardTileType>,
      required: true,
      default: () => {}
    }
  },
  setup() {
    const cardOpen = ref(false)

    return {
      cardOpen
    }
  }
})
