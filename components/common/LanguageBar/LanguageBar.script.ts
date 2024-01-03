import { defineComponent, type PropType } from "vue";
import type { LanguageBarType } from "~/types/common/LanguageBar";

export default defineComponent({
  name: "LanguageBar",
  props: {
    language: {
      type: Object as PropType<LanguageBarType>,
      required: true,
      default: () => ({}),
    },
  },
});
