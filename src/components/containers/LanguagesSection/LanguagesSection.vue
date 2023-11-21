<template>
  <h2>{{ props.title }}</h2>

  <TabList />

  <div class="item-container" v-for="(language, index) in languages" :key="index">
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
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li v-for="(language, index) in languages" :key="index" class="tabnav-item">
        <span class="tabnav-link current">{{ language.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <LanguageBar v-for="(language, index) in languages" :key="index" :language="language" />
    </ul>
  </div> -->
</template>

<script lang="ts" src="./LanguagesSection.ts"></script>
<style scoped src="./LanguagesSection.css"></style>
