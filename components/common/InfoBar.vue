<template>
  <div class="info">
    <template v-for="item in infoItems" :key="item.id">
      <div v-if="props[item.id]" class="info-item">
        <Icon
          v-if="item.icon"
          :name="item.icon.name"
          :loading="loading"
          class="info-icon"
        />
        <template v-if="!loading">
          {{ props[item.id] }}
        </template>
        <template v-else>
          <LoadingSkeleton width="100px" height="15px" />
        </template>
      </div>
    </template>

    <div v-if="props.date.fixed || props.date.duration" class="info-item">
      <Icon
        :loading="loading"
        :name="updatedYesterday ? 'clock.fill' : 'calendar'"
        class="info-icon"
      />
      <template v-if="!loading">
        {{
          dateTitle ||
          `${props.date.duration?.from} - ${props.date.duration?.to}`
        }}
      </template>
      <template v-else>
        <LoadingSkeleton width="100px" height="15px" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { InfoType } from '~/types/common/Info';
import type { ItemType } from '~/types/common/Item';

const props = withDefaults(defineProps<InfoType>(), {
  loading: false,
  date: () => ({
    formatOptions: () => ({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }),
});

dayjs.extend(relativeTime);

const { locale } = useI18n();
const infoItems: ItemType[] = [
  { id: 'location', icon: { name: 'location.fill' } },
  { id: 'supervisor', icon: { name: 'person.fill' } },
  { id: 'department', icon: { name: 'tag.fill' } },
  { id: 'language', icon: { name: 'bubble.left.fill' } },
  { id: 'license', icon: { name: 'scroll.fill' } },
  // {
  //   id: 'forks',
  //   icon: {
  //     name: 'doc.on.doc.fill'
  //   }
  // },
  // { id: 'networks', icon: { name: 'network' } },
  // {
  //   id: 'watchers',
  //   icon: { name: 'eye.fill' }
  // },
  // { id: 'stars', icon: { name: 'star.fill' } },
  // { id: 'issues', icon: { name: 'smallcircle.filled.circle' } },
  // { id: 'subscribers', icon: { name: 'bell.fill' } }
];

const updatedYesterday = computed(() => {
  if (!props.date.fixed) return false;
  const updatedDate = dayjs(props.date.fixed);
  const currentDate = dayjs();
  return currentDate.diff(updatedDate, 'day') <= 1;
});

const formatDate = (
  dateString: string,
  formatOptions: Intl.DateTimeFormatOptions
) => {
  return new Date(dateString).toLocaleDateString(locale.value, formatOptions);
};

const getDate = () => {
  const { duration, formatOptions, fixed, nowKey } = props.date;

  if (duration && formatOptions) {
    // August 2021 - February 2022
    const formattedDuration = `${formatDate(
      duration.from,
      formatOptions()
    )} - ${formatDate(duration.to, formatOptions())}`;

    return formattedDuration;
  } else if (fixed && nowKey) {
    // Updated ... ago
    const formattedNowKey = `${nowKey?.charAt(0).toUpperCase()}${nowKey?.slice(
      1
    )} ${dayjs(nowKey).locale(locale.value).fromNow()}`;

    return formattedNowKey;
  } else if (fixed && formatOptions) {
    // August 2021
    const formattedFixedDate = formatDate(fixed.toString(), formatOptions());

    return formattedFixedDate;
  }
};

// const getDate = () => {
//   const formatOptions = props.dateFormatOptions;
//   const dateVariant = props.dateNowKey;

//   if (props.info?.date?.from && props.info?.date?.to) {
//     return `${formatDate(props.info?.date.from, formatOptions)} - ${formatDate(
//       props.info?.date.to,
//       formatOptions
//     )}`;
//   } else if (props.info?.date?.from) {
//     return formatDate(props.info?.date.from, formatOptions);
//   } else if (props.date) {
//     return `${dateVariant.charAt(0).toUpperCase()}${dateVariant.slice(
//       1
//     )} ${dayjs(props.date).locale(locale.value).fromNow()}`;
//   }
// };

const dateTitle = getDate();
</script>

<style scoped>
.info {
  color: var(--color-figure-gray-secondary);
}

.info {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
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
