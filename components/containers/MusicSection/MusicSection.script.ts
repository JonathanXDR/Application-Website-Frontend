import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Icon from "~/components/common/Icons/Icon.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import TabList from "~/components/common/TabList/TabList.vue";

export default defineComponent({
  name: "MusicSection",
  components: {
    LoadingSpinner,
    Icon,
    TabList,
  },
  setup() {
    const { tm } = useI18n();

    return {
      tm,
    };
  },
});

// function (t, e, i) {
//   'use strict';
//   const s = i(3),
//     r = i(94),
//     n = i(46),
//     a = i(124),
//     o = i(17).PictureLazyLoading,
//     h = i(47);
//   i(125);
//   ({
//     initialize: function () {
//       this.initBubbleGum(), h.init(), this.setupSystemLinks();
//     },
//     initBubbleGum: function () {
//       Object.assign(n, {
//         DynamicGallery: i(146),
//         Marquee: i(156),
//         StaticMarquee: i(157),
//         InlineVideo: i(158),
//       });
//       const t = document.querySelector('.main');
//       new r(t).anim.on(s.EVENTS.ON_DOM_KEYFRAMES_CREATED, () => {
//         new o();
//       }),
//         a.detect();
//     },
//     setupSystemLinks: function () {
//       if (document.documentElement.classList.contains('apple-one-eligible')) {
//         document.querySelectorAll('.button-try-apple-one').forEach((t) => {
//           const e = t.dataset.appStore;
//           t.addEventListener('click', (t) => {
//             (location.href = e), t.preventDefault();
//           });
//         });
//       }
//     },
//   }).initialize();
// },

