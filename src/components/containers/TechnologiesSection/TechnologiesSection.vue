<template>
  <h3 class="typography-magical-headline">{{ $t('components.containers.common.technologies') }}</h3>
  <ul class="item-container" v-if="json">
    <CardTile v-for="(technologies, index) in json" :key="index" :card="technologies" />
  </ul>
  <LoadingSpinner v-else class="center" />
</template>

<script lang="ts" src="./TechnologiesSection.ts"></script>
<style scoped src="./TechnologiesSection.css"></style>
