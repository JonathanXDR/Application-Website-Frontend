<script setup lang="ts">
import type { FooterCopyrightCollectionItem } from '@nuxt/content'

const { data: copyrightData }
  = await useQueryCollection<FooterCopyrightCollectionItem>(
    'footerCopyright',
  ).first()
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