// function (t, e, i) {
//   'use strict';
//   var s = i(50),
//     r = s(i(10)),
//     n = i(147),
//     a = s(i(148)),
//     o = s(i(153)),
//     h = s(i(16)),
//     l = s(i(29)),
//     c = s(i(54));
//   const {
//     TIME_OUT: u,
//     TILE_COUNT_MINIMUM: d,
//     NUMBER_OF_MARQUEE_ROWS: p,
//     VIEWPORT_MEDIA_QUERIES: m,
//     GET_IMG_WIDTHS: f,
//     GET_IMG_HEIGHTS: _,
//   } = i(53);
//   class g extends r.default {
//     constructor(t) {
//       super(t),
//         (this.config = this.el.getAttribute('data-endpoint')),
//         (this.apiBaseURL = this.el.getAttribute('data-base-api-url')),
//         (this.apiSecondaryURL = this.el.getAttribute(
//           'data-secondary-api-url'
//         ));
//       const e = document.querySelector('meta[property="apple-all-token"]');
//       (this.developerToken = e ? e.getAttribute('content') : null),
//         (this.configData = (0, n.getConfig)(
//           this.config,
//           this.apiBaseURL,
//           this.apiSecondaryURL,
//           this.developerToken
//         )),
//         (this.itemContainer = this.el.querySelector(
//           '.dynamic-gallery-item-container'
//         )),
//         (this.ctaCopy = this.el.dataset.ctaCopy),
//         (this.watchNowText = this.el.dataset.watchNow),
//         (this.previewNowText = this.el.dataset.previewNow),
//         (this.timeText = this.el.dataset.timeText || 'minutes'),
//         (this.tileFormat = this.el.dataset.tileFormat
//           ? this.el.dataset.tileFormat.toUpperCase()
//           : 'DEFAULT'),
//         this.itemContainer.classList.add(
//           this.config,
//           `dynamic-gallery-item-container--${this.tileFormat.toLowerCase()}`
//         ),
//         (this.galleryItemCount = 0),
//         (this.marquees = []);
//     }
//     mounted() {
//       this.addTileStyles(),
//         'apple-fitness' === this.config
//           ? this.fetchMultipleEndpointData()
//           : this.fetchSingleEndpointData();
//     }
//     fetchSingleEndpointData() {
//       (0, a.default)(this.configData)
//         .then((t) => {
//           (0, l.default)(t.successMessage),
//             t.successMessage && this.normalizeData(t);
//         })
//         .catch((t) => {
//           (0, h.default)(t), this.removeDynamicGallery();
//         });
//     }
//     fetchMultipleEndpointData() {
//       const { secondaryUrl: t = '' } = this.configData;
//       let e, i, s, r;
//       (0, a.default)(this.configData)
//         .then((i) => {
//           if (
//             ((0, l.default)(i.successMessage), 'apple-tv' === this.config)
//           ) {
//             this.collectionData = i.response.data.items;
//             const e = this.collectionData.map((t) => t.id);
//             r = `${t}&ids=${e.join(',')}`;
//           } else
//             'apple-fitness' === this.config &&
//               ((e = i.response.data[0].relationships.contents.data.filter(
//                 (t) => t.attributes && t.attributes.artworks
//               )),
//               (r = t));
//           return (0, a.default)({ ...this.configData, url: r });
//         })
//         .then((t) => {
//           'apple-fitness' === this.config
//             ? ((i = t.response.data[0].relationships.contents.data.filter(
//                 (t) => t.attributes && t.attributes.artworks
//               )),
//               (s = ((...t) => {
//                 const e = [];
//                 for (let i = 0; i < Math.max(...t.map((t) => t.length)); i++)
//                   t.forEach((t) => {
//                     void 0 !== t[i] && e.push(t[i]);
//                   });
//                 return e;
//               })(e, i)))
//             : (s = t),
//             t.successMessage &&
//               ((0, l.default)(t.successMessage), this.normalizeData(s));
//         })
//         .catch((t) => {
//           (0, h.default)(t), this.removeDynamicGallery();
//         });
//     }
//     normalizeData(t) {
//       let e = null,
//         i = null;
//       if (
//         ('apple-tv' === this.config
//           ? (i = t.response.data.shelf.items)
//           : 'apple-fitness' === this.config
//           ? (i = t)
//           : 'apple-music' === this.config
//           ? (i = t.response.data[0].relationships.contents.data)
//           : 'apple-arcade' === this.config
//           ? ((e =
//               t.response.data[0].relationships.tabs.data[0].relationships
//                 .children.data),
//             (i = e.find((t) => '418' === t.attributes.editorialElementKind)
//               .relationships.contents.data))
//           : 'apple-podcasts' === this.config
//           ? (i = t.response.results.podcasts[0].data)
//           : 'apple-books' === this.config
//           ? (i = t.response.data[0].relationships.contents.data)
//           : 'apple-news' === this.config &&
//             ((i = t.response), (i = i.filter((t) => t.imageURLs.small))),
//         !i)
//       )
//         return;
//       const s = i.map((t, e) => {
//           var i, s, r, n, a, o, h, l, c, u, d, p, m, f, _;
//           const g = `dynamic-gallery-item-${(e + 10).toString(36)}`,
//             b =
//               t.imageURLs && t.imageURLs.small ? t.imageURLs.small['1x'] : '',
//             y =
//               (null === (i = t.images) ||
//               void 0 === i ||
//               null === (s = i.coverArt16X9) ||
//               void 0 === s
//                 ? void 0
//                 : s.url) || '',
//             v =
//               t.genres && t.genres[0] && t.genres[0].name
//                 ? t.genres[0].name
//                 : '',
//             E = t.releaseDate || '';
//           return (null !== (r = t.attributes) && void 0 !== r && r.artwork) ||
//             (null !== (n = t.attributes) && void 0 !== n && n.artworks)
//             ? {
//                 attributes: t.attributes,
//                 galleryItemID: g,
//                 relationships: t.relationships || '',
//               }
//             : {
//                 attributes: {
//                   artwork: {
//                     url:
//                       (null === (a = t.images) ||
//                       void 0 === a ||
//                       null === (o = a.shelfImage) ||
//                       void 0 === o
//                         ? void 0
//                         : o.url) ||
//                       (null === (h = t.attributes) ||
//                       void 0 === h ||
//                       null === (l = h.platformAttributes) ||
//                       void 0 === l
//                         ? void 0
//                         : l.ios.editorialArtwork.topShelf.url) ||
//                       b ||
//                       y ||
//                       '',
//                     bgColor:
//                       (null === (c = t.images) ||
//                       void 0 === c ||
//                       null === (u = c.shelfImage) ||
//                       void 0 === u
//                         ? void 0
//                         : u.joeColor) ||
//                       (null === (d = t.attributes) ||
//                       void 0 === d ||
//                       null === (p = d.platformAttributes) ||
//                       void 0 === p
//                         ? void 0
//                         : p.ios.editorialArtwork.topShelf.bgColor) ||
//                       '',
//                   },
//                   name:
//                     t.title ||
//                     (null === (m = t.attributes) || void 0 === m
//                       ? void 0
//                       : m.name) ||
//                     '',
//                   subtitle:
//                     v ||
//                     (null === (f = t.attributes) || void 0 === f
//                       ? void 0
//                       : f.genreDisplayName) ||
//                     t.type ||
//                     t.edition ||
//                     '',
//                   url:
//                     (null == t ? void 0 : t.url) ||
//                     (null === (_ = t.attributes) || void 0 === _
//                       ? void 0
//                       : _.url) ||
//                     t.newsLink ||
//                     '',
//                   releaseDate: E,
//                 },
//                 galleryItemID: g,
//               };
//         }),
//         r = [];
//       r.push(s), s.length > 0 && this.addGalleryItemMarkup(r);
//     }
//     onMarqueePlay() {
//       this.marquees.forEach((t) => t.play(!0)),
//         (this.playPauseButton.state = 'playing');
//     }
//     onMarqueePause() {
//       this.marquees.forEach((t) => t.pause(!0)),
//         (this.playPauseButton.state = 'paused');
//     }
//     togglePlayPauseClick() {
//       'playing' === this.playPauseButton.state
//         ? this.onMarqueePause()
//         : this.onMarqueePlay();
//     }
//     initPlayPauseButton() {
//       const t = this.el.querySelector('.play-pause-marquees-button');
//       (this.playPauseButton = new c.default(t)),
//         (this.playPauseButton.state = this.prefersReducedMotion
//           ? 'paused'
//           : 'playing'),
//         (this.togglePlayPauseClick = this.togglePlayPauseClick.bind(this)),
//         t.addEventListener('click', this.togglePlayPauseClick);
//     }
//     addTileStyles() {
//       const t = _(this.tileFormat),
//         e = f(this.tileFormat);
//       this.styleEl ||
//         ((this.styleEl = document.createElement('style')),
//         this.itemContainer.appendChild(this.styleEl)),
//         this.styleEl.setAttribute('type', 'text/css'),
//         (this.styleEl.innerHTML = Object.keys(e)
//           .reverse()
//           .reduce((i, s) => {
//             const r = 'auto' !== e[s] ? `${e[s]}px` : `${e[s]}`;
//             return (
//               i +
//               `@media only screen and (${m[s]}) {\n\t\t\t\t\t.${this.itemContainer.classList[0]}.${this.itemContainer.classList[1]} { --tile-width: ${r}; --tile-height: ${t[s]}px; }\n\t\t\t\t}`
//             );
//           }, ''));
//     }
//     addGalleryItemMarkup(t) {
//       let e = '';
//       const i = t.reduce((i, s, r) => {
//           if (r < p) {
//             const n = r * t.length;
//             (e = s[r].galleryItemID),
//               (i += o.default.markup(
//                 s,
//                 e,
//                 this.ctaCopy,
//                 n,
//                 this.tileFormat,
//                 this.watchNowText,
//                 this.previewNowText,
//                 this.timeText,
//                 this.config
//               ));
//           }
//           return i;
//         }, ''),
//         s = `\n\t\t\t<div id="${e}" class="dynamic-gallery-item" data-ac-gallery-item data-analytics-gallery-item-id="${e}">\n\t\t\t\t${i}\n\t\t\t</div>`;
//       this.itemContainer.insertAdjacentHTML('beforeend', s);
//       const r = this.itemContainer.querySelector(`#${e}`);
//       r.querySelectorAll('.marquee').forEach((t, e) => {
//         const i = this.gum.addComponent({
//           componentName: 'Marquee',
//           el: t,
//           data: { index: e },
//         });
//         this.marquees.push(i),
//           0 === this.galleryItemCount &&
//             ((i.active = !0),
//             this.anim.addEvent(this.el, {
//               start: 'a0t - 175vh',
//               end: 'a0b + 150vh',
//               anchors: [r],
//               event: `lazy-load-first-gallery-item-marquee-images-${e}`,
//               onEnterOnce: () => i.loadPictureImages(),
//             }));
//       }),
//         0 === this.galleryItemCount &&
//           (this.initPlayPauseButton(),
//           this.el.classList.add('marquees-initialized')),
//         this.galleryItemCount++;
//     }
//     removeDynamicGallery() {
//       (0, h.default)('Could not create marquee. Removing component.'),
//         this.el.remove(),
//         this.anim.forceUpdate(),
//         this.gum.removeComponent({
//           componentName: 'DynamicGallery',
//           el: this.el,
//         });
//     }
//     onResizeImmediate(t) {}
//     onResizeDebounced(t) {}
//     onBreakpointChange(t) {
//       this.addTileStyles();
//     }
//     static IS_SUPPORTED() {
//       return !0;
//     }
//   }
//   t.exports = g;
// },

