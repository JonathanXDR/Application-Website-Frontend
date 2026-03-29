<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    text: string
    duration?: number
    speed?: number
    characterSet?: string
    // eslint-disable-next-line no-undef
    as?: keyof HTMLElementTagNameMap
    trigger?: boolean
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

const emit = defineEmits<{
  'scramble-complete': []
}>()

const displayText = ref(props.text)
const isAnimating = ref(false)
let interval: ReturnType<typeof setInterval> | null = null

const scramble = () => {
  if (isAnimating.value) return
  isAnimating.value = true

  const steps = props.duration / props.speed
  let step = 0

  if (interval) clearInterval(interval)

  interval = setInterval(() => {
    let scrambled = ''
    const progress = step / steps

    for (let i = 0; i < props.text.length; i++) {
      if (props.text[i] === ' ') {
        scrambled += ' '
        continue
      }

      if (progress * props.text.length > i) {
        scrambled += props.text[i]
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
      if (interval) clearInterval(interval)
      interval = null
      displayText.value = props.text
      isAnimating.value = false
      emit('scramble-complete')
    }
  }, props.speed * 1000)
}

watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (newVal && (oldVal === false || oldVal === undefined)) {
      scramble()
    }
  },
  { immediate: true },
)

watch(
  () => props.text,
  (newVal) => {
    if (!isAnimating.value) {
      displayText.value = newVal
    }
  },
)

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <Motion
    v-bind="$attrs"
    :as="props.as"
  >
    {{ displayText }}
  </Motion>
</template>
