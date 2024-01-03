import dayjs from "dayjs";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import { computed, defineComponent, type PropType } from "vue";
import { useI18n } from "vue-i18n";
import Icon from "~/components/common/Icons/Icon.vue";
import type { InfoType } from "~/types/common/Info";

dayjs.extend(relativeTime);

export default defineComponent({
  name: "InfoBar",
  components: {
    Icon,
  },
  props: {
    info: {
      type: Object as PropType<InfoType>,
      required: true,
      default: () => {},
    },
    date: {
      type: String as PropType<string>,
      required: false,
      default: undefined,
    },
    dateFormatOptions: {
      type: Object as PropType<Intl.DateTimeFormatOptions>,
      required: false,
      default: () => ({
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    dateNowKey: {
      type: String as PropType<"created" | "updated">,
      required: false,
      default: "updated",
    },
  },
  setup(props) {
    const { locale } = useI18n({ useScope: "global" });
    const updatedYesterday = computed(() => {
      if (!props.date) return false;
      const updatedDate = dayjs(props.date);
      const currentDate = dayjs();
      return currentDate.diff(updatedDate, "day") <= 1;
    });

    const formatDate = (
      dateString: string,
      formatOptions: Intl.DateTimeFormatOptions,
    ) => {
      return new Date(dateString).toLocaleDateString(
        locale.value,
        formatOptions,
      );
    };

    const getDate = () => {
      const formatOptions = props.dateFormatOptions;
      const dateVariant = props.dateNowKey;

      if (props.info?.date?.from && props.info?.date?.to) {
        return `${formatDate(
          props.info?.date.from,
          formatOptions,
        )} - ${formatDate(props.info?.date.to, formatOptions)}`;
      } else if (props.info?.date?.from) {
        return formatDate(props.info?.date.from, formatOptions);
      } else if (props.date) {
        return `${dateVariant.charAt(0).toUpperCase()}${dateVariant.slice(
          1,
        )} ${dayjs(props.date).locale(locale.value).fromNow()}`;
      }
    };

    return {
      updatedYesterday,
      dateTitle: getDate(),
    };
  },
});
