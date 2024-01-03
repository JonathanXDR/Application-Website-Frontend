import { computed, defineComponent, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import type { FaLinkType } from "~/types/common/FaLink";

export default defineComponent({
  name: "ShareSheet",
  components: {
    LoadingSpinner,
  },
  setup() {
    const { tm } = useI18n();
    const links: Ref<FaLinkType[]> = computed(() =>
      tm("components.common.ShareSheet.links")
    );

    return {
      tm,
      links,
    };
  },
});
