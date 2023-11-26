import Icon from '@/components/common/Icons/Icon.vue'
import i18n from '@/main'
import { computed, defineComponent, type PropType, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ErrorView',
  components: {
    Icon
  },
  props: {
    name: {
      type: String as PropType<string>,
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

    const colors: Ref<Object> = computed(() => tm(`views.${props.name}.icon.colors`))
    const entireDescription: Ref<string> = computed(() => tm(`views.${props.name}.description`))
    const description = splitDescription(entireDescription.value)

    return {
      props,
      colors,
      description
    }
  }
})
