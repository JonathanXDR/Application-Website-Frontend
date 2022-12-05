import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue';

import json from '@/assets/data/data.json';

export default {
  name: 'RibbonBar',
  components: {
    LinkCollection,
  },
  data() {
    return {
      json: json.components.common.RibbonBar,
    };
  },
};
