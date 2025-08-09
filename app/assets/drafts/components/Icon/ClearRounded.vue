<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <svg
    aria-hidden="true"
    class="svg-icon clear-rounded-icon"
    viewBox="0 0 16 16"
    theme-id="clear-rounded"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>{{ t("icons.clear") }}</title>
    <path
      d="M14.55,0l1.45,1.45-6.56,6.55,6.54,6.54-1.45,1.45-6.53-6.53L1.47,15.99,.01,14.53l6.52-6.53L0,1.47,1.45,.02l6.55,6.54L14.55,0Z"
      fill-rule="evenodd"
    />
  </svg>
</template>
