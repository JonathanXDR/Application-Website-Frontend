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
  props: {
    title: {
      type: String,
      required: true,
      default: undefined
    }
  },
  setup(props) {
    const { tm } = useI18n()
    const languages = computed(() => tm('components.containers.languages') as LanguageBarType[])

    return {
      props,
      tm,
      languages
    }
  }
})
