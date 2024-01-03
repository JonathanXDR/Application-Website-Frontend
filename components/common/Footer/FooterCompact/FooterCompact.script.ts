import { defineComponent, ref } from "vue";
import LanguagePicker from "~/components/common/LanguagePicker/LanguagePicker.vue";
import ShareSheet from "~/components/common/ShareSheet/ShareSheet.vue";

export default defineComponent({
  name: "FooterItem",
  components: {
    LanguagePicker,
    ShareSheet,
  },
  setup() {
    const currentYear = ref(new Date().getFullYear());

    return {
      currentYear,
    };
  },
});
