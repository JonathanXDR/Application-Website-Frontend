import Icon from '@/components/common/Icons/Icon.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import TabList from '@/components/common/TabList/TabList.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MusicSection',
  components: {
    LoadingSpinner,
    Icon,
    TabList
  },
  setup() {
    const { tm } = useI18n()

    return {
      tm
    }
  }
})
