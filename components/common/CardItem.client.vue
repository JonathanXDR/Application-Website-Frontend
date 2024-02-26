<template>
  <component
    :is="variant === 'article' ? 'div' : 'a'"
    :id="card.title?.toLowerCase().replace(/ /g, '-')"
    :href="applyHover && card.links ? card.links[0].url : card.html_url"
    :class="['scroll-animation scroll-animation--off', variant, size]"
    target="_blank"
    v-animation="{
      add: 'scroll-animation--on',
      remove: 'scroll-animation--off'
    }"
  >
    <div v-if="cover || donutGraph || barGraph" class="card-cover-wrap">
      <picture v-if="cover" class="card-cover">
        <NuxtImg decoding="async" loading="lazy" :src="cover" />
      </picture>
      <div v-if="barGraph">
        <div class="group group-hispanic typography-body-tight">
          <p>
            <span class="semibold"> <span data-value>27.1</span>% </span>
            <span>Hispanic/Latinx</span>
          </p>
          <div class="bar-container">
            <div class="bar" data-bar style="width: 27.1%"></div>
          </div>
        </div>
        <div class="group group-white typography-body-tight">
          <p>
            <span class="semibold"> <span data-value>39.7</span>% </span>
            <span>White</span>
          </p>
          <div class="bar-container">
            <div class="bar" data-bar style="width: 39.7%"></div>
          </div>
        </div>
      </div>
      <div v-if="donutGraph" class="container">
        <div class="donut-container">
          <figure class="donut">
            <svg class="ac-graph-svg ac-graph-donut">
              <path
                class="ac-graph-path donut-wedge wedge-1"
                d="M 113.99911851558227 0.07271925905595822 A 110 110 0 0 1 106.00088148441777 219.92728074094404 A 110 110 0 0 1 25.14997985191927 180.00338621002766 L 32.09225422767132 174.27583642920723 A 101 101 0 0 0 106.32808209023814 210.93323049850318 A 101 101 0 0 0 113.6719179097619 9.066769501496836 Z"
              ></path>
              <path
                class="ac-graph-path donut-wedge wedge-2"
                d="M 20.287609232531437 173.6528628011735 A 110 110 0 0 1 105.31027149295572 0.10001616683369718 L 105.69397655262298 9.09183302591093 A 101 101 0 0 0 27.62771393168795 168.44490129925933 Z"
              ></path>
            </svg>
          </figure>
          <h4
            class="sector-labels typography-donut-label"
            style="color: var(--color-fill-tertiary) !important"
          >
            <span>Global</span>
          </h4>
        </div>
        <div class="wedge-legend typography-donut-label female">
          <span>
            <span class="semibold">Female</span>
            <br />
            <span data-value>35.3</span>%
          </span>
        </div>
        <div class="wedge-legend typography-donut-label male">
          <span>
            <span class="semibold">Male</span>
            <br />
            <span data-value>64.6</span>%
          </span>
        </div>
      </div>
    </div>
    <div
      class="details"
      :style="{
        'flex-direction': getFlexDirection(),
        'align-items': getAlignItems()
      }"
    >
      <Icon
        v-if="card.icon"
        :name="card.icon?.name"
        :size="card.icon?.size"
        :colors="card.icon?.colors"
        :class="[
          'icon',
          {
            'icon-large': variant === 'article' && size === 'large'
          },
          {
            'icon-xlarge': size === 'medium' || size === 'small'
          },
          {
            'icon-xxlarge': variant === 'card' && size === 'large'
          }
        ]"
      />
      <div class="body">
        <div v-if="card.eyebrow" class="eyebrow">{{ card.eyebrow }}</div>
        <div class="title-wrapper">
          <div class="title">{{ card.title || card.name }}</div>
          <Badge v-if="card.archived" title="Public archive" color="yellow" />
        </div>
        <div v-if="card.description" class="card-content">
          <div class="content">
            {{ card.description }}
          </div>
        </div>
        <TagBar
          v-if="card.tags?.length || card.topics?.length"
          :tags="card.tags || card.topics"
        />
        <div v-if="card.links?.length || card.html_url" class="ctas-wrapper">
          <!-- <ButtonItem variant="secondary" size="small"> Test </ButtonItem> -->
          <!-- <NuxtLink href="photos://" class="icon-wrapper button button-reduced button-neutral">
            <span class="icon-copy"> Open</span>
          </NuxtLink> -->

          <LinkCollection
            v-if="card.links?.length || card.html_url"
            :links="
              card.links || [
                {
                  title: 'Mehr erfahren',
                  url: card.html_url,
                  icon: {
                    name: 'chevron.right'
                  }
                }
              ]
            "
            :class="{ link: applyHover }"
          />
        </div>
        <InfoBar
          v-if="
            card.info ||
            card.created_at ||
            card.updated_at ||
            card.language ||
            card.license ||
            card.forks_count ||
            card.network_count ||
            card.watchers_count ||
            card.stargazers_count ||
            card.open_issues_count ||
            card.subscribers_count
          "
          :info="
            card.info || {
              language: card.language,
              license: card.license?.name,
              forks: card.forks_count,
              networks: card.network_count,
              watchers: card.watchers_count,
              stars: card.stargazers_count,
              issues: card.open_issues_count,
              subscribers: card.subscribers_count,
              date: card.updated_at
            }
          "
          :date="card.updated_at"
          :dateFormatOptions="dateFormatOptions"
          :dateNowKey="dateNowKey"
        />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import type { ListUserReposResponse } from '~/types/GitHub/Repository'
