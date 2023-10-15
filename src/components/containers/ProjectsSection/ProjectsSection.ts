import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import type { Repository } from '@/types/GitHub/Repository'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ProjectsSection',
  components: {
    LoadingSpinner,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardTile,
    ArticleItem,
    TimeLine
  },
  setup() {
    const { tm } = useI18n()
    const articles = computed(() => tm('components.containers.projects') as ArticleItemType[])
    const projects = {
      personal: [] as Repository,
      swisscom: [] as any[],
      school: [] as Repository
    }
    const errors = [] as string[]

    return {
      tm,
      articles
    }
  }
})
