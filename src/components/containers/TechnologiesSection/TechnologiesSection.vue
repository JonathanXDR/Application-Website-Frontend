<template>
  <h3 class="typography-magical-headline">{{ $t('components.containers.common.technologies') }}</h3>
  <ul class="item-container">
    <CardTile
      v-for="(technologies, index) in tm('components.containers.technologies')"
      :key="index"
      :card="technologies"
    />
  </ul>
</template>

<script lang="ts" src="./TechnologiesSection.ts"></script>
<style scoped src="./TechnologiesSection.css"></style>
