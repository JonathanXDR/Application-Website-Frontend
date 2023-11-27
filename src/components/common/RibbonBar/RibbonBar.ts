import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { listRepositoryTags } from '@/helpers/github-helper'
import type { LinkType } from '@/types/common/Link'
import { computed, defineComponent, onMounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    Icon,
    LinkCollection
  },
  setup() {
    const { tm, rt } = useI18n()
    const tags: Ref<{ latest: string | undefined; previous: string | undefined }> = ref({
      latest: undefined,
      previous: undefined
    })

    const fetchTags = async () => {
      const [latest, previous] = await listRepositoryTags({
        owner: 'JonathanXDR',
        repo: 'Application-Website-Frontend',
        perPage: 2
      })

      tags.value = { latest: latest.name, previous: previous.name }
    }

    const links = computed(() => {
      return (tm('components.common.RibbonBar.links') as LinkType[]).map((link) => {
        return {
          ...link,
          url: rt(link.url, { latestTag: tags.value.latest, previousTag: tags.value.previous })
        }
      })
    })

    onMounted(fetchTags)

    return { links, tags }
  }
})

// const Jt = (n) => {
//   let {
//     content: r,
//     staticContent: a,
//     delay: i = 700,
//     noAnimation: o,
//     forceHideBanner: c = !1,
//     className: l,
//     ...d
//   } = n;
//   const [u, m] = (0, e.useState)(!1),
//     [p, h] = (0, e.useState)(a ? [...a] : []),
//     [f, g] = (0, e.useState)(0),
//     [v, b] = (0, e.useState)(!1);
//   (0, e.useEffect)(() => {
//     r && h([...p, r]);
//   }, [r]),
//     (0, e.useEffect)(() => {
//       if ((r || !s().isEmpty(a)) && !u) {
//         setTimeout(
//           () => {
//             m(!0);
//           },
//           o ? 0 : i
//         );
//       }
//     }, [r, a]);
//   const E = p && p.length,
//     y = (0, e.useRef)(E);
//   (0, e.useEffect)(() => {
//     f >= E - 1 && b(!0),
//       E > y.current && (f < E - 1 && b(!1), (y.current = E));
//   }, [f, E]);
//   const w = !v && E > 1,
//     C = t().createElement(
//       'div',
//       { className: 'ribbon-content-wrapper' },
//       t().createElement(
//         'div',
//         { className: 'ribbon-content rc-ribbon-content-container row' },
//         E &&
//           t().createElement(
//             'div',
//             { className: 'column large-12 small-12 large-centered' },
//             t().createElement(
//               'div',
//               {
//                 className: J()('rc-ribbon-content', {
//                   'with-paddlenav': E > 1,
//                 }),
//               },
//               t().createElement(oe.h_, {
//                 index: f,
//                 onChange: (e) => g(e),
//                 items: p,
//                 dotnav: !1,
//                 paddlenav: E > 1,
//                 paddlenavProps: { framed: !1 },
//                 swipableProps: { trackTouch: !0 },
//                 infinite: !0,
//                 autoScroll: w,
//                 transitionDuration: 1e3,
//                 classes: {
//                   root: 'rc-ribbon-content-autoscroll',
//                   gallery: 'rc-ribbon-content-gallery',
//                   scroller: 'rc-ribbon-content-scroller',
//                 },
//                 renderItem: (e, n) =>
//                   t().createElement(
//                     oe.bI,
//                     {
//                       index: n,
//                       addDisabled: !1,
//                       className: 'rc-ribbon-gallery-item',
//                       id: void 0,
//                     },
//                     t().createElement(
//                       'div',
//                       (0, se.Z)(
//                         {
//                           className: J()(
//                             'rc-ribbon-content-item-base',
//                             `rc-ribbon-content-item-${n}`,
//                             { 'rc-ribbon-content-item': E > 1 }
//                           ),
//                         },
//                         (0, ce.C7)(e)
//                       )
//                     )
//                   ),
//               })
//             )
//           )
//       )
//     );
//   return t().createElement(
//     'div',
//     (0, se.Z)(
//       {
//         className: J()(
//           'rc-ribbon ribbon',
//           { 'ribbon-blue-to-default': !o, 'rc-ribbon-hide': !u || c },
//           l
//         ),
//         'data-analytics-region': 'banner',
//       },
//       d
//     ),
//     o
//       ? C
//       : t().createElement(
//           'div',
//           { className: 'ribbon-drop-wrapper' },
//           ' ',
//           C,
//           ' '
//         )
//   );
// };

