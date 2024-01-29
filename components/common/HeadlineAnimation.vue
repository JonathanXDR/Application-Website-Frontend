<template>
  <header class="section-header large-span-12">
    <h2
      class="section-header-headline typography-section-headline-bold large-12 animated-headline"
    >
      <template
        v-for="(word, wordIndex) in title.split(' ')"
        :key="`word-${wordIndex}`"
      >
        <span class="word">
          <span
            v-for="(char, charIndex) in word.split('')"
            :key="`char-${wordIndex}-${charIndex}`"
            :style="{
              '--letter-opacity':
                charIndex + totalChars(wordIndex) <= letterIndex ? 1 : 0,
              '--cursor-opacity': 0,
            }"
            class="letter"
          >
            {{ char }}<span class="cursor"></span>
          </span>
        </span>
        <span
          v-if="wordIndex < title.split(' ').length - 1"
          style="--letter-opacity: 1; --cursor-opacity: 0"
          class="letter"
        >
          &nbsp;<span class="cursor"></span>
        </span>
      </template>
    </h2>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();

const letterIndex = ref(0);
let lastScrollY = window.scrollY;

function totalChars(upToWordIndex: number): number {
  const words = props.title.split(" ").slice(0, upToWordIndex);
  return words.reduce((total, word) => total + word.length, 0);
}

