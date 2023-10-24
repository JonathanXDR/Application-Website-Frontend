import type { TabItemType } from '@/types/common/TabItem'
import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SegmentNav',
  setup(setup, { emit }) {
    const { tm } = useI18n()
    const items = computed(() => tm('components.common.SegmentNav.items') as TabItemType[])
    const options = computed(() => tm('components.common.SegmentNav.options') as TabItemType[])
    const selectedIndex = ref(0)
    const isLoaded = ref(false)
    const segmentNav = ref<HTMLUListElement | null>(null)
    const selectionDimensions = reactive({ width: 0, x: 0 })

    const calculateSelectionPosition = (selectedIndex: number) => {
      const segmentNavElement = segmentNav.value
      if (segmentNavElement) {
        const segmentNavItems = segmentNavElement.querySelectorAll('.segmentnav-item')
        const { offsetWidth, offsetLeft } = segmentNavItems[selectedIndex] as HTMLElement
        selectionDimensions.width = offsetWidth
        selectionDimensions.x = offsetLeft
      }
    }

    const selectionStyle = computed(() => ({
      width: `${selectionDimensions.width}px`,
      transform: `translateX(${selectionDimensions.x}px)`
    }))

    watchEffect(() => {
      calculateSelectionPosition(selectedIndex.value)
      emit('update:selectedIndex', selectedIndex.value)
    })

    onMounted(() => {
      calculateSelectionPosition(selectedIndex.value)
      isLoaded.value = true
    })

    return {
      items,
      selectedIndex,
      isLoaded,
      selectionStyle,
      segmentNav
    }
  }
})

// 121: [
//   function (t, e, i) {
//     'use strict';
//     const s = t(2),
//       n = t(11),
//       r = t(14),
//       a = t(33),
//       o = t(29);
//     t(113), t(3);
//     e.exports = {
//       created() {
//         (this.segmentNav = {
//           items: [],
//           current: null,
//           roamingTabIndex: null,
//           segments: new Map(),
//           segmentNavEl: this.el.querySelector('.segmentnav'),
//           setCurrentItem(t) {
//             t !== this.segmentNav.current &&
//               ((this.segmentNav.current = t),
//               (this.selection = t),
//               this._updateSelectionBackground(
//                 this.segmentNav.segments.get(this.selection)
//               ));
//           },
//           onRoamingTabIndexSelect(t) {
//             if (
//               0 === this.segmentNav.items.filter((e) => e === t.el).length
//             )
//               throw 'Could not find segment nav item';
//             this.lastInteractionEvent || (this.lastInteractionEvent = t),
//               this.currentIndex !== t.index && this.animateToItem(t.index);
//           },
//         }),
//           (this.segmentNav.setCurrentItem =
//             this.segmentNav.setCurrentItem.bind(this)),
//           (this.segmentNav.onRoamingTabIndexSelect =
//             this.segmentNav.onRoamingTabIndexSelect.bind(this)),
//           window.addEventListener('resize:text-zoom', () => {
//             this._updateSegmentSize();
//           });
//       },
//       itemsCreated() {
//         this._items.forEach((t, e) => {
//           const i = this.segmentNav.segmentNavEl.querySelector(
//             '#'.concat(t.id.replace('gallery-item', 'segment'))
//           );
//           i.setAttribute('role', r.TAB),
//             i.setAttribute(n.CONTROLS, t.id),
//             i.setAttribute(n.SELECTED, !1),
//             t.on('select', () => {
//               i.classList.add('current'), i.setAttribute(n.SELECTED, !0);
//             }),
//             t.on('deselect', () => {
//               i.classList.remove('current'), i.setAttribute(n.SELECTED, !1);
//             }),
//             i.addEventListener('click', (e) => {
//               e.preventDefault(), (this.lastInteractionEvent = e);
//               let i =
//                 this.currentIndex +
//                 (t.index - this.wrappedIndex(this.currentIndex));
//               this.animateToItem(i);
//             }),
//             this.segmentNav.items.push(i),
//             t.el.setAttribute('role', r.TABPANEL),
//             t.el.setAttribute(n.LABELLEDBY, this.segmentNav.items[e].id),
//             this.segmentNav.segments.set(i, {
//               width: i.offsetWidth,
//               offset: i.offsetLeft,
//             });
//         }),
//           (this.selection = this.segmentNav.segmentNavEl.querySelector(
//             '.segmentnav-item[aria-selected="true"]'
//           )),
//           (this.selectionBackground = document.createElement('div')),
//           this.selectionBackground.classList.add(
//             'segmentnav-selection-background'
//           ),
//           this.selectionBackground.setAttribute('role', 'presentation'),
//           this.segmentNav.segmentNavEl.appendChild(
//             this.selectionBackground
//           ),
//           this._updateSelectionBackground(
//             this.segmentNav.segments.get(this.selection)
//           );
//       },
//       mounted() {
//         (this.segmentNav.roamingTabIndex = new s(
//           this.segmentNav.segmentNavEl,
//           { selector: 'button' }
//         )),
//           this.segmentNav.roamingTabIndex.start(),
//           this.segmentNav.roamingTabIndex.on(
//             'onSelect',
//             this.segmentNav.onRoamingTabIndexSelect
//           );
//       },
//       onItemChangeInitiated(t) {
//         t.next && this._updateSegment(t.next.id, t.next.index);
//       },
//       onItemChangeOccurred(t) {
//         this._updateSegment(t.current.id, this.currentIndex);
//       },
//       onResizeDebounced() {
//         this._updateSegmentSize();
//       },
//       _updateSegmentSize() {
//         this.segmentNav.segments.forEach((t, e) => {
//           this.segmentNav.segments.set(e, {
//             width: e.clientWidth,
//             offset: e.offsetLeft,
//           }),
//             this._updateSelectionBackground(
//               this.segmentNav.segments.get(this.selection)
//             );
//         });
//       },
//       _updateSegment(t, e) {
//         if (this.selection && t === this.selection.id) return;
//         let i = this.segmentNav.items.filter(
//           (e) => e.getAttribute('aria-controls') === t
//         )[0];
//         this.segmentNav.setCurrentItem(i),
//           this.segmentNav.roamingTabIndex &&
//             this.segmentNav.roamingTabIndex.setSelectedItemByIndex(e, !0);
//       },
//       _updateSelectionBackground(t) {
//         if (t)
//           return new Promise((e, i) => {
//             try {
//               a(() => {
//                 const i = parseFloat(
//                   window.getComputedStyle(this.segmentNav.segmentNavEl)
//                     .paddingLeft
//                 );
//                 o(() => {
//                   (this.selectionBackground.style.width = ''.concat(
//                     t.width,
//                     'px'
//                   )),
//                     (this.selectionBackground.style.transform =
//                       'translateX('.concat(t.offset - i, 'px)')),
//                     e();
//                 });
//               });
//             } catch (t) {
//               i(t);
//             }
//           });
//       },
//     };
//   },
//   { 11: 11, 113: 113, 14: 14, 2: 2, 29: 29, 3: 3, 33: 33 },
// ],
