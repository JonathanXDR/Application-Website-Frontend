<template>
  <component
    :is="componentType"
    :id="componentId"
    v-animation="scrollAnimation"
    :href="componentHref"
    :class="componentClasses"
    target="_blank"
  >
    <div v-if="hasCoverOrGraphs" class="card-cover-wrap">
      <picture v-if="cover" class="card-cover">
        <NuxtImg decoding="async" loading="lazy" :src="cover" />
      </picture>
      <BarGraph v-if="graphs?.bar" />
      <DonutGraph v-if="graphs?.donut" />
    </div>
    <div class="details" :style="detailsStyle">
      <Icon
        v-if="icon"
        :loading="loading"
        :name="icon.name"
        :component-size="icon.componentSize"
        :colors="icon.colors"
        :class="iconClasses"
        :style="{ position: icon.absolute ? 'absolute' : 'relative' }"
      />
      <div class="body" :style="{ alignItems: alignItems }">
        <div class="eyebrow">
          <template v-if="!loading">
            {{ eyebrow }}
          </template>
          <template v-else>
            <LoadingSkeleton width="150px" height="15px" />
          </template>
        </div>
        <div class="title-wrapper">
          <div class="title">
            <template v-if="!loading">
              {{ title || name }}
            </template>
            <template v-else>
              <LoadingSkeleton width="200px" height="15px" />
            </template>
          </div>

          <Badge
            v-if="archived"
            title="Public archive"
            component-size="xsmall"
            :loading="loading"
            :colors="{
              primary: 'var(--color-figure-yellow)',
              tertiary: 'var(--color-figure-yellow)'
            }"
            border
            :hover="false"
          />
          <Badge
            v-if="badge"
            :title="badge.title"
            :icon="badge.icon"
            :loading="loading"
            :colors="{
              primary: `var(--color-figure-${colorBadge?.colorName})`,
              tertiary: `var(--color-figure-${colorBadge?.colorName})`
            }"
            hover
            border
          />
        </div>
        <div class="card-content">
          <div class="content">
            <template v-if="!loading">
              {{ description }}
            </template>
            <template v-else>
              <LoadingSkeleton width="300px" height="15px" />
              <LoadingSkeleton width="300px" height="15px" />
              <LoadingSkeleton width="250px" height="15px" />
            </template>
          </div>
        </div>
        <BadgeBar
          v-if="hasBadgesOrTopics"
          :badges="badgesOrTopics"
          :loading="loading"
        />

        <div v-if="hasLinksOrHtmlUrl" class="ctas-wrapper">
          <!-- <ButtonItem variant="secondary" componentSize="small"> Test </ButtonItem> -->
          <!-- <NuxtLink href="photos://" class="icon-wrapper button button-reduced button-neutral">
            <span class="icon-copy"> Open</span>
          </NuxtLink> -->

          <LinkCollection
            :links="linkCollectionLinks"
            :loading="loading"
            :class="{ link: applyHover }"
          />
        </div>
        <InfoBar
          v-if="hasInfo"
          v-bind="{
            ...info,
            date: {
              ...info?.date,
              fixed: updated_at
            },
            loading: loading
          }"
        />
      </div>
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { CardItemType } from '~/types/common/CardItem'
import type { MinimalRepository } from '~/types/services/GitHub/Repository'

type Props = Partial<CardItemType> & Partial<MinimalRepository>

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  componentSize: 'medium',
  alignment: 'start',
  hover: 'auto',
  cover: '',
  loading: false,
  graphs: () => ({
    donut: false,
    bar: false
  }),
  date: () => ({
    formatOptions: () => ({
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    nowKey: 'updated'
  }),
  icon: () => ({
    name: '',
    absolute: false,
    position: 'left',
    alignment: 'start'
  })
})

const { colorBadge } = useColor()

const applyHover = computed(
  () =>
    (props.hover === 'auto' && props.links?.length === 1) ||
    props.hover === 'true'
)
const componentType = computed(() =>
  props.variant === 'article' ? 'div' : 'a'
)
const componentId = computed(
  () => props.title?.toLowerCase().replace(/ /g, '-') || ''
)
const componentHref = computed(() =>
  applyHover.value && props.links
    ? props.links[0]?.url || ''
    : props.html_url || ''
)
const componentClasses = computed(() => [
  'scroll-animation scroll-animation--off',
  props.variant,
  props.componentSize
])
const scrollAnimation = {
  add: 'scroll-animation--on',
  remove: 'scroll-animation--off'
}

const hasCoverOrGraphs = computed(
  () => props.cover || props.graphs?.donut || props.graphs?.bar
)
const hasBadgesOrTopics = computed(
  () => props.badges?.length || props.topics?.length
)
const badgesOrTopics = computed(() => props.badges || props.topics)
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

const hasInfo = computed(() => {
  const keys = [
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
  ]
  return keys.some((key: string) => (props as Record<string, unknown>)[key])
})

const info = computed(() => {
  return (
    props.info || {
      language: props.language || '',
      license: props.license?.name,
      forks: props.forks_count,
      networks: props.network_count,
      watchers: props.watchers_count,
      stars: props.stargazers_count,
      issues: props.open_issues_count,
      subscribers: props.subscribers_count,
      date: {
        fixed: props.updated_at,
        formatOptions: props?.info?.date.formatOptions,
        nowKey: props?.info?.date?.nowKey
      }
    }
  )
})

const flexDirection = computed(
  () =>
    ({
      top: 'column',
      right: 'row-reverse',
      bottom: 'column-reverse',
      left: 'row'
    }[props.icon?.position || 'left'])
)

const alignItems = computed(
  () =>
    ({
      start: 'flex-start',
      center: 'center',
      end: 'flex-end'
    }[props.alignment])
)

const detailsStyle = computed((): Record<string, string> => {
  return {
    flexDirection: flexDirection.value,
    alignItems: alignItems.value
  }
})

const iconClasses = computed(() => ({
  icon: true,
  'icon-large': props.variant === 'article' && props.componentSize === 'large',
  'icon-xlarge': ['medium', 'small'].includes(props.componentSize),
  'icon-xxlarge': props.variant === 'card' && props.componentSize === 'large'
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  gap: 12px;
  z-index: 1;
  /* background-color: var(--color-fill); */
}

.xsmall .details {
  padding: 20px;

  font-size: 14px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .details {
  padding: 22px;
  font-size: 15px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .details {
  gap: 24px;
  padding: 32px;
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .details {
  padding: 44px;
  font-size: 20px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.full .details {
  font-size: 17px;
  font-weight: 400;
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
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

/* ---------------------------------- body ---------------------------------- */

.full .body {
  width: 75% !important;
}

.body {
  width: 100%;
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
}

.xsmall .eyebrow {
  font-size: 14px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .eyebrow {
  font-size: 15px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .eyebrow {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .eyebrow {
  font-size: 20px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.full .eyebrow {
  font-size: 17px;
  font-weight: 600;
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

.xsmall .title {
  font-size: 14px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .title {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.medium .title {
  font-size: 21px;
  /* 20.2380952385px */
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.large .title {
  font-size: 28px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;

  /* Styles without cover */
  color: var(--color-card-content-text);
}

.full .title {
  font-size: 21px;
  font-weight: 600;
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
  font-weight: 700;
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
