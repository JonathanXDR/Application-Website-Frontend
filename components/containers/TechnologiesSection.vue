<template>
  <h3 class="typography-magical-headline" style="padding-bottom: 50px">
    {{ props.title }}
  </h3>
  <NavBarExtension>
    <FilterInput />
  </NavBarExtension>

  <LiveResultSummary :totalResults="cards.length" />

  <ul class="card-container">
    <CardItem
      v-for="(card, index) in cards"
      :key="index"
      :card="card"
      size="small"
      iconPosition="right"
    />
    <ResultBlankState v-if="!cards" />
  </ul>
</template>

<script lang="ts">
import type { CardItemType } from "~/types/common/CardItem";

export default defineComponent({
  name: "TechnologiesSection",
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
  },
  setup(props) {
    const { tm } = useI18n();
    const cards: Ref<CardItemType[]> = computed(() =>
      tm("components.containers.technologies"),
    );

    return {
      props,
      tm,
      cards,
    };
  },
});
</script>

<style scoped>
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
