<template>
  <a
    href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/macros"
    class="card large nr-scroll-animation nr-scroll-animation--off"
    style="border-radius: 30px !important"
    v-animation="{
      add: ['nr-scroll-animation--on'],
      remove: ['nr-scroll-animation--off']
    }"
  >
    <div
      class="card-cover-wrap"
      style="
        color: var(--color-fill-tertiary) !important;
        background: var(--color-code-plain);
        padding: 30px;
      "
    >
      <!-- <picture class="card-cover"
        ><source
          media="(prefers-color-scheme: dark)"
          srcset="
            https://docs-assets.developer.apple.com/published/3415dcf5a890828b3ca66264c78f6306/Swift-Macros-3up~dark@2x.png 2x
          "
        />
        <img
          decoding="async"
          loading="lazy"
          alt=" "
          srcset="
            https://docs-assets.developer.apple.com/published/a5f92cbaec780ef88061df4e1829eff0/Swift-Macros-3up@2x.png 2x
          "
          src="https://docs-assets.developer.apple.com/published/a5f92cbaec780ef88061df4e1829eff0/Swift-Macros-3up@2x.png"
          width="317"
          height="auto"
        />
      </picture> -->
      <!-- <div class="group group-hispanic typography-body-tight">
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
      </div> -->
      <div class="container">
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
    <div class="details" style="padding: 30px !important">
      <div id="card_eyebrow_98" class="eyebrow">Language feature</div>
      <div id="card_title_98" class="title">Macros</div>
      <div id="card_content_98" class="card-content">
        <div class="content">
          Learn how Swift macros can make your code cleaner and more powerful.
        </div>
      </div>
      <div class="ctas-wrapper">
        <a href="photos://" class="icon-wrapper button button-reduced button-neutral">
          <span class="icon-copy"> Open</span>
        </a>
        <button class="icon-wrapper secondary-cta link typography-body-reduced modal-trigger">
          <span class="icon-copy">Learn more</span>
          <Icon
            name="chevron.right"
            size="small"
            class="svg-icon inline-chevron-right-icon icon-inline link-icon"
          />
        </button>
      </div>
    </div>
  </a>
</template>

<script lang="ts" src="./CardItem.ts"></script>
<style scoped src="./CardItem.css"></style>
