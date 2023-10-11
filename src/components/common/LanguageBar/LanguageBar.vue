<template>
  <li class="graph-container">
    <div :style="'width: ' + language.progress + '%'">
      <div v-animation class="graph-bar current"></div>
      <p v-animation class="graph-caption typography-graph-caption current">
        {{ language.description }}
      </p>
    </div>
    <div v-animation class="typography-eyebrow-elevated secondary-badge-value current">
      {{ language.progress }}%
    </div>
  </li>
</template>

<script lang="ts" src="./LanguageBar.ts"></script>
<style scoped src="./LanguageBar.css"></style>
