import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleItem',
  components: {
    Icon,
    LinkCollection
  },
  props: {
    article: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
})
