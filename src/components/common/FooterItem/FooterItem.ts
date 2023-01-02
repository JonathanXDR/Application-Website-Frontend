import { defineComponent } from "vue";
import json from "@/assets/data/data.json";

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
    }
  },
  methods: {
    changeLang(lang: string) {
      this.$i18n.locale = ["de", "en", "fr", "it"].includes(lang) ? lang : "de";
    },
  },
});
