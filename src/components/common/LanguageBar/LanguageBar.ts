import type { LanguageBar } from '@/types/common/LanguageBar'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'LanguageBar',
  props: {
    language: {
      type: Object as PropType<LanguageBar>,
      required: true,
      default: () => ({})
    }
  }
})
