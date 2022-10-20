import json from '@/assets/data/data.json';

export default {
  name: 'LanguagesSection',
  data() {
    return {
      data: json.components[1].data[1].data,
    };
  },
  mounted() {
    console.log(this.data);
  },
};
