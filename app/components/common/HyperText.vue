<template>
  <component
    :is="as"
    ref="elementRef"
    class="hypertext overflow-hidden py-2 text-4xl font-bold"
    @mouseenter="handleMouseEnter"
  >
    <span
      v-for="(letter, index) in displayText"
      :key="index"
      :class="[letter === ' ' ? 'inline-block w-3' : '']"
    >
      {{ letter }}
    </span>
  </component>
</template>

<script setup lang="ts">
interface HyperTextProps {
  text: string
  duration?: number
  delay?: number
  // eslint-disable-next-line no-undef
  as?: keyof HTMLElementTagNameMap
  startOnView?: boolean
  animateOnHover?: boolean
  characterSet?: string | string[]
  onScrambleComplete?: () => void
  trigger?: boolean
  speed?: number
}

const props = withDefaults(defineProps<HyperTextProps>(), {
  duration: 800,
  delay: 0,
  as: 'div',
  startOnView: false,
  animateOnHover: true,
  characterSet:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  trigger: true,
  speed: 0,
})

const elementRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
const displayText = ref<string[]>(props.text.split(''))
const iterationCount = ref(0)

const charSet = computed<string[]>(() => {
  if (typeof props.characterSet === 'string') {
    return props.characterSet.split('')
  }
  return props.characterSet
})

function handleMouseEnter() {
  if (props.animateOnHover && !isAnimating.value && props.trigger) {
    iterationCount.value = 0
    isAnimating.value = true
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

function scrambleStep() {
  const text = props.text
  const maxIterations = text.length

  if (iterationCount.value < maxIterations) {
    displayText.value = displayText.value.map((char, index) => {
      if (char === ' ') return ' '

      if (index <= iterationCount.value) {
        return text[index]
      }
      return charSet.value[getRandomInt(charSet.value.length)]
    }) as string[]
    iterationCount.value += 0.1
  }
  else {
    isAnimating.value = false
    props.onScrambleComplete?.()
  }
}

const intervalMs = ref(0)
const { pause, resume } = useIntervalFn(scrambleStep, intervalMs, {
  immediate: false,
})

onMounted(() => {
  if (!props.trigger) return

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

    if (props.speed > 0) {
      intervalMs.value = props.speed * 1000
    }
    else {
      const length = props.text.length || 1
      intervalMs.value = props.duration / (length * 10)
    }
    resume()
  }
  else {
    pause()
  }
})

watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      if (!props.startOnView) {
        useTimeoutFn(() => {
          isAnimating.value = true
        }, props.delay)
      }
    }
    else if (!newVal && oldVal) {
      isAnimating.value = false
    }
  },
)
</script>

<style scoped>
.hypertext {
  font-family: Menlo, monospace;
}
</style>
