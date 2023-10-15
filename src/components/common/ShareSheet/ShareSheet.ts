import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ShareSheet',
  components: {
    LoadingSpinner
  },
  setup() {
    const { tm } = useI18n()

    return {
      tm
    }
  }
})
