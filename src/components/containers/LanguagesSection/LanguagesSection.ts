import json from '@/assets/data/data.json';
import LanguageBar from '@/components/common/LanguageBar/LanguageBar.vue';

export default {
  name: 'LanguagesSection',
  components: {
    LanguageBar,
  },
  data() {
    return {
      json: json.components.containers.languages,
    };
  },
};
