import LanguageBar from '@/components/common/LanguageBar/LanguageBar.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import type { LanguageBarType } from '@/types/common/LanguageBar'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LanguagesSection',
  components: {
    LoadingSpinner,
    LanguageBar
  },
  setup() {
    const { tm } = useI18n()
    const languages = computed(() => tm('components.containers.languages') as LanguageBarType[])

    return {
      tm,
      languages
    }
  }
})
