<script setup lang="ts">
import type { UiCollectionItem } from '@nuxt/content'

const { data: copyrightData } = await useQueryCollection<UiCollectionItem>('ui')
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
