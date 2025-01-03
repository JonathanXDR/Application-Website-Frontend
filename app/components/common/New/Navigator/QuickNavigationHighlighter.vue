<template>
  <span
    v-if="!props.matcherText"
    class="highlight"
  >{{ props.text }}</span>
  <p
    v-else
    class="highlight"
  >
    <template
      v-for="(chunk, idx) in highlightedChunks"
      :key="idx"
    >
      <span
        v-if="chunk.isMatch"
        class="match"
      >{{ chunk.content }}</span>
      <span v-else>{{ chunk.content }}</span>
    </template>
  </p>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    matcherText?: string
  }>(),
  {
    matcherText: '',
  },
)

const highlightedChunks = computed(() => {
  const t = props.text
  const m = props.matcherText
  const result: { content: string, isMatch: boolean }[] = []
  if (!m) {
    result.push({ content: t, isMatch: false })
    return result
  }
  let lastIndex = 0
  for (const char of m) {
    const lowerT = t.toLowerCase()
    const charIndex = lowerT.indexOf(char.toLowerCase(), lastIndex)
    if (charIndex < 0) break
    if (charIndex > lastIndex) {
      result.push({
        content: t.slice(lastIndex, charIndex),
        isMatch: false,
      })
    }
    result.push({
      content: t.slice(charIndex, charIndex + 1),
      isMatch: true,
    })
    lastIndex = charIndex + 1
  }
  if (lastIndex < t.length) {
    result.push({ content: t.slice(lastIndex), isMatch: false })
  }
  return result
})
</script>

<style scoped lang="scss">
// @import "docc-render/styles/_core.scss";

.highlight {
  display: inline;

  :deep(.match) {
    font-weight: $font-weight-semibold;
    background: var(--color-fill-light-blue-secondary);
  }
}
</style>
