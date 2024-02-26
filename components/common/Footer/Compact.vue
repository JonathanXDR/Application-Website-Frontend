<template>
  <div class="rs-covers-footer">
    <div class="as-l-container">
      Copyright © {{ currentYear }} Jonathan Russ. All rights reserved.
    </div>
  </div>
</template>

<script setup lang="ts">
const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
.rs-covers-footer {
  font-size: 12px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: var(--color-figure-gray-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
}

.nojs .rs-covers-footercontent {
  padding-top: 20px;
}

.as-l-container {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
}

@media only screen and (min-width: 1441px) {
  .as-l-container {
    margin-left: auto;
    margin-right: auto;
    width: 980px;
  }
}

@media only screen and (max-width: 1068px) {
  .as-l-container {
    margin-left: auto;
    margin-right: auto;
    width: 94.14966%;
    width: 87.5%;
  }
}
</style>
