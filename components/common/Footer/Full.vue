<template>
  <section id="copyright">
    <p>Copyright © {{ currentYear }} Jonathan Russ. All rights reserved.</p>
  </section>
  <LanguagePickerBar />
  <ShareSheet />
</template>

<script setup lang="ts">
const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
@media screen and (min-width: 900px) {
  .sharesheet-options {
    margin: 0;
  }
}
</style>
