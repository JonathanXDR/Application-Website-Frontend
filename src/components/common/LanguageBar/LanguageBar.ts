import json from '@/assets/data/data.json';

export default {
  name: 'LanguageBar',
  props: ['language'],
  data() {
    return {
      json: json.components.containers.languages,
    };
  },
};
