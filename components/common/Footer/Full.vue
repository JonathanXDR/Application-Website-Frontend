<template>
  <section id="copyright">
    <p>Copyright © {{ currentYear }} Jonathan Russ. All rights reserved.</p>
  </section>
  <LanguagePickerBar />
  <ShareSheet />
</template>

<script setup lang="ts">
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .sharesheet-options {
    margin: 0;
  }
}

@media screen and (max-width: 769px) {
  .sharesheet-options {
    margin-top: 10px;
  }
}
</style>
