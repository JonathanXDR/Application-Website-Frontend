<script setup lang="ts">
import type { ItemType } from '#shared/types/common/item'

const { getTheme, setTheme } = useTheme()
const viewport = useViewport()

const { data: segNavData } = await useQueryCollection('navigation')
  .stem('segment-nav')
  .first()
const items = computed<ItemType[]>(
  () =>
    ((segNavData.value as unknown as Record<string, unknown>)
      ?.theme as ItemType[]) || [],
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
