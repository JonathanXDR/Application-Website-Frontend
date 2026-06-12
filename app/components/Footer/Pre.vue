<script setup lang="ts">
const { data: copyrightData } = await useQueryCollection('components')
  .stem('footer-copyright')
  .first()
const currentYear = useCurrentYear()
</script>

<template>
  <section id="copyright">
    <p>
      {{
        copyrightData?.allRightsReserved?.replace(
          "{currentYear}",
          String(currentYear),
        )
      }}
    </p>
  </section>
  <LanguagePickerBar />
  <ShareSheet />
</template>
