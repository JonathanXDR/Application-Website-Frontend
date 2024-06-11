<template>
  <small
    v-if="config.public.appEnvironment === 'development'"
    :style="{ color: colorBadge?.colorVar }"
    class="dev-badge"
    data-tag-name="Dev"
  />
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const { colorBadge } = useColor()
</script>

<style scoped>
.dev-badge {
  font-size: 22.588px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  padding-left: 10px;
  -webkit-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -o-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -moz-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
}
.dev-badge:before {
  content: attr(data-tag-name);
}
</style>
