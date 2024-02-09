<template>
  <div class="info">
    <div v-if="info?.location" class="info-item">
      <Icon name="location.fill" class="info-icon" />
      {{ info.location }}
    </div>
    <div v-if="info?.supervisor" class="info-item">
      <Icon name="person.fill" class="info-icon" />
      {{ info.supervisor }}
    </div>
    <div v-if="info?.department" class="info-item">
      <Icon name="tag.fill" class="info-icon" />
      {{ info.department }}
    </div>
    <div v-if="info?.language" class="info-item">
      <Icon name="bubble.left.fill" class="info-icon" />
      {{ info?.language }}
    </div>
    <div v-if="info?.license" class="info-item">
      <Icon name="scroll.fill" class="info-icon" />
      {{ info?.license }}
    </div>
    <!-- <div v-if="info?.forks" class="info-item">
      <Icon name="doc.on.doc.fill" class="info-icon" />
      {{ info?.forks }}
    </div>
    <div v-if="info?.networks" class="info-item">
      <Icon name="network" class="info-icon" />
      {{ info?.networks }}
    </div>
    <div v-if="info?.watchers" class="info-item">
      <Icon name="eye.fill" class="info-icon" />
      {{ info?.watchers }}
    </div>
    <div v-if="info?.stars" class="info-item">
      <Icon name="star.fill" class="info-icon" />
      {{ info?.stars }}
    </div>
    <div v-if="info?.issues?.length" class="info-item">
      <Icon name="smallcircle.filled.circle" class="info-icon" />
      {{ info?.issues?.length }}
    </div>
    <div v-if="info?.subscribers" class="info-item">
      <Icon name="bell.fill" class="info-icon" />
      {{ info?.subscribers }}
    </div> -->
    <div v-if="info?.date" class="info-item">
      <Icon
        :name="updatedYesterday ? 'clock.fill' : 'calendar'"
        class="info-icon"
      />
      {{ dateTitle || `${info?.date?.from} - ${info?.date?.to}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import type { InfoType } from "~/types/common/Info";

const props = withDefaults(
  defineProps<{
    info: InfoType;
    date?: string;
    dateFormatOptions?: Intl.DateTimeFormatOptions;
    dateNowKey?: "created" | "updated";
  }>(),
  {
    info: (): InfoType => {
      return {};
    },

    dateFormatOptions: () => {
      return {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    },

    dateNowKey: "updated",
  }
);

dayjs.extend(relativeTime);

const { locale } = useI18n({ useScope: "global" });
const updatedYesterday = computed(() => {
  if (!props.date) return false;
  const updatedDate = dayjs(props.date);
  const currentDate = dayjs();
  return currentDate.diff(updatedDate, "day") <= 1;
});

const formatDate = (
  dateString: string,
  formatOptions: Intl.DateTimeFormatOptions
) => {
  return new Date(dateString).toLocaleDateString(locale.value, formatOptions);
};

const getDate = () => {
  const formatOptions = props.dateFormatOptions;
  const dateVariant = props.dateNowKey;

  if (props.info?.date?.from && props.info?.date?.to) {
    return `${formatDate(props.info?.date.from, formatOptions)} - ${formatDate(
      props.info?.date.to,
      formatOptions
    )}`;
  } else if (props.info?.date?.from) {
    return formatDate(props.info?.date.from, formatOptions);
  } else if (props.date) {
    return `${dateVariant.charAt(0).toUpperCase()}${dateVariant.slice(
      1
    )} ${dayjs(props.date).locale(locale.value).fromNow()}`;
  }
};

const dateTitle = getDate();
</script>

<style scoped>
.info {
  color: var(--color-figure-gray-secondary);
}

.info {
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.28577;
  font-weight: 600;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.info-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.tile-2up .info {
  margin-top: 12px;
}

@media only screen and (max-width: 1068px) {
  .tile-2up .info {
    margin-top: 8px;
  }
}

@media only screen and (max-width: 734px) {
  .tile-2up .info {
    margin-top: 8px;
  }
}

.info-icon {
  /* height: 0.6em;
  width: 0.6em; */
  height: 1em;
  width: 1em;
  margin-right: 0.3em;
}
</style>
