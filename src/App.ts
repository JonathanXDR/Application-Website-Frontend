import { RouterLink, RouterView } from 'vue-router';

import { defineComponent } from 'vue';

import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue';
import NavBar from '@/components/common/NavBar/NavBar.vue';
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue';
import FooterSection from '@/components/common/FooterSection/FooterSection.vue';

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    LoadingSpinner,
    NavBar,
    RibbonBar,
    FooterSection,
  },
  data() {
    return {
      currentSection: 0,
    };
  },
  mounted() {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
          if (entry.isIntersecting) {
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: '-52px 0px 0px 0px',
      }
    );

    const animationElements = document.querySelectorAll('[animation]');
    animationElements.forEach((el) => {
      animationObserver.observe(el);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentSection = parseInt(
              entry.target.getAttribute('number') as string
            );
          }
        });
      },
      {
        rootMargin: '-52px 0px -90% 0px',
      }
    );

    const sections = document.querySelectorAll('[number]');
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
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
});
