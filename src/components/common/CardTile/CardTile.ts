import json from '@/assets/data/data.json';

export default {
  name: 'CardTile',
  props: ['card'],
  data() {
    return {
      json: json,
      cardOpen: false,
    };
  },
};
