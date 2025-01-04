<template>
  <div class="flex flex-col items-center mt-24">
    <!-- TODO: Use dynamic title here and for the current page title -->
    <AnimatingHeadline
      title="Technologies"
      class="typography-magical-headline pb-12"
      :auto-animation="true"
    />
    <!-- <NavBarExtension>
      <div class="flex flex-col items-center gap-2">
        <SegmentNav
          :items="segmentNavItems"
          :label="viewport.isLessThan('tablet') ? 'icon' : 'combination'"
          :padding="viewport.isLessThan('tablet') ? undefined : '0 21px'"
          size="small"
          :separator="viewport.isLessThan('tablet') ? false : true"
          gray-labels
          :focus="false"
          :outer-padding="3"
          :selected-item="segmentNavItems[currentIndex]?.id"
          :on-select="
            id =>
              updateCurrentIndex(
                segmentNavItems.findIndex(item => item.id === id)
              )
          "
        />
      </div>
    </NavBarExtension> -->

    <!-- <NavBarExtension>
      <FilterInput />
    </NavBarExtension>

    <LiveResultSummary :total-results="cards.length" /> -->

    <div class="card-container">
      <CardItem
        v-for="(card, index) in cards"
        :key="index"
        v-bind="{
          ...card,
          loading: false,
          componentSize: 'small',
          icon: {
            ...card.icon,
            size:
              card.icon?.name && sfSymbolRegex.test(card.icon?.name)
                ? '20px'
                : '25px',
            position: 'right',
            alignment: 'start',
            absolute: true,
          },
        }"
      />
      <ResultBlankState v-if="cards.length === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardItemType } from '#shared/types/common/card-item'

definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerFull: true,
  footerCompact: false,
})

const sfSymbolRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/

const { tm } = useI18n()
const cards = computed<CardItemType[]>(() =>
  tm('components.containers.technologies'),
)

// const segmentNavItems = computed<ItemType[]>(() =>
//   tm("components.common.SegmentNav.technologies"),
// );
// const { windowWidth } = useWidth();
// const currentIndex = ref(0);

// const updateCurrentIndex = (index: number) => {
//   currentIndex.value = index;
// };
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
