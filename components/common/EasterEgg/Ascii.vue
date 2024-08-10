<template>
  <div
    v-for="(art, index) in files"
    :key="index"
    class="border border-gray-300 p-4"
  >
    <pre :class="art.className">{{ `${index}\n\n` + art.content }}</pre>
  </div>
</template>

<script setup lang="ts">
// const { tm } = useI18n();
// const asciiArts = computed<string[]>(() =>
//   tm('components.common.EasterEgg.Ascii')
// );

// const decodedArts = computed(() => {
//   return asciiArts.value.map((ascii) => decodeBase64(ascii));
// });

// const randomArt = () => {
//   const randomIndex = Math.floor(Math.random() * asciiArts.value.length);
//   return asciiArts.value[randomIndex];
// };

// const decodeBase64 = (base64: string) => {
//   return atob(base64);
// };

const files = ref<{ content: string; className: string }[]>([]);

const txtFiles = import.meta.glob(`~/public/ascii/**/*.txt`, {
  query: '?raw',
  import: 'default',
});

for (const path in txtFiles) {
  const content = txtFiles[path] ? await txtFiles[path]() : null;
  const folder = path.split('/')[3];
  const className = folder === 'monospace' ? 'monospace' : 'helvetica';
  files.value.push({ content: content as string, className });
}
</script>

<style scoped>
* {
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
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
</style>
