<script setup lang="ts">
import type { ItemType } from '#shared/types/common/item'

const { tm } = useI18n()
const { getTheme, setTheme } = useTheme()
const viewport = useViewport()

const themeItems = computed<ItemType[]>(() =>
  tm('components.common.SegmentNav.theme'),
)
</script>

<template>
  <SegmentNav
    :items="themeItems"
    gap="5px"
    component-size="xsmall"
    :focus="false"
    :label="viewport.isGreaterOrEquals('desktop') ? 'text' : 'icon'"
    :selected-item="getTheme()"
    :on-select="(themeNew: string) => setTheme(themeNew)"
  />
</template>
