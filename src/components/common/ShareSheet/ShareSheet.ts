import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import type { FaLinkType } from '@/types/common/FaLink'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ShareSheet',
  components: {
    LoadingSpinner
  },
  setup() {
    const { tm } = useI18n()
    const links = computed(() => tm('components.common.ShareSheet.links') as FaLinkType[])

    return {
      tm,
      links
    }
  }
})
