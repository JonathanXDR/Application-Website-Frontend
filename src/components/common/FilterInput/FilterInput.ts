import DropDown from '@/components/common/DropDown/DropDown.vue'
import type { OptionType } from '@/types/common/Option'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterInput',
  components: {
    DropDown
  },
  setup() {
    const { tm } = useI18n()
    const items = ref(tm('components.common.FilterNav.items') as OptionType[])
    const options = ref(tm('components.common.FilterNav.options') as OptionType[])
    const open = ref(false)

    const onFocus = () => {
      open.value = true
    }

    const onBlur = () => {
      open.value = false
    }

    return {
      items,
      options,
      open,
      onFocus,
      onBlur
    }
  }
})
