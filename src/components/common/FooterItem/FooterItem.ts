import { defineComponent } from 'vue'
import LanguagePicker from '../LanguagePicker/LanguagePicker.vue'
import ShareSheet from '../ShareSheet/ShareSheet.vue'

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
