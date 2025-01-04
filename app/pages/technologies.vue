<template>
  <div class="flex flex-col items-center mt-24">
    <AnimatingHeadline
      v-if="pageTitle"
      :title="pageTitle"
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

    <!-- positionReversed: boolean
    tags: string[]
    selectedTags: string[]
    preventedBlur: boolean
    placeholder: string
    disabled: boolean
    value: string
    shouldTruncateTags: boolean
    focusInputWhenCreated: boolean
    focusInputWhenEmpty: boolean
    selectInputOnFocus: boolean
    preventBorderStyle: boolean
    translatableTags: string[] -->

    <NavBarExtension>
      <FilterInput
        v-if="cards"
        :position-reversed="true"
        :tags="[
          ...new Set(
            cards
              .flatMap((card) => card.badges?.map((badge) => badge.title))
              .filter((title): title is string => title !== undefined),
          ),
        ]"
        :selected-tags="[]"
        :prevented-blur="false"
        placeholder="Search for a technology"
        :disabled="false"
        :value="''"
        :should-truncate-tags="true"
        :focus-input-when-created="true"
        :focus-input-when-empty="true"
        :select-input-on-focus="true"
        :prevent-border-style="true"
        :translatable-tags="[]"
      />
    </NavBarExtension>

    <LiveResultSummary :total-results="cards.length" />

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

const navbar = useNavbar()
const { tm } = useI18n()

const pageTitle = navbar.pageTitle
const sfSymbolRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/

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
