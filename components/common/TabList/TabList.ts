import Icon from '@/components/common/Icons/Icon.vue'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'TabList',
  components: {
    Icon
  },
  setup() {
    const items = reactive([
      { id: 'productivity', label: 'Productivity' },
      { id: 'gaming', label: 'Gaming' },
      { id: 'production', label: 'Audio and video production' },
      { id: 'development', label: 'Software development' }
    ])

    return {
      items
    }
  }
})

// function (e, t, i) {
//   'use strict';
//   const s = i(196),
//     r = i(33),
//     n = i(102);
//   e.exports = {
//     created() {
//       this.tabNav = { items: [], current: null };
//     },
//     itemsCreated() {
//       Array.from(
//         this.el.querySelectorAll(this.model.TabNav.ItemSelector)
//       ).forEach((e, t) => {
//         const i = new a(e, t),
//           s = this.getItemForTrigger(i.trigger);
//         s ||
//           console.error(
//             `MixinGallery '${this.el.id}': Could not match tav/dot nav item with trigger '${i.trigger}', to gallery any item. Double check to make sure the triggers match the item id's.`
//           ),
//           (i.onSelected = (e) => {
//             (this.lastInteractionEvent = e), e.preventDefault();
//             let i = t - this.wrappedIndex(this.currentIndex),
//               s = this.currentIndex + i;
//             this.animateToItem(s);
//           }),
//           s.on('select', () => {
//             e.classList.add('current'), i.anchorEl.classList.add('current');
//           }),
//           s.on('deselect', () => {
//             e.classList.remove('current'),
//               i.anchorEl.classList.remove('current');
//           }),
//           i.anchorEl.addEventListener('click', i.onSelected),
//           this.tabNav.items.push(i);
//       }),
//         this._items.forEach((e, t) => {
//           e.el.setAttribute('role', n.TABPANEL),
//             e.el.setAttribute(r.LABELLEDBY, this.tabNav.items[t].anchorEl.id),
//             this.tabNav.items[t].anchorEl.setAttribute(r.CONTROLS, e.el.id);
//         });
//     },
//     mounted() {
//       const e = this.tabNav.items[0].el.parentElement;
//       this.roamingTabIndex = new s(e, {
//         selector: this.model.TabNav.RoamingTabIndexSelector,
//       });
//     },
//     onItemChangeCompleted(e) {
//       let t = this.tabNav.items.filter((t) => t.trigger === e.current.id)[0];
//       this.setCurrentItem(t),
//         this.roamingTabIndex.setSelectedItemByIndex(t.index, !0),
//         document.activeElement.parentElement.parentElement ===
//           t.el.parentElement && t.anchorEl.focus();
//     },
//     setCurrentItem(e) {
//       e !== this.tabNav.current && (this.tabNav.current = e);
//     },
//   };
//   class a {
//     constructor(e, t) {
//       (this.el = e),
//         (this.index = t),
//         (this.anchorEl = e.querySelector('a')),
//         (this.trigger = this.anchorEl.getAttribute(
//           'data-ac-gallery-trigger'
//         )),
//         this.anchorEl.setAttribute('role', n.TAB);
//     }
//   }
// },

