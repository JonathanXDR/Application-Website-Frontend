<template>
  <div class="item-container">
    <div
      id="standard-gallery-item-1"
      class="gallery-item current"
      style="z-index: 2; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        {{ language.title }}
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" :style="`width: ${language.progress}%`">
              <hr class="bar bar-1" style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1" />
            </div>
            <span class="bar-caption">
              {{ language.description }}
            </span>
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">7.6</span>
                <span class="badge-unit">%</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./LanguageBar.ts"></script>
<style scoped src="./LanguageBar.css"></style>
