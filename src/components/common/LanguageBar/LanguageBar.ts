import json from '@/assets/data/data.json';

export default {
  name: 'LanguageBar',
  props: ['language'],
  data() {
    return {
      data: json.components[1].data[1].data,
    };
  },
};
