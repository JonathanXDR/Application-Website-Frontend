import json from '@/assets/data/data.json';

export default {
  name: 'CardTile',
  props: ['card'],
  data() {
    return {
      data: json,
      cardOpen: false,
    };
  },
};
