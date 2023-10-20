<template>
  <!-- <CardTile v-for="(card, index) in cards" :key="index" :card="card" /> -->
  <div style="width: 82.5%; margin-left: auto !important; margin-right: auto !important">
    <h3 class="typography-magical-headline">
      {{ $t('components.containers.common.technologies') }}
    </h3>
    <FilterNav style="margin: 52px 0" />
    <ul class="item-container">
      <CardItem v-for="(technologies, index) in 20" :key="index" />
      <!-- <CardTile v-for="(card, index) in cards" :key="index" :card="card" /> -->
    </ul>
  </div>
</template>

<script lang="ts" src="./TechnologiesSection.ts"></script>
<style scoped src="./TechnologiesSection.css"></style>
