<script setup lang="ts">
// TODO: Use dedicated og image config here
defineOgImage('Overview')

definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerPre: true,
  footerCompact: false,
  sitemap: {
    priority: 0.5,
    changefreq: 'weekly',
  },
})

// const {
//   data: view,
//   status,
//   error,
// } = await useFetch<MusicKit.View<MusicKit.Albums>>(
//   '/api/musickit/user-library-albums',
//   {
//     key: 'user-library-albums',
//     lazy: true,
//     params: { ids: '1616728060' },
//     getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
//   }
// )
</script>

<template>
  <AnimatingGallery
    title="Music Discovery"
    description="Where your new favorites find you."
  />
</template>
