<template>
  <h2
    ref="headline"
    v-animation="animationConfig"
    :class="[
      'section-header-headline typography-section-headline-bold large-12 animated-headline',
      { 'cursor-blink': isCursorBlinking },
    ]"
  >
    <span
      class="letter"
      :style="{ '--cursor-opacity': initialCursorOpacity }"
      data-initial-cursor
    >
      <span class="cursor" />
    </span>

    <template
      v-for="(word, wordIndex) in words"
      :key="wordIndex"
    >
      <span class="word">
        <span
          v-for="(char, letterIndex) in word"
          :key="letterIndex"
          class="letter"
          :style="getLetterStyle(getGlobalIndex(wordIndex, letterIndex))"
          :data-letter-index="getGlobalIndex(wordIndex, letterIndex)"
        >
          {{ char }}
          <span
            v-if="
              getGlobalIndex(wordIndex, letterIndex) === currentLetterCount - 1
            "
            class="cursor"
          />
        </span>
      </span>

      <span
        v-if="wordIndex < words.length - 1"
        class="letter"
        :style="getLetterStyle(getGlobalIndex(wordIndex, word.length))"
        :data-letter-index="getGlobalIndex(wordIndex, word.length)"
      >
        &nbsp;<span class="cursor" />
      </span>
    </template>
  </h2>
</template>

<script setup lang="ts">
const properties = withDefaults(
  defineProps<{
    title: string
    autoAnimation?: boolean
  }>(),
  {
    autoAnimation: false,
  },
)

const words = computed(() =>
  properties.title
    .trim()
    .split(' ')
    .map(word => [...word]),
)

const isCursorBlinking = ref(false)
const initialCursorOpacity = ref('1')
const currentLetterCount = ref(0)
const originalStringLength = computed(
  () =>
    properties.title.trim().replaceAll(' ', '').length + words.value.length - 1,
)

const getLetterStyle = (index: number) => ({
  '--letter-opacity': index < currentLetterCount.value ? '1' : '0',
  '--cursor-opacity': index === currentLetterCount.value - 1 ? '1' : '0',
})

const getGlobalIndex = (wordIndex: number, letterIndex: number) => {
  let globalIndex = 0
  for (let index = 0; index < wordIndex; index++) {
    globalIndex += (words.value[index]?.length || 0) + 1
  }
  return globalIndex + letterIndex
}

const isCursorBlinkingTimeout = ref(false)

const { start: startCursorBlinkTimeout, stop: stopCursorBlinkTimeout }
  = useTimeoutFn(
    () => {
      isCursorBlinking.value = true
      isCursorBlinkingTimeout.value = false
    },
    1,
    { immediate: false },
  )

const setCursorBlink = (state: boolean) => {
  stopCursorBlinkTimeout()
  isCursorBlinking.value = state
  if (state) return
  isCursorBlinkingTimeout.value = true
  startCursorBlinkTimeout()
}

const autoAnimationCleanup = ref<(() => void) | undefined>(undefined)

const startAutoAnimation = () => {
  stopAutoAnimation()
  const { pause } = useIntervalFn(
    () => {
      if (currentLetterCount.value < originalStringLength.value) {
        currentLetterCount.value++
        setCursorBlink(false)
        initialCursorOpacity.value = '0'
      }
      else {
        pause()
        setCursorBlink(true)
      }
    },
    100,
    { immediate: true },
  )
  autoAnimationCleanup.value = pause
}

const stopAutoAnimation = () => {
  autoAnimationCleanup.value?.()
  autoAnimationCleanup.value = undefined
}

const stopScrollListener = ref<(() => void) | undefined>(undefined)

let lastScrollY = 0
const { y: scrollY } = useWindowScroll()

const updateLetterCount = () => {
  const scrollThreshold = 20

  switch (true) {
    case scrollY.value > lastScrollY + scrollThreshold
      && currentLetterCount.value < originalStringLength.value: {
      currentLetterCount.value++
      setCursorBlink(false)
      initialCursorOpacity.value = '0'
      lastScrollY = scrollY.value
      break
    }
    case scrollY.value < lastScrollY - scrollThreshold
      && currentLetterCount.value > 0: {
      currentLetterCount.value--
      setCursorBlink(false)
      lastScrollY = scrollY.value
      break
    }
    default: {
      setCursorBlink(true)
      break
    }
  }
}

const animationConfig = {
  onViewportChange: (isInViewport: boolean) => {
    if (properties.autoAnimation) return
    if (isInViewport) {
      stopScrollListener.value = useEventListener(
        window,
        'scroll',
        updateLetterCount,
      )
    }
    else {
      stopScrollListener.value?.()
      stopScrollListener.value = undefined
      stopCursorBlinkTimeout()
    }
  },
}

onMounted(() => {
  if (!properties.autoAnimation) return
  startAutoAnimation()

  watch(
    () => properties.autoAnimation,
    (valueNew) => {
      if (valueNew) {
        startAutoAnimation()
      }
      else {
        stopAutoAnimation()
      }
    },
    { immediate: false },
  )

  if (properties.autoAnimation) return
  stopScrollListener.value = useEventListener(
    window,
    'scroll',
    updateLetterCount,
  )
})

watch(currentLetterCount, (countNew, countOld) => {
  switch (true) {
    case countNew === 0: {
      initialCursorOpacity.value = '1'
      break
    }
    case countNew === originalStringLength.value: {
      setCursorBlink(true)
      break
    }
    case countNew < countOld: {
      setCursorBlink(false)
      break
    }
  }
})

onBeforeUnmount(() => {
  stopAutoAnimation()
  stopScrollListener.value?.()
  stopCursorBlinkTimeout()
})
</script>

<style scoped>
.typography-section-headline-bold {
  font-size: 80px;
  line-height: 1;
  font-weight: 700;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
}

@media only screen and (max-width: 1023px) {
  .typography-section-headline-bold {
    font-size: 54px;
    line-height: 1.037037037;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
  }
}

@media only screen and (max-width: 767px) {
  .typography-section-headline-bold {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
  }
}

.animated-headline {
  width: fit-content;
}

html.overview-parallax .visuallyhidden--enhanced {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  padding: 0;
  border: 0;
  max-width: -moz-fit-content;
  max-width: fit-content;
}

.cursor {
  width: 4px;
  height: 1em;
  line-height: 1;
  background: var(--color-fill-blue);
  display: inline-flex;
  position: absolute;
  bottom: 1px;
  right: -4px;
  border-radius: 18px;
}

.cursor-blink .cursor {
  animation: blink 1s ease-out 1s infinite;
}

.word {
  display: inline-flex;
}

.letter {
  opacity: var(--letter-opacity);
  position: relative;
}

.cursor {
  opacity: var(--cursor-opacity);
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
