import { defineComponent, type PropType } from "vue";
import type { OptionType } from "~/types/common/Option";

export default defineComponent({
  name: "DropDown",
  props: {
    options: {
      type: Array as PropType<OptionType[]>,
      required: true,
      default: () => [],
    },
    label: {
      type: String as PropType<string>,
      required: false,
      default: undefined,
    },
  },
});
