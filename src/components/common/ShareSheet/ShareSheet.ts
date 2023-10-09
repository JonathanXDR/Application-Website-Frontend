import { fetchData } from '@/services/utils'

export default {
  name: 'ShareSheet',
  data() {
    return {
      json: null
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = await fetchData()
        this.json = data.components.common.ShareSheet
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  }
}
