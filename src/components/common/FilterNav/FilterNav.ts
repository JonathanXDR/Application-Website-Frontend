import Icon from '@/components/common/Icons/Icon.vue'
import type { OptionType } from '@/types/common/Option'
import { computed, defineComponent, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterNav',
  components: {
    Icon
  },
  setup() {
    const { tm } = useI18n()
    const items: Ref<OptionType[]> = computed(() => tm('components.common.FilterNav.items'))
    const options: Ref<OptionType[]> = computed(() => tm('components.common.FilterNav.options'))

    return {
      items,
      options
    }
  }
})
