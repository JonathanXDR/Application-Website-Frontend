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

    <template v-for="(word, wordIndex) in words" :key="wordIndex">
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
        {{ "&nbsp;" }}<span class="cursor" />
      </span>
    </template>
  </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();
const words = computed(() =>
  props.title
    .trim()
    .split(" ")
    .map((word) => word.split("")),
);
const isCursorBlinking = ref(false);
const initialCursorOpacity = ref("1");
const currentLetterCount = ref(0);
const originalStringLength = computed(
  () => props.title.trim().replace(/ /g, "").length + words.value.length - 1,
);
const headline = ref<HTMLElement | null>(null);
let cursorBlinkTimeout: number | NodeJS.Timeout | null = null;

const animationConfig = {
  onViewportChange: (isInViewport: boolean) => {
    if (isInViewport) {
      window.addEventListener("scroll", updateLetterCount);
    } else {
      window.removeEventListener("scroll", updateLetterCount);
      clearTimeout(cursorBlinkTimeout as NodeJS.Timeout);
    }
  },
};

const getLetterStyle = (index: number) => ({
  "--letter-opacity": index < currentLetterCount.value ? "1" : "0",
  "--cursor-opacity": index === currentLetterCount.value - 1 ? "1" : "0",
});

const getGlobalIndex = (wordIndex: number, letterIndex: number) => {
  let globalIndex = 0;
  for (let i = 0; i < wordIndex; i++) {
    globalIndex += (words.value[i]?.length || 0) + 1;
  }
  return globalIndex + letterIndex;
};

let lastScrollY = 0;

const updateLetterCount = () => {
  const scrollY = window.scrollY;
  const scrollThreshold = 20;

  switch (true) {
    case scrollY > lastScrollY + scrollThreshold &&
      currentLetterCount.value < originalStringLength.value:
      currentLetterCount.value++;
      setCursorBlink(false);
      initialCursorOpacity.value = "0";
      lastScrollY = scrollY;
      break;
    case scrollY < lastScrollY - scrollThreshold &&
      currentLetterCount.value > 0:
      currentLetterCount.value--;
      setCursorBlink(false);
      lastScrollY = scrollY;
      break;
    default:
      setCursorBlink(true);
      break;
  }
};

watch(currentLetterCount, (newCount, oldCount) => {
  switch (true) {
    case newCount === 0:
      initialCursorOpacity.value = "1";
      break;
    case newCount === originalStringLength.value:
      setCursorBlink(true);
      break;
    case newCount < oldCount:
      setCursorBlink(false);
      break;
  }
});

const setCursorBlink = (state: boolean) => {
  clearTimeout(cursorBlinkTimeout as NodeJS.Timeout);
  isCursorBlinking.value = state;
  if (!state) {
    cursorBlinkTimeout = setTimeout(() => {
      isCursorBlinking.value = true;
    }, 1);
  }
};
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
    "Helvetica Neue",
    "Helvetica",
    "Arial",
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
      "Helvetica Neue",
      "Helvetica",
      "Arial",
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
      "Helvetica Neue",
      "Helvetica",
      "Arial",
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
  background: #0071e3;
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
