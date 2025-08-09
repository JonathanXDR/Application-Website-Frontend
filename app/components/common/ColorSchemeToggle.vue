<script setup lang="ts">
import type { ItemType } from '#shared/types/common/item'
import type { SegmentNavType } from '#shared/types/components/segment-nav'

withDefaults(defineProps<Pick<SegmentNavType, 'label'>>(), {
  label: 'text',
})

const { tm } = useI18n()
const { getTheme, setTheme } = useTheme()
const currentTheme = computed(() => getTheme())

const themeItems = computed<ItemType[]>(() =>
  tm('components.common.SegmentNav.theme'),
)
</script>

<template>
  <div
    class="color-scheme-toggle"
    role="radiogroup"
    tabindex="0"
    aria-label="Select a color scheme preference"
  >
    <label
      v-for="(item, index) in themeItems"
      :key="index"
      :for="item.id"
    >
      <input
        :id="item.id"
        type="radio"
        autocomplete="off"
        name="color-scheme"
        :value="item.id"
        :checked="currentTheme === item.id"
        @change="setTheme(item.id)"
      >
      <div class="text">
        <Icon
          v-if="item.icon && label !== 'text'"
          :name="item.icon.name"
          class="icon icon-lg"
        />
        <div v-if="label !== 'icon'">{{ item.label }}</div>
      </div>
    </label>
  </div>
</template>