// var en = (e) => {
//   let { id: n = 'rotating-promo-banner', ...a } = e;
//   const s = document.getElementById(n);
//   return s
//     ? r().createPortal(t().createElement(Jt, a), s)
//     : t().createElement(Jt, a);
// };

// var jr = () => {
//   const n = s().get(window, 'BUYFLOW_MESSAGES_BOOTSTRAP'),
//     a = s().get(window, 'ACI_CONFIG_MAP'),
//     [i, o] = (0, e.useState)(''),
//     c = (0, e.useRef)(document.getElementById('rf-navbar')),
//     l = (() => {
//       const {
//         last: e,
//         sections: t,
//         ...n
//       } = s().get(window, 'pageLevelData.promoRibbonContent') || {};
//       return n
//         ? s().compact(
//             Object.keys(n)
//               .sort()
//               .map((e) => n[e])
//           )
//         : [];
//     })(),
//     d = s().get(window, 'pageLevelData.chat.chatFeature'),
//     u = d
//       ? `<div class="rf-overlay-chat-withbackgroundfooter">${d}</div>`
//       : null,
//     [m, p] = t().useState(!0);
//   return (
//     (0, re.Z)('pageshow', (e) => {
//       e.persisted && window.location.reload();
//     }),
//     (0, e.useEffect)(() => {
//       Y.init();
//     }, []),
//     t().createElement(
//       'div',
//       { className: 'rs-storehome-app' },
//       t().createElement(
//         ae.n,
//         null,
//         t().createElement(
//           hn,
//           { parentRef: c },
//           c.current &&
//             r().createPortal(t().createElement(yn, null), c.current),
//           t().createElement(sn, {
//             dataPattern: 'data-ase-loader',
//             footerContent: u,
//             onContentLoaded: () => {
//               p(!m);
//             },
//           }),
//           t().createElement(
//             ne,
//             null,
//             t().createElement(de, { dataPattern: 'data-react-gallery' })
//           ),
//           t().createElement(
//             ne,
//             null,
//             t().createElement(Ee, { dataPattern: 'data-react-accordion' })
//           ),
//           t().createElement(
//             ne,
//             null,
//             t().createElement(qe, {
//               dataPattern: 'data-react-videoplayer',
//             })
//           ),
//           t().createElement(
//             ne,
//             null,
//             t().createElement(Xe, {
//               dataPattern: 'data-react-inlinevideo',
//             })
//           ),
//           t().createElement(
//             ne,
//             null,
//             t().createElement(Ae, {
//               dataPattern: 'data-react-tabs',
//               className: m ? 'rf-tabs-render' : 'rf-tabs-rerender',
//             })
//           ),
//           t().createElement(
//             ne,
//             null,
//             t().createElement(en, {
//               className: J()('rs-storehome-banner', {
//                 'rf-acmi-banner': !!i,
//               }),
//               content: i,
//               staticContent: l,
//             }),
//             t().createElement(Kt, {
//               bootstrap: n,
//               onCompleted: (e) => {
//                 let { bannerMessage: t = '' } = e;
//                 t && o(t);
//               },
//               aciConfigMap: a,
//               fireWithBuyflowReferrer: !0,
//               shouldHideLinks: !0,
//             })
//           ),
//           t().createElement(Wr, {
//             data: s().get(window, 'pageLevelData.header'),
//           }),
//           t().createElement(Ur, {
//             slots: s().get(window, 'pageLevelData.slots', []),
//           })
//         )
//       )
//     )
//   );
// };

// var Gt = (t, n) => {
//   (0, e.useEffect)(() => {
//     const e = (e) => {
//         if (
//           e.target.matches('[data-buyflow-messages-overlay="ribbon"]')
//         ) {
//           const n = e.target;
//           e.preventDefault();
//           const r = 'data-analytics-region',
//             a = n.closest(`[${r}]`),
//             s = a ? a.getAttribute(r) : 'ribbon';
//           t({
//             isBanner: !0,
//             evarParam: s,
//             metricsInfo: n.getAttribute(
//               'data-buyflow-messages-metrics-info'
//             ),
//           });
//         } else
//           e.target.matches('[data-buyflow-messages-apply]') &&
//             (e.preventDefault && e.preventDefault(), n(e));
//       },
//       r = (t) => {
//         (t.keyCode !== c.XP.Return && t.keyCode !== c.XP.Space) || e(t);
//       };
//     return (
//       document.addEventListener('click', e),
//       document.addEventListener('keydown', r),
//       () => {
//         document.removeEventListener('click', e),
//           document.removeEventListener('keydown', r);
//       }
//     );
//   }, []);
// };

