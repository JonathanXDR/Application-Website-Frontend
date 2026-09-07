<script setup lang="ts">
// Loading the art through `useAsyncData` shipped every ASCII file three
// times per page (hidden divs, payload, raw chunks) just to print one to
// the console, so exactly one file is imported lazily after hydration.
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
    // `window.console` escapes nuxt-security's `removeLoggers` stripping,
    // which would otherwise delete the Easter egg from production builds.
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