// function (t, e, i) {
//   'use strict';
//   const s = i(154),
//     r = i(16),
//     {
//       DEFAULT_PICTURE_BG_COLOR: n,
//       VIEWPORT_MEDIA_QUERIES: a,
//       GET_IMG_WIDTHS: o,
//       GET_IMG_HEIGHTS: h,
//     } = i(53),
//     l = {
//       'apple-fitness': 299,
//       'apple-arcade': 288,
//       'apple-music': 286,
//       'apple-tv': 289,
//       'apple-news': 285,
//       'apple-podcasts': 300,
//       'apple-books': 294,
//     };
//   function c(t, e, i, s) {
//     const r = i * (s || 1),
//       n = e * (s || 1);
//     return t.url
//       .replace('{w}', n)
//       .replace('{h}', Math.floor(r))
//       .replace('{c}', '')
//       .replace('{f}', 'jpg');
//   }
//   t.exports = {
//     markup: function (t, e, i, s, r, u, d, p, m) {
//       return `<div class="marquee" data-marquee-clickable><ul class="marquee-list">${t.reduce(
//         (t, f, _) =>
//           t +
//           (function (t, e, i, s, r, u, d, p, m) {
//             const f = t.attributes.artworks
//                 ? t.attributes.artworks[0]
//                 : t.attributes.artwork,
//               _ = t.attributes.name,
//               g =
//                 t.attributes.url +
//                 (t.attributes.url.includes('?') ? '&' : '?'),
//               b = t.attributes.editorialNotes
//                 ? t.attributes.editorialNotes.short
//                 : '';
//             let y =
//                 t.attributes.artistName ||
//                 t.attributes.curatorName ||
//                 t.streamingRadioSubType ||
//                 t.episodeNumber ||
//                 t.attributes.subtitle ||
//                 b ||
//                 '',
//               v = i;
//             const E = `${t.attributes.name} - ${y}`;
//             let w = '';
//             if (t.attributes.durationInMilliseconds) {
//               y = `${
//                 `${t.relationships.genres.data[0].attributes.name} | ` || ''
//               }${Math.round(t.attributes.durationInMilliseconds / 6e4)} ${p}`;
//             }
//             t.attributes.releaseDate && t.attributes.releaseDate > Date.now()
//               ? (v = d)
//               : t.attributes.releaseDate &&
//                 t.attributes.releaseDate < Date.now() &&
//                 (v = u);
//             'apple-tv' === m && (w = 'icon icon-after icon-playsolid');
//             'apple-podcasts' === m && (w = 'icon icon-after icon-playsolid');
//             'apple-fitness' === m && (w = 'icon icon-after icon-playsolid');
//             'apple-music' === m && (w = 'icon icon-after icon-playsolid');
//             return `\n\t\t<li class="marquee-tile" data-id="${e}-marquee-tile-${s}">\n\t\t\t<a\n\t\t\t\tclass="marquee-link"\n\t\t\t\thref="${
//               g +
//               `itscg=10000&itsct=mus-0-mus_fam-posn${
//                 s + 1
//               }_stm-apl-avl-200130`
//             }"\n\t\t\t\tdata-analytics-title="${v.toLowerCase()} - ${_.toLowerCase()}"\n\t\t\t\tdata-analytics-exit-link\n\t\t\t\tdata-rid-relay='{"${
//               l[m]
//             }":"itsct"}'\n\t\t\t>\n\t\t\t\t<div class="marquee-hover-container">\n\t\t\t\t\t${(function (
//               t,
//               e,
//               i
//             ) {
//               const s = h(i),
//                 r = o(i),
//                 l = Object.keys(r),
//                 u = l[l.length - 1],
//                 d = 'auto' === r[u] ? s[u] : r[u];
//               return `\n\t<picture class="marquee-picture" style="background-color: #${
//                 t.bgColor || n
//               };">\n\t\t<source data-empty srcset="data:image/gif;base64,R0lGODlhAQABAHAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" media="(min-width:0px)">\n\t\t\t${l.reduce(
//                 (e, i) => {
//                   const n = s[i],
//                     o = a[i],
//                     h = 'auto' !== r[i] ? r[i] : s[i];
//                   return (
//                     e +
//                     `<source srcset="${c(t, h, n)},  ${c(
//                       t,
//                       h,
//                       n,
//                       2
//                     )} 2x" media="(${o})">`
//                   );
//                 },
//                 ''
//               )}\n\t\t\t<img class="marquee-picture-img" src="${c(
//                 t,
//                 d,
//                 s[u]
//               )}" alt="${e}">\n\t\t</picture>`;
//             })(
//               f,
//               E,
//               r
//             )}\n\t\t\t\t\t<div class="marquee-hover-content">\n\t\t\t\t\t\t<span class="marquee-cta ${w}">${v}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="marquee-copy typography-show-title-copy">\n\t\t\t\t\t<p class="marquee-title">${_}</p>\n\t\t\t\t\t<p class="marquee-subtitle">${y}</p>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>`;
//           })(f, e, i, _ + s, r, u, d, p, m),
//         ''
//       )}</ul></div>`;
//     },
//     validateTile: function (t, e) {
//       const i = t.attributes,
//         n = `tile ${i.name} #${this.galleryItemID}-marquee-tile-${e} in ${this.title}`,
//         a = (e) => {
//           const i =
//             e.artistName ||
//             e.curatorName ||
//             e.streamingRadioSubType ||
//             e.episodeNumber ||
//             e.editorialNotesShort;
//           return i || r(t), i;
//         },
//         o = {
//           url: { value: i.url, type: String, required: !0 },
//           artwork: { value: i.artwork.url, type: String, required: !0 },
//           bgColor: { value: i.artwork.bgColor, type: String, required: !0 },
//           name: { value: i.name, type: String, required: !0 },
//           artistName: { value: i.artistName, type: String, validator: a },
//           curatorName: { value: i.curatorName, type: String, validator: a },
//           streamingRadioSubType: {
//             value: i.streamingRadioSubType,
//             type: String,
//             validator: a,
//           },
//           episodeNumber: {
//             value: i.episodeNumber,
//             type: String,
//             validator: a,
//           },
//           editorialNotesShort: {
//             value: i.editorialNotes ? i.editorialNotes.short : void 0,
//             type: String,
//             validator: a,
//           },
//         };
//       return s.validateProps({ props: o, componentName: n });
//     },
//   };
// },
