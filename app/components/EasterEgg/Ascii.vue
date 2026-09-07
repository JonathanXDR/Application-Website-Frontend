<script setup lang="ts">
// `useAsyncData` would ship every ASCII file to the client
onMounted(async () => {
  const txtFiles = import.meta.glob<string>('~~/public/ascii/**/*.txt', {
    query: '?raw',
    import: 'default',
  })

  const paths = Object.keys(txtFiles)
  const path = paths[Math.floor(Math.random() * paths.length)]
  const loader = path && txtFiles[path]
  if (!path || !loader) return

  try {
    const content = await loader()
    const folder = path.split('/')[3]
    const fontFamily
      = folder === 'monospace'
        ? 'monospace'
        : '"Helvetica Neue", Arial, sans-serif'
    // `window.console` escapes nuxt-security's `removeLoggers` stripping
    window.console.log(
      `%cHey! You've found an Easter egg! 🥚 \n\n${content}`,
      `font-family: ${fontFamily}`,
    )
  }
  catch (error) {
    console.error(
      '[easter-egg] could not load the ASCII art asset, skipping:',
      error,
    )
  }
})
</script>

<template>
  <div
    class="hidden"
    aria-hidden="true"
  />
</template>
