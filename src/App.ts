import { RouterLink, RouterView } from 'vue-router';

import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue';
import NavBar from '@/components/common/NavBar/NavBar.vue';
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue';
import FooterItem from '@/components/common/FooterItem/FooterItem.vue';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterItem,
  },
  methods: {
    updateAnimations() {
      const animations = [
        {
          ref: 'ac-ln-background',
          parent: 'nav-bar',
          className: 'ac-ln-background-transition',
          timeout: 500,
        },
        {
          ref: 'ribbon-content-wrapper',
          parent: 'ribbon-bar',
          className: 'ribbon-content-wrapper-animation',
          timeout: 1,
        },
        {
          ref: 'ribbon-content',
          parent: 'ribbon-bar',
          className: 'ribbon-content-animation',
          timeout: 1,
        },
        // {
        //   ref: 'ribbon-link',
        //   parent: 'ribbon-bar',
        //   className: 'ribbon-link-animation',
        //   timeout: 1,
        // },
      ];

      // foreach item in array remove the class
      animations.forEach((animation) => {
        const parent = this.$refs[animation.parent] as any;
        const element = parent.$refs[animation.ref];
        element.classList.remove(animation.className);
      });

      // add the class back after a timeout for each item in array
      animations.forEach((animation) => {
        const parent = this.$refs[animation.parent] as any;
        const element = parent.$refs[animation.ref];
        setTimeout(() => {
          element.classList.add(animation.className);
        }, animation.timeout);
      });
    },
  },
};
