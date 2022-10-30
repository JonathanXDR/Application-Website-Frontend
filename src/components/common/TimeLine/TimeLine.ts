import { defineComponent } from 'vue';

import AirplaneDepartureIcon from '@/components/common/Icons/AirplaneDepartureIcon.vue';
import ArrowDownCircleIcon from '@/components/common/Icons/ArrowDownCircleIcon.vue';
import CalendarIcon from '@/components/common/Icons/CalendarIcon.vue';
import ChevronLeftForwardslashChevronRightIcon from '@/components/common/Icons/ChevronLeftForwardslashChevronRightIcon.vue';
import ChevronRightIcon from '@/components/common/Icons/ChevronRightIcon.vue';
import GearIcon from '@/components/common/Icons/GearIcon.vue';
import PersonCropSquareIcon from '@/components/common/Icons/PersonCropSquareIcon.vue';

import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue';
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue';
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue';
import CardTile from '@/components/common/CardTile/CardTile.vue';
import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue';

import json from '@/assets/data/data.json';

export default defineComponent({
  name: 'TimeLine',
  components: {
    AirplaneDepartureIcon,
    ArrowDownCircleIcon,
    CalendarIcon,
    ChevronLeftForwardslashChevronRightIcon,
    ChevronRightIcon,
    GearIcon,
    PersonCropSquareIcon,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardTile,
    ArticleItem,
  },
  data() {
    return {
      data: json.components[1].data[5].data,
      totalLength: 0,
      scrollPosition: 0,
      strokeDashoffset: 0,
    };
  },
  mounted() {
    const element = this.$refs['svg-timeline'] as SVGElement;
    const path = this.$refs['path-timeline'] as SVGPathElement;
    this.totalLength = this.$parent.$refs['ul-timeline'].offsetHeight;

    console.log('path', path.getTotalLength());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log("I'm visible");
            window.addEventListener('scroll', this.handleScroll());
          } else {
            // console.log("I'm not visible");
            window.removeEventListener('scroll', this.handleScroll());
          }
        });
      },
      { rootMargin: '-52px 0px 0px 0px' }
    );

    observer.observe(element);
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;
      console.log('scrollPosition', this.scrollPosition);
    },
  },
});
