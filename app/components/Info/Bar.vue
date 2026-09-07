<script setup lang="ts">
const props = withDefaults(defineProps<InfoBarType>(), {
  loading: false,
  date: () => ({
    formatOptions: () => ({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }),
})

const { locale } = useI18n()
const infoItems: { id: keyof InfoBarType, icon: IconItemType }[] = [
  { id: 'location', icon: { name: 'sf-symbols:location.fill' } },
  { id: 'supervisor', icon: { name: 'sf-symbols:person.fill' } },
  { id: 'department', icon: { name: 'sf-symbols:tag.fill' } },
  { id: 'language', icon: { name: 'sf-symbols:bubble.left.fill' } },
  { id: 'license', icon: { name: 'sf-symbols:scroll.fill' } },
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
]

const DAY_MS = 24 * 60 * 60 * 1000

// Every route is prerendered, so a clock read during render is baked at build
// time and the icon below would stay on `clock.fill` long after the update
// stopped being recent. `useState` carries the render-time value through the
// payload so the server and the first client render agree, then the first
// mounted instance corrects it, the same trick as `useCurrentYear`. The
// threshold makes only that first instance write. Every later one already
// sees a fresh value, so a card grid does not trigger one update per card.
const renderedAt = useState('rendered-at', () => Date.now())

onMounted(() => {
  if (Date.now() - renderedAt.value > 60_000) renderedAt.value = Date.now()
})

// Preserves the previous `dayjs().diff(date, 'day') <= 1` semantics: a
// truncated day difference of 0 or 1, i.e. anything inside the last 48 hours.
const updatedYesterday = computed(() => {
  if (!props.date.fixed) return false
  const elapsed = renderedAt.value - new Date(props.date.fixed).getTime()
  return Math.floor(elapsed / DAY_MS) <= 1
})

const formatDate = (
  dateString: string,
  formatOptions: Intl.DateTimeFormatOptions,
) => {
  return new Date(dateString).toLocaleDateString(locale.value, formatOptions)
}

// Which of the three date shapes this instance renders. Only `relative` needs
// a live component. The other two are absolute dates that Intl formats once.
const dateMode = computed(() => {
  const { duration, formatOptions, fixed, event } = props.date
  if (duration && formatOptions) return 'duration'
  if (fixed && event) return 'relative'
  if (fixed && formatOptions) return 'fixed'
  return 'none'
})

const dateTitle = computed(() => {
  const { duration, formatOptions, fixed } = props.date

  if (dateMode.value === 'duration' && duration && formatOptions) {
    return `${formatDate(duration.from, formatOptions())} - ${formatDate(
      duration.to,
      formatOptions(),
    )}`
  }
  if (dateMode.value === 'fixed' && fixed && formatOptions) {
    return formatDate(fixed.toString(), formatOptions())
  }
  return ''
})

// Defensive capitalization, for example "updated" -> "Updated". Every locale
// in `content/components/card-item.yml` already capitalizes the label, so
// this is a no-op today.
const eventLabel = computed(() => {
  const { event } = props.date
  if (!event) return ''
  return `${event.charAt(0).toUpperCase()}${event.slice(1)}`
})
</script>

<template>
  <div class="info">
    <template
      v-for="item in infoItems"
      :key="item.id"
    >
      <div
        v-if="props[item.id]"
        class="info-item"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon.name"
          :loading
          class="info-icon"
        />
        <template v-if="!loading">
          {{ props[item.id] }}
        </template>
        <template v-else>
          <LazyLoadingSkeleton
            width="100px"
            height="15px"
          />
        </template>
      </div>
    </template>

    <div
      v-if="props.date.fixed || props.date.duration"
      class="info-item"
    >
      <Icon
        :loading
        :name="
          updatedYesterday ? 'sf-symbols:clock.fill' : 'sf-symbols:calendar'
        "
        class="info-icon"
      />
      <template v-if="!loading">
        <!-- `<NuxtTime relative>` replaces dayjs' `fromNow()`. It formats with
             `Intl.RelativeTimeFormat`, and its `onPrehydrate` script recomputes
             the text before hydration, so the value is correct on a
             prerendered page instead of frozen at build time. -->
        <template v-if="dateMode === 'relative' && props.date.fixed">
          {{ eventLabel }}&nbsp;<NuxtTime
            :datetime="props.date.fixed"
            :locale="locale"
            relative
            numeric="auto"
          />
        </template>
        <template v-else>
          {{
            dateTitle
              || `${props.date.duration?.from} - ${props.date.duration?.to}`
          }}
        </template>
      </template>
      <template v-else>
        <LazyLoadingSkeleton
          width="100px"
          height="15px"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.info {
  color: var(--color-figure-gray-secondary);
}

.info {
  margin-top: 0.5em;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  row-gap: 6px;
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
    row-gap: 8px;
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
