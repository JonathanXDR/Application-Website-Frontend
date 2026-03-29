<script setup lang="ts">
import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { LinkItemType } from '#shared/types/components/link-item'

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

const { data: copyrightData } = await useQueryCollection('navigation').stem('footer-copyright').first()
const links = computed<LinkItemType[]>(
  () => (copyrightData.value?.links as LinkItemType[]) ?? [],
)
const allRightsReserved = computed(
  () => copyrightData.value?.allRightsReserved ?? '',
)
const currentYear = ref(new Date().getFullYear())
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
