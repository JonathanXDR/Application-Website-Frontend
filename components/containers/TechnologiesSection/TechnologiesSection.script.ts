import CardItem from "~/components/common/CardItem/CardItem.vue";

import { computed, defineComponent, type PropType, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import FilterInput from "~/components/common/FilterInput/FilterInput.vue";
import LinkCollection from "~/components/common/LinkCollection/LinkCollection.vue";
import LiveResultSummary from "~/components/common/LiveResultSummary/LiveResultSummary.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import NavBarExtension from "~/components/common/NavBarExtension/NavBarExtension.vue";
import ResultBlankState from "~/components/common/ResultBlankState/ResultBlankState.vue";
import RibbonBar from "~/components/common/RibbonBar/RibbonBar.vue";
import ShareSheet from "~/components/common/ShareSheet/ShareSheet.vue";
import TimeLine from "~/components/common/TimeLine/TimeLine.vue";
import type { CardItemType } from "~/types/common/CardItem";

export default defineComponent({
  name: "TechnologiesSection",
  components: {
    LoadingSpinner,
    RibbonBar,
    NavBarExtension,
    LinkCollection,
    ShareSheet,
    TimeLine,
    FilterInput,
    CardItem,
    LiveResultSummary,
    ResultBlankState,
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
    const cards: Ref<CardItemType[]> = computed(() =>
      tm("components.containers.technologies"),
    );

    return {
      props,
      tm,
      cards,
    };
  },
});
