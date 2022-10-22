<template>
  <li class="graph-container">
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
</template>

<script lang="ts" src="./LanguageBar.ts"></script>
<style src="./LanguageBar.css"></style>
