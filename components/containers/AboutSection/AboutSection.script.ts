import { computed, defineComponent, onMounted, type PropType } from "vue";
import { useI18n } from "vue-i18n";
import CardItem from "~/components/common/CardItem/CardItem.vue";
import LinkCollection from "~/components/common/LinkCollection/LinkCollection.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import RibbonBar from "~/components/common/RibbonBar/RibbonBar.vue";
import ShareSheet from "~/components/common/ShareSheet/ShareSheet.vue";
import TimeLine from "~/components/common/TimeLine/TimeLine.vue";
import type { DateItemType } from "~/types/common/DateItem";
import type { LinkType } from "~/types/common/Link";

export default defineComponent({
  name: "AboutSection",
  components: {
    LoadingSpinner,
    RibbonBar,
    CardItem,
    LinkCollection,
    ShareSheet,
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
    const { locale, tm } = useI18n();
    const links: Ref<LinkType[]> = computed(() =>
      tm("components.containers.about.links")
    );
    const dateItems: Ref<DateItemType[]> = tm(
      "components.containers.about.dates"
    );
    const dates: Ref<{
      age: string | undefined;
      apprenticeshipYear: string | undefined;
    }> = ref({
      age: undefined,
      apprenticeshipYear: undefined,
    });

    const calculateYears = (date: string) => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const regionCode = navigator.language.split("-")[1];
      const customLocale = `${locale.value}-${regionCode}`;
      const currentDate = new Date(Date.now());

      const currentLocaleDate = currentDate.toLocaleDateString(customLocale, {
        timeZone: timeZone,
      });

      const startDate = new Date(date);
      const difference = new Date(currentDate.getTime() - startDate.getTime());
      const years = Math.abs(
        difference.getUTCFullYear() - new Date(0).getUTCFullYear()
      );
      return years;
    };

    onMounted(async () => {
      dateItems.value.forEach((item) => {
        dates.value[item.key as keyof typeof dates.value] = String(
          calculateYears(item.date)
        );
      });
    });
    return {
      window,
      props,
      tm,
      links,
      dates,
      calculateYears,
    };
  },
});
