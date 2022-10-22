import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { MotionPlugin } from '@vueuse/motion';

library.add(faEnvelope, faLinkedin, faGithub, faTwitter);

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.component('font-awesome-icon', FontAwesomeIcon);

app.directive('animation', {
  mounted: (el, binding) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: '-52px 0px 0px 0px',
      }
    );
    observer.observe(el);
  },
});

app.directive('section', {
  mounted: (el, binding) => {
    const observer = new IntersectionObserver(
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
    observer.observe(el);
  },
});

app.mount('#app');
