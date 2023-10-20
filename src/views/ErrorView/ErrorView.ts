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
    const colors = computed(() => tm('views.maintenance.icon.colors') as Object)
    const entireDescription = computed(() => tm('views.maintenance.description') as string)
    const description = splitDescription(entireDescription.value)

    return {
      colors,
      description
    }
  }
}
