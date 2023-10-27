import type { CardTileType } from '@/types/common/CardTile'
import { defineComponent, ref, type PropType, type Ref } from 'vue'

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
    const cardOpen: Ref<boolean> = ref(false)

    return {
      cardOpen
    }
  }
})