function handleScroll() {
  const totalLetters = [...props.title].filter((char) => char !== " ").length;
  if (window.scrollY > lastScrollY && letterIndex.value < totalLetters) {
    letterIndex.value += 1;
  } else if (window.scrollY < lastScrollY && letterIndex.value > 0) {
    letterIndex.value -= 1;
  }
  lastScrollY = window.scrollY;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// function (t, e, s) {
//   'use strict';
//   const i = s(8);
//   t.exports = class extends i {
//     constructor(t) {
//       super(t),
//         (this._kfs = {
//           arr: [],
//           group: this.anim.createScrollGroup(this.el),
//         }),
//         (this._kfs.group.name = 'Section - Always With You - Live Text'),
//         (this.useAltAnimation = this.el.classList.contains('alt-animation')),
//         (this.disableAnimation =
//           this.el.classList.contains('live-text-disabled'));
//     }
//     mounted() {
//       this._getElements(),
//         this.disableAnimation
//           ? this._headline.classList.remove('visuallyhidden--enhanced')
//           : (this.useAltAnimation
//               ? this._parseHeadlineContentsAlt()
//               : (this._parseHeadlineContents(), this._getLetterRefs()),
//             this._addTextKf());
//     }
//     _getElements() {
//       (this._headline = this.el.querySelector('[data-headline]')),
//         (this._contentWrapper = this.el.querySelector('.section-content')),
//         (this._headlineAnimated = this.el.querySelector(
//           '[data-headline-animation]'
//         ));
//     }
//     _onDrawAlt(t) {
//       let { current: e } = t,
//         s = Math.round(e);
//       this._setCursorBlink(!1),
//         s !== this._stringIndex &&
//           (this._headlineAnimated.innerHTML = this._stringArray[s]),
//         (this._cursorBlinkTimeout = setTimeout(() => {
//           this._setCursorBlink(!0);
//         }, 1)),
//         (this._stringIndex = s);
//     }
//     _parseHeadlineContentsAlt() {
//       (this._originalStringLength = this._headline.textContent.trim().length),
//         (this._stringArray = []),
//         (this._stringIndex = 0);
//       const t = '<span class="cursor cursor--alt "></span>';
//       let e = '';
//       this._stringArray.push(
//         '<span class="cursor cursor--alt cursor--initial"></span>'
//       ),
//         this._originalStringLength++,
//         this._headline.childNodes.forEach((s) => {
//           '#text' === s.nodeName
//             ? s.textContent
//                 .trim()
//                 .split('')
//                 .forEach((s) => {
//                   (e += s), this._stringArray.push(`${e}${t}`);
//                 })
//             : ((e += s.outerHTML), this._stringArray.push(`${e}${t}`));
//         }),
//         (this._headlineAnimated.innerHTML = this._stringArray[0]);
//     }
//     _parseHeadlineContents() {
//       this._originalStringLength = this._headline.textContent.trim().length;
//       const t = [];
//       (this._currentLetterCount = 0),
//         this._headline.childNodes.forEach((e) => {
//           '#text' === e.nodeName
//             ? t.push(...this._stringToLetterElArray(e.textContent.trim()))
//             : (this._originalStringLength--, t.push(e.outerHTML));
//         }),
//         (this._headlineAnimated.innerHTML = t.join(''));
//     }
//     _stringToLetterElArray(t) {
//       const e = '<span class="word">',
//         s = '</span>';
//       return t.split('').map((i, r) => {
//         let n = `<span style="--letter-opacity: 0; --cursor-opacity: 0;" data-letter-index="${this._currentLetterCount}" class="letter">${i}<span class="cursor"></span></span>`;
//         return (
//           (' ' !== i && ' ' !== i) || (n = `${s}${n}${e}`),
//           0 === r &&
//             (n = `<span style="--cursor-opacity: 0;" data-initial-cursor class="letter"><span class="cursor"></span></span>${e}${n}`),
//           r === t.length - 1 && (n = `${n}${s}`),
//           this._currentLetterCount++,
//           n
//         );
//       });
//     }
//     _getLetterRefs() {
//       (this._letters = this.el.querySelectorAll('[data-letter-index]')),
//         (this._initialStateCursor = this.el.querySelector(
//           '[data-initial-cursor]'
//         ));
//     }
//     _addTextKf() {
//       const t = this.useAltAnimation
//         ? this._onDrawAlt.bind(this)
//         : this._onDraw.bind(this);
//       [
//         { breakpointMask: 'S', start: 't - 85vh', end: 't - 40vh' },
//         { breakpointMask: 'M', start: 't - 95vh', end: 't - 45vh' },
//         { breakpointMask: 'LX', start: 't - 95vh', end: 't - 32vh' },
//       ].forEach((e) => {
//         let { breakpointMask: s, start: i, end: r } = e,
//           n = this._kfs.group.addKeyframe(this._headlineAnimated, {
//             start: i,
//             end: r,
//             _index: [0, this._originalStringLength - 1],
//             breakpointMask: s,
//           });
//         this._kfs.arr.push(n),
//           n.controller.on('draw', (e) => {
//             t(e.tweenProps._index);
//           });
//       });
//     }
//     _setLetterOpacity(t, e, s) {
//       const i = t > e ? t : e;
//       for (let r = t > e ? e : t; r <= i; r++) {
//         let e = r <= t ? 1 : 0;
//         r === t && 0 === t && !s > 0 && (e = 0),
//           this._letters[r].style.setProperty('--letter-opacity', e);
//         const i = r === t ? 1 : 0;
//         this._letters[r].style.setProperty('--cursor-opacity', i);
//       }
//       0 === s
//         ? this._initialStateCursor.style.setProperty('--cursor-opacity', 1)
//         : this._initialStateCursor.style.setProperty('--cursor-opacity', 0);
//     }
//     _onDraw(t) {
//       let { current: e, previousValue: s } = t,
//         i = Math.round(e),
//         r = Math.round(s);
//       (i === r && 0 !== i) ||
//         (this._setCursorBlink(!1),
//         this._setLetterOpacity(i, r, e),
//         (this._cursorBlinkTimeout = setTimeout(() => {
//           this._setCursorBlink(!0);
//         }, 1)));
//     }
//     _setCursorBlink(t) {
//       this.el.classList.toggle('cursor-blink', t);
//     }
//     static IS_SUPPORTED() {
//       return document.documentElement.classList.contains('overview-parallax');
//     }
//   };
// },
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
