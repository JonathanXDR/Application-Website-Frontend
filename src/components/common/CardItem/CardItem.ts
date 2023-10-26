import Icon from '@/components/common/Icons/Icon.vue'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CardTile',
  components: {
    Icon
  },
  props: {
    card: {
      type: Object as PropType<ArticleItemType>,
      required: true,
      default: () => {}
    },
    size: {
      type: String as PropType<'small' | 'large' | 'full'>,
      required: false,
      default: 'medium'
    },
    cover: {
      type: String,
      required: false,
      default: undefined
    },
    donutGraph: {
      type: Boolean,
      required: false,
      default: false
    },
    barGraph: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
