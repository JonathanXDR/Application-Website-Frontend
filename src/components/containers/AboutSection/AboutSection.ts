import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AboutSection',
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
    const dates = ref<{ age: string; apprenticeshipYear: string }>({
      age: '',
      apprenticeshipYear: ''
    })

    const fetchLocalizedData = async () => {
      try {
        const data = (await fetchData()) as any
        json.value = data.components.containers.about
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const calculateYears = (date: string) => {
      const currentDate = new Date(Date.now())
      const birthDate = new Date(date)
      const difference = new Date(currentDate.getTime() - birthDate.getTime())
      const years = Math.abs(difference.getUTCFullYear() - 1970)
      return years
    }

    watch(locale, fetchLocalizedData, { immediate: true })

    onMounted(async () => {
      await fetchLocalizedData()

      json.value.dates.forEach((item) => {
        dates.value[item.key] = calculateYears(item.date)
      })
    })

    return {
      json,
      dates,
      fetchLocalizedData,
      calculateYears
    }
  }
})
