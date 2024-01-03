import CardItem from "~/components/common/CardItem/CardItem.vue";

import { computed, defineComponent, type PropType, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import LinkCollection from "~/components/common/LinkCollection/LinkCollection.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import RibbonBar from "~/components/common/RibbonBar/RibbonBar.vue";
import ShareSheet from "~/components/common/ShareSheet/ShareSheet.vue";
import TimeLine from "~/components/common/TimeLine/TimeLine.vue";
import type { CardItemType } from "~/types/common/CardItem";

export default defineComponent({
  name: "OtherSection",
  components: {
    LoadingSpinner,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardItem,
    TimeLine,
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
    const articles: Ref<CardItemType[]> = computed(() =>
      tm("components.containers.other")
    );

    return {
      window,
      props,
      tm,
      articles,
    };
  },
});
