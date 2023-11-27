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
                <div class="rc-ribbon-content-scroller" :style="transformStyle">
                  <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="rc-ribbon-gallery-item rc-inline-gallery-item"
                  >
                    <div class="rc-ribbon-content-item-base rc-ribbon-content-item">
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="rc-gallery-paddlenav paddlenav paddlenav-compact">
                <button
                  class="paddlenav-arrow paddlenav-arrow-previous"
                  @click="scrollContent('left')"
                >
                  <Icon name="chevron.left" size="small" class="icon" />
                </button>
                <button
                  class="paddlenav-arrow paddlenav-arrow-next"
                  @click="scrollContent('right')"
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
