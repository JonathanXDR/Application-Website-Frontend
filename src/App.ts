import { RouterLink, RouterView } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import NavBar from '@/components/NavBar/NavBar.vue';
import RibbonBar from './components/RibbonBar/RibbonBar.vue';
import FooterSection from '@/components/FooterSection/FooterSection.vue';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterSection,
  },
  methods: {
    updateAnimations() {
      const animations = [
        {
          ref: 'ac-ln-background',
          parent: 'navBar',
          className: 'ac-ln-background-transition',
          timeout: 500,
        },
        {
          ref: 'ribbon-content-wrapper',
          parent: 'ribbonBar',
          className: 'ribbon-content-wrapper-animation',
          timeout: 1,
        },
        {
          ref: 'ribbon-content',
          parent: 'ribbonBar',
          className: 'ribbon-content-animation',
          timeout: 1,
        },
        // {
        //   ref: 'ribbon-link',
        //   parent: 'ribbonBar',
        //   className: 'ribbon-link-animation',
        //   timeout: 1,
        // },
      ] as Array<{
        ref: string;
        parent: string;
        className: string;
        timeout: number;
      }>;

      // foreach item in array remove the class
      animations.forEach((animation) => {
        const element = this.$refs[animation.parent].$refs[animation.ref];
        element.classList.remove(animation.className);
      });

      // add the class back after a timeout for each item in array
      animations.forEach((animation) => {
        const element = this.$refs[animation.parent].$refs[animation.ref];
        setTimeout(() => {
          element.classList.add(animation.className);
        }, animation.timeout);
      });
    },
  },
};
