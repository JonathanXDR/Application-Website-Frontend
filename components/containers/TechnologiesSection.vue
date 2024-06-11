<template>
  <div class="flex flex-col items-center">
    <HeadlineAnimation
      :title="title"
      class="typography-magical-headline pb-12"
    />
    <!-- <NavBarExtension>
      <div class="flex flex-col items-center gap-2">
        <SegmentNav
          :items="segmentNavItems"
          :label="windowWidth < 900 ? 'icon' : 'combination'"
          :padding="windowWidth < 900 ? undefined : '0 21px'"
          size="small"
          :separator="windowWidth < 900 ? false : true"
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

    <ul class="card-container">
      <CardItem
        v-for="(card, index) in cards"
        :key="index"
        :loading="false"
        :card="card"
        component-size="small"
        icon-position="right"
        icon-absolute
      />
      <ResultBlankState v-if="cards.length === 0" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { CardItemType } from '~/types/common/CardItem'
import type { ItemType } from '~/types/common/Item'

defineProps<{
  title: string
}>()

const { tm } = useI18n()

const cards = computed<CardItemType[]>(() =>
  tm('components.containers.technologies')
)
const segmentNavItems = computed<ItemType[]>(() =>
  tm('components.common.SegmentNav.technologies')
)
const { width: windowWidth } = useWindowSize({ initialWidth: 0 })
const currentIndex = ref(0)

const updateCurrentIndex = (index: number) => {
  currentIndex.value = index
}
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
