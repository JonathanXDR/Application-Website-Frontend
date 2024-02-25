<template>
  <component
    :is="componentType"
    :id="componentId"
    :href="componentHref"
    :class="componentClasses"
    target="_blank"
    v-animation="scrollAnimation"
  >
    <div v-if="hasCoverOrGraphs" class="card-cover-wrap">
      <picture v-if="cover" class="card-cover">
        <NuxtImg decoding="async" loading="lazy" :src="cover" />
      </picture>
      <BarGraph v-if="graphs.bar" />
      <DonutGraph v-if="graphs.donut" />
    </div>
    <div class="details" :style="detailsStyle">
      <Icon
        v-if="icon"
        :name="icon.name"
        :size="icon.size"
        :colors="icon.colors"
        :class="iconClasses"
      />
      <div class="body" :style="{ alignItems: alignItems }">
        <div v-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
        <div class="title-wrapper">
          <div class="title">{{ title || name }}</div>
          <Badge v-if="archived" title="Public archive" color="yellow" />
        </div>
        <div v-if="description" class="card-content">
          <div class="content">{{ description }}</div>
        </div>
        <TagBar v-if="hasTagsOrTopics" :tags="tagsOrTopics" />
        <div v-if="hasLinksOrHtmlUrl" class="ctas-wrapper">
          <LinkCollection
            :links="linkCollectionLinks"
            :class="{ link: applyHover }"
          />
        </div>
        <InfoBar
          v-if="hasInfo"
          :info="infoBarInfo"
          :date="updated_at"
          :dateFormatOptions="date.formatOptions"
          :dateNowKey="date.nowKey"
        />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import type { ListUserRepoResponse } from '~/types/GitHub/Repository'
import type { CardItemType } from '~/types/common/CardItem'

type Props = Partial<CardItemType> & Partial<ListUserRepoResponse>

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  size: 'medium',
  alignment: 'start',
  hover: 'auto',
  cover: '',
  graphs: {
    donut: false,
    bar: false
  },
  date: {
    formatOptions: () => ({
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    nowKey: 'updated'
  },
  icon: {
    position: 'left',
    alignment: 'start'
  }
})

const applyHover = computed(
  () =>
    (props.hover === 'auto' && props.links?.length === 1) ||
    props.hover === 'true'
)

const componentType = computed(() =>
  props.variant === 'article' ? 'div' : 'a'
)
const componentId = computed(() =>
  props.title?.toLowerCase().replace(/ /g, '-')
)
const componentHref = computed(() =>
  applyHover.value && props.links ? props.links[0].url : props.html_url
)
const componentClasses = computed(() => [
  'scroll-animation scroll-animation--off',
  props.variant,
  props.size
])
const scrollAnimation = {
  add: 'scroll-animation--on',
  remove: 'scroll-animation--off'
}

const hasCoverOrGraphs = computed(
  () => props.cover || props.graphs?.donut || props.graphs?.bar
)
const hasTagsOrTopics = computed(
  () => props.tags?.length || props.topics?.length
)
const tagsOrTopics = computed(() => props.tags || props.topics)
const hasLinksOrHtmlUrl = computed(() => props.links?.length || props.html_url)
const linkCollectionLinks = computed(
  () =>
    props.links || [
      {
        title: 'Mehr erfahren',
        url: props.html_url || '',
        icon: { name: 'chevron.right' }
      }
    ]
)

const hasInfo = computed(() =>
  Object.keys(props).some(
    key =>
      [
        'info',
        'created_at',
        'updated_at',
        'language',
        'license',
        'forks_count',
        'network_count',
        'watchers_count',
        'stargazers_count',
        'open_issues_count',
        'subscribers_count'
      ].includes(key) && props[key]
  )
)
const infoBarInfo = computed(
  () =>
    props.info || {
      language: props.language,
      license: props.license?.name,
      forks: props.forks_count,
      networks: props.network_count,
      watchers: props.watchers_count,
      stars: props.stargazers_count,
      issues: props.open_issues_count,
      subscribers: props.subscribers_count,
      date: props.updated_at
    }
)

const flexDirection = computed(
  () =>
    ({
      top: 'column',
      right: 'row-reverse',
      bottom: 'column-reverse',
      left: 'row'
    }[props.icon.position])
)

const alignItems = computed(
  () =>
    ({
      start: 'flex-start',
      center: 'center',
      end: 'flex-end'
    }[props.alignment])
)

const detailsStyle = computed(() => ({
  flexDirection: flexDirection.value,
  alignItems: alignItems.value
}))

const iconClasses = computed(() => ({
  icon: true,
  'icon-large': props.variant === 'article' && props.size === 'large',
  'icon-xlarge': ['medium', 'small'].includes(props.size),
  'icon-xxlarge': props.variant === 'card' && props.size === 'large'
}))
</script>

<style scoped>
/* ------------------------------- button-cta ------------------------------- */

.ctas-wrapper {
  margin-top: 12px;
  display: flex;
  align-items: center;
}

.ctas-wrapper .button {
  margin-right: 10px;
}

/* ------------------------------- card-cover ------------------------------- */

.card-cover {
  background-color: var(--color-fill);
  display: block;
  height: var(--card-cover-height, 180px);
}

.card-cover img {
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  display: block;
  margin: 0;
}

.card-cover img {
  height: 100%;
}

/* ---------------------------------- card ---------------------------------- */

.card.medium {
  border-radius: 17px;
}

.card.large {
  border-radius: 18px;
}

.card.color {
  border: 1px solid var(--color-figure) !important;
}

