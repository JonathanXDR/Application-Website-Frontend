<template>
  <div
    v-if="tags.latest?.length && tags.previous?.length"
    class="rc-ribbon ribbon ribbon-blue-to-default rs-storehome-banner"
  >
    <div class="ribbon-drop-wrapper">
      <div class="ribbon-content-wrapper">
        <div class="ribbon-content rc-ribbon-content-container">
          <div class="rc-ribbon-content with-paddlenav">
            <div class="rc-inline-gallery rc-ribbon-content-autoscroll">
              <div class="rc-ribbon-content-gallery">
                <div
                  class="rc-ribbon-content-scroller"
                  :style="[transformStyle, totalItems <= 2 && 'justify-content: center; gap: 16px']"
                >
                  <div
                    v-for="(item, index) in displayItems"
                    :key="index"
                    class="rc-ribbon-gallery-item rc-inline-gallery-item"
                    :style="totalItems <= 2 && 'width: unset !important'"
                  >
                    <div
                      class="rc-ribbon-content-item-base rc-ribbon-content-item"
                      :style="totalItems <= 2 && 'width: 100% !important'"
                    >
                      {{ item.description }}&ensp;
                      <LinkCollection
                        ref="ribbon-link"
                        class="ribbon-link ribbon-link-animation icon-after-ribbon"
                        :links="item.links"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="totalItems > 2" class="rc-gallery-paddlenav paddlenav paddlenav-compact">
                <button
                  class="paddlenav-arrow paddlenav-arrow-previous"
                  @click="scrollContent('left')"
                  :disabled="isTransitioning"
                >
                  <Icon name="chevron.left" size="small" class="icon" />
                </button>
                <button
                  class="paddlenav-arrow paddlenav-arrow-next"
                  @click="scrollContent('right')"
                  :disabled="isTransitioning"
                >
                  <Icon name="chevron.right" size="small" class="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./RibbonBar.ts"></script>
<style scoped src="./RibbonBar.css"></style>
