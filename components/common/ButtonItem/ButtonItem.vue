<template>
  <component :is="as" :class="['button', variant, size]">
    <slot />
  </component>
</template>

<script lang="ts" src="./ButtonItem.script.ts"></script>
<style scoped src="./ButtonItem.module.css"></style>
