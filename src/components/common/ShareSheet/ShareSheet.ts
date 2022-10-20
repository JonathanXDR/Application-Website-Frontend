import json from '@/assets/data/data.json';

export default {
  name: 'ShareSheet',
  data() {
    return {
      data: json.components[0].data[1].data,
    };
  },
};
