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
import TimeLine from '@/components/common/TimeLine/TimeLine.vue';

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
    TimeLine,
  },
  data() {
    return {
      data: json.components[1].data[5].data,
    };
  },
  mounted() {
    let ticking = false;
    let last_known_scroll_position = 0;
    let updatePath = false;

    const element = this.$refs['svg-timeline'] as SVGElement;
    const path = this.$refs['path-timeline'] as SVGPathElement;
    let totalLength = 0;

    setTimeout(() => {
      const timelineHeight = this.$refs['ul-timeline'].offsetHeight;
      // console.log(Math.ceil(timelineHeight));
      const size = Math.ceil(timelineHeight);
      // console.log(size);

      element.setAttribute('viewBox', `0 0 8 ${size}`);
      element.setAttribute('height', `${size}`);
      element.setAttribute('xmlns', `http://www.w3.org/${size}/svg`);

      path.setAttribute('d', `M 4 0 L 4 ${size}`);

      path.setAttribute('stroke-dasharray', `${totalLength}`);

      initPath(path);

      function initPath(path: SVGPathElement) {
        totalLength = path.getTotalLength();
        path.style.strokeDasharray = `${totalLength}`;
        path.style.strokeDashoffset = `${totalLength}`;
      }

      function handleEntries(entries: any) {
        console.log(entries);
        entries.forEach((entry: any) => {
          console.log(entry);
          if (entry.isIntersecting) {
            console.log(entry.target);
          }
        });
      }

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // console.log(entry);
              updatePath = true;
            } else {
              updatePath = false;
            }
          });
        },
        { rootMargin: '0px 0px 0px 0px' }
      );

      observer.observe(element);

      function doSomething(scroll_pos) {
        if (!updatePath) {
          return;
        }
        window.requestAnimationFrame(() => {
          const center = window.innerHeight / 2;
          const boundaries = path.getBoundingClientRect();
          const top = boundaries.top;
          const height = boundaries.height;
          const percentage = (center - top) / height;
          const drawLength = percentage > 0 ? totalLength * percentage : 0;
          path.style.strokeDashoffset = `${
            drawLength < totalLength ? totalLength - drawLength : 0
          }`;
        });
      }

      window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
          });

          ticking = true;
        }
      });
    }, 500);
  },

  // if (document.getElementById('timeline') === true) {
  //   const timelineHeight =
  //     document.getElementById('timeline-id').offsetHeight;
  //   console.log(timelineHeight);
  // }
});
