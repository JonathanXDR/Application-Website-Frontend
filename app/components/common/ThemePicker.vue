<script setup lang="ts">
const { tm } = useI18n()
const { getTheme, setTheme } = useTheme()
const viewport = useViewport()

const items = computed<ItemType[]>(() =>
  tm('components.common.SegmentNav.theme'),
)
</script>

<template>
  <SegmentNav
    :items
    gap="5px"
    component-size="xsmall"
    :focus="false"
    :label="viewport.isGreaterOrEquals('desktop') ? 'text' : 'icon'"
    :selected-item="getTheme()"
    :on-select="(themeNew: string) => setTheme(themeNew)"
  />
</template>
