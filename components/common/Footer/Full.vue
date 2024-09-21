<template>
  <section id="copyright">
    <p>
      {{
        $t("components.common.Footer.allRightsReserved", {
          currentYear,
        })
      }}
    </p>
  </section>
  <LanguagePickerBar />
  <ShareSheet />
</template>

<script setup lang="ts">
const currentYear = ref(new Date().getFullYear())
</script>
