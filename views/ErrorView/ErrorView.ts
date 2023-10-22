import Icon from '@/components/common/Icons/Icon.vue'
import i18n from '@/main'
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
      validator: (value: string): boolean => {
        const viewKeys = Object.keys(i18n.global.tm('views'))
        return viewKeys.includes(value)
      }
    }
  },
  setup(props) {
    const { tm } = useI18n()
    const splitDescription = (description: string): string[] => {
      return description.split('. ')
    }

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
