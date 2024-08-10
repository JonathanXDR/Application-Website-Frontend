<template>
  <div
    v-for="(art, index) in fileContents"
    :key="index"
    class="border border-gray-300 p-4"
  >
    <pre>{{ `${index}\n\n` + art }}</pre>
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

const fileContents = ref<string[]>([]);

const txtFiles = import.meta.glob("~/public/ascii/*.txt", {
  query: "?raw",
  import: "default",
});

for (const path in txtFiles) {
  const file = txtFiles[path] ? await txtFiles[path]() : null;
  fileContents.value.push(file as string);
}
</script>

<style scoped>
* {
  border-collapse: separate;
  text-indent: initial;
  line-height: normal;
  font-weight: normal;
  font-size: medium;
  font-style: normal;
  color: -internal-quirk-inherit;
  text-align: start;
  border-spacing: 2px;
  font-variant: normal;
  font-family: monospace;
}
</style>
