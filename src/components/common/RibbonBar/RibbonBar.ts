import ChevronRightIcon from '@/components/common/Icons/ChevronRightIcon.vue';
import json from '@/assets/data/data.json';

export default {
  name: 'RibbonBar',
  components: {
    ChevronRightIcon,
  },
  data() {
    return {
      data: json,
    };
  },
};
