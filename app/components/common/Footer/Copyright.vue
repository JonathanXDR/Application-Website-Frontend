<script setup lang="ts">
import type { BasicSizeType } from '#shared/types/common/basic-size'
import type { LinkType } from '#shared/types/common/link'

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

const { t, tm } = useI18n()
const links = computed<LinkType[]>(() =>
  tm('components.common.FooterCopyright.links'),
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

    {{ t("components.common.FooterCopyright.allRightsReserved") }}
  </div>
</template>
