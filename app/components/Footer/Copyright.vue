<script setup lang="ts">
import type { FooterCopyrightCollectionItem } from '@nuxt/content'
import type { BasicSizeType, LinkItemType } from '#shared/types/schemas'

withDefaults(
  defineProps<{
    componentSize?: Exclude<BasicSizeType, 'medium'>
    loading?: boolean
  }>(),
  {
    componentSize: 'small',
    loading: false,
  },
)

const { data: copyrightData }
  = await useQueryCollection<FooterCopyrightCollectionItem>(
    'footerCopyright',
  ).first()
const links = computed<LinkItemType[]>(
  () => (copyrightData.value?.links as LinkItemType[]) ?? [],
)
const allRightsReserved = computed(
  () => copyrightData.value?.allRightsReserved ?? '',
)
const currentYear = useCurrentYear()
</script>

<template>
  <div
    :class="`footer-mini-legal-copyright footer-mini-legal-copyright--${componentSize}`"
  >
    Copyright <span aria-hidden="true">©</span>
    {{ currentYear }}

    <LinkItem
      v-for="(link, index) in links"
      :key="index"
      v-bind="link"
    />

    {{ allRightsReserved }}
  </div>
</template>