// t.Z = (e) => {
//   let {
//     items: t,
//     dotnav: n,
//     dotnavProps: a = {},
//     paddlenav: i,
//     paddlenavProps: g = {},
//     metrics: v,
//     peek: b,
//     onChange: E = () => {},
//     classes: y = {},
//     a11y: w,
//     ...C
//   } = e;
//   const { viewport: _, assets: S } = (0, l.b)(),
//     x = { ...f(t, S), ...w },
//     N = i || ('small' !== _ && !1 !== i),
//     A = n || !1 !== n,
//     { root: k, image: T, ...O } = y;
//   return s().createElement(
//     c.ZP,
//     (0, r.Z)(
//       {
//         items: t,
//         classes: {
//           root: o()('rc-inline-gallery', k, {
//             'rc-inline-gallery-peek': b,
//             'rc-inline-gallery-autoscroll': C.autoScroll,
//           }),
//           ...O,
//         },
//         onChange: (e, n) => {
//           E(e), v && 'autoScroll' !== n && (0, h.Y)(v, e, t.length);
//         },
//         renderItem: (e, t) =>
//           s().createElement(
//             u.Z,
//             { key: t, index: t },
//             s().createElement(d.ZP, {
//               className: o()('rc-inline-gallery-image', T),
//               data: e,
//             })
//           ),
//         childrenBefore:
//           A &&
//           s().createElement(
//             p.Z,
//             (0, r.Z)(
//               {
//                 items: t,
//                 getButtonProps: (e, t) => ({
//                   'data-autom': `gallery-dot-nav-${t}`,
//                 }),
//               },
//               a
//             )
//           ),
//         a11y: x,
//       },
//       C
//     ),
//     N &&
//       s().createElement(m.Z, (0, r.Z)({ framed: !0, compact: !0 }, g))
//   );
// };

// 4674: function (e, t, n) {
//   'use strict';
//   var r = n(2122),
//     a = n(3804),
//     s = n.n(a),
//     i = n(4184),
//     o = n.n(i),
//     c = n(6258);
//   t.Z = (e) => {
//     let {
//       framed: t,
//       compact: n,
//       previousProps: a = {},
//       nextProps: i = {},
//       classes: l = {},
//     } = e;
//     return s().createElement(
//       'div',
//       {
//         className: o()(l.root, 'rc-gallery-paddlenav', 'paddlenav', {
//           'paddlenav-framed': t,
//           'paddlenav-compact': n,
//         }),
//       },
//       s().createElement(
//         c.hA,
//         (0, r.Z)(
//           {
//             className: o()(
//               l.previous,
//               'paddlenav-arrow',
//               'paddlenav-arrow-previous'
//             ),
//             'data-autom': 'paddlenav-previous',
//           },
//           a
//         )
//       ),
//       s().createElement(
//         c.aW,
//         (0, r.Z)(
//           {
//             className: o()(
//               l.next,
//               'paddlenav-arrow',
//               'paddlenav-arrow-next'
//             ),
//             'data-autom': 'paddlenav-next',
//           },
//           i
//         )
//       )
//     );
//   };
// },

