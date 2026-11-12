<script setup lang="ts">
const { getTheme, setTheme } = useTheme()
const viewport = useViewport()

const { data: segNavData } = await useSegmentNavContent()
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
