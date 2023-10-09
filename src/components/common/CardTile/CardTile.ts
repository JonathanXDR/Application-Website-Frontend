import { fetchData } from '@/services/utils'

export default {
  name: 'CardTile',
  props: ['card'],
  data() {
    return {
      json: null,
      cardOpen: false
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = await fetchData()
        this.json = data.components.common.CardTile
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  }
}
