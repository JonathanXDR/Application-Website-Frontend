import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import TabList from '@/components/common/TabList/TabList.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MusicSection',
  components: {
    LoadingSpinner,
    TabList
  },
  data() {
    return {
      json: undefined as any
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = (await fetchData()) as any
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
