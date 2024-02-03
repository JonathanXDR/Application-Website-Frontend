<template>
  <div class="tablist-wrapper">
    <div class="tabnav">
      <ul role="tablist" class="tabnav-items">
        <li v-for="(item, index) in items" :key="index" class="tabnav-item">
          <input :id="item.id" type="radio" name="category" :value="index" />
          <label :for="item.id" class="tabnav-link">{{ item.label }}</label>
        </li>
      </ul>
      <div class="tabnav-paddles">
        <button class="tabnav-paddle tabnav-paddle-left" disabled>
          <Icon name="chevron.left" class="icon icon-small" />
        </button>
        <button class="tabnav-paddle tabnav-paddle-right" disabled>
          <Icon name="chevron.right" class="icon icon-small" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: { id: string; label: string }[];
}>();

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
</script>

<style scoped>
/* --------------------------------- tabnav --------------------------------- */

.tabnav {
  --scroll-container-safearea-offset: -10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 3.1764705882em;
  font-size: 17px;
  text-align: center;
  z-index: 1;
}

.tabnav {
  height: 3.4em;
  width: auto;
  margin-bottom: 18px;
  text-align: center;
}

/* ------------------------------ tabnav-paddle ----------------------------- */

.tabnav-paddle {
  font-size: 17px;
  line-height: 1.7647058824;
  font-weight: 300;
  /* letter-spacing: 0em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  border: 0 solid var(--color-fill-gray-tertiary);
  border-radius: 0;
  color: var(--color-fill-gray);
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: center;
  width: calc(34px - 1px);
  transition: opacity 150ms ease-out;
}

.tabnav-paddle:disabled {
  opacity: 0;
}

.tabnav-paddle:hover:after {
  opacity: 1;
}

.tabnav-paddle:active {
  outline: none;
}

.tabnav-paddle:active:after {
  outline: none;
  opacity: 1;
}

/* --------------------------- tabnav-paddle-left --------------------------- */

.tabnav-paddle-left {
  border-right-width: 1px;
  left: 0;
}

.tabnav-paddle-left .icon {
  margin-left: -0.5px;
}

/* --------------------------- tabnav-paddle-right -------------------------- */

.tabnav-paddle-right {
  border-left-width: 1px;
  right: 0;
}

.tabnav-paddle-right .icon {
  margin-right: -0.5px;
}

/* ---------------------------------- icon ---------------------------------- */

.icon {
  opacity: 0.8;
  transition: opacity 200ms linear;
}

/* ------------------------------ tabnav-items ------------------------------ */

.tabnav-items {
  margin: 0 34px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  padding: 0 0 3.1764705882em;
}

.tabnav-items {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ------------------------------- tabnav-item ------------------------------ */

.tabnav-item {
  display: inline-block;
  padding-left: 60px;
  border-bottom: 1px solid var(--color-fill-gray-tertiary);
  list-style: none;
  outline: none;
}

#music .tabnav-item {
  padding-left: 40px !important;
  border-bottom-width: 1px !important;
}

#music .tabnav-item:first-child {
  padding-left: 0 !important;
}

.tabnav-item {
  display: block;
  border-bottom-width: 2px;
  border-bottom-color: var(--color-figure-gray-secondary);
}

.tabnav-item > input[type="radio"] {
  display: none;
}

.tabnav-item > input[type="radio"]:checked ~ label.tabnav-link {
  color: var(--color-fill-gray);
  pointer-events: none;
  text-decoration: none;
  cursor: default;
  z-index: 10;
}

#music .tabnav-item > input[type="radio"]:checked ~ label.tabnav-link {
  color: #e85f82 !important;
}

.tabnav-item > input[type="radio"]:checked ~ label.tabnav-link:after {
  border-bottom-color: var(--color-fill-gray);
}

#music .tabnav-item > input[type="radio"]:checked ~ label.tabnav-link:after {
  border-bottom-width: 2px !important;
  border-bottom-color: #e85f82 !important;
}

@media only screen and (max-width: 1068px) {
  .tabnav-item {
    padding-left: 50px;
  }
}

@media only screen and (max-width: 734px) {
  .tabnav-item {
    padding-left: 30px;
  }
}

.tabnav-item:first-child {
  padding-left: 0;
}

/* ------------------------------- tabnav-link ------------------------------ */

.tabnav-link {
  cursor: pointer;
  font-size: 17px;
  line-height: 1;
  font-weight: 400;
  /* letter-spacing: -0.021em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  padding: 9px 0 11px;
  margin-top: 2px;
  margin-bottom: 4px;
  text-align: left;
  text-decoration: none;
  display: block;
  position: relative;
  z-index: 0;
}

.tabnav-link {
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  /* letter-spacing: 0.011em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  color: var(--color-figure-gray-secondary);
}

.tabnav-link:after {
  border-bottom-width: 2px;
  bottom: -6px;
}

.tabnav-link:hover {
  color: var(--color-figure-gray-secondary-alt);
  text-decoration: none;
}

.tabnav-link:after {
  left: 0;
  position: absolute;
  bottom: -5px;
  width: 100%;
  border-bottom: 1px solid transparent;
  content: "";
}

@media only screen and (max-width: 1068px) {
  .tabnav-link {
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    /* letter-spacing: 0.012em; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      "Helvetica", "Arial", sans-serif;
  }
}

@media only screen and (max-width: 734px) {
  .tabnav-link {
    font-size: 17px;
    line-height: 1.2353641176;
    font-weight: 600;
    /* letter-spacing: -0.022em; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      "Helvetica", "Arial", sans-serif;
  }
}

/* ----------------------------- tablist-wrapper ---------------------------- */

.tablist-wrapper {
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  max-width: 100%; */
}

.tablist-wrapper {
  top: 1112px;
}

@media only screen and (max-width: 1068px) {
  .tablist-wrapper {
    top: 874px;
  }
}

@media only screen and (max-width: 734px) {
  .section-versatility-gallery .gallery .tablist-wrapper {
    top: 518px;
  }
}
</style>
