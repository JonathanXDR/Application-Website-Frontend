import AirplaneDepartureIcon from '@/components/Icons/AirplaneDepartureIcon.vue';
import ArrowDownCircleIcon from '@/components/Icons/ArrowDownCircleIcon.vue';
import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
import ChevronLeftForwardslashChevronRightIcon from '@/components/Icons/ChevronLeftForwardslashChevronRightIcon.vue';
import ChevronRightIcon from '@/components/Icons/ChevronRightIcon.vue';
import GearIcon from '@/components/Icons/GearIcon.vue';
import PersonCropSquareIcon from '@/components/Icons/PersonCropSquareIcon.vue';

import RibbonBar from '@/components/RibbonBar/RibbonBar.vue';
import CardTile from '@/components/CardTile/CardTile.vue';
import ArticleItem from '@/components/ArticleItem/ArticleItem.vue';

import json from '@/assets/data/data.json';

export default {
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
    CardTile,
    ArticleItem,
  },
  data() {
    return {
      data: json,
    };
  },
  created() {
    function timelineScrolling() {
      let ticking = false;
      let last_known_scroll_position = 0;
      let updatePath = false;

      const element = document.getElementById('svg-timeline') as HTMLElement;
      const path = element.querySelector('path') as SVGPathElement;
      let totalLength = 0;

      let timelineHeight = 0;

      setTimeout(() => {
        timelineHeight = document.getElementById('timeline-id')
          .offsetHeight as number;
        // console.log(Math.ceil(timelineHeight));
        const size = parseInt(Math.ceil(timelineHeight));
        // console.log(size);

        element.setAttribute('viewBox', `0 0 8 ${size}`);
        element.setAttribute('height', size);
        element.setAttribute('xmlns', `http://www.w3.org/${size}/svg`);

        path.setAttribute('d', `M 4 0 L 4 ${size}`);

        path.setAttribute('stroke-dasharray', totalLength);

        initPath(path);

        function initPath(path: any) {
          totalLength = path.getTotalLength();
          path.style.strokeDasharray = `${totalLength}`;
          path.style.strokeDashoffset = totalLength;
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

        function doSomething() {
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
            path.style.strokeDashoffset =
              drawLength < totalLength ? totalLength - drawLength : 0;
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
    }

    if (document.getElementById('timeline') === true) {
      const timelineHeight =
        document.getElementById('timeline-id').offsetHeight;
      console.log(timelineHeight);
    }
  },
};
