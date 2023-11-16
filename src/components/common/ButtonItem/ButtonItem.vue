<template>
  <component :is="as" :class="['button', variant, size]">
    <slot />
  </component>
</template>

<script lang="ts" src="./ButtonItem.ts"></script>
<style scoped src="./ButtonItem.css"></style>
