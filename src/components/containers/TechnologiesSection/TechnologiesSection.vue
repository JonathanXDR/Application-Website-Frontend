<template>
  <h3 class="typography-magical-headline">{{ props.title }}</h3>
  <ul class="item-container">
    <CardTile v-for="(card, index) in cards" :key="index" :card="card" />
  </ul>
</template>

<script lang="ts" src="./TechnologiesSection.ts"></script>
<style scoped src="./TechnologiesSection.css"></style>
