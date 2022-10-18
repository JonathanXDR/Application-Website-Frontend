import { defineComponent } from 'vue';

import AirplaneDepartureIcon from '@/components/Icons/AirplaneDepartureIcon.vue';
import ArrowDownCircleIcon from '@/components/Icons/ArrowDownCircleIcon.vue';
import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
import ChevronLeftForwardslashChevronRightIcon from '@/components/Icons/ChevronLeftForwardslashChevronRightIcon.vue';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.vue';
import GearIcon from '@/components/Icons/GearIcon.vue';
import PersonCropSquareIcon from '@/components/Icons/PersonCropSquareIcon.vue';

import RibbonBar from '@/components/RibbonBar/RibbonBar.vue';
import ShareSheet from '../../components/ShareSheet/ShareSheet.vue';
import CardTile from '@/components/CardTile/CardTile.vue';
import ArticleItem from '@/components/ArticleItem/ArticleItem.vue';

import json from '@/assets/data/data.json';

export default defineComponent({
  name: 'HomeView',
  components: {
    AirplaneDepartureIcon,
    ArrowDownCircleIcon,
    CalendarIcon,
    ChevronLeftForwardslashChevronRightIcon,
    ChevronRightIcon,
    GearIcon,
    PersonCropSquareIcon,
    RibbonBar,
    ShareSheet,
    CardTile,
    ArticleItem,
  },
  data() {
    return {
      data: json,
      age: [] as number[],
    };
  },
  mounted() {
    const inViewport = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
        // if class is added once, keep it
        if (entry.target.classList.contains('is-inViewport')) {
          observer.unobserve(entry.target);
        }
      });
    };

    const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    const observer = new IntersectionObserver(inViewport, obsOptions);

    // Attach observer to every [animation] element:
    const dataInViewport = document.querySelectorAll('[animation]');
    dataInViewport.forEach((el) => {
      observer.observe(el);
    });
  },
});
