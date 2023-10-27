import DropDown from '@/components/common/DropDown/DropDown.vue'
import type { OptionType } from '@/types/common/Option'
import { defineComponent, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterInput',
  components: {
    DropDown
  },
  setup() {
    const { tm } = useI18n()
    const items: Ref<OptionType[]> = ref(tm('components.common.FilterNav.items'))
    const options: Ref<OptionType[]> = ref(tm('components.common.FilterNav.options'))
    const open: Ref<boolean> = ref(false)

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
