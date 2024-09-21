<template>
  <div
    v-if="files?.length"
    class="hidden"
  >
    <div
      v-for="(art, index) in files"
      :key="index"
      class="border border-gray-300 p-4"
    >
      <pre :class="art.className">{{ index }}<br><br>{{ art.content }}</pre>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">
interface ArtFile {
  content: string
  className: string
}

const files = ref<ArtFile[]>([])

const { data, error } = await useAsyncData<ArtFile[]>(
  'ascii-files',
  async () => {
    const txtFiles = import.meta.glob<string>('~/public/ascii/**/*.txt', {
      query: '?raw',
      import: 'default',
    })

    const fileLoaders = Object.entries(txtFiles).map(async ([path, loader]) => {
      const content = await loader()
      const folder = path.split('/')[3]
      const className = folder === 'monospace' ? 'monospace' : 'helvetica'
      return { content, className }
    })

    return await Promise.all(fileLoaders)
  }
)

if (error.value) {
  console.error('Error loading ASCII files:', error.value)
} else {
  files.value = data.value || []
}

const randomFile = computed(() =>
  files.value.length > 0
    ? files.value[Math.floor(Math.random() * files.value.length)]
    : null
)

onMounted(() => {
  if (!randomFile.value) return
  console.log(
    `%cHey! You've found an Easter egg! 🥚 \n\n${randomFile.value.content}`,
    `font-family: ${randomFile.value.className}`
  )
})
</script>

<style scoped>
pre,
code {
  line-height: normal;
  font-weight: normal;
  font-size: medium;
  font-style: normal;
  white-space: pre;
}

.monospace {
  font-family: monospace;
}

.helvetica {
  font-family: "Helvetica Neue", Arial, sans-serif;
}
</style>
