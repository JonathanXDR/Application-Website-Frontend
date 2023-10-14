import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    LinkCollection
  },
  setup() {
    const { locale } = useI18n({ useScope: 'global' })
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
