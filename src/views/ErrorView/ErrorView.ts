import Icon from '@/components/common/Icons/Icon.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ErrorView',
  components: {
    Icon
  },
  props: {
    name: {
      type: String,
      required: false,
      default: 'error',
      validator: (value: string): boolean => ['notFound', 'error', 'maintenance'].includes(value)
    }
  },
  setup(props) {
    const splitDescription = (description: string): string[] => {
      return description.split('. ')
    }

    const { tm } = useI18n()
    const colors = computed(() => tm(`views.${props.name}.icon.colors`) as Object)
    const entireDescription = computed(() => tm(`views.${props.name}.description`) as string)
    const description = splitDescription(entireDescription.value)

    return {
      props,
      colors,
      description
    }
  }
}
