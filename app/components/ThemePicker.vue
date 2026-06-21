<script setup lang="ts">
import type { SegmentNavCollectionItem } from '@nuxt/content'
import type { ItemType } from '#shared/types/schemas'

const { getTheme, setTheme } = useTheme()
const viewport = useViewport()

const { data: segNavData }
  = await useQueryCollection<SegmentNavCollectionItem>('segmentNav').first()
const items = computed<ItemType[]>(() => segNavData.value?.theme ?? [])
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
