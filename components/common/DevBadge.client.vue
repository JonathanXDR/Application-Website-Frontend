<template>
  <small
    v-if="nodeEnv === 'development'"
    :style="{ color: colorBadge?.colorVar }"
    class="dev-badge"
    data-tag-name="Dev"
  >
  </small>
</template>

<script setup lang="ts">
const nodeEnv = computed(() => process.env.NODE_ENV)
const { colorBadge } = useColor()
</script>

<style scoped>
.dev-badge {
  font-size: 22.588px;
  line-height: 1.16667;
  font-weight: 600; /*
letter-spacing: 0.009em; */
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