import type { CardItemType } from '~/types/common/CardItem'

const props = withDefaults(
  defineProps<{
    card: CardItemType | ListUserReposResponse | any
    variant?: 'card' | 'article'
    dateFormatOptions?: Intl.DateTimeFormatOptions
    dateNowKey?: 'created' | 'updated'
    iconPosition?: 'top' | 'right' | 'bottom' | 'left'
    iconAlignment?: 'start' | 'center' | 'end'
    size?: 'small' | 'medium' | 'large' | 'full'
    hover?: 'auto' | 'true' | 'false'
    cover?: string
    donutGraph?: boolean
    barGraph?: boolean
  }>(),
  {
    card: () => {},
    variant: 'card',

    dateFormatOptions: () => {
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    },

    dateNowKey: 'updated',
    iconPosition: 'left',
    iconAlignment: 'start',
    size: 'medium',
    hover: 'auto',
    donutGraph: false,
    barGraph: false
  }
)

const applyHover = computed(() => {
  return (
    (props.hover === 'auto' &&
      props.card.links &&
      props.card.links.length === 1) ||
    props.hover === 'true'
  )
})

const getFlexDirection = () => {
  switch (props.iconPosition) {
    case 'top':
      return 'column'
    case 'right':
      return 'row-reverse'
    case 'bottom':
      return 'column-reverse'
    case 'left':
    default:
      return 'row'
  }
}

const getAlignItems = () => {
  switch (props.iconAlignment) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'end':
      return 'flex-end'
    default:
      return 'flex-start'
  }
}
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
}

