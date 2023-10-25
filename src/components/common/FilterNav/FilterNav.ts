import Icon from '@/components/common/Icons/Icon.vue'
import type { OptionType } from '@/types/common/Option'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterNav',
  components: {
    Icon
  },
  setup() {
    const { tm } = useI18n()
    const items = computed(() => tm('components.common.FilterNav.items') as OptionType[])
    const options = computed(() => tm('components.common.FilterNav.options') as OptionType[])

    return {
      items,
      options
    }
  }
})
