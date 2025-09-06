<script setup lang="ts">
const { t } = useI18n()

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <section id="copyright">
    <p>
      {{
        t("components.common.FooterCopyright.allRightsReserved", {
          currentYear,
        })
      }}
    </p>
  </section>
  <LanguagePickerBar />
  <ShareSheet />
</template>
