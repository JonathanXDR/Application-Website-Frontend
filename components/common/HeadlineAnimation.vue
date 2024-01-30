<template>
  <header class="section-header large-span-12">
    <h2
      class="section-header-headline typography-section-headline-bold large-12 animated-headline"
      :class="{ 'cursor-blink': isCursorBlinking }"
    >
      <span
        class="letter"
        :style="{ '--cursor-opacity': initialCursorOpacity }"
        data-initial-cursor
      >
        <span class="cursor"></span>
      </span>
      <span class="word" v-for="(word, wordIndex) in words" :key="wordIndex">
        <span
          v-for="(char, letterIndex) in word"
          :key="letterIndex"
          class="letter"
          :style="getLetterStyle(getGlobalIndex(wordIndex, letterIndex))"
          :data-letter-index="getGlobalIndex(wordIndex, letterIndex)"
        >
          {{ char }}
          <span
            class="cursor"
            v-if="
              getGlobalIndex(wordIndex, letterIndex) === currentLetterCount - 1
            "
          ></span>
        </span>
        <span
          v-if="wordIndex < words.length - 1"
          class="letter"
          :style="getLetterStyle(getGlobalIndex(wordIndex, word.length))"
          :data-letter-index="getGlobalIndex(wordIndex, word.length)"
        >
          &nbsp;<span class="cursor"></span>
        </span>
      </span>
    </h2>
  </header>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{ title: string }>();
const words = computed(() =>
  props.title
    .trim()
    .split(" ")
    .map((word) => word.split(""))
);
const isCursorBlinking = ref(false);
const initialCursorOpacity = ref("1");
const currentLetterCount = ref(0);
const originalStringLength = computed(
  () => props.title.trim().replace(/ /g, "").length + words.value.length - 1
);

const getLetterStyle = (index: number) => {
  const letterOpacity = index < currentLetterCount.value ? 1 : 0;
  const cursorOpacity = index === currentLetterCount.value - 1 ? "1" : "0";
  return {
    "--letter-opacity": letterOpacity.toString(),
    "--cursor-opacity": cursorOpacity,
  };
};

const getGlobalIndex = (wordIndex: number, letterIndex: number) => {
  let globalIndex = 0;
  for (let i = 0; i < wordIndex; i++) {
    globalIndex += words.value[i].length + 1; // +1 for space
  }
  return globalIndex + letterIndex;
};

let lastScrollY = 0;

function updateLetterCount() {
  if (
    window.scrollY > lastScrollY &&
    currentLetterCount.value < originalStringLength.value
  ) {
    currentLetterCount.value++;
    isCursorBlinking.value = false;
    initialCursorOpacity.value = "0";
  } else if (window.scrollY < lastScrollY && currentLetterCount.value > 0) {
    currentLetterCount.value--;
    isCursorBlinking.value = false;
  } else {
    isCursorBlinking.value = true;
  }
  lastScrollY = window.scrollY;
}

watch(currentLetterCount, (newCount, oldCount) => {
  if (newCount === 0) {
    initialCursorOpacity.value = "1";
  } else if (newCount === originalStringLength.value) {
    isCursorBlinking.value = true;
  } else if (newCount < oldCount) {
    isCursorBlinking.value = false;
  }
});

onMounted(() => {
  window.addEventListener("scroll", updateLetterCount);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateLetterCount);
});
</script>

<style scoped>
.typography-section-headline-bold {
  font-size: 80px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.013em;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}

@media only screen and (max-width: 1068px) {
  .typography-section-headline-bold {
    font-size: 54px;
    line-height: 1.037037037;
    font-weight: 700;
    letter-spacing: -0.013em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}

@media only screen and (max-width: 734px) {
  .typography-section-headline-bold {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 700;
    letter-spacing: -0.013em;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
}

/*! CSS Used from: https://www.apple.com/v/icloud/af/built/styles/overview.built.css */
@media only screen and (max-width: 734px) {
  .icloud-update .section .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
}

.section-header {
  text-align: left;
  margin-bottom: 70px;
}

@media only screen and (max-width: 1068px) {
  .section-header {
    margin-bottom: 50px;
  }
}

.section-header {
  align-items: start;
  position: relative;
  width: 980px;
  margin: 0 auto 70px;
  padding-right: 6px;
  max-width: calc(100% - var(--grid-gutter-width) * 2);
}

@media only screen and (max-width: 1068px) {
  .section-header {
    grid-column: span 12;
    margin: 0 0 50px;
    padding-left: 40px;
    padding-right: unset;
    width: 100%;
  }
}

@media only screen and (max-width: 734px) {
  .section-header {
    padding-left: 14px;
  }
}

.animated-headline {
  position: absolute;
  width: -moz-fit-content;
  width: fit-content;
  display: inline;
  margin-top: 0;
  top: 0;
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
