import ShareSheet from "../ShareSheet/ShareSheet.vue";
import json from "@/assets/data/data.json";

export default {
  name: "FooterSection",
  components: {
    ShareSheet,
  },
  data() {
    return {
      data: json,
    };
  },
};
