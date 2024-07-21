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
