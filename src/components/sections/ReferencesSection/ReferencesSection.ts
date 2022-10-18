import json from '@/assets/data/data.json';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.vue';

export default {
  name: 'ReferencesSection',
  components: {
    ChevronRightIcon,
  },
  data() {
    return {
      data: json,
    };
  },
};
