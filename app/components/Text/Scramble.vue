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
const steps = computed(() => props.duration / props.speed)
const intervalMs = computed(() => props.speed * 1000)
let step = 0

const { pause, resume, isActive } = useIntervalFn(
  () => {
    let scrambled = ''
    const progress = step / steps.value

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

    if (step > steps.value) {
      pause()
      displayText.value = props.text
      isAnimating.value = false
      emit('scramble-complete')
    }
  },
  intervalMs,
  { immediate: false },
)

const scramble = () => {
  if (isActive.value) return
  isAnimating.value = true
  step = 0
  resume()
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
</script>

<template>
  <Motion
    v-bind="$attrs"
    :as="props.as"
  >
    {{ displayText }}
  </Motion>
</template>
