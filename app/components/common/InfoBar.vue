<template>
  <div class="info">
    <template v-for="item in infoItems" :key="item.id">
      <div v-if="properties[item.id]" class="info-item">
        <SFSymbol
          v-if="item.icon"
          :name="item.icon.name"
          :loading="loading"
          class="info-icon"
        />
        <template v-if="!loading">
          {{ properties[item.id] }}
        </template>
        <template v-else>
          <LoadingSkeleton width="100px" height="15px" />
        </template>
      </div>
    </template>

    <div
      v-if="properties.date.fixed || properties.date.duration"
      class="info-item"
    >
      <SFSymbol
        :loading="loading"
        :name="updatedYesterday ? 'clock.fill' : 'calendar'"
        class="info-icon"
      />
      <template v-if="!loading">
        {{
          dateTitle ||
          `${properties.date.duration?.from} - ${properties.date.duration?.to}`
        }}
      </template>
      <template v-else>
        <LoadingSkeleton width="100px" height="15px" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { IconType } from "~~/types/common/icon";
import type { InfoType } from "~~/types/common/info";

const properties = withDefaults(defineProps<InfoType>(), {
  loading: false,
  date: () => ({
    formatOptions: () => ({
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }),
});

dayjs.extend(relativeTime);

const { locale } = useI18n();
const infoItems: { id: keyof InfoType; icon: IconType }[] = [
  { id: "location", icon: { name: "location.fill" } },
  { id: "supervisor", icon: { name: "person.fill" } },
  { id: "department", icon: { name: "tag.fill" } },
  { id: "language", icon: { name: "bubble.left.fill" } },
  { id: "license", icon: { name: "scroll.fill" } },
  // { id: "forks", icon: { name: "document.on.document.fill" } },
  // { id: "networks", icon: { name: "network" } },
  // { id: "watchers", icon: { name: "eye.fill" } },
  // { id: "stars", icon: { name: "star.fill" } },
  // { id: "issues", icon: { name: "smallcircle.filled.circle.fill" } },
  // { id: "pullRequests", icon: { name: "arrow.trianglehead.pull" } },
  // { id: "subscribers", icon: { name: "bell.fill" } },
  // { id: "tags", icon: { name: "tag.fill" } },
  // { id: "commits", icon: { name: "doc.text.fill" } },
  // { id: "branches", icon: { name: "arrow.branch" } },
  // { id: "contributors", icon: { name: "person.2.fill" } },
];

const updatedYesterday = computed(() => {
  if (!properties.date.fixed) return false;
  const updatedDate = dayjs(properties.date.fixed);
  const currentDate = dayjs();
  return currentDate.diff(updatedDate, "day") <= 1;
});

const formatDate = (
  dateString: string,
  formatOptions: Intl.DateTimeFormatOptions,
) => {
  return new Date(dateString).toLocaleDateString(locale.value, formatOptions);
};

const getDate = () => {
  const { duration, formatOptions, fixed, event } = properties.date;

  if (duration && formatOptions) {
    const formattedDuration = `${formatDate(
      duration.from,
      formatOptions(),
    )} - ${formatDate(duration.to, formatOptions())}`;

    return formattedDuration;
  } else if (fixed && event) {
    const formattedevent = `${event?.charAt(0).toUpperCase()}${event?.slice(
      1,
    )} ${dayjs(fixed).locale(locale.value).fromNow()}`;

    return formattedevent;
  } else if (fixed && formatOptions) {
    const formattedFixedDate = formatDate(fixed.toString(), formatOptions());

    return formattedFixedDate;
  }
};

const dateTitle = ref(getDate());

watch([locale, () => properties.date], () => {
  dayjs.locale(locale.value);
  dateTitle.value = getDate();
});
</script>

<style scoped>
.info {
  color: var(--color-figure-gray-secondary);
}

.info {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media only screen and (min-width: 768px) {
  .info {
    margin-top: 12px;
    gap: 16px;
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
