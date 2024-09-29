<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHypertune } from './generated/hypertune.vue'
import type { FeatureFlags } from './types/common/feature-flags'
import type { SectionType } from './types/common/section'

const hypertune = useHypertune()
const route = useRoute()
const { tm } = useI18n()

const featureFlags: FeatureFlags = {
  sections: computed(() => hypertune.value.sections({ itemFallback: false })),
  pages: computed(() => hypertune.value.pages({ itemFallback: false })),
}

provide('featureFlags', featureFlags)

const navItems = computed<SectionType[]>(() => tm('components.common.NavBar'))

const isCurrentPageEnabled = computed(() => {
  const currentPage = navItems.value.find(item => item.route === route.path)

  if (!currentPage) return false

  const pageIndex = navItems.value.indexOf(currentPage)
  return featureFlags.pages.value[pageIndex] ?? false
})

watch(
  () => route.path,
  async () => {
    if (isCurrentPageEnabled.value) return
    await navigateTo('/404', {
      replace: true,
      redirectCode: 404,
    })
  },
  { immediate: true }
)
</script>
