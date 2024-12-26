<template>
  <component
    :is="props.as"
    ref="elementRef"
    class="overflow-hidden py-2 text-4xl font-bold"
    :class="props.class"
    v-bind="$attrs"
    @mouseenter="handleAnimationTrigger"
  >
    <span
      v-for="(letter, index) in displayText"
      :key="index"
      :class="['font-mono', letter === ' ' ? 'w-3 inline-block' : '']"
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
const displayText = ref<string[]>(props.text.split(''))
const isAnimating = ref(false)
const iterationCount = ref(0)

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

function handleAnimationTrigger() {
  if (props.animateOnHover && !isAnimating.value) {
    iterationCount.value = 0
    isAnimating.value = true
  }
}

onMounted(() => {
  if (!props.startOnView) {
    const startTimeout = setTimeout(() => {
      isAnimating.value = true
    }, props.delay)

    onBeforeUnmount(() => clearTimeout(startTimeout))
  }
  else {
    if (elementRef.value) {
      const { stop } = useIntersectionObserver(
        elementRef,
        ([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => {
              isAnimating.value = true
            }, props.delay)
            stop()
          }
        },
        { threshold: 0.1, rootMargin: '-30% 0px -30% 0px' },
      )
    }
  }
})

let intervalId: number | null = null

watch(isAnimating, (newVal) => {
  if (newVal) {
    const intervalDuration = props.duration / (props.text.length * 10)
    const maxIterations = props.text.length

    intervalId = window.setInterval(() => {
      if (iterationCount.value < maxIterations) {
        displayText.value = displayText.value.map((char, index) => {
          if (char === ' ') return char
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
    }, intervalDuration) as unknown as number
  }
  else {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
