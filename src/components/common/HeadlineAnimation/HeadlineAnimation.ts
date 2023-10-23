import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'HeadlineAnimation',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const letterIndex = ref(0)
    let lastScrollY = window.scrollY

    function totalChars(upToWordIndex: number): number {
      const words = props.title.split(' ').slice(0, upToWordIndex)
      return words.reduce((total, word) => total + word.length, 0)
    }

    function handleScroll() {
      const totalLetters = [...props.title].filter((char) => char !== ' ').length
      if (window.scrollY > lastScrollY && letterIndex.value < totalLetters) {
        letterIndex.value += 1
      } else if (window.scrollY < lastScrollY && letterIndex.value > 0) {
        letterIndex.value -= 1
      }
      lastScrollY = window.scrollY
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      letterIndex,
      totalChars
    }
  }
})

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