// En = (e) => {
//   let {
//     sectionList: n = [],
//     handleClick: r,
//     isHidden: a,
//     isStuck: o,
//     activeSection: c,
//     clickedSection: l,
//   } = e;
//   const { assets: d } = (0, ae.b)(),
//     u = s().get(d, 'a11yLocalText', 'Local'),
//     m =
//       void 0 === s().get(c, 'id')
//         ? 0
//         : Math.max(
//             n.findIndex((e) => s().get(e, 'id') === c.id),
//             0
//           ),
//     p = i.gT(),
//     h = t().useRef(),
//     f = (e, t) => {
//       setTimeout(() => {
//         const n = e.target.disabled,
//           r = h.current.querySelector(t);
//         n && r && r.focus();
//       }, 500);
//     };
//   return t().createElement(
//     'div',
//     {
//       className: J()('rf-navbar-content-wrapper', {
//         'rf-navbar-is-hidden': a,
//         'rf-navbar-is-stuck': o,
//       }),
//       ref: h,
//     },
//     t().createElement(
//       'div',
//       {
//         className: 'rf-navbar-content',
//         'aria-label': u,
//         role: 'navigation',
//       },
//       p.touch
//         ? n.map(
//             (e) =>
//               e &&
//               t().createElement(bn, {
//                 key: e.id,
//                 section: e,
//                 activeSection: c,
//                 clickedSection: l,
//                 handleClick: r,
//               })
//           )
//         : t().createElement(
//             vn.Tt,
//             { index: m },
//             t().createElement(
//               'div',
//               {
//                 className:
//                   'paddlenav paddlenav-compact rf-navbar-paddlenav rf-navbar-paddlenav-previous',
//               },
//               t().createElement(
//                 vn.uy,
//                 {
//                   className:
//                     'paddlenav-arrow paddlenav-arrow-previous rf-navbar-paddlenav-arrow-previous',
//                   onKeyDown: (e) => f(e, '.paddlenav-arrow-next'),
//                 },
//                 t().createElement(
//                   'span',
//                   (0, se.Z)(
//                     { className: 'a11y' },
//                     (0, ce.C7)(d.previous)
//                   )
//                 )
//               ),
//               t().createElement('div', { className: 'rf-navbar-fade' })
//             ),
//             t().createElement(
//               vn.hz,
//               {
//                 platterAttrs: { role: 'list' },
//                 scrollerItemAttrs: { role: 'listitem' },
//               },
//               n.map(
//                 (e) =>
//                   e &&
//                   t().createElement(bn, {
//                     key: e.id,
//                     section: e,
//                     activeSection: c,
//                     clickedSection: l,
//                     handleClick: r,
//                   })
//               )
//             ),
//             t().createElement(
//               'div',
//               {
//                 className:
//                   'paddlenav paddlenav-compact rf-navbar-paddlenav rf-navbar-paddlenav-next',
//               },
//               t().createElement(
//                 vn.u7,
//                 {
//                   className:
//                     'paddlenav-arrow paddlenav-arrow-next rf-navbar-paddlenav-arrow-next',
//                   onKeyDown: (e) => f(e, '.paddlenav-arrow-previous'),
//                 },
//                 t().createElement(
//                   'span',
//                   (0, se.Z)({ className: 'a11y' }, (0, ce.C7)(d.next))
//                 )
//               ),
//               t().createElement('div', { className: 'rf-navbar-fade' })
//             )
//           )
//     )
//   );
// };

// t().createElement(
//   'div',
//   {
//     className:
//       'paddlenav paddlenav-framed paddlenav-compact',
//     ref: v,
//   },
//   t().createElement(
//     vn.uy,
//     {
//       className:
//         'paddlenav-arrow paddlenav-arrow-previous',
//       onClick: () =>
//         Or({
//           index: h,
//           slotName: p,
//           items: l,
//           buttonText: 'previous',
//         }),
//       onKeyDown: (e) => {
//         setTimeout(() => {
//           const t = e.target.disabled,
//             n = v.current.querySelector(
//               '.paddlenav-arrow-next'
//             );
//           t && n && n.focus();
//         }, 500);
//       },
//     },
//     t().createElement(
//       'span',
//       (0, se.Z)(
//         { className: 'visuallyhidden' },
//         (0, ce.C7)(`${g.previous} - ${u}`)
//       )
//     )
//   ),
//   t().createElement(
//     vn.u7,
//     {
//       className: 'paddlenav-arrow paddlenav-arrow-next',
//       onClick: () =>
//         Or({
//           index: h,
//           slotName: p,
//           items: l,
//           buttonText: 'next',
//         }),
//       onKeyDown: (e) => {
//         setTimeout(() => {
//           const t = e.target.disabled,
//             n = v.current.querySelector(
//               '.paddlenav-arrow-previous'
//             );
//           t && n && n.focus();
//         }, 500);
//       },
//     },
//     t().createElement(
//       'span',
//       (0, se.Z)(
//         { className: 'visuallyhidden' },
//         (0, ce.C7)(`${g.next} - ${u}`)
//       )
//     )
//   )
// )
