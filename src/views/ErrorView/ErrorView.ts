import Icon from '@/components/common/Icons/Icon.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ErrorView',
  components: {
    Icon
  },

  setup() {
    const splitDescription = (description: string): string[] => {
      return description.split('. ')
    }

    const { tm } = useI18n()
    const entireDescription = computed(() => tm('views.notFound.description') as string)
    const description = splitDescription(entireDescription.value)

    return {
      description
    }
  }
}
