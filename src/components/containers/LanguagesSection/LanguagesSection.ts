import LanguageBar from '@/components/common/LanguageBar/LanguageBar.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LanguagesSection',
  components: {
    LoadingSpinner,
    LanguageBar
  },
  data() {
    return {
      json: null as any
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = await fetchData()
        this.json = data.components.containers.languages
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  }
})
