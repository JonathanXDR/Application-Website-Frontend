import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import type { LinkType } from '@/types/common/Link'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    LinkCollection
  },
  setup() {
    const { tm } = useI18n()
    const links = computed(() => tm('components.common.RibbonBar.links') as LinkType[])

    return {
      tm,
      links
    }
  }
})
