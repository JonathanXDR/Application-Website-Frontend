import LanguagePicker from '@/components/common/LanguagePicker/LanguagePicker.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterItem',
  components: {
    LanguagePicker,
    ShareSheet
  },
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
})
