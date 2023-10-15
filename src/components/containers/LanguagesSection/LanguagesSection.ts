import LanguageBar from '@/components/common/LanguageBar/LanguageBar.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LanguagesSection',
  components: {
    LoadingSpinner,
    LanguageBar
  },
  setup() {
    const { tm } = useI18n()

    return {
      tm
    }
  }
})
