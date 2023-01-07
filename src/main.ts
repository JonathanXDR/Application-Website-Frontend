import { createApp } from "vue";
import { createPinia } from "pinia";
import { createMetaManager } from "vue-meta";
import { createI18n } from "vue-i18n";
import useSectionStore from "@/stores/navbarSections";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { MotionPlugin } from "@vueuse/motion";

import { defaultLocale, fallbackLocale, languages } from "@/assets/lang/index";
import "./assets/main.css";

const app = createApp(App);

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: fallbackLocale,
  messages: languages,
});

app.use(createPinia());
app.use(createMetaManager());
app.use(i18n);
app.use(router);
app.use(MotionPlugin);

library.add(faEnvelope, faLinkedin, faGithub, faTwitter);

app.component("font-awesome-icon", FontAwesomeIcon);

app.directive("animation", (el) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 1,
      rootMargin: "-52px 0px 0px 0px",
    }
  );
  observer.observe(el);
});

app.directive("section", (el, binding) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          useSectionStore().setCurrentSection(el.id, binding.value);
        }
      });
    },
    {
      rootMargin: "-52px 0px -94% 0px",
    }
  );
  observer.observe(el);
});

export default i18n;
app.mount("#app");
