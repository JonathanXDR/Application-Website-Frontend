<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    duration?: number
    speed?: number
    characterSet?: string
    // eslint-disable-next-line no-undef
    as?: keyof HTMLElementTagNameMap
    trigger?: boolean
    onScrambleComplete?: () => void
  }>(),
  {
    duration: 0.8,
    speed: 0.04,
    characterSet:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    as: 'p',
    trigger: true,
  },
)

const displayText = ref(props.text)
const isAnimating = ref(false)

function scramble() {
  if (isAnimating.value) return
  isAnimating.value = true

  const steps = props.duration / props.speed
  let step = 0
  const originalText = props.text

  const interval = setInterval(() => {
    let scrambled = ''
    const progress = step / steps

    for (let i = 0; i < originalText.length; i++) {
      if (originalText[i] === ' ') {
        scrambled += ' '
        continue
      }
      if (progress * originalText.length > i) {
        scrambled += originalText[i]
      }
      else {
        scrambled
          += props.characterSet[
            Math.floor(Math.random() * props.characterSet.length)
          ]
      }
    }

    displayText.value = scrambled
    step++

    if (step > steps) {
      clearInterval(interval)
      displayText.value = originalText
      isAnimating.value = false

      props.onScrambleComplete?.()
    }
  }, props.speed * 1000)
}

watch(
  () => props.trigger,
  (newVal) => {
    if (newVal) {
      scramble()
    }
  },
)

onMounted(() => {
  if (props.trigger) {
    scramble()
  }
})
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
  >
    {{ displayText }}
  </component>
</template>
