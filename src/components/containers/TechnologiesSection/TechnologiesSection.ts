import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardItem from '@/components/common/CardItem/CardItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import FilterInput from '@/components/common/FilterInput/FilterInput.vue'
import FilterNav from '@/components/common/FilterNav/FilterNav.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LiveResultSummary from '@/components/common/LiveResultSummary/LiveResultSummary.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import NavBarExtension from '@/components/common/NavBarExtension/NavBarExtension.vue'
import ResultBlankState from '@/components/common/ResultBlankState/ResultBlankState.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'TechnologiesSection',
  components: {
    LoadingSpinner,
    RibbonBar,
    NavBarExtension,
    LinkCollection,
    ShareSheet,
    CardTile,
    ArticleItem,
    TimeLine,
    FilterInput,
    FilterNav,
    CardItem,
    LiveResultSummary,
    ResultBlankState
  },
  props: {
    title: {
      type: String,
      required: true,
      default: undefined
    }
  },
  setup(props) {
    const { tm } = useI18n()
    const cards = computed(() => tm('components.containers.technologies') as ArticleItemType[])

    return {
      props,
      tm,
      cards
    }
  }
})
