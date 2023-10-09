import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import { fetchData } from '@/services/utils'
import useAnimationStore from '@/stores/headerAnimations'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LinkCollection
  },
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
        this.json = data.components.common.RibbonBar
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  },
  mounted() {
    const elements = [
      {
        element: this.$refs['ribbon-content-wrapper'] as HTMLElement,
        class: 'ribbon-content-wrapper-animation' as string,
        timeout: 1 as number
      },
      {
        element: this.$refs['ribbon-content'] as HTMLElement,
        class: 'ribbon-content-animation' as string,
        timeout: 1 as number
      },
      {
        element: (this.$refs['ribbon-link'] as any).$el as HTMLElement,
        class: 'ribbon-link-animation' as string,
        timeout: 1 as number
      }
    ]

    elements.forEach((element) => {
      useAnimationStore().setHeaderAnimation(element)
    })
  }
})
