import { defineComponent } from 'vue';

import ShareSheet from '../ShareSheet/ShareSheet.vue';
import json from '@/assets/data/data.json';

export default defineComponent({
  name: 'FooterSection',
  components: {
    ShareSheet,
  },
  data() {
    return {
      data: json,
      currentYear: new Date().getFullYear(),
    };
  },
});
