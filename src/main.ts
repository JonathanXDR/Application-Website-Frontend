import useSectionStore from "@/stores/navbarSections";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { MotionPlugin } from "@vueuse/motion";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createMetaManager } from "vue-meta";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

library.add(faEnvelope, faLinkedin, faGithub, faTwitter);

const app = createApp(App);

app.use(createPinia());
app.use(createMetaManager());
app.use(router);
app.use(MotionPlugin);
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

app.mount("#app");
