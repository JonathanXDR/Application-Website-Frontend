<template>
  <a
    :id="card.title?.toLowerCase().replace(/ /g, '-')"
    :href="applyHover && card.links ? card.links[0].url : card.html_url"
    :class="['scroll-animation scroll-animation--off', variant, size]"
    target="_blank"
    v-animation="{
      add: ['scroll-animation--on'],
      remove: ['scroll-animation--off']
    }"
  >
    <div v-if="cover || donutGraph || barGraph" class="card-cover-wrap">
      <picture v-if="cover" class="card-cover">
        <img decoding="async" loading="lazy" :src="cover" />
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
        <div class="title">{{ card.title || card.name }}</div>
        <div v-if="card.description" class="card-content">
          <div class="content">
            {{ card.description }}
          </div>
        </div>
        <TagBar v-if="card.tags?.length || card.topics?.length" :tags="card.tags || card.topics" />
        <div v-if="card.links?.length || card.html_url" class="ctas-wrapper">
          <!-- <ButtonItem variant="secondary" size="small"> Test </ButtonItem> -->
          <!-- <a href="photos://" class="icon-wrapper button button-reduced button-neutral">
            <span class="icon-copy"> Open</span>
          </a> -->

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
          v-if="card.info || card.created_at || card.updated_at || card.language || card.license || card.forks_count || card.network_count || card.watchers_count || card.stargazers_count || card.open_issues_count || card.subscribers_count"
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
              date: card.updated_at,
            }
          "
          :date="card.updated_at"
          :dateFormatOptions="dateFormatOptions"
          :dateNowKey="dateNowKey"
        />
      </div>
    </div>
  </a>
</template>

<script lang="ts" src="./CardItem.ts"></script>
<style scoped src="./CardItem.css"></style>
