import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'TechnologiesSection',
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
    const { locale } = useI18n()
    const json = ref<any>(undefined)

    const fetchLocalizedData = async () => {
      try {
        const data = (await fetchData()) as any
        json.value = data.components.common.ShareSheet
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    watch(locale, fetchLocalizedData, { immediate: true })

    return {
      json,
      fetchLocalizedData
    }
  }
})
