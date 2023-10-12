import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'

export default {
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
}
