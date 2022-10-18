import json from '@/assets/data/data.json';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.vue';
import ShareSheet from '@/components/ShareSheet/ShareSheet';

export default {
  name: 'AboutSection',
  components: {
    ChevronRightIcon,
    ShareSheet,
  },
  data() {
    return {
      data: json,
      age: [] as number[],
    };
  },
  created() {
    // this.data.dates.forEach((item) => {
    //   const date = new Date(item.date);
    //   const difference = new Date(Date.now() - date.getTime());
    //   const age = Math.abs(difference.getUTCFullYear() - 1970);
    //   this.age.push(age);
    // });
  },
};
