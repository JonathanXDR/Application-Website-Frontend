import { fetchData } from '@/services/utils'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardTile',
  props: {
    card: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      json: null as any,
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
})
