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

const textLower = computed(() => props.text.toLowerCase())
const matcherChars = computed(() => props.matcherText.split(''))

const matcherCharsLower = useArrayMap(matcherChars, c => c.toLowerCase())

const highlightedChunks = computed(() => {
  const result: { content: string, isMatch: boolean }[] = []
  let lastIndex = 0
  matcherCharsLower.value.forEach((char) => {
    const charIndex = textLower.value.indexOf(char, lastIndex)
    if (charIndex < 0) return
    if (charIndex > lastIndex) {
      result.push({
        content: props.text.slice(lastIndex, charIndex),
        isMatch: false,
      })
    }
    result.push({
      content: props.text.slice(charIndex, charIndex + 1),
      isMatch: true,
    })
    lastIndex = charIndex + 1
  })
  if (lastIndex < props.text.length) {
    result.push({ content: props.text.slice(lastIndex), isMatch: false })
  }
  return result
})
</script>

<style scoped lang="scss">
@import "/app/assets/scss/_core.scss";

.highlight {
  display: inline;

  :deep(.match) {
    font-weight: $font-weight-semibold;
    background: var(--color-fill-light-blue-secondary);
  }
}
</style>
