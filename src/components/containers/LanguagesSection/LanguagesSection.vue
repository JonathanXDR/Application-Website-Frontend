<template>
  <h2>Sprachkenntnisse</h2>
  <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li v-for="(language, index) in data" :key="index" class="tabnav-item">
        <span class="tabnav-link current">{{ language.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <li
        v-for="(language, index) in data"
        :key="index"
        class="graph-container"
      >
        <div :style="'width: ' + language.progress + '%'">
          <div animation="graph-bar" class="graph-bar current"></div>
          <p
            animation="graph-caption"
            class="graph-caption typography-graph-caption current"
          >
            {{ language.description }}
          </p>
        </div>
        <div
          animation="secondary-badge-value"
          class="typography-eyebrow-elevated secondary-badge-value current"
        >
          {{ language.progress }}%
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./LanguagesSection.ts"></script>
<style src="./LanguagesSection.css"></style>
