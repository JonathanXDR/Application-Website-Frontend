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
});
