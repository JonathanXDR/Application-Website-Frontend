import { computed, defineComponent, type PropType, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageBar from "~/components/common/LanguageBar/LanguageBar.vue";
import LanguageBarV2 from "~/components/common/LanguageBarV2/LanguageBarV2.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import TabList from "~/components/common/TabList/TabList.vue";
import type { LanguageBarType } from "~/types/common/LanguageBar";

export default defineComponent({
  name: "LanguagesSection",
  components: {
    LoadingSpinner,
    TabList,
    LanguageBar,
    LanguageBarV2,
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
  },
  setup(props) {
    const { tm } = useI18n();
    const languages: Ref<LanguageBarType[]> = computed(() =>
      tm("components.containers.languages")
    );

    return {
      props,
      tm,
      languages,
    };
  },
});
