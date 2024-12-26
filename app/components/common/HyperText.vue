<template>
  <component
    :is="props.as"
    ref="elementRef"
    class="overflow-hidden py-2 text-4xl font-bold"
    :class="props.class"
    @mouseenter="handleAnimationTrigger"
  >
    <span
      v-for="(letter, index) in displayText"
      :key="index"
      :class="['font-mono', letter === ' ' ? 'inline-block w-3' : '']"
    >
      {{ letter.toUpperCase() }}
    </span>
  </component>
</template>

<script setup lang="ts">
interface HyperTextProps {
  text: string
  class?: string
  duration?: number
  delay?: number
  as?: string
  startOnView?: boolean
  animateOnHover?: boolean
  characterSet?: string[]
}

const props = withDefaults(defineProps<HyperTextProps>(), {
  duration: 800,
  delay: 0,
  as: 'div',
  startOnView: false,
  animateOnHover: true,
  characterSet: () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
})

const elementRef = ref<HTMLElement | null>(null)
const displayText = ref(props.text.split(''))
const isAnimating = ref(false)
const iterationCount = ref(0)

let totalCharacters = props.text.length

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

function handleAnimationTrigger() {
  if (props.animateOnHover && !isAnimating.value) {
    iterationCount.value = 0
    isAnimating.value = true
  }
}

function scramble() {
  if (iterationCount.value < totalCharacters) {
    displayText.value = displayText.value.map((char, index) => {
      if (char === ' ') return ' '

      if (index <= iterationCount.value) {
        return props.text[index]
      }
      return props.characterSet[getRandomInt(props.characterSet.length)]
    }) as string[]
    iterationCount.value += 0.1
  }
  else {
    isAnimating.value = false
  }
}

const intervalMs = ref(0)
const { pause, resume } = useIntervalFn(scramble, intervalMs, {
  immediate: false,
})

onMounted(() => {
  if (!props.startOnView) {
    useTimeoutFn(() => {
      isAnimating.value = true
    }, props.delay)
  }
  else if (elementRef.value) {
    const { stop } = useIntersectionObserver(
      elementRef,
      ([entry]) => {
        if (entry?.isIntersecting) {
          useTimeoutFn(() => {
            isAnimating.value = true
          }, props.delay)

          stop()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-30% 0px -30% 0px',
      },
    )
  }
})

watch(isAnimating, (newVal) => {
  if (newVal) {
    iterationCount.value = 0
    displayText.value = props.text.split('')
    totalCharacters = props.text.length
    intervalMs.value = props.duration / (props.text.length * 10)
    resume()
  }
  else {
    pause()
  }
})
</script>
