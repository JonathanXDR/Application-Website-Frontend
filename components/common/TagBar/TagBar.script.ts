import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "TagBar",
  props: {
    tags: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => [],
    },
  },
});
