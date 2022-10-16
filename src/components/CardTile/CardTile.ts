import json from '@/assets/data/data.json';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardTile',
  props: ['card'],
  data() {
    return {
      data: json,
      cardOpen: false,
    };
  },
  methods: {},
});
