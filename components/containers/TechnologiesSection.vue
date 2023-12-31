<template>
  <h3 class="typography-magical-headline">{{ title }}</h3>
  <ul class="item-container">
    <CardTile v-for="(card, index) in cards" :key="index" :card="card" />
  </ul>
</template>

<script lang="ts" setup>
import type { CardTileType } from "~/types/common/CardTile";

defineProps({
  title: {
    type: String,
    required: true,
    default: undefined,
  },
});

const { tm } = useI18n();
const cards = computed(
  () => tm("components.containers.technologies") as CardTileType[],
);
</script>

<style scoped>
/* ----------------------------- item-container ----------------------------- */

.item-container {
  width: 90%;
  margin: 0 auto 0 auto;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  padding: 52px 0;
}

@media screen and (min-width: 900px) {
  .item-container {
    width: 82.5%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media screen and (min-width: 1250px) {
  .item-container {
    width: 95%;
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  }
}

/* ---------------------------------- other --------------------------------- */

.large-10 {
  flex-basis: 83.3333333333%;
  max-width: 83.3333333333%;
}

.tile-button-text {
  position: absolute;
  width: 100%;
  height: 100%;
}

.tile-overlay-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tile-overlay-copy {
  margin-top: 0.8em;
}
</style>
