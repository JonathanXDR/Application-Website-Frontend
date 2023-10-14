import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import type { ArticleItem } from '@/types/common/ArticleItem'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ArticleItem',
  components: {
    Icon,
    LinkCollection
  },
  props: {
    article: {
      type: Object as PropType<ArticleItem>,
      required: true,
      default: () => ({})
    }
  }
})