// function (e, t, i) {
//   'use strict';
//   var s = i(0)(i(90));
//   const r = i(17),
//     n = i(91),
//     a = i(97),
//     o = i(101),
//     h = i(201),
//     l = i(202),
//     c = i(96),
//     u = i(203),
//     d = i(204),
//     m = i(106);
//   e.exports = class extends r {
//     constructor(e) {
//       super(e);
//       const t = document.documentElement.classList.contains('android'),
//         i = {
//           itemsSelector: '.tabnav-items',
//           itemSelector: '.tabnav-link',
//           leftPaddleSelector: '.tabnav-paddle-left',
//           rightPaddleSelector: '.tabnav-paddle-right',
//           scrollEasing: 'ease-out',
//           scrollDuration: 0.5,
//           usePaddles: !0,
//         };
//       (this._initializeGallery = this._initializeGallery.bind(this)),
//         (this._initialized = !1);
//       const r = {
//           beforeCreate() {
//             (this.model.autoAdvanceDelay = this.el.dataset.advanceDelay),
//               (this.model.PrefersReducedMotion =
//                 document.documentElement.classList.contains(
//                   'reduced-motion'
//                 )),
//               (this.model.IsAOW =
//                 document.documentElement.classList.contains('aow')),
//               (this.model.IsRTL =
//                 'rtl' === document.documentElement.getAttribute('dir')),
//               (this.model.IsTouch =
//                 'ontouchstart' in document.documentElement),
//               (this.model.Fade.duration = 0.4),
//               (this.model.IsStopped = !1),
//               (this.model.SlideNum =
//                 this.el.getElementsByClassName('gallery-item').length),
//               (this.model.media = { current: null, latest: null }),
//               (this.scrollTabNav = new m(this.el, i)),
//               (this.model.ignoreAndroidMediaPromiseError = (e) => {
//                 e instanceof Promise && t && e.catch(() => {});
//               });
//           },
//           animateToItem(e) {
//             this.scrollTabNav &&
//               this.scrollTabNav.centerItem(
//                 this.tabNav.items[this.wrappedIndex(e)].el
//               );
//           },
//           onItemChangeOccurred() {
//             if (
//               ((this.model.media.current = this.el.querySelector(
//                 `.gallery-item-${this.currentIndex + 1} .video`
//               )),
//               this.model.media.current)
//             ) {
//               this.model.media.current.classList.remove('video-tab-hidden');
//               let e = this.model.media.current.play();
//               this.model.ignoreAndroidMediaPromiseError(e),
//                 (this.model.media.latest = this.model.media.current);
//             } else if (this.model.media.latest) {
//               let e = this.model.media.latest.pause();
//               this.model.ignoreAndroidMediaPromiseError(e),
//                 (this.model.media.latest = null);
//             }
//           },
//           onItemChangeCompleted(e) {
//             this.scrollTabNav &&
//               requestAnimationFrame(() => {
//                 this.tabNav.current &&
//                   this.tabNav.current.anchorEl !=
//                     this.scrollTabNav.lastCenteredItem &&
//                   this.scrollTabNav.centerItem(this.tabNav.current.anchorEl);
//               });
//           },
//           onResizeImmediate() {
//             this.model.IsStopped = !0;
//           },
//           onBreakpointChange() {
//             this.model.IsStopped = !0;
//           },
//         },
//         p = n.withMixins(h, d, r, a, o, l, s.default, c, u),
//         f = this.el;
//       this._initializeGallery(p, f);
//     }
//     _initializeGallery(e, t) {
//       var i =
//         t.getElementsByClassName('tablist-wrapper')[0].getBoundingClientRect()
//           .top - t.getBoundingClientRect().top;
//       this.anim.addEvent(t, {
//         start: `b - 100vh + (${i}px - 100h)`,
//         event: 'Initialize Gallery Event',
//         onEvent: (i) => {
//           this._initialized || (new e({ el: t }), (this._initialized = !0));
//         },
//       });
//     }
//     static IS_SUPPORTED() {
//       return document.documentElement.classList.contains('no-reduced-motion');
//     }
//   };
// },

// function (e, t, i) {
//   'use strict';
//   var s = i(0);
//   Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
//   var r = s(i(91)),
//     n = s(i(244)),
//     a = s(i(101)),
//     o = s(i(90)),
//     h = s(i(245)),
//     l = s(i(246)),
//     c = s(i(247));
//   const u = i(97),
//     d = i(106);
//   t.default = class {
//     constructor() {
//       const e = {
//         itemsSelector: '.tabnav-items',
//         itemSelector: '.tabnav-link',
//         leftPaddleSelector: '.tabnav-paddle-left',
//         rightPaddleSelector: '.tabnav-paddle-right',
//         scrollEasing: 'ease-out',
//         scrollDuration: 0.5,
//         usePaddles: !0,
//       };
//       let t = {
//         beforeCreate() {
//           (this.model.PrefersReducedMotion =
//             document.documentElement.classList.contains('reduced-motion')),
//             (this.model.IsRTL =
//               'rtl' === document.documentElement.getAttribute('dir')),
//             (this.model.IsTouch = 'ontouchstart' in document.documentElement),
//             'S' === this.model.pageMetrics.breakpoint &&
//               (this.scrollTabNav = new d(this.el, e));
//         },
//         animateToItem(e) {
//           this.scrollTabNav &&
//             this.scrollTabNav.centerItem(
//               this.tabNav.items[this.wrappedIndex(e)].el
//             );
//         },
//         onItemChangeCompleted(e) {
//           this.scrollTabNav &&
//             requestAnimationFrame(() => {
//               this.tabNav.current.el != this.scrollTabNav.lastCenteredItem &&
//                 this.scrollTabNav.centerItem(this.tabNav.current.el);
//             });
//         },
//         onBreakpointChange(t) {
//           'S' === t.breakpoint &&
//             ((this.scrollTabNav = this.scrollTabNav || new d(this.el, e)),
//             this.scrollTabNav.centerItem(this.tabNav.current.el));
//         },
//       };
//       this.defaultMixin = {
//         Analytics: n.default,
//         TabNav: a.default,
//         Fade: u,
//         SelectDeselectOnChangeOccurred: o.default,
//         SharedTimeline: l.default,
//         BarsAnimation: c.default,
//         KeyboardNavigation: h.default,
//         CustomizeModel: t,
//       };
//     }
//     removeMixins() {
//       arguments.length &&
//         arguments.forEach((e) => {
//           this.defaultMixin[e] && delete this.defaultMixin[e];
//         });
//     }
//     withMixins() {
//       let e = [];
//       for (let t in this.defaultMixin) e.push(this.defaultMixin[t]);
//       this.gallery = r.default.withMixins(...e, ...arguments);
//     }
//     create(e) {
//       return (
//         this.removeMixins(), this.withMixins(), new this.gallery({ el: e })
//       );
//     }
//   };
// },
