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
.footer-full {
  width: 90%;
  margin: 100px auto 0 auto;
  border-top: 1px solid var(--color-fill-gray-tertiary);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

@media screen and (min-width: 900px) {
  .footer-full {
    width: 82.5%;
    flex-direction: row !important;
  }
}

@media screen and (min-width: 900px) {
  .sharesheet-options {
    margin: 0;
  }
}
</style>