.xsmall .details {
  padding: 20px;
  position: relative;
  font-size: 14px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .details {
  padding: 24px;
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
}

.xsmall .eyebrow {
  font-size: 14px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .eyebrow {
  font-size: 16px;
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
  /* 21.8581628569 */
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.small .title {
  font-size: 18px;
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

/* -------------------------------- bar ------------------------------- */

.typography-body-tight {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.group {
  padding: 20px;
  box-sizing: border-box;
}

@media only screen and (max-width: 1068px) {
  .group {
    padding: 20px 0;
  }
}

@media only screen and (max-width: 734px) {
  .group {
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

.group [data-value] {
  font-variant-numeric: tabular-nums;
}

.bar-container {
  position: relative;
  height: 10px;
  border-radius: 10px;
  margin-top: 12px;
}

@media only screen and (max-width: 734px) {
  .bar-container {
    margin-top: 5px;
  }
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.5s;
  background: var(--color-fill);
  border-radius: 10px;
  padding-inline-start: 5px;
  padding-inline-end: 5px;
}

.semibold {
  font-weight: 600;
}

/* ---------------------------------- donut --------------------------------- */

br.medium {
  display: block;
}

@media only screen and (max-width: 1068px) {
  br.medium {
    display: none;
  }
}

@media only screen and (max-width: 734px) {
  br.medium {
    display: none;
  }
}

br.medium {
  display: none;
}

@media only screen and (max-width: 1068px) {
  br.medium {
    display: block;
  }
}

@media only screen and (max-width: 734px) {
  br.medium {
    display: none;
  }
}

.typography-donut-label {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

@media only screen and (max-width: 1068px) {
  .typography-donut-label {
    font-size: 17px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

@media only screen and (max-width: 734px) {
  .typography-donut-label {
    font-size: 14px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

br.medium,
br.medium {
  display: none !important;
}

@media only screen and (min-width: 1069px) {
  br.medium.medium,
  br.medium.medium {
    display: block !important;
  }
}

@media only screen and (min-width: 735px) and (max-width: 1068px) {
  br.medium.medium,
  br.medium.medium {
    display: block !important;
  }
}

.typography-donut-label {
  font-size: 17px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

@media only screen and (max-width: 1068px) {
  .typography-donut-label {
    font-size: 17px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

@media only screen and (max-width: 734px) {
  .typography-donut-label {
    font-size: 14px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

.ac-graph-donut .donut-wedge {
  fill: #f56300;
}

svg.ac-graph-svg {
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  width: 100%;
  justify-content: space-between;

  margin-top: 8px;
  flex-wrap: wrap;
  grid-row-gap: 20px;
  row-gap: 20px;
  grid-column-gap: 40px;
  column-gap: 40px;
  justify-content: center;
}

@media only screen and (max-width: 734px) {
  .container {
    margin-top: 8px;
    flex-wrap: wrap;
    grid-row-gap: 20px;
    row-gap: 20px;
    grid-column-gap: 40px;
    column-gap: 40px;
    justify-content: center;
  }
}

.wedge-legend {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  gap: 10px;
}

@media only screen and (min-width: 735px) {
  .wedge-legend {
    /* width: 120px; */
  }
}

.wedge-legend:before {
  display: inline-block;
  content: '';
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  /* --size: 10px; */

  --size: 20px;
}

@media only screen and (max-width: 734px) {
  .wedge-legend:before {
    --size: 20px;
  }
}

@media only screen and (min-width: 735px) {
  .wedge-legend.female {
    /* order: -1; */
  }
}

.wedge-legend.female {
  justify-content: end;
}

.wedge-legend.female:before {
  background: var(--color-fill);
}

.wedge-legend.male {
  justify-content: start;
}

.wedge-legend.male:before {
  background: #cecece;
}

.wedge-legend [data-value] {
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}

.donut-container {
  position: relative;
  width: var(--size);
  height: var(--size);
  /* --size: 360px;
  --max-width: var(--size); */

  --size: 100%;
  --max-width: 220px;
}

@media only screen and (max-width: 1068px) {
  .donut-container {
    --size: 300px;
  }
}

@media only screen and (max-width: 734px) {
  .donut-container {
    --size: 100%;
    --max-width: 220px;
  }
}

.donut-container .donut {
  position: relative;
  width: min(100%, var(--max-width));
  padding-bottom: min(100%, var(--max-width));
  height: 0;
  margin: auto;
}

.donut-container .donut-wedge:nth-child(odd) {
  fill: #cecece;
}

.donut-container .donut-wedge:nth-child(2n) {
  fill: var(--color-fill);
}

.donut-container .donut svg {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.donut-container .sector-labels {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  max-width: var(--max-width);
  margin: auto;
}

.semibold {
  font-weight: 600;
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
