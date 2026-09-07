<script setup lang="ts">
await usePageSeo()

// `crossorigin` is omitted on purpose: the tiles hotlink artwork as CSS
// background images, and those no-CORS fetches would not reuse a CORS-warmed
// connection.
useHead({
  link: [{ rel: 'preconnect', href: 'https://www.apple.com' }],
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
//   }
// )
</script>

<template>
  <AnimatingGallery
    title="Music Discovery"
    description="Where your new favorites find you."
  />
</template>