.card {
  width: 100%;
  /* height: 100%; */
  overflow: hidden;
  display: block;
  transition: box-shadow, transform 0.16s ease-out;
  will-change: box-shadow, transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 16px;

  /* Styles without cover */
  transition: transform 0.16s ease-out, background-color 0.16s ease-out,
    border-color 0.16s ease-out;
  border: 1px solid var(--color-fill-gray-tertiary);
}

.card:hover {
  text-decoration: none;

  /* Styles without cover */
  border-color: var(--color-figure-blue);
}

.card.color:hover {
  background-color: var(--color-fill) !important;
  border-color: var(--color-figure) !important;
}

.card:hover {
  box-shadow: 0 5px 10px var(--color-card-shadow);
  transform: scale(1.007);
}

@media only screen and (max-width: 735px) {
  .card {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    box-shadow: none;
    transform: none;
  }
}

/* ------------------------------ featured-card ----------------------------- */

.full {
  color: var(--color-fill-gray);
  margin-bottom: 15px;
  position: relative;
  --card-height: 435px;
  --card-cover-height: 100%;
}

.full :hover .link {
  background: var(--color-button-background-hover);
  text-decoration: none;
}

.full .card-cover {
  background-color: var(--color-code);
}

.card-content {
  color: var(--color-card-content-text);
  /* margin-top: 4px; */
}

.full .content,
.full .title {
  color: var(--color-welcome-featured-card-content);
}

/* --------------------------------- details -------------------------------- */

.article {
  width: 100%;
}

.article .details {
  padding: 0 !important;
}

.details {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
  /* background-color: var(--color-fill); */
  padding: 20px;
  position: relative;
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .details {
  gap: 24px;
  padding: 32px;
  font-size: 17px;
  line-height: 1.4705882353;
  font-weight: 400;
  /* letter-spacing: -0.022em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .details {
  padding: 44px;
  font-size: 20px;
  line-height: 1.6470588235;
  font-weight: 400;
  /* letter-spacing: -0.028em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.full .details {
  font-size: 17px;
  line-height: 1.4705882353;
  font-weight: 400;
  /* letter-spacing: -0.022em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: transparent;
}

.full .details {
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

/* ---------------------------------- body ---------------------------------- */

.full .body {
  width: 75% !important;
}

.body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
}

/* --------------------------------- eyebrow -------------------------------- */

.eyebrow {
  color: var(--color-figure-gray-secondary);
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 600;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .eyebrow {
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  /* letter-spacing: -0.024em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .eyebrow {
  font-size: 20px;
  line-height: 1.4705882353;
  font-weight: 600;
  /* letter-spacing: -0.032em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.full .eyebrow {
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  /* letter-spacing: -0.024em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: var(--color-welcome-featured-card-eyebrow-text);
}

/* ---------------------------------- title --------------------------------- */

.title-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.title {
  color: var(--color-card-content-text);
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  /* letter-spacing: -0.024em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.title {
  color: var(--color-card-content-text);
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  /* letter-spacing: -0.024em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.title {
  font-size: 14px;
  /* 21.8581628569 */
  line-height: 1.2857742857;
  font-weight: 600;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .title {
  font-size: 21px;
  /* 20.2380952385px */
  line-height: 1.1904761905;
  font-weight: 600;
  /* letter-spacing: 0.011em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .title {
  font-size: 28px;
  line-height: 1.0947058824;
  font-weight: 600;
  /* letter-spacing: 0.032em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;

  /* Styles without cover */
  color: var(--color-card-content-text);
}

.full .title {
  font-size: 21px;
  line-height: 1.1904761905;
  font-weight: 600;
  /* letter-spacing: 0.011em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

/* ---------------------------------- link ---------------------------------- */

.link {
  /* color: var(--color-fill-gray); */
  color: var(--color-figure-blue);
  /* margin-top: 17px; */
  display: flex;
  align-items: baseline;
}

.full .link {
  margin-top: 15px;
  position: static;
}

@media only screen and (max-width: 1250px) {
  .full {
    --card-height: 307px;
    margin-bottom: 15px;
  }

  .full .details {
    right: 58px;
    width: 288px;
  }
}

@media only screen and (max-width: 735px) {
  .card {
    margin-left: auto;
    margin-right: auto;
  }

  .full {
    --card-height: auto;
    margin-bottom: 20px;
    max-width: 300px;
    min-width: 280px;
    --card-cover-height: 227px;
  }

  .full .card-cover img {
    -o-object-position: -3px center;
    object-position: -3px center;
    width: 688px;
  }

  .full .details {
    background-color: var(--color-welcome-featured-card-details-small);
    display: block;
    height: unset;
    padding: 17px;
    position: relative;
    right: unset;
    top: unset;
    width: unset;
  }

  .full .eyebrow {
    color: var(--color-welcome-featured-card-eyebrow-text-small);
  }

  .full .content,
  .full .title {
    color: var(--color-welcome-featured-card-content-small);
  }

  .full .title {
    font-weight: 600;
  }

  .full .link {
    display: inline-block;
    margin-top: 10px;
  }
}

/* ----------------------------- tile-category ----------------------------- */

.tile-category {
  color: var(--color-figure-gray-secondary);
}

.tile-category {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 700;
  /* letter-spacing: -0.01em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.tile-2up .tile-category {
  margin-bottom: 8px;
}

@media only screen and (max-width: 1068px) {
  .tile-2up .tile-category {
    margin-bottom: 8px;
  }
}

@media only screen and (max-width: 734px) {
  .tile-2up .tile-category {
    margin-bottom: 8px;
  }
}
</style>
