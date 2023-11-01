import Icon from '@/components/common/Icons/Icon.vue'
import TagBar from '@/components/common/TagBar/TagBar.vue'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CardTile',
  components: {
    Icon,
    TagBar
  },
  props: {
    card: {
      type: Object as PropType<ArticleItemType & ListUserReposResponse>,
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
