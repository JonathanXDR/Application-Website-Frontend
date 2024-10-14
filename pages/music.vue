<template>
  <GalleryAnimation />
</template>

<script setup lang="ts">
definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerFull: true,
  footerCompact: false,
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
