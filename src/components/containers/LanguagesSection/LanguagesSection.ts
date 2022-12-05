import LanguageBar from '@/components/common/LanguageBar/LanguageBar.vue';
import json from '@/assets/data/data.json';

export default {
  name: 'LanguagesSection',
  components: {
    LanguageBar,
  },
  data() {
    return {
      json: json.components.containers.languages.languages,
    };
  },
};
