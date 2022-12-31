import json from '@/assets/data/data.json';

import AirplaneDepartureIcon from '@/components/common/Icons/AirplaneDepartureIcon.vue';
import ArrowDownCircleIcon from '@/components/common/Icons/ArrowDownCircleIcon.vue';
import CalendarIcon from '@/components/common/Icons/CalendarIcon.vue';
import ChevronLeftForwardslashChevronRightIcon from '@/components/common/Icons/ChevronLeftForwardslashChevronRightIcon.vue';
import ChevronRightIcon from '@/components/common/Icons/ChevronRightIcon.vue';
import GearIcon from '@/components/common/Icons/GearIcon.vue';
import PersonCropSquareIcon from '@/components/common/Icons/PersonCropSquareIcon.vue';

import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue';

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
    LinkCollection,
  },
  props: ['article'],
  data() {
    return {
      json: json,
    };
  },
};
