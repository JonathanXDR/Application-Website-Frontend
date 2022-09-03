import AirplaneDepartureIcon from '@/components/Icons/AirplaneDepartureIcon.vue';
import ArrowDownCircleIcon from '@/components/Icons/ArrowDownCircleIcon.vue';
import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
import ChevronLeftForwardslashChevronRightIcon from '@/components/Icons/ChevronLeftForwardslashChevronRightIcon.vue';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.vue';
import GearIcon from '@/components/Icons/GearIcon.vue';
import PersonCropSquareIcon from '@/components/Icons/PersonCropSquareIcon.vue';

import json from '@/assets/data/data.json';

export default {
  name: 'ArticleItem',
  components: {
    AirplaneDepartureIcon,
    ArrowDownCircleIcon,
    CalendarIcon,
    ChevronLeftForwardslashChevronRightIcon,
    ChevronRightIcon,
    GearIcon,
    PersonCropSquareIcon,
  },
  props: ['article'],
  data() {
    return {
      data: json,
    };
  },
};
