import { defineComponent } from "vue";
import json from "@/assets/lang/de.json";

import ShareSheet from "../ShareSheet/ShareSheet.vue";

export default defineComponent({
  name: "FooterItem",
  components: {
    ShareSheet,
  },
  data() {
    return {
      json: json,
      currentYear: new Date().getFullYear(),
    };
  },
  created() {
    if (localStorage.getItem("language") === null) {
      const preferedLanguage = window.navigator.language;
      this.changeLang(preferedLanguage);
    } else {
      this.changeLang(localStorage.getItem("language") as string);
    }
  },
  methods: {
    changeLang(lang: string) {
      this.$i18n.locale = ["de", "en", "fr", "it"].includes(lang) ? lang : "de";
      localStorage.setItem("language", this.$i18n.locale);

      // fetch data again with new language in every component
    },
  },
});
