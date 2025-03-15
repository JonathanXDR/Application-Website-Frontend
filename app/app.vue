<script setup lang="ts">
const config = useRuntimeConfig()
const { randomDevColor } = useColor()

const color
  = config.public.appEnvironment === 'development'
    ? `var(--color-figure-${randomDevColor.value?.name})`
    : 'var(--color-fill-blue)'
</script>

<template>
  <NuxtLoadingIndicator
    :color
    :error-color="`var(--color-figure-red)`"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
