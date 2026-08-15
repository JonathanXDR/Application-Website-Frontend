<script setup lang="ts">
// Client-only console Easter egg. The previous implementation loaded
// every ASCII art file through `useAsyncData`, which shipped all of them
// three times on every page: server-rendered into hidden divs, embedded
// in the payload, and bundled as raw chunks, only to print one random
// file to the console. Now exactly one lazily imported file loads in
// the browser after hydration and nothing renders into the page.
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
    // `window.console` keeps the call out of reach of nuxt-security's
    // `removeLoggers` console stripping in production builds. An Easter egg
    // that gets stripped from production would be pointless.
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
