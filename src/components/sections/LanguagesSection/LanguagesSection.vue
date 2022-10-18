<template>
  <h2>Sprachkenntnisse</h2>
  <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li
        v-for="(language, index) in data.languages"
        :key="index"
        class="tabnav-item"
      >
        <span class="tabnav-link current">{{ data.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <li
        v-for="(language, index) in data.languages"
        :key="index"
        class="graph-container"
      >
        <div :style="'width: ' + data.progress + '%'">
          <div animation="graph-bar" class="graph-bar current"></div>
          <p
            animation="graph-caption"
            class="graph-caption typography-graph-caption current"
          >
            {{ data.description }}
          </p>
        </div>
        <div
          animation="secondary-badge-value"
          class="typography-eyebrow-elevated secondary-badge-value current"
        >
          {{ data.progress }}%
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./LanguagesSection.ts"></script>
<style src="./LanguagesSection.css"></style>
