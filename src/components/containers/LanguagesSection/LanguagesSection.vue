<template>
  <h2>{{ props.title }}</h2>
  <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li v-for="(language, index) in languages" :key="index" class="tabnav-item">
        <span class="tabnav-link current">{{ language.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <LanguageBar v-for="(language, index) in languages" :key="index" :language="language" />
    </ul>
  </div>
</template>

<script lang="ts" src="./LanguagesSection.ts"></script>
<style scoped src="./LanguagesSection.css"></style>
