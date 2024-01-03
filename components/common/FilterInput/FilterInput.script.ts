import { defineComponent, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import DropDown from "~/components/common/DropDown/DropDown.vue";
import TagBar from "~/components/common/TagBar/TagBar.vue";
import type { OptionType } from "~/types/common/Option";

export default defineComponent({
  name: "FilterInput",
  components: {
    DropDown,
    TagBar,
  },
  setup() {
    const { tm } = useI18n();
    const items: Ref<OptionType[]> = ref(
      tm("components.common.FilterInput.items")
    );
    const options: Ref<OptionType[]> = ref(
      tm("components.common.FilterInput.sorts")
    );
    const open: Ref<boolean> = ref(false);

    const onFocus = () => {
      open.value = true;
    };

    const onBlur = () => {
      open.value = false;
    };

    return {
      items,
      options,
      open,
      onFocus,
      onBlur,
    };
  },
});
