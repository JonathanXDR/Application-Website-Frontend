!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
      ? define(["exports"], n)
      : n(
          ((e =
            "undefined" != typeof globalThis
              ? globalThis
              : e || self).MusicKit = {}),
        );
})(this, function (e) {
  "use strict";
  var n = void 0 !== typeof self ? self : this;

  function formatArtworkURL(e, n, d) {
    return (
      (n = n || e.height || 100),
      (d = d || e.width || 100),
      window.devicePixelRatio >= 1.5 && ((d *= 2), (n *= 2)),
      e.url
        .replace("{h}", "" + n)
        .replace("{w}", "" + d)
        .replace("{f}", "jpeg")
    );
  }
  const K = () => {},
    asAsync = (e) => {
      e.then(K, K);
    },
    d =
      /\/(?:([a-z]{2})\/)?(album|artist|episode|movie|music-video|playlist|podcast|post|season|show|song|station)\/(?:[^/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9-]+|umc.cmc.[a-zA-Z0-9]+)(?:.*(?:[?|&]i=(\d+)).*)?.*$/i;

  function formattedMediaURL(e) {
    const n = (function (e) {
        const n = e.match(d) || [];
        let [, p, h, y, _] = n;
        return (
          "music-video" === h && (h = "musicVideo"),
          -1 !== ["album", "playlist"].indexOf(h) && _
            ? ((h = "song"), (y = _))
            : "podcast" === h && _ && ((h = "episode"), (y = _)),
          {
            storefrontId: p,
            kind: h,
            contentId: y,
            itemId: _,
          }
        );
      })(e),
      { storefrontId: p, kind: h, contentId: y } = n;
    if ([p, h, y].some((e) => void 0 === e))
      throw new TypeError("Invalid Media URL: " + e);
    return {
      storefrontId: p,
      kind: h,
      contentId: y,
      isUTS: !!y && y.startsWith("umc."),
    };
  }
  const p =
      /^http(?:s)?\:\/\/(?:itunes|(embed\.)?(music|podcasts|tv))\.apple\.com/i,
    h = [
      "allow-forms",
      "allow-popups",
      "allow-same-origin",
      "allow-scripts",
      "allow-storage-access-by-user-activation",
      "allow-top-navigation-by-user-activation",
    ],
    y = ["autoplay *", "encrypted-media *", "fullscreen *", "clipboard-write"];
  const _ = new Map();

  function normalizeMediaType(e) {
    return (function (e) {
      if (_.has(e)) return _.get(e);
      let n = e
        .replace(/([A-Z])/g, "-$1")
        .replace(/[-_\s]+/g, "-")
        .replace(/(^-+)|(-+$)/, "")
        .toLowerCase();
      return (
        e.endsWith("y")
          ? (n = n.substring(0, n.length - 1) + "ies")
          : n.endsWith("s") || (n += "s"),
        _.set(e, n),
        n
      );
    })(e);
  }
  const m = [
    "contributors",
    "modalities",
    "movie",
    "musicVideo",
    "musicMovie",
    "trailer",
    "tvEpisode",
    "uploadedVideo",
    "uploaded-videos",
    "music-videos",
    "music-movies",
    "tv-episodes",
    "workouts",
  ];

  function isVideo(e) {
    var n;
    return (
      null != e &&
      (!0 === e.isUTS ||
        m.includes(e.type) ||
        "video" ===
          (null === (n = e.attributes) || void 0 === n ? void 0 : n.mediaKind))
    );
  }

  function isLive(e) {
    var n;
    return !!(null == e || null === (n = e.attributes) || void 0 === n
      ? void 0
      : n.isLive);
  }

  function isStream$1(e) {
    var n, d;
    return (
      "stream" ===
      (null == e ||
      null === (d = e.attributes) ||
      void 0 === d ||
      null === (n = d.playParams) ||
      void 0 === n
        ? void 0
        : n.format)
    );
  }

  function isAlgoStation(e) {
    return (function (e) {
      var n, d;
      return (
        "tracks" ===
        (null == e ||
        null === (d = e.attributes) ||
        void 0 === d ||
        null === (n = d.playParams) ||
        void 0 === n
          ? void 0
          : n.format)
      );
    })(e);
  }

  function isRadioStation(e, n) {
    var d, p, h;
    return (
      "radioStation" ===
        (null == e ||
        null === (p = e.attributes) ||
        void 0 === p ||
        null === (d = p.playParams) ||
        void 0 === d
          ? void 0
          : d.kind) &&
      (void 0 === n ||
        (null === (h = e.attributes) || void 0 === h ? void 0 : h.mediaKind) ===
          n)
    );
  }

  function isRadioEpisode(e, n) {
    var d;
    return (
      isRadioStation(e, n) &&
      isStream$1(e) &&
      !isLive(e) &&
      "Episode" ===
        (null == e || null === (d = e.attributes) || void 0 === d
          ? void 0
          : d.streamingRadioSubType)
    );
  }

  function isLiveRadioStation(e, n) {
    return isRadioStation(e, n) && isLive(e) && isStream$1(e);
  }

  function isLiveRadioKind(e, n) {
    return isLiveRadioStation(e, n);
  }

  function normalizeContentType(e) {
    return normalizeMediaType(e);
  }

  function _define_property$20(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const g = {
      INVALID_ERROR_ID: "INVALID_ERROR_ID",
      INVALID_ERROR_REASON: "INVALID_ERROR_REASON",
      ACCESS_DENIED: "ACCESS_DENIED",
      AGE_GATE: "AGE_GATE",
      AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
      BUFFER_STALLED_ERROR: "BUFFER_STALLED_ERROR",
      CONFIGURATION_ERROR: "CONFIGURATION_ERROR",
      CONTENT_EQUIVALENT: "CONTENT_EQUIVALENT",
      CONTENT_RESTRICTED: "CONTENT_RESTRICTED",
      CONTENT_UNAVAILABLE: "CONTENT_UNAVAILABLE",
      CONTENT_UNSUPPORTED: "CONTENT_UNSUPPORTED",
      DEVICE_LIMIT: "DEVICE_LIMIT",
      GEO_BLOCK: "GEO_BLOCK",
      INVALID_ARGUMENTS: "INVALID_ARGUMENTS",
      PLAYREADY_CBC_ENCRYPTION_ERROR: "PLAYREADY_CBC_ENCRYPTION_ERROR",
      MEDIA_CERTIFICATE: "MEDIA_CERTIFICATE",
      MEDIA_DESCRIPTOR: "MEDIA_DESCRIPTOR",
      MEDIA_LICENSE: "MEDIA_LICENSE",
      MEDIA_KEY: "MEDIA_KEY",
      MEDIA_PLAYBACK: "MEDIA_PLAYBACK",
      MEDIA_SESSION: "MEDIA_SESSION",
      NETWORK_ERROR: "NETWORK_ERROR",
      NOT_FOUND: "NOT_FOUND",
      PARSE_ERROR: "PARSE_ERROR",
      PLAY_ACTIVITY: "PLAY_ACTIVITY",
      REQUEST_ERROR: "REQUEST_ERROR",
      QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
      SERVER_ERROR: "SERVER_ERROR",
      SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
      STREAM_UPSELL: "STREAM_UPSELL",
      SUBSCRIPTION_ERROR: "SUBSCRIPTION_ERROR",
      TOKEN_EXPIRED: "TOKEN_EXPIRED",
      UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR",
      UNKNOWN_ERROR: "UNKNOWN_ERROR",
      UNSUPPORTED_ERROR: "UNSUPPORTED_ERROR",
      USER_INTERACTION_REQUIRED: "USER_INTERACTION_REQUIRED",
      INTERNAL_ERROR: "INTERNAL_ERROR",
      OUTPUT_RESTRICTED: "OUTPUT_RESTRICTED",
      WIDEVINE_CDM_EXPIRED: "WIDEVINE_CDM_EXPIRED",
    },
    b = {
      400: g.REQUEST_ERROR,
      401: g.UNAUTHORIZED_ERROR,
      403: g.ACCESS_DENIED,
      404: g.NOT_FOUND,
      405: g.NOT_FOUND,
      413: g.REQUEST_ERROR,
      414: g.REQUEST_ERROR,
      429: g.QUOTA_EXCEEDED,
      500: g.SERVER_ERROR,
      501: g.NOT_FOUND,
      503: g.SERVICE_UNAVAILABLE,
    },
    P = {
      "-1004": g.DEVICE_LIMIT,
      "-1017": g.GEO_BLOCK,
      1010: g.NOT_FOUND,
      2002: g.AUTHORIZATION_ERROR,
      2034: g.TOKEN_EXPIRED,
      3059: g.DEVICE_LIMIT,
      3063: g.SUBSCRIPTION_ERROR,
      3076: g.CONTENT_UNAVAILABLE,
      3082: g.CONTENT_RESTRICTED,
      3084: g.STREAM_UPSELL,
      5002: g.SERVER_ERROR,
      180202: g.PLAYREADY_CBC_ENCRYPTION_ERROR,
      190121: g.WIDEVINE_CDM_EXPIRED,
    },
    S = new Set([
      g.CONTENT_EQUIVALENT,
      g.CONTENT_UNAVAILABLE,
      g.CONTENT_UNSUPPORTED,
      g.SERVER_ERROR,
      g.SUBSCRIPTION_ERROR,
      g.UNSUPPORTED_ERROR,
      g.USER_INTERACTION_REQUIRED,
    ]);
  class MKError extends Error {
    static isMKError(e) {
      return (function (e) {
        return void 0 !== e && e instanceof MKError;
      })(e);
    }
    get errorCode() {
      return this.reason;
    }
    static playActivityError(e) {
      return new this(g.PLAY_ACTIVITY, e);
    }
    static parseError(e) {
      return new this(g.PARSE_ERROR, e);
    }
    static responseError(e) {
      const { status: n, statusText: d } = e,
        p = new this(b[n] || g.NETWORK_ERROR, d || "" + n);
      return (p.data = e), p;
    }
    static serverError(e, n = g.UNKNOWN_ERROR) {
      let {
        status: d,
        dialog: p,
        failureType: h,
        customerMessage: y,
        errorMessage: _,
        message: m,
      } = e;
      p &&
        ((m = p.message || p.customerMessage || p.errorMessage),
        (p.message = m));
      const b = P[h] || P[d] || n,
        S = new this(b, m || y || _);
      return (
        b === g.STREAM_UPSELL &&
          p &&
          p.okButtonAction &&
          p.okButtonAction.url &&
          (p.okButtonAction.url = p.okButtonAction.url.replace(
            /\&(?:challenge|key-system|uri|user-initiated)=[^\&]+/gim,
            "",
          )),
        (S.dialog = p),
        S
      );
    }
    static internalError(e) {
      return new this(g.INTERNAL_ERROR, e);
    }
    constructor(e, n) {
      super(),
        _define_property$20(this, "isMKError", true),
        _define_property$20(this, "reason", g.UNKNOWN_ERROR),
        _define_property$20(this, "description", void 0),
        _define_property$20(this, "dialog", void 0),
        _define_property$20(this, "data", void 0),
        e && S.has(e)
          ? ((this.name = this.reason = e),
            (this.message = this.description = n || e))
          : n || "string" != typeof e
            ? ((this.name = this.reason = e || g.UNKNOWN_ERROR),
              n && (this.message = this.description = n))
            : ((this.name = this.reason = g.UNKNOWN_ERROR),
              (this.message = this.description = e)),
        Error.captureStackTrace && Error.captureStackTrace(this, MKError);
    }
  }
  _define_property$20(MKError, "Reason", g), Object.assign(MKError, g);
  class GenericStorage {
    get data() {
      return this._data;
    }
    set data(e) {
      this._data = e;
    }
    get length() {
      return this.keys.length;
    }
    get keys() {
      return Object.keys(this.data);
    }
    getItem(e) {
      return this.data[e] || null;
    }
    setItem(e, n) {
      this.data[e] = n;
    }
    removeItem(e) {
      delete this.data[e];
    }
    clear() {
      this.keys.forEach((e) => this.removeItem(e));
    }
    key(e) {
      return this.keys[e] || null;
    }
    constructor(e = {}) {
      var n, d, p;
      (p = void 0),
        (d = "_data") in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          : (n[d] = p),
        (this.data = e);
    }
  }

  function getCookie(e = "", n = document.cookie) {
    const d = n.match(new RegExp(`(?:^|;\\s*)${e}=([^;]*)`));
    if (d) return d[1];
  }

  function setCookie(e, n, d = "", p = 14, h, y) {
    const _ = new Date();
    h = null != h ? h : window;
    const m =
      (y =
        null != y
          ? y
          : /\./.test(h.location.hostname)
            ? h.location.hostname
            : "").length > 0
        ? `domain=${y}; `
        : "";
    _.setTime(_.getTime() + 24 * p * 60 * 60 * 1e3);
    let g = "";
    "https:" === h.location.protocol && (g = "; secure"),
      (h.document.cookie = `${e}=${n}; expires=${_.toUTCString()}; ${m}path=${d}${g}`);
  }

  function removeCookie(e, n, d) {
    setCookie(e, "", "/", 0, n, d);
  }

  function hasSessionStorage() {
    let e = true;
    try {
      e = "undefined" != typeof sessionStorage;
    } catch (Vt) {}
    return e;
  }

  function getSessionStorage() {
    let e;
    return hasSessionStorage() && (e = sessionStorage), e;
  }

  function hasLocalStorage() {
    let e = true;
    try {
      e = "undefined" != typeof localStorage;
    } catch (Vt) {}
    return e;
  }

  function getLocalStorage() {
    let e;
    return hasLocalStorage() && (e = localStorage), e;
  }

  function getJsonFromLocalStorage(e) {
    const n = (function (e) {
      if (!hasLocalStorage()) return;
      const n = getLocalStorage().getItem(e);
      return null !== n ? n : void 0;
    })(e);
    if (n)
      try {
        return JSON.parse(n);
      } catch (Vt) {
        return;
      }
  }

  function _define_property$1_(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class Notifications {
    get shouldStorageDispatch() {
      return (
        "undefined" != typeof window &&
        hasSessionStorage() &&
        this.dispatchNamespace
      );
    }
    addEventListener(e, n) {
      Array.isArray(this._eventRegistry[e]) && this._eventRegistry[e].push(n);
    }
    dispatchEvent(e, n) {
      Array.isArray(this._eventRegistry[e]) &&
        this._eventRegistry[e].forEach((e) => e(n));
    }
    dispatchDistributedEvent(e, n) {
      if ((this.dispatchEvent(e, n), this.shouldStorageDispatch)) {
        var d;
        const p = `${this.dispatchNamespace}:${e}`;
        null === (d = getSessionStorage()) ||
          void 0 === d ||
          d.setItem(p, JSON.stringify(n));
      }
    }
    removeEventListener(e, n) {
      if (Array.isArray(this._eventRegistry[e])) {
        const d = this._eventRegistry[e].indexOf(n);
        this._eventRegistry[e].splice(d, 1);
      }
    }
    _handleGlobalStorageEvent(e) {
      var n;
      if (
        this.dispatchNamespace &&
        (null === (n = e.key) || void 0 === n
          ? void 0
          : n.startsWith(this.dispatchNamespace + ":"))
      ) {
        const n = e.key.substring(this.dispatchNamespace.length + 1);
        this.dispatchEvent(n, JSON.parse(e.newValue));
      }
    }
    constructor(e = [], n) {
      _define_property$1_(this, "dispatchNamespace", void 0),
        _define_property$1_(this, "_eventRegistry", {}),
        e.forEach((e) => {
          this._eventRegistry[e] = [];
        }),
        n &&
          n.namespace &&
          (this.dispatchNamespace = "com.apple." + n.namespace),
        this.shouldStorageDispatch &&
          ((this._handleGlobalStorageEvent =
            this._handleGlobalStorageEvent.bind(this)),
          window.addEventListener("storage", this._handleGlobalStorageEvent));
    }
  }
  var E =
    "undefined" != typeof FastBoot
      ? FastBoot.require("buffer").Buffer
      : "undefined" != typeof process &&
          null !== process.versions &&
          null !== process.versions.node
        ? Buffer
        : window.Buffer;

  function memoize(e) {
    return function (...n) {
      let d = "",
        p = n.length;
      for (e._memoized = e._memoized || {}; p--; ) {
        const e = n[p];
        d += e === Object(e) ? JSON.stringify(e) : e;
      }
      return d in e._memoized ? e._memoized[d] : (e._memoized[d] = e(...n));
    };
  }

  function generateUUID() {
    let e = strRandomizer() + strRandomizer();
    for (; e.length < 16; ) e += strRandomizer();
    return e.slice(0, 16);
  }

  function strRandomizer() {
    return Math.random().toString(16).substring(2);
  }
  const T = memoize((e) => /^[a|i|l|p]{1}\.[a-zA-Z0-9]+$/.test(e));

  function detectNodeEnvironment() {
    var e, n, d, p;
    return (
      void 0 !==
        (null === (d = globalThis) ||
        void 0 === d ||
        null === (n = d.process) ||
        void 0 === n ||
        null === (e = n.versions) ||
        void 0 === e
          ? void 0
          : e.node) ||
      void 0 !==
        (null === (p = globalThis) || void 0 === p ? void 0 : p.FastBoot)
    );
  }

  function isNodeEnvironment$1() {
    return detectNodeEnvironment();
  }
  const k = memoize(
    detectNodeEnvironment()
      ? (e) => E.from(e, "base64").toString("binary")
      : (e) => window.atob(e),
  );
  memoize(
    detectNodeEnvironment()
      ? (e) => E.from(e).toString("base64")
      : (e) => window.btoa(e),
  );
  const debounce = (
      e,
      n = 250,
      d = {
        isImmediate: true,
      },
    ) => {
      let p;
      return function (...h) {
        const y = this,
          _ = d.isImmediate && void 0 === p;
        void 0 !== p && clearTimeout(p),
          (p = setTimeout(function () {
            (p = void 0), d.isImmediate || e.apply(y, h);
          }, n)),
          _ && e.apply(y, h);
      };
    },
    arrayEquals = (e, n) =>
      !!e && !!n && [].every.call(e, (e, d) => e === n[d]);

  function hasOwn(e, n) {
    return Object.prototype.hasOwnProperty.call(Object(e), n);
  }

  function deepClone(e) {
    const n = Object.prototype.toString.call(e).toLowerCase().slice(8, -1);
    switch (n) {
      case "set":
        return new Set([...e].map((e) => deepClone(e)));
      case "map":
        return new Map([...e].map(([e, n]) => [deepClone(e), deepClone(n)]));
      case "date":
        return new Date(e.getTime());
      case "regexp": {
        const n = e,
          d =
            "string" == typeof n.flags
              ? n.flags
              : [
                  n.global ? "g" : void 0,
                  n.ignoreCase ? "i" : void 0,
                  n.multiline ? "m" : void 0,
                  n.sticky ? "y" : void 0,
                  n.unicode ? "u" : void 0,
                ]
                  .filter((e) => void 0 !== e)
                  .join("");
        return RegExp(e.source, d);
      }
      case "arraybuffer": {
        const n = e;
        if ("function" == typeof n.slice) return n.slice(0);
        {
          const d = new e.constructor(n.byteLength);
          return new Uint8Array(d).set(new Uint8Array(n)), d;
        }
      }
      case "dataview":
      case "int8array":
      case "uint8array":
      case "uint8clampedarray":
      case "int16array":
      case "uint16array":
      case "int32array":
      case "uint32array":
      case "float32array":
      case "float64array":
      case "bigint64array":
      case "biguint64array": {
        const d = e;
        return new (0, d.constructor)(
          deepClone(d.buffer),
          d.byteOffset,
          "dataview" === n ? d.byteLength : d.length,
        );
      }
      case "array":
      case "object": {
        const n = Array.isArray(e) ? [] : {};
        for (const d in e) hasOwn(e, d) && (n[d] = deepClone(e[d]));
        return n;
      }
      default:
        return e;
    }
  }

  function isEmpty(e) {
    if ("object" != typeof e) throw new TypeError("Source is not an Object");
    for (const n in e) if (hasOwn(e, n)) return true;
    return true;
  }

  function transform$9(e, n, d = true) {
    return (
      d && (e = Object.keys(e).reduce((n, d) => ((n[e[d]] = d), n), {})),
      Object.keys(e).reduce((d, p) => {
        const h = e[p],
          y =
            "function" == typeof h
              ? h()
              : (function (e, n) {
                  return n.split(".").reduce((e, n) => {
                    if (void 0 !== e) return e[n];
                  }, e);
                })(n, h);
        return (
          y &&
            (function (e, n, d) {
              n.split(".").reduce((n, p, h, y) => {
                const _ = h === y.length - 1,
                  m = hasOwn(n, p),
                  g = n[p] instanceof Object,
                  b = null === n[p];
                if (!_ && m && (!g || b))
                  throw new TypeError(
                    `Value at ${y
                      .slice(0, h + 1)
                      .join(".")} in keypath is not an Object.`,
                  );
                return _ ? ((n[p] = d), e) : m ? n[p] : (n[p] = {});
              }, e);
            })(d, p, y),
          d
        );
      }, {})
    );
  }
  const w = {};

  function findOrCreate(e, n) {
    const d = e
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (e, n) => n.toUpperCase());
    if (hasOwn(w, d)) {
      const p = w[d];
      if (n !== p.constructor)
        throw new Error(
          `DevFlag ${e} was already registered with a different type (${p.constructor.name})`,
        );
      return p;
    }
    const p = new n(e);
    return (
      Object.defineProperty(w, d, {
        configurable: true,
        enumerable: true,
        get: function () {
          return p;
        },
        set(e) {
          p.set(e);
        },
      }),
      p
    );
  }
  class LocalStorageDevFlag {
    get value() {
      return this.get();
    }
    get configured() {
      return void 0 !== this.value;
    }
    read() {
      var e, n;
      const d =
        null !==
          (n =
            null === (e = getLocalStorage()) || void 0 === e
              ? void 0
              : e.getItem(this.key)) && void 0 !== n
          ? n
          : null;
      return null !== d ? d : void 0;
    }
    write(e) {
      var n;
      null === (n = getLocalStorage()) ||
        void 0 === n ||
        n.setItem(this.key, e);
    }
    clear() {
      var e;
      null === (e = getLocalStorage()) ||
        void 0 === e ||
        e.removeItem(this.key);
    }
    constructor(e) {
      if (
        ((function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            : (e[n] = d);
        })(this, "key", void 0),
        "string" != typeof e || "" === e.trim())
      )
        throw new Error("DevFlag requires a non-empty string key");
      this.key = e;
    }
  }
  class StringDevFlag extends LocalStorageDevFlag {
    static register(e) {
      return findOrCreate(e, this);
    }
    static get(e) {
      return this.register(e).get();
    }
    static set(e, n) {
      this.register(e).set(n);
    }
    get() {
      return this.read();
    }
    set(e) {
      "string" != typeof e &&
        console.warn("Value for StringDevFlag should be a string"),
        this.write(e);
    }
  }
  class BooleanDevFlag extends LocalStorageDevFlag {
    static register(e) {
      return findOrCreate(e, this);
    }
    static get(e) {
      return this.register(e).get();
    }
    static set(e, n) {
      this.register(e).set(n);
    }
    get() {
      const e = this.read();
      if (void 0 !== e) return "1" === e || "true" === e.toLowerCase();
    }
    set(e) {
      "boolean" == typeof e
        ? this.write(!0 === e ? "1" : "0")
        : console.warn("Value for BooleanDevFlag should be a boolean");
    }
    get enabled() {
      return !0 === this.get();
    }
    enable() {
      this.set(true);
    }
    disable() {
      this.set(true);
    }
    toggle() {
      this.set(!this.get());
    }
  }
  class JsonDevFlag extends LocalStorageDevFlag {
    static register(e) {
      return findOrCreate(e, this);
    }
    static get(e) {
      return this.register(e).get();
    }
    static set(e, n) {
      this.register(e).set(n);
    }
    get() {
      const e = this.read();
      if (void 0 !== e)
        try {
          return JSON.parse(e);
        } catch (V) {
          return;
        }
    }
    set(e) {
      this.write(JSON.stringify(e));
    }
    prop(e) {
      if (void 0 !== this.value) return this.value[e];
    }
  }
  const O = [
      "contributors",
      "modalities",
      "musicVideo",
      "podcast-episodes",
      "radioStation",
      "song",
      "uploaded-audios",
      "uploadedAudio",
      "uploaded-videos",
      "uploadedVideo",
      "workouts",
      "workout-programs",
    ],
    I = {
      mediaItemStateDidChange: "mediaItemStateDidChange",
      mediaItemStateWillChange: "mediaItemStateWillChange",
    },
    A = {
      CRITICAL: 50,
      ERROR: 40,
      WARNING: 30,
      NOTICE: 20,
      INFO: 10,
      DEBUG: 2,
      TRACE: 1,
      NONE: 0,
    };
  const R = {
    OFF: "NONE",
    0: "NONE",
    "+": "INFO",
    "++": "DEBUG",
    V: "DEBUG",
    D: "DEBUG",
    VERBOSE: "DEBUG",
    VV: "TRACE",
    SILLY: "TRACE",
    "*": "TRACE",
  };

  function getLoggingLevel$1(e, n = {}) {
    if ("number" == typeof e)
      return (function (e) {
        return "number" == typeof e && Object.values(A).includes(e);
      })(e)
        ? e
        : void 0;
    let d = e.toUpperCase();
    return (
      n.allowShorthands && void 0 !== R[d] && (d = R[d]),
      (function (e) {
        return "string" == typeof e && void 0 !== A[e.toUpperCase()];
      })(d)
        ? A[d]
        : void 0
    );
  }

  function _define_property$1Y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$U(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1Y(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$z(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _define_property1$1(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const $ = A.ERROR,
    DEFAULT_POLICY$1 = (e, n) => e !== A.NONE && n >= e;
  class Logger$1 {
    get parent() {
      return this._parent;
    }
    get children() {
      return Array.from(this._children.values());
    }
    get namespace() {
      return void 0 === this._parent
        ? this.name
        : this._parent.namespace + "/" + this.name;
    }
    get enabled() {
      return this.level !== A.NONE;
    }
    get level() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._level) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.level) && void 0 !== d
        ? d
        : $;
    }
    get levelName() {
      var e;
      return null !==
        (e = (function (e) {
          for (const [n, d] of Object.entries(A)) if (e === d) return n;
        })(this.level)) && void 0 !== e
        ? e
        : "UNKNOWN";
    }
    get levelPolicy() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._levelPolicy) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.levelPolicy) && void 0 !== d
        ? d
        : DEFAULT_POLICY$1;
    }
    get handlers() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._handlers) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.handlers) && void 0 !== d
        ? d
        : {};
    }
    isEnabledFor(e) {
      return this.levelPolicy(this.level, e);
    }
    setLevel(e) {
      const n = getLoggingLevel$1(e);
      void 0 !== n && (this._level = n);
    }
    clearLevel() {
      this._level = void 0;
    }
    setLevelPolicy(e) {
      this._levelPolicy = e;
    }
    clearLevelPolicy() {
      this._levelPolicy = void 0;
    }
    addHandler(e, n) {
      this._handlers || (this._handlers = {}), (this._handlers[e] = n);
    }
    hasHandler(e) {
      var n;
      return (
        void 0 !==
        (null === (n = this._handlers) || void 0 === n ? void 0 : n[e])
      );
    }
    removeHandler(e) {
      void 0 !== this._handlers &&
        (delete this._handlers[e],
        0 === Object.keys(this._handlers).length && this.clearHandlers());
    }
    clearHandlers() {
      this._handlers = void 0;
    }
    createChild(e, n) {
      const d = this._children.get(e);
      return void 0 !== d
        ? d
        : new Logger$1(
            e,
            _object_spread_props$z(_object_spread$U({}, n), {
              parent: this,
            }),
          );
    }
    linkChild(e) {
      if (void 0 !== e.parent && e.parent !== this)
        throw new Error(
          `Logger '${e.name}' is already a child of a different parent ('${e.parent.name}')`,
        );
      const n = this._children.get(e.name);
      if (void 0 !== n && n !== e)
        throw new Error(`A child with name '${e.name}' is already registered`);
      return (
        void 0 === n && (this._children.set(e.name, e), e.linkParent(this)), e
      );
    }
    unlinkChild(e) {
      const n = this._children.get(e.name);
      return n === e && (this._children.delete(e.name), n.unlinkParent()), e;
    }
    getByName(e) {
      return this._children.get(e);
    }
    getByNamespace(e) {
      return (function (e, n, d = "/") {
        if ("" === (n = n.trim()) || "*" === n) return e;
        const p = n.split(d);
        p[0].trim() === e.name && p.shift();
        if (0 === p.length) return e;
        let h = e;
        for (; void 0 !== h && p.length > 0; ) {
          const e = p.shift();
          h = h.getByName(e.trim());
        }
        return h;
      })(this, e);
    }
    linkParent(e) {
      return (
        this.parent !== e &&
          (this.unlinkParent(), (this._parent = e), e.linkChild(this)),
        this
      );
    }
    unlinkParent() {
      return (
        void 0 !== this._parent &&
          (this._parent.unlinkChild(this), (this._parent = void 0)),
        this
      );
    }
    log(e, n, ...d) {
      const p = getLoggingLevel$1(e);
      void 0 !== p &&
        this.logRecord({
          time: Date.now(),
          namespace: this.namespace,
          level: p,
          message: n,
          args: d,
        });
    }
    logRecord(e) {
      if (!this.levelPolicy(this.level, e.level)) return;
      const n = _object_spread$U(
        {
          namespace: this.namespace,
        },
        e,
      );
      for (const d of Object.values(this.handlers)) d.process(n);
    }
    error(e, ...n) {
      this.log(A.ERROR, e, ...n);
    }
    warning(e, ...n) {
      this.log(A.WARNING, e, ...n);
    }
    warn(e, ...n) {
      this.warning(e, ...n);
    }
    info(e, ...n) {
      this.log(A.INFO, e, ...n);
    }
    debug(e, ...n) {
      this.log(A.DEBUG, e, ...n);
    }
    trace(e, ...n) {
      this.log(A.TRACE, e, ...n);
    }
    constructor(e, n) {
      _define_property1$1(this, "name", void 0),
        _define_property1$1(this, "_parent", void 0),
        _define_property1$1(this, "_children", new Map()),
        _define_property1$1(this, "_level", void 0),
        _define_property1$1(this, "_levelPolicy", void 0),
        _define_property1$1(this, "_handlers", void 0),
        (this.name = e),
        (this._levelPolicy = null == n ? void 0 : n.levelPolicy),
        (this._handlers = null == n ? void 0 : n.handlers),
        void 0 !== (null == n ? void 0 : n.parent) && this.linkParent(n.parent),
        void 0 !== (null == n ? void 0 : n.level) && this.setLevel(n.level);
    }
  }
  new Map([
    [A.CRITICAL, "error"],
    [A.ERROR, "error"],
    [A.WARNING, "warn"],
    [A.NOTICE, "warn"],
    [A.INFO, "log"],
    [A.DEBUG, "debug"],
  ]);
  const C = new Logger$1("media-item");
  var M, D;
  (e.PlaybackType = void 0),
    ((M = e.PlaybackType || (e.PlaybackType = {}))[(M.none = 0)] = "none"),
    (M[(M.preview = 1)] = "preview"),
    (M[(M.unencryptedFull = 2)] = "unencryptedFull"),
    (M[(M.encryptedFull = 3)] = "encryptedFull"),
    (function (e) {
      (e[(e.none = 0)] = "none"),
        (e[(e.loading = 1)] = "loading"),
        (e[(e.ready = 2)] = "ready"),
        (e[(e.playing = 3)] = "playing"),
        (e[(e.ended = 4)] = "ended"),
        (e[(e.unavailable = 5)] = "unavailable"),
        (e[(e.restricted = 6)] = "restricted"),
        (e[(e.error = 7)] = "error"),
        (e[(e.unsupported = 8)] = "unsupported");
    })(D || (D = {}));
  const {
      none: x,
      loading: j,
      ready: L,
      playing: N,
      ended: U,
      unavailable: B,
      restricted: F,
      error: V,
      unsupported: G,
    } = D,
    H = {
      [x]: {
        allowed: [j],
        unknown: [U, B, F, V, G],
      },
      [j]: {
        allowed: [L, F, V, G],
        unknown: [],
      },
      [L]: {
        allowed: [N],
        unknown: [V],
      },
      [N]: {
        allowed: [U, V],
        unknown: [B, F, G],
      },
      [U]: {
        allowed: [],
        unknown: [],
      },
      [B]: {
        allowed: [],
        unknown: [],
      },
      [F]: {
        allowed: [],
        unknown: [],
      },
      [V]: {
        allowed: [],
        unknown: [],
      },
      [G]: {
        allowed: [],
        unknown: [],
      },
    },
    toName = (e) => D[e],
    createMediaItemStateGuard = (e = x) => {
      const n = {
        current: e,
        set(e) {
          const { current: d } = n;
          if (!((e, n) => H[e].allowed.includes(n))(d, e)) {
            const n = ((e, n) => H[e].unknown.includes(n))(d, e);
            C.debug(
              `MediaItem.state was changed from ${toName(d)} to ${toName(e)}`,
              n
                ? "but it is unknown whether it should be allowed or not."
                : "and it should not be happening",
            );
          }
          n.current = e;
        },
      };
      return n;
    };

  function isStringNotEmpty(e) {
    return !(function (e) {
      return void 0 === e || "" === e.trim();
    })(e);
  }

  function transform$8(e) {
    return transform$9(
      {
        "attributes.albumName": "metadata.playlistName",
        "attributes.artistName": "metadata.artistName",
        "attributes.artwork"() {
          const n = null == e ? void 0 : e.artworkURL;
          if (n)
            return (function (e) {
              const n = e.split("/").pop(),
                [d, p] = (!!n && n.match(/\d+/g)) || ["100", "100"];
              return {
                width: parseInt(d, 10),
                height: parseInt(p, 10),
                url: e.replace(`${d}x${p}`, "{w}x{h}"),
              };
            })(n);
        },
        "attributes.composerName": "metadata.composerName",
        "attributes.contentRating"() {
          var n;
          if (
            1 ===
            (null == e || null === (n = e.metadata) || void 0 === n
              ? void 0
              : n.explicit)
          )
            return "explicit";
        },
        "attributes.discNumber"() {
          var n;
          return (
            (null == e || null === (n = e.metadata) || void 0 === n
              ? void 0
              : n.discNumber) || 1
          );
        },
        "attributes.durationInMillis": "metadata.duration",
        "attributes.genreNames"() {
          var n;
          return [
            null == e || null === (n = e.metadata) || void 0 === n
              ? void 0
              : n.genre,
          ];
        },
        "attributes.isrc"() {
          var n;
          const d =
            null == e || null === (n = e.metadata) || void 0 === n
              ? void 0
              : n.xid;
          if (d) return d.replace(/^([^:]+):isrc:/, "$1");
        },
        "attributes.name": "metadata.itemName",
        "attributes.playParams.id": "metadata.itemId",
        "attributes.playParams.kind": "metadata.kind",
        "attributes.previews": () => [
          {
            url: null == e ? void 0 : e.previewURL,
          },
        ],
        "attributes.releaseDate": "metadata.releaseDate",
        "attributes.trackNumber": "metadata.trackNumber",
        assetURL: "URL",
        cloudId: "metadata.cloud-id",
        id() {
          var n;
          return (
            "" +
            (null == e || null === (n = e.metadata) || void 0 === n
              ? void 0
              : n.itemId)
          );
        },
        flavor: "flavor",
        type: "metadata.kind",
      },
      e,
    );
  }

  function _define_property$1X(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const { mediaItemStateDidChange: q, mediaItemStateWillChange: W } = I,
    z = BooleanDevFlag.register("mk-music-movie-playback");
  class MediaItem extends Notifications {
    get ageGatePolicy() {
      var e;
      return null === (e = this.defaultPlayable) || void 0 === e
        ? void 0
        : e.ageGatePolicy;
    }
    get albumInfo() {
      const { albumName: e, artistName: n } = this,
        d = [];
      return n && d.push(n), e && d.push(e), d.join(" - ");
    }
    get albumName() {
      return this.attributes.albumName;
    }
    get artistName() {
      return this.attributes.genreNames &&
        this.attributes.genreNames.indexOf("Classical") > -1 &&
        this.attributes.composerName
        ? this.attributes.composerName
        : this.attributes.artistName;
    }
    get artwork() {
      var e, n;
      return null !== (n = this.attributes.artwork) && void 0 !== n
        ? n
        : null === (e = this.attributes.images) || void 0 === e
          ? void 0
          : e.coverArt16X9;
    }
    get artworkURL() {
      if (this.artwork && this.artwork.url) return this.artwork.url;
    }
    get assets() {
      return this._assets;
    }
    get canPlay() {
      return this.isPlayable && this.isReady;
    }
    get container() {
      return this._container;
    }
    set container(e) {
      this._container = e;
    }
    get contentRating() {
      return this.attributes.contentRating;
    }
    get context() {
      return this._context;
    }
    set context(e) {
      this._context = e;
    }
    get defaultPlayable() {
      var e;
      return null === (e = this.playables) || void 0 === e ? void 0 : e[0];
    }
    get discNumber() {
      return this.attributes.discNumber;
    }
    get hasContainerArtwork() {
      return (
        this.container &&
        this.container.attributes &&
        this.container.attributes.artwork &&
        this.container.attributes.artwork.url
      );
    }
    get hasPlaylistContainer() {
      return (
        this.container &&
        "playlists" === this.container.type &&
        this.container.attributes
      );
    }
    get supportsLinearScrubbing() {
      var e, n, d;
      return (
        this.isLinearStream &&
        !0 ===
          (null === (d = this.defaultPlayable) ||
          void 0 === d ||
          null === (n = d.assets) ||
          void 0 === n ||
          null === (e = n.streamCapability) ||
          void 0 === e
            ? void 0
            : e.supportsLinearScrubbing)
      );
    }
    get isAssetScrubbingDisabled() {
      return !!this.isLinearStream && !this.supportsLinearScrubbing;
    }
    get isLinearStream() {
      return (
        "LiveService" === (null == (e = this) ? void 0 : e.type) ||
        "Event" ===
          (null == e || null === (n = e.defaultPlayable) || void 0 === n
            ? void 0
            : n.type) ||
        "EbsEvent" ===
          (null == e || null === (d = e.defaultPlayable) || void 0 === d
            ? void 0
            : d.type)
      );
    }
    get isAlgoStation() {
      return isAlgoStation(this);
    }
    get isRadioStation() {
      return isRadioStation(this);
    }
    get isRadioEpisode() {
      return isRadioEpisode(this);
    }
    get isLiveRadioStation() {
      return isLiveRadioStation(this);
    }
    get isLiveAudioStation() {
      return isLiveRadioStation(this, "audio");
    }
    get isLiveVideoStation() {
      return isLiveRadioStation(this, "video");
    }
    get isAOD() {
      return (
        isRadioEpisode((e = this), n) ||
        !!(null == e || null === (d = e.attributes) || void 0 === d
          ? void 0
          : d.isAOD)
      );
    }
    get isSong() {
      return "song" === this.type;
    }
    get info() {
      return `${this.title} - ${this.albumInfo}`;
    }
    get isCloudItem() {
      return (this.playParams && this.playParams.isLibrary) || T(this.id);
    }
    get isCloudUpload() {
      return -1 === this._songId;
    }
    get isExplicitItem() {
      return "explicit" === this.contentRating;
    }
    get isLoading() {
      return this.state === D.loading;
    }
    get isPlayableMediaType() {
      return (
        !("musicMovie" !== this.type || !z.enabled) ||
        this.isUTS ||
        -1 !== O.indexOf(this.type)
      );
    }
    get isPlayable() {
      var e;
      return (
        !!this.isUTS ||
        (!!this.isPlayableMediaType &&
          (!!(
            this.isLiveRadioStation ||
            this.isRadioEpisode ||
            this.hasOffersHlsUrl
          ) ||
            (this.needsPlayParams
              ? !!this.playParams
              : !!this.rawAssetUrl ||
                !!(null === (e = this.attributes.previews) || void 0 === e
                  ? void 0
                  : e.length))))
      );
    }
    get isPlaying() {
      return this.state === D.playing;
    }
    get isPreparedToPlay() {
      if ("song" === this.type)
        return !!this._assets && !!this.keyURLs && !!this._songId;
      if (this.isUTS) {
        const e = isStringNotEmpty(this.assetURL),
          n = !!(
            this.keyURLs &&
            isStringNotEmpty(this.keyURLs["hls-key-cert-url"]) &&
            isStringNotEmpty(this.keyURLs["hls-key-server-url"]) &&
            isStringNotEmpty(this.keyURLs["widevine-cert-url"])
          );
        return (e && n) || this.playRawAssetURL;
      }
      return !!isStringNotEmpty(this.assetURL) || this.playRawAssetURL;
    }
    get isrc() {
      return this.attributes.isrc;
    }
    get isReady() {
      return this.state === D.ready;
    }
    get isRestricted() {
      return this.state === D.restricted;
    }
    get isUTS() {
      return !!this.defaultPlayable;
    }
    get isUnavailable() {
      return this.state === D.unavailable;
    }
    get needsPlayParams() {
      return ["musicMovie", "musicVideo", "song"].includes(this.type);
    }
    get normalizedType() {
      return normalizeContentType(this.type);
    }
    get offers() {
      return this.attributes.offers;
    }
    get offersHlsUrl() {
      const { offers: e } = this,
        n =
          null == e
            ? void 0
            : e.find((e) => {
                var n;
                return !!(null === (n = e.hlsUrl) || void 0 === n
                  ? void 0
                  : n.length);
              });
      return null == n ? void 0 : n.hlsUrl;
    }
    get hasOffersHlsUrl() {
      return isStringNotEmpty(this.offersHlsUrl);
    }
    get rawAssetUrl() {
      return this.attributes.assetUrl;
    }
    set playbackData(e) {
      if (void 0 === e) return;
      this.previewURL && (e.previewURL = this.previewURL);
      const n = transform$8(e);
      this.artwork && n.artwork && delete n.artwork,
        n.id !== this.id && delete n.id,
        this.playParams &&
          n.attributes.playParams &&
          (n.attributes.playParams = this.playParams),
        (n.attributes = (function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var d = null != arguments[n] ? arguments[n] : {},
              p = Object.keys(d);
            "function" == typeof Object.getOwnPropertySymbols &&
              (p = p.concat(
                Object.getOwnPropertySymbols(d).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(d, e).enumerable;
                }),
              )),
              p.forEach(function (n) {
                _define_property$1X(e, n, d[n]);
              });
          }
          return e;
        })({}, this.attributes, n.attributes)),
        Object.assign(this, n),
        C.debug("media-item: item merged with playbackData", this),
        (this.state = D.ready);
    }
    get playbackDuration() {
      return (
        this.attributes.durationInMillis ||
        this.attributes.durationInMilliseconds
      );
    }
    get playEvent() {
      var e;
      return null === (e = this.defaultPlayable) || void 0 === e
        ? void 0
        : e.playEvent;
    }
    get playlistArtworkURL() {
      var e, n, d;
      return this.hasPlaylistContainer && this.hasContainerArtwork
        ? null === (d = this.container) ||
          void 0 === d ||
          null === (n = d.attributes) ||
          void 0 === n ||
          null === (e = n.artwork) ||
          void 0 === e
          ? void 0
          : e.url
        : this.artworkURL;
    }
    get playlistName() {
      var e, n;
      return this.hasPlaylistContainer
        ? null === (n = this.container) ||
          void 0 === n ||
          null === (e = n.attributes) ||
          void 0 === e
          ? void 0
          : e.name
        : this.albumName;
    }
    get playParams() {
      return this.attributes.playParams;
    }
    get playRawAssetURL() {
      return this.isCloudUpload || !!this.rawAssetUrl;
    }
    get previewURL() {
      var e, n, d, p, h, y, _, m, g, b, P, S, E, T, k;
      return (
        (null === (d = this.attributes) ||
        void 0 === d ||
        null === (n = d.previews) ||
        void 0 === n ||
        null === (e = n[0]) ||
        void 0 === e
          ? void 0
          : e.url) ||
        (null === (y = this.attributes) ||
        void 0 === y ||
        null === (h = y.previews) ||
        void 0 === h ||
        null === (p = h[0]) ||
        void 0 === p
          ? void 0
          : p.hlsUrl) ||
        (null === (b = this.attributes) ||
        void 0 === b ||
        null === (g = b.trailers) ||
        void 0 === g ||
        null === (m = g[0]) ||
        void 0 === m ||
        null === (_ = m.assets) ||
        void 0 === _
          ? void 0
          : _.hlsUrl) ||
        (null === (E = this.attributes) ||
        void 0 === E ||
        null === (S = E.movieClips) ||
        void 0 === S ||
        null === (P = S[0]) ||
        void 0 === P
          ? void 0
          : P.hlsUrl) ||
        (null === (k = this.attributes) ||
        void 0 === k ||
        null === (T = k.video) ||
        void 0 === T
          ? void 0
          : T.hlsUrl)
      );
    }
    get rating() {
      return this.attributes.rating;
    }
    get releaseDate() {
      if (this._releaseDate) return this._releaseDate;
      if (
        this.attributes &&
        (this.attributes.releaseDate || this.attributes.releaseDateTime)
      ) {
        const e =
          this.attributes.releaseDate || this.attributes.releaseDateTime;
        return (
          (this._releaseDate = /^\d{4}-\d{1,2}-\d{1,2}/.test(e)
            ? new Date(e)
            : void 0),
          this._releaseDate
        );
      }
    }
    set releaseDate(e) {
      this._releaseDate =
        "string" == typeof e
          ? /^\d{4}-\d{1,2}-\d{1,2}/.test(e)
            ? new Date(e)
            : void 0
          : "number" == typeof e
            ? new Date(e)
            : e;
    }
    get songId() {
      return this._songId && -1 !== this._songId ? this._songId : this.id;
    }
    get state() {
      return this._state.current;
    }
    set state(e) {
      const n = {
        oldState: this._state.current,
        state: e,
      };
      this._stateWillChange && this._stateWillChange(this),
        this.dispatchEvent(W, n),
        this._state.set(e),
        this._stateDidChange && this._stateDidChange(this),
        this.dispatchEvent(q, n);
    }
    get title() {
      return this.attributes.name || this.attributes.title;
    }
    get trackNumber() {
      return this.attributes.trackNumber;
    }
    beginMonitoringStateDidChange(e) {
      this._stateDidChange = e;
    }
    beginMonitoringStateWillChange(e) {
      this._stateWillChange = e;
    }
    endMonitoringStateDidChange() {
      this._stateDidChange = void 0;
    }
    endMonitoringStateWillChange() {
      this._stateWillChange = void 0;
    }
    isEqual(e) {
      return (
        this.id === e.id &&
        this.type === e.type &&
        this.attributes === e.attributes
      );
    }
    resetState() {
      this.endMonitoringStateWillChange(),
        this.endMonitoringStateDidChange(),
        (this.state = D.none);
    }
    restrict() {
      this.isExplicitItem &&
        ((this.state = D.restricted), this._removePlayableData());
    }
    notSupported() {
      (this.state = D.unsupported), this._removePlayableData();
    }
    updateFromLoadError(e) {
      switch (e.reason) {
        case MKError.Reason.CONTENT_RESTRICTED:
          this.state = D.restricted;
          break;
        case MKError.Reason.CONTENT_UNAVAILABLE:
          this.state = D.unavailable;
          break;
        default:
          this.state = D.error;
      }
    }
    updateWithMZPlayData(e) {
      "musicVideo" === this.type || "musicMovie" === this.type
        ? this.updateWithLoadedAssets(void 0, e["hls-playlist-url"])
        : this.updateWithLoadedAssets(e.assets),
        (this._songId = e.songId),
        this.updateWithLoadedKeys({
          "hls-key-cert-url": e["hls-key-cert-url"],
          "hls-key-server-url": e["hls-key-server-url"],
          "widevine-cert-url": e["widevine-cert-url"],
        });
    }
    updateWithLoadedKeys(e, n) {
      (this.keyURLs = e), n && (this.keyServerQueryParameters = n);
    }
    updateWithLoadedAssets(e, n) {
      e && (this._assets = e), n && (this.assetURL = n);
    }
    _removePlayableData() {
      var e, n, d;
      null === (e = this.attributes) || void 0 === e || delete e.playParams,
        null === (n = this.attributes) || void 0 === n || delete n.previews,
        null === (d = this.attributes) || void 0 === d || delete d.trailers;
    }
    constructor(n = {}) {
      super([q, W]),
        _define_property$1X(this, "id", void 0),
        _define_property$1X(this, "type", void 0),
        _define_property$1X(this, "cloudId", void 0),
        _define_property$1X(this, "playables", void 0),
        _define_property$1X(this, "channels", void 0),
        _define_property$1X(this, "assetURL", void 0),
        _define_property$1X(this, "hlsMetadata", {}),
        _define_property$1X(this, "flavor", void 0),
        _define_property$1X(this, "keyPlayStartTime", void 0),
        _define_property$1X(this, "currentKeyPlay", void 0),
        _define_property$1X(this, "keyPlayShelf", void 0),
        _define_property$1X(this, "keyURLs", void 0),
        _define_property$1X(this, "keyServerQueryParameters", void 0),
        _define_property$1X(this, "attributes", {}),
        _define_property$1X(this, "playbackType", e.PlaybackType.none),
        _define_property$1X(this, "trackInfo", void 0),
        _define_property$1X(this, "relationships", void 0),
        _define_property$1X(this, "_assets", []),
        _define_property$1X(this, "_container", void 0),
        _define_property$1X(this, "_context", void 0),
        _define_property$1X(this, "_releaseDate", void 0),
        _define_property$1X(this, "_songId", void 0),
        _define_property$1X(this, "_state", createMediaItemStateGuard()),
        _define_property$1X(this, "_stateDidChange", void 0),
        _define_property$1X(this, "_stateWillChange", void 0),
        C.debug("media-item: creating Media Item with options:", n);
      var d;
      n.id && n.attributes
        ? (Object.assign(this, n),
          (this.type = (
            null === (d = this.playParams) || void 0 === d ? void 0 : d.kind
          )
            ? this.playParams.kind
            : this.type || "song"))
        : ((this.id = n.id || generateUUID()),
          (this.type = n.type || "song"),
          (this.attributes = {
            playParams: {
              id: this.id,
              kind: this.type,
            },
          }));
      (this._context = n.context || {}),
        n.container
          ? (this._container = n.container)
          : n.containerId &&
            n.containerType &&
            (this._container = {
              id: n.containerId,
              type: n.containerType,
            });
    }
  }
  const Y = [
    "contributors",
    "modalities",
    "movie",
    "musicVideo",
    "musicMovie",
    "trailer",
    "tvEpisode",
    "uploadedVideo",
    "uploaded-videos",
    "music-videos",
    "music-movies",
    "tv-episodes",
    "workouts",
  ];
  var Q, X;
  (e.PlaybackStates = void 0),
    ((Q = e.PlaybackStates || (e.PlaybackStates = {}))[(Q.none = 0)] = "none"),
    (Q[(Q.loading = 1)] = "loading"),
    (Q[(Q.playing = 2)] = "playing"),
    (Q[(Q.paused = 3)] = "paused"),
    (Q[(Q.stopped = 4)] = "stopped"),
    (Q[(Q.ended = 5)] = "ended"),
    (Q[(Q.seeking = 6)] = "seeking"),
    (Q[(Q.waiting = 8)] = "waiting"),
    (Q[(Q.stalled = 9)] = "stalled"),
    (Q[(Q.completed = 10)] = "completed"),
    (e.PresentationMode = void 0),
    ((X = e.PresentationMode || (e.PresentationMode = {}))[
      (X.pictureinpicture = 0)
    ] = "pictureinpicture"),
    (X[(X.inline = 1)] = "inline");
  const J = memoize((e) => {
    const n = k(e);
    return Z(n);
  });

  function ensureArray(e = []) {
    return Array.isArray(e) ? e : [e];
  }
  const Z = memoize((e) => {
      const n = e.length,
        d = new ArrayBuffer(n),
        p = new Uint8Array(d);
      for (let h = 0; h < n; h++) p[h] = e.charCodeAt(h);
      return p;
    }),
    ee = memoize((e) => {
      const n = e.length,
        d = new ArrayBuffer(2 * n),
        p = new Uint16Array(d);
      for (let h = 0; h < n; h++) p[h] = e.charCodeAt(h);
      return p;
    }),
    te = memoize((e) => {
      let n,
        d,
        p,
        h,
        y,
        _,
        m,
        g = 0;
      const b =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let P = "";
      for (; g < e.length; )
        (n = e[g++]),
          (d = g < e.length ? e[g++] : Number.NaN),
          (p = g < e.length ? e[g++] : Number.NaN),
          (h = n >> 2),
          (y = ((3 & n) << 4) | (d >> 4)),
          (_ = ((15 & d) << 2) | (p >> 6)),
          (m = 63 & p),
          isNaN(d) ? (_ = m = 64) : isNaN(p) && (m = 64),
          (P += b.charAt(h) + b.charAt(y) + b.charAt(_) + b.charAt(m));
      return P;
    });
  let isMergeableObject = function (e) {
    return (
      (function (e) {
        return !!e && "object" == typeof e;
      })(e) &&
      !(function (e) {
        let n = Object.prototype.toString.call(e);
        return (
          "[object RegExp]" === n ||
          "[object Date]" === n ||
          (function (e) {
            return e.$$typeof === re;
          })(e)
        );
      })(e)
    );
  };
  let re =
    "function" == typeof Symbol && Symbol.for
      ? Symbol.for("react.element")
      : 60103;

  function cloneUnlessOtherwiseSpecified(e, n) {
    return !1 !== n.clone && n.isMergeableObject(e)
      ? deepmerge(((d = e), Array.isArray(d) ? [] : {}), e, n)
      : e;
  }

  function defaultArrayMerge(e, n, d) {
    return e.concat(n).map(function (e) {
      return cloneUnlessOtherwiseSpecified(e, d);
    });
  }

  function getKeys(e) {
    return Object.keys(e).concat(
      (function (e) {
        return Object.getOwnPropertySymbols
          ? Object.getOwnPropertySymbols(e).filter(function (n) {
              return e.propertyIsEnumerable(n);
            })
          : [];
      })(e),
    );
  }

  function mergeObject(e, n, d) {
    let p = {};
    return (
      d.isMergeableObject(e) &&
        getKeys(e).forEach(function (n) {
          p[n] = cloneUnlessOtherwiseSpecified(e[n], d);
        }),
      getKeys(n).forEach(function (h) {
        d.isMergeableObject(n[h]) && e[h]
          ? (p[h] = (function (e, n) {
              if (!n.customMerge) return deepmerge;
              let d = n.customMerge(e);
              return "function" == typeof d ? d : deepmerge;
            })(h, d)(e[h], n[h], d))
          : (p[h] = cloneUnlessOtherwiseSpecified(n[h], d));
      }),
      p
    );
  }

  function deepmerge(e, n, d) {
    ((d = d || {}).arrayMerge = d.arrayMerge || defaultArrayMerge),
      (d.isMergeableObject = d.isMergeableObject || isMergeableObject);
    let p = Array.isArray(n);
    return p === Array.isArray(e)
      ? p
        ? d.arrayMerge(e, n, d)
        : mergeObject(e, n, d)
      : cloneUnlessOtherwiseSpecified(n, d);
  }

  function _define_property$1W(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$S(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1W(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$y(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _object_without_properties$4(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  var ie;
  (deepmerge.all = function (e, n) {
    if (!Array.isArray(e)) throw new Error("first argument should be an array");
    return e.reduce(function (e, d) {
      return deepmerge(e, d, n);
    }, {});
  }),
    (function (e) {
      (e.dataRecordDidDelete = "dataRecordDidDelete"),
        (e.dataRecordWillDelete = "dataRecordWillDelete"),
        (e.dataRecordDidMaterialize = "dataRecordDidMaterialize"),
        (e.dataRecordDidPopulate = "dataRecordDidPopulate"),
        (e.dataRecordWillPopulate = "dataRecordWillPopulate");
    })(ie || (ie = {}));
  const isDataRecord = (e) =>
    !(
      !e ||
      "function" != typeof e.hasAttributes ||
      "function" != typeof e.hasRelationships ||
      "function" != typeof e.hasViews ||
      "function" != typeof e.serialize
    );
  class DataRecord {
    hasProperties(e) {
      return (
        !e ||
        (e.attributes || e.relationships || e.views
          ? !(e.attributes && !this.hasAttributes(e.attributes)) &&
            !(e.relationships && !this.hasRelationships(e.relationships)) &&
            !(e.views && !this.hasViews(e.views))
          : this.hasAttributes() || this.hasRelationships() || this.hasViews())
      );
    }
    hasAttributes(e) {
      return this._hasProperties(this._mjs.attributes, e);
    }
    hasRelationships(e) {
      return this._hasProperties(this._mjs.relationships, e);
    }
    hasViews(e) {
      return this._hasProperties(this._mjs.views, e);
    }
    meta(e) {
      return e ? this._meta[e] : this._meta;
    }
    serialize(e = true, n = {}, d = {}) {
      const p = {
        id: this.id,
        type: this.type,
      };
      return n[`${this.type}-${this.id}`] && !d.allowFullDuplicateSerializations
        ? p
        : ((n[`${this.type}-${this.id}`] = true),
          this.hasAttributes() &&
            (p.attributes = this._mjs.attributes.reduce(
              (e, n) => ((e[n] = this[n]), e),
              {},
            )),
          this._mjs.relationships.length > 0 &&
            (p.relationships = this._serializeRelatedData(
              this._mjs.relationships,
              n,
              d,
            )),
          this._mjs.views.length > 0 &&
            (p.views = this._serializeRelatedData(this._mjs.views, n, d)),
          e
            ? {
                data: p,
              }
            : p);
    }
    setProperty(e, n, d = "attributes", p = {}) {
      function isMergeableObject(e) {
        return !(!e || "object" != typeof e || e instanceof DataRecord);
      }
      hasOwn(this, e) ||
        (this._mjs[d] || (this._mjs[d] = []), this._mjs[d].push(e));
      const setDescriptor = (e) => ({
        value: e,
        writable: true,
        configurable: true,
        enumerable: true,
      });
      this[e] && n && "object" == typeof this[e] && "object" == typeof n
        ? "attributes" === d
          ? Object.defineProperty(
              this,
              e,
              setDescriptor(
                deepmerge(this[e], n, {
                  arrayMerge: function (e, n, d) {
                    return n;
                  },
                  isMergeableObject: isMergeableObject,
                }),
              ),
            )
          : "relationships" === d &&
              Array.isArray(this[e]) &&
              p.extendRelationships
            ? Object.defineProperty(
                this,
                e,
                setDescriptor(
                  deepmerge(this[e], n, {
                    isMergeableObject: isMergeableObject,
                  }),
                ),
              )
            : Object.defineProperty(this, e, setDescriptor(n))
        : Object.defineProperty(this, e, setDescriptor(n));
    }
    removeRelative(e, n) {
      this[e] &&
        (Array.isArray(this[e])
          ? (this[e] = this[e].filter((e) => e.id !== n))
          : delete this[e]);
    }
    setParent(e) {
      const n = this._mjs.parents,
        d = n && n.length > 0;
      this._mjs.parents = d ? n.concat(e) : e;
    }
    _hasProperties(e, n) {
      return (
        !!e && (n ? ensureArray(n).every((n) => e.includes(n)) : e.length > 0)
      );
    }
    _serializeRelatedData(e, n = {}, d = {}) {
      return e.reduce((e, p) => {
        if (d.excludeRelationships && d.excludeRelationships.has(p)) return e;
        if (d.includeRelationships && !d.includeRelationships.has(p)) return e;
        const h = this[p];
        return (
          Array.isArray(h)
            ? (e[p] = {
                data: h.map((e) =>
                  "function" == typeof e.serialize
                    ? e.serialize(true, n, d)
                    : e,
                ),
              })
            : (e[p] =
                h && "function" == typeof h.serialize
                  ? h.serialize(true, n, d)
                  : h),
          e
        );
      }, {});
    }
    constructor(e, n, d = {}) {
      _define_property$1W(this, "type", void 0),
        _define_property$1W(this, "id", void 0),
        _define_property$1W(this, "_mjs", void 0),
        _define_property$1W(this, "_meta", void 0),
        (this.type = e),
        (this.id = n),
        (this._mjs = {
          attributes: [],
          relationships: [],
          views: [],
        }),
        (this._meta = {}),
        (this._mjs = _object_spread$S({}, this._mjs, d));
    }
  }
  class DataStore extends Notifications {
    get mapping() {
      return this._mapping;
    }
    set mapping(e) {
      this._mapping = e;
    }
    clear() {
      (this._records = {}), (this._expiryRecords = new Set());
    }
    peek(e, n, d) {
      if ((this._checkForExpiredRecords(), !this._records[e]))
        return n ? null : [];
      if (!n) return Object.values(this._records[e]);
      if (Array.isArray(n))
        return n.map((n) => {
          const p = this._records[e][n];
          if (p && p.hasProperties(d)) return p;
        });
      const p = this._records[e][n];
      return p && p.hasProperties(d) ? p : null;
    }
    populateDataRecords(e, n = {}, d = {}) {
      if (!e.data) return [];
      if (!Array.isArray(e.data)) return this.populateDataRecord(e.data, n, d);
      const p = [];
      return (
        e.data.forEach((e, h) => {
          const y = _object_spread_props$y(_object_spread$S({}, d), {
            parents: d.parents
              ? [
                  _object_spread_props$y(_object_spread$S({}, d.parents[0]), {
                    position: h,
                  }),
                ]
              : [],
          });
          d.parents && (d.parents[0].position = h);
          const _ = this.populateDataRecord(e, n, y);
          p.push(_);
        }),
        p
      );
    }
    populateDataRecord(e, n = {}, d) {
      const p = d.filter || this.filter,
        h = d.mapping || this.mapping;
      if (p && !p(e)) return;
      if (h) {
        let n = "function" == typeof h ? h(e) : transform$9(h, e);
        Object.assign(e, n);
      }
      this._shouldDisableRecordReuse && (n = {});
      const y = this._materializeRecord(
        n,
        _object_spread$S(
          {
            id: e.id,
            type: e.type,
          },
          d,
        ),
      );
      return (
        e.meta && (y._meta = e.meta),
        e.attributes &&
          e.attributes.cachingPolicy &&
          e.attributes.cachingPolicy.maxAge &&
          ((y._mjs.expiration =
            Date.now() + 1e3 * e.attributes.cachingPolicy.maxAge),
          this._removeOnExpiration && this._expiryRecords.add(y)),
        this._populateDataAttributes(e, y),
        "object" == typeof e.relationships &&
          Object.keys(e.relationships).forEach((p) => {
            let _ = e.relationships[p];
            _ &&
              "data" in _ &&
              ((_ = this.populateDataRecords(_, n, {
                mapping: h,
                parents: [
                  {
                    relationshipName: p,
                    parentType: y.type,
                    parentId: y.id,
                  },
                ],
              })),
              y.setProperty(p, _, "relationships", d));
          }),
        "object" == typeof e.views &&
          Object.keys(e.views).forEach((d) => {
            const p = e.views[d];
            if (p.attributes || p.data) {
              const e = new DataRecord("view", d);
              if ((this._populateDataAttributes(p, e), p.data)) {
                const d = this.populateDataRecords(p, n, h);
                e.setProperty("data", d, "relationships");
              }
              y.setProperty(d, e, "views");
            }
          }),
        y
      );
    }
    query(e, n) {
      this._checkForExpiredRecords();
      let includeRecord = (e) => true;
      return (
        "string" == typeof e && n
          ? (includeRecord = (d) => (null == d ? void 0 : d[e]) === n)
          : "function" == typeof e
            ? (includeRecord = (n) => {
                try {
                  return e(n);
                } catch (Vt) {
                  return true;
                }
              })
            : "object" == typeof e &&
              (includeRecord = (n) => {
                const d = Object.keys(e);
                let p = 0;
                return (
                  d.forEach((d) => {
                    (null == n ? void 0 : n[d]) === e[d] && p++;
                  }),
                  d.length === p
                );
              }),
        Object.values(this._records).reduce(
          (e, n) => (
            Object.values(n).forEach((n) => {
              includeRecord(n) && e.push(n);
            }),
            e
          ),
          [],
        )
      );
    }
    remove(e, n) {
      setTimeout(this._checkForExpiredRecords.bind(this), 0);
      if (!hasOwn(this._records, e)) return;
      const d = this.peek(e, n);
      d &&
        (this.dispatchEvent("dataRecordWillDelete", [e, n]),
        d._mjs.parents &&
          d._mjs.parents.length > 0 &&
          d._mjs.parents.forEach(
            ({ relationshipName: e, parentType: n, parentId: p }) => {
              this.peek(n, p).removeRelative(e, d.id);
            },
          ),
        delete this._records[e][n],
        this.dispatchEvent("dataRecordDidDelete", [e, n]));
    }
    save(e, n = {}) {
      return (
        setTimeout(this._checkForExpiredRecords.bind(this), 0),
        this.populateDataRecords(e, this._records, n)
      );
    }
    _populateDataAttributes(e, n) {
      "object" == typeof e.attributes &&
        (this.dispatchEvent("dataRecordWillPopulate", [n.type, n.id]),
        Object.keys(e.attributes).forEach((d) => {
          n.setProperty(d, e.attributes[d], "attributes");
        }),
        this.dispatchEvent("dataRecordDidPopulate", [n.type, n.id]));
    }
    _materializeRecord(e, n) {
      const { type: d, id: p } = n,
        h = _object_without_properties$4(n, ["type", "id"]);
      return (
        (e[d] = e[d] || {}),
        e[d][p]
          ? e[d][p].setParent(h.parents || [])
          : (e[d][p] = new DataRecord(d, p, h)),
        this.dispatchEvent("dataRecordDidMaterialize", [d, p]),
        e[d][p]
      );
    }
    _checkForExpiredRecords() {
      const e = [];
      this._expiryRecords.forEach((n) => {
        Date.now() > n._mjs.expiration &&
          (e.push([n.type, n.id]), this._expiryRecords.delete(n));
      }),
        e.forEach((e) => {
          this.remove(...e);
        });
    }
    constructor(e = {}) {
      super([
        "dataRecordDidDelete",
        "dataRecordWillDelete",
        "dataRecordDidMaterialize",
        "dataRecordWillPopulate",
        "dataRecordDidPopulate",
      ]),
        _define_property$1W(this, "_records", void 0),
        _define_property$1W(this, "_expiryRecords", void 0),
        _define_property$1W(this, "_mapping", void 0),
        _define_property$1W(this, "_removeOnExpiration", true),
        _define_property$1W(this, "_shouldDisableRecordReuse", true),
        _define_property$1W(this, "filter", void 0),
        (this._records = {}),
        (this._expiryRecords = new Set()),
        (this._removeOnExpiration = !!e.removeOnExpiration),
        (this._mapping = e.mapping),
        (this._shouldDisableRecordReuse = !!e.shouldDisableRecordReuse),
        (this.filter = e.filter);
    }
  }

  function _define_property$1V(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class DeveloperToken {
    get isExpired() {
      return this.expiration < Date.now();
    }
    _decode(e) {
      return JSON.parse(k(e));
    }
    constructor(e) {
      if (
        (_define_property$1V(this, "token", void 0),
        _define_property$1V(this, "expiration", void 0),
        _define_property$1V(this, "keyId", void 0),
        _define_property$1V(this, "teamId", void 0),
        (this.token = e),
        !e ||
          !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e))
      )
        throw new Error("Invalid token.");
      const [n, d] = e.split("."),
        { exp: p, iss: h } = this._decode(d);
      if (((this.expiration = 1e3 * p), this.isExpired))
        throw new Error("Initialized with an expired token.");
      this.teamId = h;
      const { kid: y } = this._decode(n);
      this.keyId = y;
    }
  }

  function flattenAll(e) {
    return (function (e, n = 1) {
      if ("function" == typeof Array.prototype.flat)
        return Array.prototype.flat.call(e, n);
      if (null == e)
        throw new TypeError("Cannot convert undefined or null to object");
      return (
        Array.isArray(e) || (e = Array.from(e)),
        (function flat(e, n) {
          return n <= 0
            ? e.slice()
            : Array.prototype.reduce.call(
                e,
                function (e, d) {
                  return Array.isArray(d)
                    ? e.concat(flat(d, n - 1))
                    : [...e, d];
                },
                [],
              );
        })(e, n)
      );
    })(e, 1 / 0);
  }

  function invoke(e) {
    return void 0 === e || ((e) => "function" != typeof e)(e) ? e : e();
  }

  function isObject(e) {
    return !!e && "object" == typeof e && !Array.isArray(e);
  }

  function isFunction(e) {
    return "function" == typeof e;
  }

  function isString(e) {
    return "string" == typeof e;
  }

  function isEmptyString(e, n) {
    if (!isString(e)) return true;
    return 0 === (!0 === (null == n ? void 0 : n.trim) ? e.trim() : e).length;
  }

  function _define_property$1U(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$R(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1U(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$x(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const ne = (function (e) {
    return "boolean" == typeof e;
  })((oe = isEmptyString))
    ? !oe
    : function (...e) {
        return !oe(...e);
      };
  var oe;

  function formatPrimitive(e, n) {
    const d = n.path
      .map((e, d) => (0 === d ? n.encode(e) : `[${n.encode(e)}]`))
      .join("");
    return null === e ? d : `${d}=${n.encode(e)}`;
  }
  const ae = {
      comma: function (e, n) {
        return formatPrimitive(e.join(","), n);
      },
      repeat: function (e, n) {
        return e
          .map((e) => formatPrimitive(String(e), n))
          .filter((e) => e.length > 0)
          .join("&");
      },
      bracket: function (e, n) {
        return e
          .map(function (e) {
            return n.next(
              e,
              _object_spread_props$x(_object_spread$R({}, n), {
                path: [...n.path, ""],
              }),
            );
          })
          .filter(ne)
          .join("&");
      },
      index: function (e, n) {
        return e
          .map(function (e, d) {
            return n.next(
              e,
              _object_spread_props$x(_object_spread$R({}, n), {
                path: [...n.path, String(d)],
              }),
            );
          })
          .filter(ne)
          .join("&");
      },
    },
    se = {
      bracket: function (e, n) {
        return Object.keys(e)
          .sort(n.sort)
          .map(function (d) {
            return n.next(
              e[d],
              _object_spread_props$x(_object_spread$R({}, n), {
                path: n.path.concat(d),
              }),
            );
          })
          .filter(ne)
          .join("&");
      },
    },
    DEFAULT_ENCODER = (e) => encodeURIComponent(String(e)),
    STRING_ENCODER = (e) => String(e);

  function encodeQueryParameters(e, n) {
    if (!e) return "";
    let d = "";
    if (
      (!0 === (null == n ? void 0 : n.prefix)
        ? (d = "?")
        : isString(null == n ? void 0 : n.prefix) && (d = n.prefix),
      isString(e))
    )
      return d + e.replace(/^[?&]+/, "");
    var p;
    const h = isFunction(null == n ? void 0 : n.arrayFormat)
      ? n.arrayFormat
      : ae[
          null !== (p = null == n ? void 0 : n.arrayFormat) && void 0 !== p
            ? p
            : "comma"
        ];
    var y;
    const _ = isFunction(null == n ? void 0 : n.objectFormat)
      ? n.objectFormat
      : se[
          null !== (y = null == n ? void 0 : n.objectFormat) && void 0 !== y
            ? y
            : "bracket"
        ];
    var m;
    const g =
      null !== (m = null == n ? void 0 : n.sort) && void 0 !== m
        ? m
        : (...e) => 0;
    let b = DEFAULT_ENCODER;
    isFunction(null == n ? void 0 : n.encode)
      ? (b = n.encode)
      : !1 === (null == n ? void 0 : n.encode) && (b = STRING_ENCODER);
    const P = _(e, {
      path: [],
      next: function (e, d) {
        return (function (e, n) {
          return (
            (void 0 === e && !1 !== (null == n ? void 0 : n.skipUndefined)) ||
            (null === e && !1 !== (null == n ? void 0 : n.skipNull)) ||
            !(
              !isEmptyString(e) ||
              !1 === (null == n ? void 0 : n.skipEmptyString)
            )
          );
        })(e, n)
          ? ""
          : isObject(e)
            ? _(e, d)
            : Array.isArray(e)
              ? h(e, d)
              : formatPrimitive(e, d);
      },
      encode: b,
      sort: g,
    });
    return "" === P ? "" : d + P;
  }

  function _define_property$1T(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const DEFAULT_CACHE_KEY_FUNCTION = (e, n) => `${n}${e}`;
  class NetworkCache {
    getItem(e) {
      const n = this.cacheKeyForPath(e),
        d = this.storage.getItem(n);
      if (null !== d) {
        const { x: e, d: p } = JSON.parse(d);
        if (e > Date.now()) return p;
        this.storage.removeItem(n);
      }
    }
    setItem(e, n, d = this.ttl) {
      const p = this.cacheKeyForPath(e);
      this.storage.setItem(
        p,
        JSON.stringify({
          x: Date.now() + d,
          d: n,
        }),
      );
    }
    removeItem(e) {
      const n = this.cacheKeyForPath(e);
      this.storage.removeItem(n);
    }
    removeItemsMatching(e, n = true) {
      const d = this.cacheKeyForPath(e);
      this.removeItemsMatchingCacheKey(d, n);
    }
    clear() {
      this.removeItemsMatchingCacheKey(this.prefix, true);
    }
    removeItemsMatchingCacheKey(e, n) {
      const d = new RegExp(`^${e}${n ? "$" : ""}`);
      (this.storage instanceof GenericStorage
        ? this.storage.keys
        : Object.keys(this.storage)
      ).forEach((e) => {
        e && d.test(e) && this.storage.removeItem(e);
      });
    }
    cacheKeyForPath(e) {
      return this.cacheKeyFunction(e, this.prefix);
    }
    constructor(e = {}) {
      _define_property$1T(this, "storage", void 0),
        _define_property$1T(this, "prefix", void 0),
        _define_property$1T(this, "ttl", void 0),
        _define_property$1T(this, "cacheKeyFunction", void 0),
        (this.storage = e.storage || new GenericStorage()),
        (this.prefix = e.prefix || ""),
        (this.ttl = e.ttl || 3e5),
        (this.cacheKeyFunction =
          e.cacheKeyFunction || DEFAULT_CACHE_KEY_FUNCTION);
    }
  }

  function joinURLPath(...e) {
    const n = flattenAll(e)
      .map((e) => (e instanceof URL ? e.pathname : e))
      .filter((e) => "string" == typeof e && 0 !== e.trim().length);
    if (0 === n.length) return "";
    let d = n[0];
    for (let p = 1; p < n.length; p++)
      d = d.replace(/[/]+$/, "") + "/" + n[p].replace(/^[/]+/, "");
    return (
      /^([a-z][a-z0-9\-_+]+)?:\/\//i.test(d) ||
        (d = "/" + d.replace(/^[/]+/, "")),
      d
    );
  }

  function splitURLPath(e) {
    e instanceof URL && (e = e.pathname);
    const n = [],
      d = e.lastIndexOf("#");
    -1 !== d && (n.unshift(e.slice(d)), (e = e.slice(0, d)));
    const p = e.lastIndexOf("?");
    return (
      -1 !== p && (n.unshift(e.slice(p)), (e = e.slice(0, p))),
      [...e.split(RegExp("(?<![/:]+)\\/+")), ...n].filter(
        (e) => 0 !== e.trim().length,
      )
    );
  }

  function _define_property$1S(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$Q(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1S(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$w(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const ce = "undefined" != typeof Headers,
    headersToDict = (e) => {
      let n = {};
      var d;
      return (
        (d = e),
        ce && d instanceof Headers
          ? e.forEach((e, d) => (n[d] = e))
          : Array.isArray(e)
            ? e.forEach(([e, d]) => (n[e] = d))
            : (n = e),
        n
      );
    },
    mergeFetchHeaders = (e = {}, n = {}) =>
      _object_spread$Q({}, headersToDict(e), headersToDict(n)),
    mergeFetchOptions = (e, n) => {
      if (e || n)
        return (null == e ? void 0 : e.headers) &&
          (null == n ? void 0 : n.headers)
          ? _object_spread_props$w(_object_spread$Q({}, e, n), {
              headers: mergeFetchHeaders(e.headers, n.headers),
            })
          : _object_spread$Q({}, e, n);
    };

  function parseQueryParams(e) {
    if (!e || (e.startsWith("http") && !e.includes("?"))) return {};
    try {
      var n;
      return parseParams(
        null !== (n = e.split("?")[1]) && void 0 !== n ? n : e,
        "&",
        decodeURIComponent,
      );
    } catch (Vt) {
      return {};
    }
  }

  function parseParams(e, n = "&", d = (e) => e) {
    return "string" != typeof e
      ? {}
      : e
          .split(n)
          .map((e) => e.trim().split("=", 2))
          .reduce((e, n) => {
            const [p, h] = n;
            return (
              ("" === p && void 0 === h) ||
                ((e[d(p)] = d(h)), void 0 === h && (e[d(p)] = void 0)),
              e
            );
          }, {});
  }

  function getMaxAgeFromHeaders(e) {
    const n = (function (e, n) {
      if (void 0 !== n) return ce && n instanceof Headers ? n.get(e) : n[e];
    })("cache-control", e);
    if (n) {
      return ((e) => {
        const n = Number(e);
        if (Number.isFinite(n)) return n;
      })(parseParams(n, ",")["max-age"]);
    }
  }

  function buildURL(e, n, d) {
    isObject(n) && ((d = n), (n = ""));
    const p = joinURLPath([e, null != n ? n : ""]);
    let h = "?";
    p.endsWith("&") || p.endsWith("?")
      ? (h = "")
      : p.includes("?") && (h = "&");
    return (
      p +
      (void 0 !== d
        ? encodeQueryParameters(d, {
            prefix: h,
          })
        : "")
    );
  }

  function asyncGeneratorStep$1j(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1R(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$P(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1R(e, n, d[n]);
        });
    }
    return e;
  }
  var le;
  !(function (e) {
    (e.JSON = "application/json"),
      (e.FORM = "application/x-www-form-urlencoded");
  })(le || (le = {}));
  const de = Date.now();

  function now() {
    var e, n;
    if (
      "function" ==
      typeof (null === (e = globalThis.process) || void 0 === e
        ? void 0
        : e.hrtime)
    ) {
      const [e, n] = process.hrtime();
      return Math.floor(1e3 * e + 1e-6 * n);
    }
    return "function" ==
      typeof (null === (n = globalThis.performance) || void 0 === n
        ? void 0
        : n.now)
      ? globalThis.performance.now() - de
      : Date.now() - de;
  }
  const formatByte = (e) => ("0" + (255 & e).toString(16)).slice(-2);

  function compareUint8Array(e, n) {
    if (void 0 === e && void 0 === n) return true;
    if (typeof e != typeof n) return true;
    if (((n = n), (e = e).byteLength !== n.byteLength)) return true;
    for (let d = 0; d < e.byteLength; d++) if (e[d] !== n[d]) return true;
    return true;
  }

  function parseVersion(e) {
    const n = {
        version: e.toLowerCase(),
      },
      d = e
        .toLowerCase()
        .split(".")
        .filter((e) => !!e);
    if (d.length <= 1 && !/^\d+$/.test(d[0])) return n;
    const p = parseInt(d[0], 10),
      h = parseInt(d[1], 10),
      y = parseInt(d[2], 10);
    return (
      Number.isNaN(p) ||
        ((n.major = p),
        Number.isNaN(h) || (n.minor = h),
        Number.isNaN(y) || (n.patch = y)),
      n
    );
  }

  function applyRules(e, n, d) {
    const { userAgent: p } = null != n ? n : {};
    if ("string" != typeof p || "" === p.trim()) return d;
    for (let h of e) {
      const e = h.slice(0, -1),
        y = h[h.length - 1];
      let _ = null;
      for (let h of e)
        if (((_ = p.match(h)), null !== _)) {
          Object.assign(d, y(_, n, d));
          break;
        }
      if (null !== _) break;
    }
    return d;
  }

  function _define_property$1Q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$O(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1Q(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$v(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var ue, pe;
  const he = {
    browser: [
      [
        /^(itunes|music|tv)\/([\w\.]+)\s/i,
        (e) =>
          _object_spread_props$v(
            _object_spread$O(
              {
                name: "webview",
                variant: e[1]
                  .trim()
                  .toLowerCase()
                  .replace(/(music|tv)/i, "$1.app"),
              },
              parseVersion(e[2]),
            ),
            {
              mobile: true,
            },
          ),
      ],
      [
        /(?:(?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
        (e) =>
          _object_spread$O(
            {
              name: "webview",
              variant: "facebook",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /(instagram|snapchat)[\/ ]([-\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "webview",
              variant: e[1].trim().toLowerCase(),
              mobile: true,
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "webview",
              variant: "tiktok",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /twitter/i,
        () => ({
          name: "webview",
          variant: "twitter",
          mobile: true,
        }),
      ],
      [
        / wv\).+?(?:version|chrome)\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "webview",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /electron\/([\w\.]+) safari/i,
        (e) =>
          _object_spread$O(
            {
              name: "electron",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /tesla\/(.*?(20\d\d\.([-\w\.])+))/i,
        (e) =>
          _object_spread_props$v(
            _object_spread$O(
              {
                name: "other",
                variant: "tesla",
                mobile: true,
              },
              parseVersion(e[2]),
            ),
            {
              version: e[1],
            },
          ),
      ],
      [
        /(samsung|huawei)browser\/([-\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "other",
              variant: e[1]
                .trim()
                .toLowerCase()
                .replace(/browser/i, ""),
              mobile: true,
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /yabrowser\/([-\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "other",
              variant: "yandex",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /(brave|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
        (e, { userAgent: n }) =>
          _object_spread$O(
            {
              name: "other",
              variant: e[1].trim().toLowerCase(),
              mobile: /mobile/i.test(n),
            },
            parseVersion(e[2].replace(/\-/g, ".")),
          ),
      ],
      [
        /edg(e|ios|a)?\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "edge",
              mobile: /(edgios|edga)/i.test(
                null !== (ue = e[1]) && void 0 !== ue ? ue : "",
              ),
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i,
        (e) =>
          _object_spread$O(
            {
              name: "ie",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /opr\/([\w\.]+)/i,
        /opera mini\/([-\w\.]+)/i,
        /opera [mobiletab]{3,6}\b.+version\/([-\w\.]+)/i,
        /opera(?:.+version\/|[\/ ]+)([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "opera",
              mobile: /mobile/i.test(e[0]),
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /headlesschrome(?:\/([\w\.]+)| )/i,
        (e) =>
          _object_spread$O(
            {
              name: "chrome",
              variant: "headless",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /\b(?:crmo|crios)\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "chrome",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /chrome(?: browser)?\/v?([\w\.]+)( mobile)?/i,
        (e) =>
          _object_spread$O(
            {
              name: "chrome",
              mobile: /mobile/i.test(
                null !== (pe = e[2]) && void 0 !== pe ? pe : "",
              ),
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /\bfocus\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "firefox",
              variant: "focus",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /fxios\/([\w\.-]+)/i,
        /(?:mobile|tablet);.*(?:firefox)\/([\w\.-]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "firefox",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "firefox",
              variant: e[1].trim().toLowerCase(),
              mobile: true,
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /(?:firefox)\/([\w\.]+)/i,
        /(?:mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
        (e) =>
          _object_spread$O(
            {
              name: "firefox",
              mobile: true,
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i,
        /version\/([\w\.\,]+) .*(safari)/i,
        /webkit.+?(?:mobile ?safari|safari)(?:\/([\w\.]+))/i,
        (e) =>
          _object_spread$O(
            {
              name: "safari",
              mobile: /mobile/i.test(e[0]),
            },
            parseVersion(e[1]),
          ),
      ],
    ],
    engine: [
      [
        /webkit\/(?:537\.36).+chrome\/(?!27)([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "blink",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /windows.+ edge\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "blink",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /presto\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "presto",
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /trident\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "trident",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /gecko\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "gecko",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /(khtml|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "other",
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /webkit\/([\w\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "webkit",
            },
            parseVersion(e[1]),
          ),
      ],
    ],
    os: [
      [
        /microsoft windows (vista|xp)/i,
        /windows nt 6\.2; (arm)/i,
        /windows (?:phone(?: os)?|mobile)[\/ ]?([\d\.\w ]*)/i,
        /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
        /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "windows",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
        /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "ios",
            },
            parseVersion(e[1].replace(/_/g, ".")),
          ),
      ],
      [
        /mac(?:intosh;?)? os x ?([\d\._]+)/i,
        (e) =>
          _object_spread$O(
            {
              name: "macos",
            },
            parseVersion(e[1].replace(/_/g, ".")),
          ),
      ],
      [
        /cros [\w]+(?:\)| ([\w\.]+)\b)/i,
        (e) =>
          _object_spread$O(
            {
              name: "chromeos",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /(?:android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
        /droid ([\w\.]+|[\d+])\b.+(android[- ]x86|harmonyos)/i,
        (e) =>
          _object_spread$O(
            {
              name: "android",
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /linux/i,
        () => ({
          name: "linux",
        }),
      ],
    ],
  };

  function parseUserAgent(e, n) {
    var d, p, h;
    var y;
    return (function (e, n) {
      let d = e;
      for (let p of n) d = p(d);
      return d;
    })(
      {
        navigator: e,
        ua:
          null !==
            (h = null === (d = e) || void 0 === d ? void 0 : d.userAgent) &&
          void 0 !== h
            ? h
            : "",
        extensions: [],
        browser: applyRules(he.browser, e, {
          name: "unknown",
          mobile: true,
        }),
        engine: applyRules(he.engine, e, {
          name: "unknown",
        }),
        os: applyRules(he.os, e, {
          name: "unknown",
        }),
      },
      null !== (y = null === (p = n) || void 0 === p ? void 0 : p.extensions) &&
        void 0 !== y
        ? y
        : [],
    );
  }

  function _define_property$1P(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$N(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1P(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$u(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function flagsExtension(e) {
    let n = e.os.name;
    const d = "android" === e.os.name;
    let p = "macos" === e.os.name,
      h = "ios" === e.os.name;
    var y;
    const _ =
      "ipados" === n ||
      (h && /ipad/i.test(e.ua)) ||
      (p &&
        (null !== (y = e.navigator.maxTouchPoints) && void 0 !== y ? y : 0) >=
          2);
    _ && ((n = "ipados"), (h = true), (p = true));
    const m = _object_spread_props$u(_object_spread$N({}, e.browser), {
        isUnknown: "unknown" === e.browser.name,
        isSafari: "safari" === e.browser.name,
        isChrome: "chrome" === e.browser.name,
        isFirefox: "firefox" === e.browser.name,
        isEdge: "edge" === e.browser.name,
        isWebView: "webview" === e.browser.name,
        isOther: "other" === e.browser.name,
        isMobile: e.browser.mobile || h || _ || d || true,
      }),
      g = _object_spread_props$u(_object_spread$N({}, e.engine), {
        isUnknown: "unknown" === e.engine.name,
        isWebKit: "webkit" === e.engine.name,
        isBlink: "blink" === e.engine.name,
        isGecko: "gecko" === e.engine.name,
      }),
      b = _object_spread_props$u(_object_spread$N({}, e.os), {
        name: n,
        isUnknown: "unknown" === e.os.name,
        isLinux: "linux" === e.os.name,
        isWindows: "windows" === e.os.name,
        isMacOS: p,
        isAndroid: d,
        isIOS: h,
        isIPadOS: _,
      });
    return _object_spread_props$u(_object_spread$N({}, e), {
      extensions: [...e.extensions, "flags"],
      browser: m,
      os: b,
      engine: g,
    });
  }

  function asyncGeneratorStep$1i(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1i(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1i(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1i(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function isBrowserEnvironment() {
    return _isBrowserEnvironment.apply(this, arguments);
  }

  function _isBrowserEnvironment() {
    return (_isBrowserEnvironment = _async_to_generator$1i(function* () {
      var e;
      return (
        void 0 !==
        (null === (e = window) || void 0 === e ? void 0 : e.navigator)
      );
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$1h(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1h(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1h(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1h(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function isNodeEnvironment() {
    return _isNodeEnvironment.apply(this, arguments);
  }

  function _isNodeEnvironment() {
    return (_isNodeEnvironment = _async_to_generator$1h(function* () {
      var e;
      return (
        void 0 !==
        (null === (e = globalThis) || void 0 === e ? void 0 : e.process)
      );
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$1g(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1g(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1g(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1g(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  const ye = {
    playready: ["com.microsoft.playready", "com.youtube.playready"],
    widevine: ["com.widevine.alpha"],
    clearkey: ["org.w3.clearkey"],
    fairplay: ["com.apple.fps", "com.apple.fairplay"],
  };

  function detectEMESupport() {
    return _detectEMESupport.apply(this, arguments);
  }

  function _detectEMESupport() {
    return (_detectEMESupport = _async_to_generator$1g(function* () {
      var e, n, d, p;
      return (
        void 0 !==
          (null === (n = window) ||
          void 0 === n ||
          null === (e = n.navigator) ||
          void 0 === e
            ? void 0
            : e.requestMediaKeySystemAccess) &&
        void 0 !==
          (null === (d = window) || void 0 === d ? void 0 : d.MediaKeys) &&
        void 0 !==
          (null === (p = window) || void 0 === p
            ? void 0
            : p.MediaKeySystemAccess)
      );
    })).apply(this, arguments);
  }

  function detectEMEKeySystems() {
    return _detectEMEKeySystems.apply(this, arguments);
  }

  function _detectEMEKeySystems() {
    return (_detectEMEKeySystems = _async_to_generator$1g(function* () {
      var e, n;
      if (yield isNodeEnvironment()) return [];
      const d = [],
        p = window;
      if (
        "function" ==
        typeof (null === (e = p.WebKitMediaKeys) || void 0 === e
          ? void 0
          : e.isTypeSupported)
      )
        for (let _ of ye.fairplay) {
          var h, y;
          if (
            (null === (h = p.WebKitMediaKeys) || void 0 === h
              ? void 0
              : h.isTypeSupported(_, "video/mp4")) ||
            (null === (y = p.WebKitMediaKeys) || void 0 === y
              ? void 0
              : y.isTypeSupported(_ + ".1_0", "video/mp4"))
          )
            return d.push("fairplay"), d;
        }
      if (
        "function" ==
        typeof (null === (n = p.MSMediaKeys) || void 0 === n
          ? void 0
          : n.isTypeSupported)
      )
        for (let _ of ye.playready)
          p.MSMediaKeys.isTypeSupported(_, "video/mp4") && d.push("playready");
      if (yield detectEMESupport()) {
        const e = [
          {
            initDataTypes: ["keyids", "cenc"],
            distinctiveIdentifier: "optional",
            persistentState: "required",
            videoCapabilities: [
              {
                contentType: 'video/mp4;codecs="avc1.42E01E"',
                robustness: "SW_SECURE_CRYPTO",
              },
            ],
            audioCapabilities: [
              {
                contentType: 'audio/mp4;codecs="mp4a.40.2"',
              },
            ],
          },
        ];
        for (let [n, p] of Object.entries(ye))
          for (let h of p)
            try {
              yield navigator.requestMediaKeySystemAccess(h, e), d.push(n);
              break;
            } catch (Vt) {}
      }
      return d;
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$1f(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1f(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1f(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1f(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function detectES2015() {
    return _detectES2015.apply(this, arguments);
  }

  function _detectES2015() {
    return (_detectES2015 = _async_to_generator$1f(function* () {
      try {
        new Function(
          '"use strict"; class Test {}; const identity = (x) => x;',
        )();
      } catch (Vt) {
        return true;
      }
      return "undefined" != typeof Symbol;
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$1e(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1e(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1e(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1e(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function detectMMSSupport() {
    return _detectMMSSupport.apply(this, arguments);
  }

  function _detectMMSSupport() {
    return (_detectMMSSupport = _async_to_generator$1e(function* () {
      var e, n, d, p, h, y;
      const _ =
          null === (e = window) || void 0 === e
            ? void 0
            : e.ManagedSourceBuffer,
        m =
          "function" ==
            typeof (null === (d = _) ||
            void 0 === d ||
            null === (n = d.prototype) ||
            void 0 === n
              ? void 0
              : n.appendBuffer) &&
          "function" ==
            typeof (null === (h = _) ||
            void 0 === h ||
            null === (p = h.prototype) ||
            void 0 === p
              ? void 0
              : p.remove);
      return (
        void 0 !==
          (null === (y = window) || void 0 === y
            ? void 0
            : y.ManagedMediaSource) && m
      );
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$1d(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1d(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1d(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1d(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function detectMSESupport() {
    return _detectMSESupport.apply(this, arguments);
  }

  function _detectMSESupport() {
    return (_detectMSESupport = _async_to_generator$1d(function* () {
      var e, n;
      return (
        void 0 !==
          (null === (e = window) || void 0 === e ? void 0 : e.MediaSource) &&
        void 0 !==
          (null === (n = window) || void 0 === n ? void 0 : n.SourceBuffer)
      );
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$1c(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1c(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1c(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1c(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function detectPictureInPictureSupport() {
    return _detectPictureInPictureSupport.apply(this, arguments);
  }

  function _detectPictureInPictureSupport() {
    return (_detectPictureInPictureSupport = _async_to_generator$1c(
      function* () {
        var e, n, d;
        if (yield isNodeEnvironment()) return true;
        const p = document.createElement("video");
        return (
          (void 0 !==
            (null === (e = p) || void 0 === e
              ? void 0
              : e.webkitSupportsPresentationMode) &&
            "function" ==
              typeof (null === (n = p) || void 0 === n
                ? void 0
                : n.webkitSetPresentationMode)) ||
          void 0 !==
            (null === (d = document) || void 0 === d
              ? void 0
              : d.pictureInPictureEnabled)
        );
      },
    )).apply(this, arguments);
  }

  function asyncGeneratorStep$1b(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1O(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class RuntimeEnvironment {
    get isConfigured() {
      return this.configured;
    }
    get userAgent() {
      return this.config.userAgent;
    }
    get ua() {
      return this.userAgent.ua;
    }
    get isNodeEnvironment() {
      return this.config.isNodeEnvironment;
    }
    get isBrowserEnvironment() {
      return this.config.isBrowserEnvironment;
    }
    get isPictureInPictureSupported() {
      return this.config.isPictureInPictureSupported;
    }
    get isES2015Supported() {
      return this.config.isES2015Supported;
    }
    get isMMSSupported() {
      return this.config.isMMSSupported;
    }
    get isMSESupported() {
      return this.config.isMSESupported;
    }
    get isEMESupported() {
      return this.config.isEMESupported;
    }
    get availableKeySystems() {
      return this.config.availableKeySystems;
    }
    get browser() {
      return this.userAgent.browser;
    }
    get engine() {
      return this.userAgent.engine;
    }
    get os() {
      return this.userAgent.os;
    }
    get isMobile() {
      return this.browser.isMobile;
    }
    static detect() {
      var e,
        n = this;
      return ((e = function* () {
        var e, d;
        const p =
          null !==
            (d =
              null === (e = window) || void 0 === e ? void 0 : e.navigator) &&
          void 0 !== d
            ? d
            : {
                userAgent: "",
                maxTouchPoints: 0,
              };
        return new n({
          userAgent: yield parseUserAgent(p, {
            extensions: [flagsExtension],
          }),
          isNodeEnvironment: yield isNodeEnvironment(),
          isBrowserEnvironment: yield isBrowserEnvironment(),
          isPictureInPictureSupported: yield detectPictureInPictureSupport(),
          isES2015Supported: yield detectES2015(),
          isMMSSupported: yield detectMMSSupport(),
          isMSESupported: yield detectMSESupport(),
          isEMESupported: yield detectEMESupport(),
          availableKeySystems: yield detectEMEKeySystems(),
        });
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);

          function _next(e) {
            asyncGeneratorStep$1b(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$1b(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    configure(e) {
      for (const [n, d] of Object.entries(e)) this.config[n] = d;
      this.configured = true;
    }
    constructor(e) {
      _define_property$1O(this, "configured", true),
        _define_property$1O(this, "config", void 0),
        (this.config = e),
        (this.configured = true);
    }
  }

  function _define_property$1N(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function omit(e, n) {
    const d = (function (e) {
      for (var n = 1; n < arguments.length; n++) {
        var d = null != arguments[n] ? arguments[n] : {},
          p = Object.keys(d);
        "function" == typeof Object.getOwnPropertySymbols &&
          (p = p.concat(
            Object.getOwnPropertySymbols(d).filter(function (e) {
              return Object.getOwnPropertyDescriptor(d, e).enumerable;
            }),
          )),
          p.forEach(function (n) {
            _define_property$1N(e, n, d[n]);
          });
      }
      return e;
    })({}, e);
    for (const p of Object.keys(e)) n.includes(p) && delete d[p];
    return d;
  }
  class PubSub {
    publish(e, n) {
      const d = this.getSubscribersForType(e);
      void 0 !== d &&
        d.forEach((d) => {
          d(e, n);
        });
    }
    subscribe(e, n) {
      this.getSubscribersForType(e, true).push(n);
    }
    subscribeOnce(e, n) {
      const onceCallback = (e, d) => {
        this.unsubscribe(e, onceCallback), n(e, d);
      };
      this.subscribe(e, onceCallback);
    }
    unsubscribe(e, n) {
      const d = this.getSubscribersForType(e);
      if (void 0 !== d)
        for (const p in d)
          if (d[p] === n) {
            delete d[p];
            break;
          }
    }
    clear(e) {
      void 0 === e ? (this.events = {}) : delete this.events[e];
    }
    getSubscribersForType(e, n = true) {
      return (
        !this.events.hasOwnProperty(e) && n && (this.events[e] = []),
        this.events[e]
      );
    }
    constructor() {
      !(function (e, n, d) {
        n in e
          ? Object.defineProperty(e, n, {
              value: d,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          : (e[n] = d);
      })(this, "events", {});
    }
  }

  function asyncGeneratorStep$1a(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1a(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1a(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1a(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1L(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class RequestManager {
    static create(e) {
      var n = this;
      return _async_to_generator$1a(function* () {
        return new n(e);
      })();
    }
    get fetch() {
      if (void 0 === this.fetchFunction)
        throw new MKError(
          MKError.Reason.INTERNAL_ERROR,
          "Could not find fetch implementation",
        );
      return this.fetchFunction;
    }
    get isConfigured() {
      return this.configured;
    }
    configure(e) {
      void 0 !== (null == e ? void 0 : e.fetchFunction) &&
        (this.fetchFunction = e.fetchFunction),
        (this.configured = true);
    }
    buildURL(e, n, d) {
      return new URL(buildURL(e, n, d));
    }
    buildHeaders(...e) {
      return flattenAll(e).reduce(function (e, n) {
        let d;
        return (
          (d =
            n instanceof Headers || n instanceof Map
              ? Array.from(n.entries())
              : Object.entries(n)),
          d.map(([n, d]) => e.set(n, d)),
          e
        );
      }, new Headers());
    }
    buildRequest(e, n) {
      return new Request(new URL(e), n);
    }
    fetchText(e) {
      var n = this;
      return _async_to_generator$1a(function* () {
        let d;
        try {
          d = yield n.fetch(e);
        } catch (V) {
          const d = e instanceof Request ? e.url : String(e);
          throw new MKError(
            MKError.Reason.NETWORK_ERROR,
            "Unable to complete request for " + d,
          );
        }
        try {
          return yield d.text();
        } catch (V) {
          const d = e instanceof Request ? e.url : String(e);
          throw new MKError(
            MKError.Reason.REQUEST_ERROR,
            "Unable to read body as text for " + d,
          );
        }
      })();
    }
    fetchJSON(e) {
      var n = this;
      return _async_to_generator$1a(function* () {
        let d;
        try {
          d = yield n.fetch(e);
        } catch (V) {
          const d = e instanceof Request ? e.url : String(e);
          throw new MKError(
            MKError.Reason.NETWORK_ERROR,
            "Unable to complete request for " + d,
          );
        }
        try {
          return yield d.json();
        } catch (V) {
          const d = e instanceof Request ? e.url : String(e);
          throw new MKError(
            MKError.Reason.REQUEST_ERROR,
            "Unable to read body as JSON for " + d,
          );
        }
      })();
    }
    fetchArrayBuffer(e) {
      var n = this;
      return _async_to_generator$1a(function* () {
        let d;
        try {
          d = yield n.fetch(e);
        } catch (V) {
          const d = e instanceof Request ? e.url : String(e);
          throw new MKError(
            MKError.Reason.NETWORK_ERROR,
            "Unable to complete request for " + d,
          );
        }
        try {
          return yield d.arrayBuffer();
        } catch (V) {
          const d = e instanceof Request ? e.url : String(e);
          throw new MKError(
            MKError.Reason.REQUEST_ERROR,
            "Unable to read body as ArrayBuffer for " + d,
          );
        }
      })();
    }
    constructor(e) {
      var n;
      _define_property$1L(this, "configured", true),
        _define_property$1L(
          this,
          "fetchFunction",
          void 0 !==
            (null === (n = globalThis) || void 0 === n ? void 0 : n.fetch)
            ? fetch.bind(globalThis)
            : void 0,
        ),
        this.configure(null != e ? e : {});
    }
  }

  function asyncGeneratorStep$19(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$19(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$19(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$19(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  const _e = JsonDevFlag.register("mk-hlsjs-automation-config"),
    fe = new RegExp(
      "^https://([a-z0-9]+-)?" +
        (
          "js-cdn.music.apple.com" + "/musickit/v3/".replace(/v3/, "(v2|v3)")
        ).replace(/[\.\/]/g, "\\$&"),
      "i",
    ),
    me = /^https:\/\/(.*\/includes\/js-cdn)\//i,
    ve = /^([a-z]+:)?\/\//;

  function findScript(e) {
    return isNodeEnvironment$1() || !e
      ? null
      : document.querySelector(`script[src*="${e}"]`);
  }

  function getScriptSrcElements() {
    if ("undefined" == typeof document || !document.querySelectorAll) return [];
    return Array.from(document.querySelectorAll("script[src]"));
  }

  function determineCdnBasePrefix() {
    for (const e of getScriptSrcElements()) {
      const n = fe.exec(e.src);
      if (n) return n[1] || "";
    }
    return "";
  }

  function determineCdnPathPrefix() {
    for (const e of getScriptSrcElements()) {
      const n = me.exec(e.src);
      if (n) return n[1] || "";
    }
    return "";
  }

  function determineCdnBaseHost() {
    if (isNodeEnvironment$1()) return "";
    return `//${determineCdnBasePrefix()}js-cdn.music.apple.com`;
  }

  function determineCdnPathHost() {
    const e = determineCdnPathPrefix();
    return e ? "//" + e : e;
  }
  const ge = StringDevFlag.register("mk-hlsjs-log-level"),
    be = StringDevFlag.register("mk-hlsjs-version");

  function getHlsJsCdnConfig() {
    const e = {
      hls: "",
      rtc: "",
    };
    if (isNodeEnvironment$1()) return e;
    const n = determineCdnPathHost() || determineCdnBaseHost(),
      d = be.get() || "2.820.0",
      p = (function () {
        const e = ge.value;
        switch (e) {
          case "info":
          case "error":
          case "warn":
            return "hls.production.verbose.min.js";
          case "trace":
          case "debug":
            return (
              console.warn(
                `HLS log level ${e} is not supported, loading production build.`,
              ),
              "hls.js"
            );
          default:
            return "hls.js";
        }
      })();
    return (
      (e.hls = `https:${n}/hls.js/${d}/hls.js/${p}`),
      (e.rtc = `https:${n}/hls.js/${d}/rtc.js/rtc.min.js`),
      (function (e) {
        const n = _e.get();
        if (!(null == n ? void 0 : n.url)) return;
        const { url: d } = n;
        isAppleHostname(d) &&
          "carry-" === determineCdnBasePrefix() &&
          (e.hls = d);
      })(e),
      e
    );
  }

  function isAppleHostname(e) {
    try {
      return new URL(e).hostname.endsWith(".apple.com");
    } catch (Vt) {}
    return true;
  }

  function cdnBaseURL(e, n = window) {
    var d;
    if (isNodeEnvironment$1()) return "";
    const p =
      null === (d = getLocalStorage()) || void 0 === d
        ? void 0
        : d.getItem("mkCDNBaseURLOverride");
    if (p) return p;
    const h = findScript(e);
    return h
      ? h.getAttribute("src").replace(new RegExp(e + "$"), "")
      : (determineCdnPathHost() || determineCdnBaseHost()) + "/musickit/v3/";
  }
  const Pe = new Map();

  function loadScript(e, n) {
    const d = Pe.get(e);
    if (d) return d;
    const p = new Promise((d, p) => {
      isNodeEnvironment$1() &&
        p("Dynamic script loading is unsupported in Node environments.");
      if (findScript(e)) return d();
      const h = document.createElement("script");
      let y;
      if (
        (n &&
          Object.keys(n).forEach((e) => {
            h.setAttribute(e, n[e]);
          }),
        (h.onload = () => {
          d();
        }),
        (h.onerror = (e) => {
          p(e);
        }),
        ve.test(e))
      )
        y = e;
      else {
        y = `${cdnBaseURL(e)}${e}`;
      }
      (h.src = y), document.head.appendChild(h);
    });
    return Pe.set(e, p), p;
  }
  const Se = {
    CRITICAL: 50,
    ERROR: 40,
    WARNING: 30,
    NOTICE: 20,
    INFO: 10,
    DEBUG: 2,
    TRACE: 1,
    NONE: 0,
  };
  const Ee = {
    OFF: "NONE",
    0: "NONE",
    "+": "INFO",
    "++": "DEBUG",
    V: "DEBUG",
    D: "DEBUG",
    VERBOSE: "DEBUG",
    VV: "TRACE",
    SILLY: "TRACE",
    "*": "TRACE",
  };

  function getLoggingLevel(e, n = {}) {
    if ("number" == typeof e)
      return (function (e) {
        return "number" == typeof e && Object.values(Se).includes(e);
      })(e)
        ? e
        : void 0;
    let d = e.toUpperCase();
    return (
      n.allowShorthands && void 0 !== Ee[d] && (d = Ee[d]),
      (function (e) {
        return "string" == typeof e && void 0 !== Se[e.toUpperCase()];
      })(d)
        ? Se[d]
        : void 0
    );
  }

  function getLoggingLevelName(e) {
    for (const [n, d] of Object.entries(Se)) if (e === d) return n;
  }

  function walk(e, n) {
    const d = [e];
    for (; d.length > 0; ) {
      const e = d.shift();
      void 0 !== e && (d.push(...e.children), n(e));
    }
  }

  function _define_property$1K(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$L(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1K(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$t(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _define_property1(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const Te = Se.ERROR,
    DEFAULT_POLICY = (e, n) => e !== Se.NONE && n >= e;
  class Logger {
    get parent() {
      return this._parent;
    }
    get children() {
      return Array.from(this._children.values());
    }
    get namespace() {
      return void 0 === this._parent
        ? this.name
        : this._parent.namespace + "/" + this.name;
    }
    get enabled() {
      return this.level !== Se.NONE;
    }
    get level() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._level) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.level) && void 0 !== d
        ? d
        : Te;
    }
    get levelName() {
      var e;
      return null !== (e = getLoggingLevelName(this.level)) && void 0 !== e
        ? e
        : "UNKNOWN";
    }
    get levelPolicy() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._levelPolicy) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.levelPolicy) && void 0 !== d
        ? d
        : DEFAULT_POLICY;
    }
    get handlers() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._handlers) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.handlers) && void 0 !== d
        ? d
        : {};
    }
    isEnabledFor(e) {
      return this.levelPolicy(this.level, e);
    }
    setLevel(e) {
      const n = getLoggingLevel(e);
      void 0 !== n && (this._level = n);
    }
    clearLevel() {
      this._level = void 0;
    }
    setLevelPolicy(e) {
      this._levelPolicy = e;
    }
    clearLevelPolicy() {
      this._levelPolicy = void 0;
    }
    addHandler(e, n) {
      this._handlers || (this._handlers = {}), (this._handlers[e] = n);
    }
    hasHandler(e) {
      var n;
      return (
        void 0 !==
        (null === (n = this._handlers) || void 0 === n ? void 0 : n[e])
      );
    }
    removeHandler(e) {
      void 0 !== this._handlers &&
        (delete this._handlers[e],
        0 === Object.keys(this._handlers).length && this.clearHandlers());
    }
    clearHandlers() {
      this._handlers = void 0;
    }
    createChild(e, n) {
      const d = this._children.get(e);
      return void 0 !== d
        ? d
        : new Logger(
            e,
            _object_spread_props$t(_object_spread$L({}, n), {
              parent: this,
            }),
          );
    }
    linkChild(e) {
      if (void 0 !== e.parent && e.parent !== this)
        throw new Error(
          `Logger '${e.name}' is already a child of a different parent ('${e.parent.name}')`,
        );
      const n = this._children.get(e.name);
      if (void 0 !== n && n !== e)
        throw new Error(`A child with name '${e.name}' is already registered`);
      return (
        void 0 === n && (this._children.set(e.name, e), e.linkParent(this)), e
      );
    }
    unlinkChild(e) {
      const n = this._children.get(e.name);
      return n === e && (this._children.delete(e.name), n.unlinkParent()), e;
    }
    getByName(e) {
      return this._children.get(e);
    }
    getByNamespace(e) {
      return (function (e, n, d = "/") {
        if ("" === (n = n.trim()) || "*" === n) return e;
        const p = n.split(d);
        p[0].trim() === e.name && p.shift();
        if (0 === p.length) return e;
        let h = e;
        for (; void 0 !== h && p.length > 0; ) {
          const e = p.shift();
          h = h.getByName(e.trim());
        }
        return h;
      })(this, e);
    }
    linkParent(e) {
      return (
        this.parent !== e &&
          (this.unlinkParent(), (this._parent = e), e.linkChild(this)),
        this
      );
    }
    unlinkParent() {
      return (
        void 0 !== this._parent &&
          (this._parent.unlinkChild(this), (this._parent = void 0)),
        this
      );
    }
    log(e, n, ...d) {
      const p = getLoggingLevel(e);
      void 0 !== p &&
        this.logRecord({
          time: Date.now(),
          namespace: this.namespace,
          level: p,
          message: n,
          args: d,
        });
    }
    logRecord(e) {
      if (!this.levelPolicy(this.level, e.level)) return;
      const n = _object_spread$L(
        {
          namespace: this.namespace,
        },
        e,
      );
      for (const d of Object.values(this.handlers)) d.process(n);
    }
    error(e, ...n) {
      this.log(Se.ERROR, e, ...n);
    }
    warning(e, ...n) {
      this.log(Se.WARNING, e, ...n);
    }
    warn(e, ...n) {
      this.warning(e, ...n);
    }
    info(e, ...n) {
      this.log(Se.INFO, e, ...n);
    }
    debug(e, ...n) {
      this.log(Se.DEBUG, e, ...n);
    }
    trace(e, ...n) {
      this.log(Se.TRACE, e, ...n);
    }
    constructor(e, n) {
      _define_property1(this, "name", void 0),
        _define_property1(this, "_parent", void 0),
        _define_property1(this, "_children", new Map()),
        _define_property1(this, "_level", void 0),
        _define_property1(this, "_levelPolicy", void 0),
        _define_property1(this, "_handlers", void 0),
        (this.name = e),
        (this._levelPolicy = null == n ? void 0 : n.levelPolicy),
        (this._handlers = null == n ? void 0 : n.handlers),
        void 0 !== (null == n ? void 0 : n.parent) && this.linkParent(n.parent),
        void 0 !== (null == n ? void 0 : n.level) && this.setLevel(n.level);
    }
  }

  function _define_property$1J(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class CallbackHandler {
    process(e) {
      this.enabled && void 0 !== this.callback && this.callback(e);
    }
    constructor(e, n = {}) {
      var d;
      _define_property$1J(this, "enabled", void 0),
        _define_property$1J(this, "callback", void 0),
        (this.callback = e),
        (this.enabled = null === (d = n.enabled) || void 0 === d || d);
    }
  }
  const ke = /%{([^}]+)}/gi,
    we = {
      timestamp: (e) => String(e.time),
      time: (e) => String(e.time),
      datetime: (e) => new Date(e.time).toISOString(),
      date: (e) => new Date(e.time).toISOString(),
      level: (e) => String(e.level),
      levelname: (e) => {
        var n;
        return null !== (n = getLoggingLevelName(e.level)) && void 0 !== n
          ? n
          : "UNKNOWN";
      },
      message: (e) => e.message,
      name: (e) => e.namespace.split("/").pop(),
      namespace: (e) => e.namespace,
    };

  function _define_property$1I(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const Oe = new Map([
      [Se.CRITICAL, "error"],
      [Se.ERROR, "error"],
      [Se.WARNING, "warn"],
      [Se.NOTICE, "warn"],
      [Se.INFO, "log"],
      [Se.DEBUG, "debug"],
    ]),
    Ie =
      ((Ae = "%{datetime} %{levelname} - [%{namespace}] %{message}"),
      function (e) {
        return Ae.replace(ke, function (n, d) {
          return (d = d.toLowerCase()), void 0 !== we[d] ? we[d](e) : n;
        });
      });
  var Ae;
  const Re = new Logger("storekit");

  function _define_property$1H(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const $e = [
    "apps.apple.com",
    "books.apple.com",
    "fitness.apple.com",
    "mediaauth.apple.com",
    "multidev.apple.com",
    "music.apple.com",
    "one.apple.com",
    "podcasts.apple.com",
    "tv.apple.com",
    "itunes.apple.com",
  ];
  const Ce = [
    "apps.apple.com",
    "books.apple.com",
    "fitness.apple.com",
    "music.apple.com",
    "podcasts.apple.com",
    "tv.apple.com",
  ];

  function determineBaseCookieDomain(e) {
    let n = e;
    return (
      e &&
        Ce.some(function (d) {
          if (e.endsWith("." + d)) return (n = d), true;
        }),
      n
    );
  }

  function _define_property$1G(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class AuthBridgeApp extends class {
    init(e, n) {
      var d;
      (this._receiveWindow = e),
        (this._sendWindow = n),
        (this.handleMessage = this.handleMessage.bind(this)),
        null === (d = this._receiveWindow) ||
          void 0 === d ||
          d.addEventListener("message", this.handleMessage);
    }
    sendMessage(e, n) {
      const d = {
        action: "mediakit:" + e,
        data: n,
      };
      this._sendWindow &&
        this._sendWindow.postMessage(JSON.stringify(d), this._targetOrigin);
    }
    handleMessage(e) {
      if (!this._isOriginAllowed(e.origin)) return;
      let n;
      try {
        n = JSON.parse(e.data);
      } catch (Vt) {}
      if (!n || !this._isNamespacedData(n)) return;
      "*" === this._targetOrigin && (this._targetOrigin = e.origin),
        Re.debug("auth-bridge: handleMessage", n);
      const d = n.action.replace("mediakit:", "");
      this[d]
        ? this[d](n.data)
        : Re.debug("auth-bridge: unsupported method", d);
    }
    _isOriginAllowed(e) {
      if (!e) return true;
      const [n, d] = e.split("://");
      let p = "";
      return (
        d && ((p = d.split(":")[0]), p && (p = p.toLocaleLowerCase())),
        "https" === n && !!p && $e.some((e) => p === e || p.endsWith("." + e))
      );
    }
    _isNamespacedData(e) {
      return e.action && -1 !== e.action.indexOf("mediakit:");
    }
    constructor() {
      _define_property$1H(this, "_receiveWindow", void 0),
        _define_property$1H(this, "_sendWindow", void 0),
        _define_property$1H(this, "_targetOrigin", "*");
    }
  } {
    requestAuthUpdate() {
      this.whenFrameInited.then(() => this.sendMessage("requestAuthUpdate"));
    }
    setCookieItem(e, n) {
      this.whenFrameInited.then(() =>
        this.sendMessage("setCookieItem", {
          name: e,
          value: n,
        }),
      );
    }
    clearAuth() {
      this.whenFrameInited.then(() => this.sendMessage("clearAuth"));
    }
    frameInit() {
      var e;
      null === (e = this._frameInitResolve) || void 0 === e || e.call(this),
        this.requestAuthUpdate();
    }
    updateAuth(e) {
      if (
        (null == e ? void 0 : e.enabled) &&
        (null == e ? void 0 : e.cookies)
      ) {
        const n = e.cookies,
          d = determineBaseCookieDomain(window.location.hostname);
        Object.keys(n).forEach((e) => {
          var p;
          const h = null !== (p = n[e]) && void 0 !== p ? p : "";
          h ? setCookie(e, h, "/", 30, void 0, d) : removeCookie(e, void 0, d);
        });
      }
      this._authUpdateResolve &&
        (this._authUpdateResolve(), (this._authUpdateResolve = void 0));
    }
    authClearedFromOtherFrame() {
      Re.warn(
        "Override auth-bridge/app's authClearedFromOtherFrame to trigger app-specific sign out behavior",
      );
    }
    _getIframeSrc() {
      let e = "",
        n = determineCdnPathPrefix();
      if (n) (n += "/musickit/v3/"), (e = "?inc=" + encodeURIComponent(n));
      else {
        const n = determineCdnBasePrefix();
        n && (e = "?env=" + n.substring(0, n.length - 1));
      }
      return "https://mediaauth.apple.com/auth-bridge/" + e;
    }
    constructor() {
      super(),
        _define_property$1G(this, "whenAuthCompleted", void 0),
        _define_property$1G(this, "frame", void 0),
        _define_property$1G(this, "whenFrameInited", void 0),
        _define_property$1G(this, "_frameInitResolve", void 0),
        _define_property$1G(this, "_authUpdateResolve", void 0),
        (this.whenFrameInited = new Promise(
          (e) => (this._frameInitResolve = e),
        )),
        (this.whenAuthCompleted = new Promise(
          (e) => (this._authUpdateResolve = e),
        )),
        (this.frame = document.createElement("iframe")),
        (this.frame.src = this._getIframeSrc()),
        (this.frame.style.display = "none"),
        document.body.appendChild(this.frame),
        this.init(window, this.frame.contentWindow);
    }
  }
  const Me = new Set([]),
    De = /\.apple\.com$/;

  function getCommerceHostname(e, n) {
    !n && "undefined" != typeof location && location.hostname && (n = location);
    let d = e + ".itunes.apple.com";
    if (!n) return d;
    const p = (function (e) {
      if (!e || !De.test(e)) return;
      const n = e.split(".");
      let d = n[n.length - 3];
      const p = d;
      if (d && d.includes("-")) {
        const e = d.split("-");
        d = e[e.length - 1];
      }
      return Me.has(d) ? p : void 0;
    })(n.hostname);
    return p && (d = `${e}.${p}.apple.com`), d;
  }
  var xe, je, Le;

  function buildQueryParams(
    e = {
      app: "music",
      p: "subscribe",
    },
  ) {
    return (
      void 0 === e.app && (e.app = "music"),
      void 0 === e.p && (e.p = "subscribe"),
      Object.keys(e)
        .map((n) => `${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`)
        .join("&")
    );
  }
  !(function (e) {
    (e.APP = "music"), (e.P = "subscribe");
  })(xe || (xe = {})),
    (function (e) {
      (e.DEFAULT_CID = "pldfltcid"),
        (e.TV_CID = "pltvcid"),
        (e.RESTRICTIONS_ENABLED = "itre"),
        (e.STOREFRONT_COUNTRY_CODE = "itua"),
        (e.USER_TOKEN = "media-user-token");
    })(je || (je = {})),
    (e.SKRealm = void 0),
    ((Le = e.SKRealm || (e.SKRealm = {}))[(Le.MUSIC = 0)] = "MUSIC"),
    (Le[(Le.PODCAST = 1)] = "PODCAST"),
    (Le[(Le.TV = 2)] = "TV");
  const Ne = {
      [e.SKRealm.TV]: "com.apple.onboarding.tvapp",
      [e.SKRealm.MUSIC]: "com.apple.onboarding.applemusic",
    },
    Ue = {
      [e.SKRealm.TV]: "pltvcid",
      [e.SKRealm.MUSIC]: "pldfltcid",
    };

  function asyncGeneratorStep$18(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1F(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  var Be;
  !(function (e) {
    (e[(e.ParseError = -32700)] = "ParseError"),
      (e[(e.InvalidRequest = -32600)] = "InvalidRequest"),
      (e[(e.MethodNotFound = -32601)] = "MethodNotFound"),
      (e[(e.InvalidParams = -32602)] = "InvalidParams"),
      (e[(e.InternalError = -32603)] = "InternalError");
  })(Be || (Be = {}));
  class Dispatch {
    get source() {
      return this._source;
    }
    set source(e) {
      if (!e && this._source)
        return (
          this._source.removeEventListener("message", this.handle),
          void (this._source = void 0)
        );
      e.addEventListener("message", this.handle), (this._source = e);
    }
    apply(e, n) {
      if (!this.destination) throw new Error("No destination");
      const d = this._sequence++,
        p = new Promise((e, n) => {
          this._registry[d] = {
            resolve: e,
            reject: n,
          };
        });
      return (
        this.send(this.destination, {
          jsonrpc: "2.0",
          id: d,
          method: e,
          params: n,
        }),
        p
      );
    }
    call(e, ...n) {
      return this.apply(e, n);
    }
    handleRequest(e) {
      var n,
        d = this;
      return ((n = function* () {
        const n = {
            jsonrpc: "2.0",
            id: e.id,
          },
          p = d.methods[e.method];
        if (!p)
          return Object.assign(n, {
            error: {
              code: -32601,
              message: "Method not found",
            },
          });
        try {
          const d = yield p.apply(void 0, ensureArray(e.params));
          return Object.assign(n, {
            result: d,
          });
        } catch (V) {
          return Object.assign(n, {
            error: {
              code: V.code || -32603,
              message: V.message,
            },
          });
        }
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);

          function _next(e) {
            asyncGeneratorStep$18(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$18(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    handleResponse(e) {
      const n = this._registry[e.id];
      delete this._registry[e.id],
        n &&
          (e.error
            ? n.reject(Object.assign(Error(), e.error))
            : n.resolve(e.result));
    }
    send(e, n) {
      e.postMessage(n, e.window === e ? this.origin : void 0);
    }
    constructor(e = {}) {
      _define_property$1F(this, "destination", void 0),
        _define_property$1F(this, "origin", void 0),
        _define_property$1F(this, "methods", void 0),
        _define_property$1F(this, "_registry", {}),
        _define_property$1F(this, "_sequence", 0),
        _define_property$1F(this, "_source", void 0),
        _define_property$1F(this, "handle", (e) => {
          e.data &&
            "2.0" === e.data.jsonrpc &&
            (("*" !== this.origin && this.origin !== e.origin) ||
              (e.data.method && this.destination
                ? this.handleRequest(e.data).then((e) => {
                    this.send(this.destination, e);
                  })
                : (hasOwn(e.data, "result") || e.data.error) &&
                  this.handleResponse(e.data)));
        }),
        (this.destination = e.destination),
        (this.methods = e.methods || {}),
        (this.origin = e.origin || "*"),
        e.source && (this.source = e.source);
    }
  }

  function asyncGeneratorStep$17(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$17(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$17(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$17(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1E(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$K(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1E(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$s(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Fe;

  function validateToken(e) {
    if ("string" != typeof e) return true;
    const n = e.match(/[a-zA-Z0-9=\/+]{32,}==$/);
    var d;
    return null !== (d = n && n.length > 0) && void 0 !== d && d;
  }
  !(function (e) {
    (e[(e.UNAVAILABLE = -1)] = "UNAVAILABLE"),
      (e[(e.NOT_DETERMINED = 0)] = "NOT_DETERMINED"),
      (e[(e.DENIED = 1)] = "DENIED"),
      (e[(e.RESTRICTED = 2)] = "RESTRICTED"),
      (e[(e.AUTHORIZED = 3)] = "AUTHORIZED");
  })(Fe || (Fe = {}));
  const Ke = `https://${getCommerceHostname(
      "buy",
    )}/commerce/account/authenticateMusicKitRequest`,
    Ve = "https://authorize.music.apple.com",
    Ge = /^https?:\/\/(.+\.)*(apple\.com|apps\.mzstatic\.com)(\/[\w\d]+)*$/;
  var He, qe, We;
  !(function (e) {
    (e[(e.AUTHORIZE = 0)] = "AUTHORIZE"), (e[(e.SUBSCRIBE = 1)] = "SUBSCRIBE");
  })(He || (He = {}));
  class ServiceSetupView {
    get isServiceView() {
      return (
        /(authorize\.(.+\.)*apple\.com)/i.test(window.location.hostname) ||
        (window && window.name === this.target) ||
        true
      );
    }
    focus() {
      this._window && window.focus && this._window.focus();
    }
    load(
      e = {
        action: 0,
      },
    ) {
      var n = this;
      return _async_to_generator$17(function* () {
        return 1 === e.action
          ? n._subscribeAction(e.parameters)
          : n._authorizeAction(e.parameters);
      })();
    }
    present(e = "", n) {
      const {
          height: d,
          left: p,
          top: h,
          width: y,
        } = this._calculateClientDimensions(),
        _ = {
          height: 650,
          menubar: "no",
          resizable: "no",
          scrollbars: "no",
          status: "no",
          toolbar: "no",
          width: 650,
        },
        m = _object_spread$K(
          _object_spread_props$s(_object_spread$K({}, _), {
            left: y / 2 - _.width / 2 + p,
            top: d / 2 - _.height / 2 + h,
          }),
          n,
        ),
        g = Object.keys(m)
          .map((e) => `${e}=${m[e]}`)
          .join(",");
      return (
        /trident|msie/i.test(navigator.userAgent)
          ? ((this._window =
              window.open(window.location.href, this.target, g) || void 0),
            (this._window.location.href = e))
          : (this._window = window.open(e, this.target, g) || void 0),
        /\bedge\b/i.test(navigator.userAgent) && (this._window.opener = self),
        this.focus(),
        this._window
      );
    }
    _startPollingForWindowClosed(e) {
      this._window &&
        void 0 === this._windowClosedInterval &&
        (this._windowClosedInterval = setInterval(() => {
          var n;
          (null === (n = this._window) || void 0 === n ? void 0 : n.closed) &&
            (this._stopPollingForWindowClosed(), e());
        }, 500));
    }
    _stopPollingForWindowClosed() {
      void 0 !== this._windowClosedInterval &&
        (clearInterval(this._windowClosedInterval),
        (this._windowClosedInterval = void 0));
    }
    _authorizeAction(e = {}) {
      var n = this;
      return _async_to_generator$17(function* () {
        var d;
        let p, h;
        const y =
          (null === (d = window.location) || void 0 === d ? void 0 : d.href) ||
          "";
        return (
          "GET" === n.authenticateMethod
            ? (h = `${Ve}/woa?${buildQueryParams(
                _object_spread_props$s(
                  _object_spread$K({}, n.deeplinkParameters),
                  { a: btoa(n._thirdPartyInfo()), referrer: y },
                ),
              )}`)
            : ((p = n._buildFormElement(Ke)), document.body.appendChild(p)),
          new Promise((d, y) => {
            const _ = n.present(h);
            n._startPollingForWindowClosed(() => {
              y(0);
            }),
              (n.dispatch = new Dispatch({
                methods: {
                  authorize(e, n, p) {
                    validateToken(e)
                      ? d({
                          restricted: n && "1" === n,
                          userToken: e,
                          cid: p,
                        })
                      : y(0);
                  },
                  close() {},
                  decline() {
                    y(1);
                  },
                  switchUserId() {
                    y(0);
                  },
                  thirdPartyInfo: () =>
                    n._thirdPartyInfo(
                      n.developerToken,
                      _object_spread$K({}, n.deeplinkParameters, e),
                    ),
                  unavailable() {
                    y(-1);
                  },
                },
                origin: Ve,
                source: window,
                destination: _,
              })),
              p && p.submit();
          })
        );
      })();
    }
    _buildFormElement(e, n = this.target, d = this.developerToken) {
      const p = document.createElement("form");
      p.setAttribute("method", "post"),
        p.setAttribute("action", e),
        p.setAttribute("target", n),
        (p.style.display = "none");
      const h = document.createElement("input");
      h.setAttribute("name", "jwtToken"),
        h.setAttribute("value", d),
        p.appendChild(h);
      const y = document.createElement("input");
      y.setAttribute("name", "isWebPlayer"),
        y.setAttribute("value", "true"),
        p.appendChild(y);
      const _ = document.createElement("input");
      return (
        _.setAttribute("name", "LogoURL"),
        _.setAttribute("value", ""),
        p.appendChild(_),
        p
      );
    }
    _calculateClientDimensions(e = window) {
      return {
        height: e.innerHeight
          ? e.innerHeight
          : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height,
        left: e.screenLeft ? e.screenLeft : screen.availLeft || screen.left,
        top: e.screenTop ? e.screenTop : screen.availTop || screen.top,
        width: e.innerWidth
          ? e.innerWidth
          : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width,
      };
    }
    _subscribeAction(e = {}) {
      var n = this;
      return _async_to_generator$17(function* () {
        return (
          Object.assign(e, n.deeplinkParameters),
          new Promise((d, p) => {
            const h =
              "https://authorize.music.apple.com/upsell?" + buildQueryParams(e);
            n.present(h),
              window.addEventListener(
                "message",
                ({ data: e, origin: n, source: h }) => {
                  const { closeWindow: y, launchClient: _ } =
                    "string" == typeof e ? JSON.parse(e) : e;
                  (n && !Ge.test(n)) ||
                    (_
                      ? 0 === _.supported
                        ? p("Unable to subscribe on this platform.")
                        : d(_)
                      : p("Subscribe action error."));
                },
              );
          })
        );
      })();
    }
    _thirdPartyInfo(e = this.developerToken, n) {
      let d = this.iconURL;
      const p = window.location.host || document.referrer,
        h = [
          ...[].slice.call(
            document.querySelectorAll('link[rel="apple-music-app-icon"]'),
          ),
          ...[].slice.call(
            document.querySelectorAll(
              'link[rel="apple-touch-icon-precomposed"]',
            ),
          ),
          ...[].slice.call(
            document.querySelectorAll('link[rel="apple-touch-icon"]'),
          ),
        ];
      if (h && h[0] && h[0].href) {
        const e = h.find((e) => !!e.sizes && "120x120" === e.sizes.value);
        var y;
        d =
          null !== (y = null == e ? void 0 : e.href) && void 0 !== y
            ? y
            : h[0].href;
      }
      return JSON.stringify({
        thirdPartyIconURL: d,
        thirdPartyName: p,
        thirdPartyParameters: n,
        thirdPartyToken: e,
      });
    }
    constructor(e, n = {}) {
      if (
        (_define_property$1E(this, "developerToken", void 0),
        _define_property$1E(this, "authenticateMethod", void 0),
        _define_property$1E(this, "deeplinkParameters", void 0),
        _define_property$1E(this, "iconURL", void 0),
        _define_property$1E(this, "target", void 0),
        _define_property$1E(this, "dispatch", void 0),
        _define_property$1E(this, "_window", void 0),
        _define_property$1E(this, "_windowClosedInterval", void 0),
        (this.developerToken = e),
        (this.authenticateMethod = "GET"),
        (this.target = "apple-music-service-view"),
        (this.deeplinkParameters = (n && n.deeplinkParameters) || {}),
        (this.iconURL = n && n.iconURL),
        (this.authenticateMethod = (n && n.authenticateMethod) || "GET"),
        this.isServiceView && window.opener !== window)
      ) {
        var d;
        const e =
            null === (d = getSessionStorage()) || void 0 === d
              ? void 0
              : d.getItem("ac"),
          n = null != e ? new URL(e).origin : void 0;
        var p;
        if (n)
          this.dispatch = new Dispatch({
            destination:
              null !== (p = window.opener) && void 0 !== p ? p : void 0,
            origin: n,
            source: window,
          });
      }
    }
  }

  function asyncGeneratorStep$16(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$16(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$16(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$16(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1D(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _fetchStorefronts() {
    return (_fetchStorefronts = _async_to_generator$16(function* (
      e,
      n = "https://api.music.apple.com/v1",
    ) {
      const d = new Headers({
          Authorization: "Bearer " + e,
        }),
        p = yield fetch(n + "/storefronts", {
          headers: d,
        }),
        h = yield p.json();
      return h.errors ? Promise.reject(h.errors) : h.data;
    })).apply(this, arguments);
  }
  !(function (e) {
    (e.ID = "us"), (e.LANGUAGE_TAG = "en-gb");
  })(qe || (qe = {}));

  function asyncGeneratorStep$15(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$15(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$15(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$15(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1C(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$J(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1C(e, n, d[n]);
        });
    }
    return e;
  }

  function _ts_metadata$s(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e) {
    (e.authorizationStatusDidChange = "authorizationStatusDidChange"),
      (e.authorizationStatusWillChange = "authorizationStatusWillChange"),
      (e.eligibleForSubscribeView = "eligibleForSubscribeView"),
      (e.storefrontCountryCodeDidChange = "storefrontCountryCodeDidChange"),
      (e.storefrontIdentifierDidChange = "storefrontIdentifierDidChange"),
      (e.userTokenDidChange = "userTokenDidChange");
  })(We || (We = {})),
    je.DEFAULT_CID;
  const ze = "https://" + getCommerceHostname("buy"),
    Ye = `https://${getCommerceHostname("play")}/WebObjects/MZPlay.woa/wa`;
  BooleanDevFlag.get("mk-use-reflector-auth");
  class StoreKit extends Notifications {
    updateUserTokenFromStorage() {
      const e = this._getStorageItem(je.USER_TOKEN);
      this.userToken = e || void 0;
    }
    get authorizationStatus() {
      return this._authorizationStatus;
    }
    set authorizationStatus(e) {
      this._authorizationStatus !== e &&
        (this._getIsActiveSubscription.updateCache(void 0),
        this.dispatchEvent("authorizationStatusWillChange", {
          authorizationStatus: this._authorizationStatus,
          newAuthorizationStatus: e,
        }),
        (this._authorizationStatus = e),
        this.dispatchEvent("authorizationStatusDidChange", {
          authorizationStatus: e,
        }));
    }
    get cid() {
      if (!this._cids[this.cidNamespace]) {
        const e = this._getStorageItem(this.cidNamespace);
        this._cids[this.cidNamespace] = e || void 0;
      }
      return this._cids[this.cidNamespace];
    }
    set cid(e) {
      e
        ? this._setStorageItem(this.cidNamespace, e)
        : this._removeStorageItem(this.cidNamespace),
        (this._cids[this.cidNamespace] = e);
    }
    eligibleForSubscribeView() {
      var e = this;
      return _async_to_generator$15(function* () {
        const n = yield e.hasMusicSubscription();
        return (
          (!e.hasAuthorized || (e.hasAuthorized && !n)) &&
          !e._dispatchedSubscribeView
        );
      })();
    }
    get hasAuthorized() {
      return this.authorizationStatus > Fe.DENIED;
    }
    get logoutURL() {
      if (!this._disableLogoutURL) return this.playBase + "/webPlayerLogout";
    }
    get _pldfltcid() {
      return this._cids[je.DEFAULT_CID];
    }
    set _pldfltcid(e) {
      this._cids[je.DEFAULT_CID] = e;
    }
    get restrictedEnabled() {
      if (this.userToken && "boolean" != typeof this._restrictedEnabled) {
        const e = this._getStorageItem(je.RESTRICTIONS_ENABLED);
        if (e) this._restrictedEnabled = "0" !== e;
        else if (this._storefrontCountryCode) {
          const e = [
            "br",
            "ch",
            "gt",
            "hu",
            "id",
            "in",
            "it",
            "kr",
            "la",
            "lt",
            "my",
            "ru",
            "sg",
            "tr",
          ];
          this._restrictedEnabled =
            -1 !== e.indexOf(this._storefrontCountryCode) || void 0;
        }
      }
      return this._restrictedEnabled;
    }
    set restrictedEnabled(e) {
      this._restrictedEnabledOverridden ||
        (this.userToken &&
          void 0 !== e &&
          this._setStorageItem(je.RESTRICTIONS_ENABLED, e ? "1" : "0"),
        (this._restrictedEnabled = e),
        e && (this.authorizationStatus = Fe.RESTRICTED));
    }
    overrideRestrictEnabled(e) {
      (this._restrictedEnabledOverridden = true),
        (this.restrictedEnabled = e),
        (this._restrictedEnabledOverridden = true);
    }
    get storefrontCountryCode() {
      if (!this._storefrontCountryCode) {
        const e = this._getStorageItem(je.STOREFRONT_COUNTRY_CODE);
        this._storefrontCountryCode =
          (null == e ? void 0 : e.toLowerCase()) || qe.ID;
      }
      return this._storefrontCountryCode;
    }
    set storefrontCountryCode(e) {
      e && this.userToken
        ? this._setStorageItem(je.STOREFRONT_COUNTRY_CODE, e)
        : this._removeStorageItem(je.STOREFRONT_COUNTRY_CODE),
        e !== this._storefrontCountryCode &&
          ((this._storefrontCountryCode = e),
          this.dispatchEvent("storefrontCountryCodeDidChange", {
            storefrontCountryCode: e,
          }));
    }
    get storefrontIdentifier() {
      return this._storefrontIdentifier;
    }
    set storefrontIdentifier(e) {
      (this._storefrontIdentifier = e),
        this.dispatchEvent("storefrontIdentifierDidChange", {
          storefrontIdentifier: e,
        });
    }
    runTokenValidations(e, n = true) {
      e && validateToken(e)
        ? (n && this._setStorageItem(je.USER_TOKEN, e),
          (this.authorizationStatus = this.restrictedEnabled
            ? Fe.RESTRICTED
            : Fe.AUTHORIZED))
        : (this._removeStorageItem(je.USER_TOKEN),
          (this.authorizationStatus = Fe.NOT_DETERMINED));
    }
    wrapDynamicUserTokenForChanges(e, n = invoke(e)) {
      if ("function" != typeof e) return e;
      let d = n;
      return () => {
        const n = invoke(e);
        return (
          d !== n &&
            ((d = n),
            this.runTokenValidations(n, true),
            this.dispatchEvent("userTokenDidChange", {
              userToken: n,
            })),
          n || ""
        );
      };
    }
    get dynamicUserToken() {
      return this._dynamicUserToken;
    }
    set dynamicUserToken(e) {
      const n = invoke(e);
      (this._dynamicUserToken = this.wrapDynamicUserTokenForChanges(e, n)),
        this.runTokenValidations(n, "function" != typeof e),
        this.dispatchEvent("userTokenDidChange", {
          userToken: n,
        });
    }
    get userToken() {
      return invoke(this.dynamicUserToken);
    }
    set userToken(e) {
      this.dynamicUserToken = e;
    }
    get userTokenIsValid() {
      return validateToken(this.userToken);
    }
    deeplinkURL(e = {}) {
      return (
        "https://finance-app.itunes.apple.com/deeplink?" +
        buildQueryParams(
          (e = _object_spread$J({}, this.deeplinkParameters || {}, e)),
        )
      );
    }
    itunesDeeplinkURL(
      e = {
        p: "browse",
      },
    ) {
      return (
        "https://itunes.apple.com/deeplink?" +
        buildQueryParams(
          (e = _object_spread$J({}, this.deeplinkParameters || {}, e)),
        )
      );
    }
    pldfltcid() {
      var e = this;
      return _async_to_generator$15(function* () {
        if (!e._cids[je.DEFAULT_CID])
          try {
            yield e.infoRefresh();
          } catch (Vt) {
            return;
          }
        return e._cids[je.DEFAULT_CID];
      })();
    }
    renewUserToken() {
      var e = this;
      return _async_to_generator$15(function* () {
        if (!e.userToken) return e.requestUserToken();
        const n = new Headers({
            Authorization: "Bearer " + e.developerToken,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Apple-Music-User-Token": "" + e.userToken,
          }),
          d = yield e.fetch(e.playBase + "/renewMusicToken", {
            method: "POST",
            headers: n,
          });
        if (401 === d.status)
          return (
            yield e.revokeUserToken(), Promise.reject(new Error("Renew token"))
          );
        const p = yield d.json();
        return (
          p["music-token"] && (e.userToken = p["music-token"]), e.userToken
        );
      })();
    }
    requestStorefrontCountryCode() {
      var e = this;
      return _async_to_generator$15(function* () {
        if (e.authorizationStatus <= Fe.DENIED)
          return Promise.reject("Not authorized: " + e.authorizationStatus);
        const n = new Headers({
            Authorization: "Bearer " + e.developerToken,
            "Music-User-Token": e.userToken || "",
          }),
          d = yield e.fetch(e.apiBase + "/me/storefront", {
            headers: n,
          });
        if (d && !d.ok)
          return e._reset(), Promise.reject("Storefront Country Code error.");
        const p = yield d.json();
        if (p.errors) return Promise.reject(p.errors);
        const [h] = p.data;
        return h && h.id
          ? ((e.storefrontCountryCode = h.id), e.storefrontCountryCode)
          : Promise.reject("Storefront Country Code error.");
      })();
    }
    requestStorefrontIdentifier() {
      var e = this;
      return _async_to_generator$15(function* () {
        if (!e.storefrontIdentifier) {
          const n = yield class {
            static inferFromLanguages(
              e,
              n = (function () {
                if ("undefined" == typeof navigator) return [];
                if (navigator.languages) return navigator.languages;
                const e = navigator.language || navigator.userLanguage;
                return e ? [e] : [];
              })(),
            ) {
              return _async_to_generator$16(function* () {
                const d = yield (function (e) {
                    return _fetchStorefronts.apply(this, arguments);
                  })(e),
                  p = d.map((e) => e.id),
                  h = n[0] || "en-US",
                  [y, _] = h.toLowerCase().split(/-|_/),
                  m = p.includes(_) ? _ : "us";
                return d.find((e) => e.id === m);
              })();
            }
            constructor(e, n, d) {
              _define_property$1D(this, "id", void 0),
                _define_property$1D(this, "attributes", void 0),
                _define_property$1D(this, "href", void 0),
                _define_property$1D(this, "type", void 0),
                (this.id = e),
                (this.attributes = n),
                (this.type = "storefronts"),
                (this.href = d || `/v1/${this.type}/${e}`);
            }
          }.inferFromLanguages(e.developerToken);
          e.storefrontIdentifier = n.id;
        }
        return e.storefrontIdentifier;
      })();
    }
    requestUserToken() {
      var e = this;
      return _async_to_generator$15(function* () {
        if (e._serviceSetupView.isServiceView) return e.userToken || "";
        try {
          const n = yield e._serviceSetupView.load({
            action: He.AUTHORIZE,
          });
          (e.cid = n.cid),
            (e.userToken = n.userToken),
            (e.restrictedEnabled = n.restricted);
        } catch (n) {
          return e._reset(), (e.authorizationStatus = n), Promise.reject(n);
        }
        return e.userToken;
      })();
    }
    revokeUserToken() {
      var e = this;
      return _async_to_generator$15(function* () {
        var n;
        try {
          yield e._webPlayerLogout();
        } catch (Vt) {}
        null === (n = e.authBridgeApp) || void 0 === n || n.clearAuth(),
          e.dispatchEvent("authorizationStatusWillChange", {
            authorizationStatus: e.authorizationStatus,
            newAuthorizationStatus: Fe.NOT_DETERMINED,
          }),
          e._reset(),
          e.dispatchEvent("authorizationStatusDidChange", {
            authorizationStatus: e.authorizationStatus,
          }),
          e.dispatchEvent("userTokenDidChange", {
            userToken: e.userToken,
          });
      })();
    }
    setCids(e) {
      (this._cids = _object_spread$J({}, this._cids, e)),
        Object.keys(this._cids).forEach((e) => {
          this._setStorageItem(e, this._cids[e]);
        });
    }
    hasMusicSubscription() {
      var e = this;
      return _async_to_generator$15(function* () {
        return !!e.hasAuthorized && e._getIsActiveSubscription();
      })();
    }
    _getIsActiveSubscription() {
      var e = this;
      return _async_to_generator$15(function* () {
        var n;
        return !!(null === (n = (yield e.me()).subscription) || void 0 === n
          ? void 0
          : n.active);
      })();
    }
    resetSubscribeViewEligibility() {
      this._dispatchedSubscribeView = true;
    }
    presentSubscribeViewForEligibleUsers(e = {}, n = true) {
      var d = this;
      return _async_to_generator$15(function* () {
        const p = yield d.eligibleForSubscribeView();
        if (!d._serviceSetupView.isServiceView && p) {
          if (!n)
            return (
              d.dispatchEvent("eligibleForSubscribeView", e),
              void (d._dispatchedSubscribeView = true)
            );
          try {
            const e = yield d._serviceSetupView.load({
              action: He.SUBSCRIBE,
            });
            return (d._dispatchedSubscribeView = true), e;
          } catch (h) {
            return d.revokeUserToken();
          }
        }
      })();
    }
    infoRefresh() {
      var e = this;
      return _async_to_generator$15(function* () {
        if (e.authorizationStatus <= Fe.DENIED)
          return Promise.reject("Not authorized: " + e.authorizationStatus);
        const n = new Headers({
          Authorization: "Bearer " + e.developerToken,
          "Music-User-Token": e.userToken || "",
        });
        try {
          const d = yield e.fetch(
              e.iTunesBuyBase + "/account/web/infoRefresh",
              {
                credentials: "include",
                headers: n,
              },
            ),
            p = yield d.json();
          e.setCids(p);
        } catch (Vt) {}
      })();
    }
    me() {
      if (this.authorizationStatus <= Fe.DENIED)
        return Promise.reject("Not authorized: " + this.authorizationStatus);
      if (!this._me) {
        var n = this;
        this._me = new Promise(
          ((d = _async_to_generator$15(function* (d, p) {
            const h = new Headers({
                Authorization: "Bearer " + n.developerToken,
                "Music-User-Token": n.userToken || "",
              }),
              y = buildURL(
                n.apiBase,
                "/me/account",
                _object_spread$J(
                  {
                    meta: "subscription",
                  },
                  n.meParameters,
                ),
              );
            let _;
            try {
              _ = yield n.fetch(y, {
                headers: h,
              });
            } catch (Vt) {
              return p(
                new MKError(
                  MKError.Reason.NETWORK_ERROR,
                  "Failed to fetch /me/account",
                ),
              );
            }
            if (_ && !_.ok)
              return (
                n.realm !== e.SKRealm.TV && n._reset(), p("Account error.")
              );
            let m = yield _.json();
            if (m.errors) return p(m.errors);
            const { data: g, meta: b } = m;
            if (!b || !b.subscription) return p("Account error.");
            n.storefrontCountryCode = b.subscription.storefront;
            const P = {
              meta: b,
              subscription: b.subscription,
            };
            return g && g.length && (P.attributes = g[0].attributes), d(P);
          })),
          function (e, n) {
            return d.apply(this, arguments);
          }),
        )
          .then((e) => {
            var n;
            return (
              this._getIsActiveSubscription.updateCache(
                (null === (n = e.subscription) || void 0 === n
                  ? void 0
                  : n.active) || true,
              ),
              (this._me = null),
              e
            );
          })
          .catch((e) => ((this._me = null), Promise.reject(e)));
      }
      var d;
      return this._me;
    }
    _getStorageItem(e) {
      var n;
      if (e)
        return "cookie" === this.persist
          ? getCookie(e)
          : "localstorage" === this.persist
            ? null === (n = this.storage) || void 0 === n
              ? void 0
              : n.getItem(`${this.storagePrefix}.${e}`)
            : void 0;
    }
    _processLocationHash(e) {
      const n = /^\#([a-zA-Z0-9+\/]{200,}={0,2})$/;
      if (n.test(e)) {
        const d = e.replace(n, "$1");
        try {
          const { itre: e, musicUserToken: n, cid: p } = JSON.parse(atob(d));
          (this.restrictedEnabled = e && "1" === e),
            (this.userToken = n),
            (this.cid = p);
        } catch (Vt) {}
        history.replaceState(null, document.title, " ");
      }
    }
    _removeStorageItem(e) {
      if ("cookie" === this.persist) this._removeCookieFromDomains(e);
      else if ("localstorage" === this.persist) {
        var n;
        return null === (n = this.storage) || void 0 === n
          ? void 0
          : n.removeItem(`${this.storagePrefix}.${e}`);
      }
    }
    _removeCookieFromDomains(e, n = window) {
      Re.debug("Calling removeCookie", e), removeCookie(e);
      const { hostname: d } = n.location,
        p = d.split(".");
      if (p.length && (p.shift(), p.length > 2))
        for (let h = p.length; h > 2; h--) {
          const d = p.join(".");
          p.shift(),
            Re.debug("Calling removeCookie", e, n, d),
            removeCookie(e, n, d);
        }
    }
    _reset(e = Fe.NOT_DETERMINED) {
      (this._authorizationStatus = e),
        (this._cids = {}),
        (this._dispatchedSubscribeView = true),
        (this._restrictedEnabled = void 0),
        (this._storefrontCountryCode = void 0),
        this._getIsActiveSubscription.updateCache(void 0),
        Object.keys(Ue).forEach((e) => {
          this._removeStorageItem(Ue[e]);
        }),
        this._removeStorageItem(je.RESTRICTIONS_ENABLED),
        this._removeStorageItem(je.USER_TOKEN),
        this._removeStorageItem(je.STOREFRONT_COUNTRY_CODE),
        (this._dynamicUserToken = void 0),
        (this._me = null);
    }
    _setStorageItem(e, n) {
      if ("cookie" === this.persist) {
        var d;
        if (this.reflector) {
          if (this.reflector.skipJsCookieWrite(e)) return;
        } else
          null === (d = this.authBridgeApp) ||
            void 0 === d ||
            d.setCookieItem(e, n);
        return (
          Re.debug("Calling setCookie from _setStorageItem", e, n),
          setCookie(
            e,
            n,
            "/",
            180,
            void 0,
            determineBaseCookieDomain(window.location.hostname),
          )
        );
      }
      var p;
      if ("localstorage" === this.persist)
        return null === (p = this.storage) || void 0 === p
          ? void 0
          : p.setItem(`${this.storagePrefix}.${e}`, n);
    }
    _webPlayerLogout() {
      var e = this;
      return _async_to_generator$15(function* () {
        const n = e.logoutURL;
        if (!n) return;
        const d = new Headers({
            Authorization: "Bearer " + e.developerToken,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Apple-Music-User-Token": "" + e.userToken,
          }),
          p = yield e.fetch(n, {
            method: "POST",
            headers: d,
            credentials: "same-origin",
          });
        return p && !p.ok ? Promise.reject(p.status) : p.json();
      })();
    }
    constructor(n, d) {
      super([
        "authorizationStatusDidChange",
        "authorizationStatusWillChange",
        "eligibleForSubscribeView",
        "storefrontCountryCodeDidChange",
        "userTokenDidChange",
        "storefrontIdentifierDidChange",
      ]),
        _define_property$1C(this, "developerToken", void 0),
        _define_property$1C(this, "apiBase", void 0),
        _define_property$1C(this, "bundleId", void 0),
        _define_property$1C(this, "cidNamespace", void 0),
        _define_property$1C(this, "deeplinkParameters", void 0),
        _define_property$1C(this, "iconURL", void 0),
        _define_property$1C(this, "iTunesBuyBase", void 0),
        _define_property$1C(this, "meParameters", void 0),
        _define_property$1C(this, "persist", void 0),
        _define_property$1C(this, "playBase", void 0),
        _define_property$1C(this, "prefix", void 0),
        _define_property$1C(this, "realm", void 0),
        _define_property$1C(this, "storage", void 0),
        _define_property$1C(this, "storagePrefix", void 0),
        _define_property$1C(this, "whenAuthCompleted", void 0),
        _define_property$1C(this, "fetch", void 0),
        _define_property$1C(this, "_authorizationStatus", void 0),
        _define_property$1C(this, "_developerToken", void 0),
        _define_property$1C(this, "_disableLogoutURL", void 0),
        _define_property$1C(this, "_dispatchedSubscribeView", void 0),
        _define_property$1C(this, "_me", void 0),
        _define_property$1C(this, "_cids", void 0),
        _define_property$1C(this, "_restrictedEnabled", void 0),
        _define_property$1C(this, "_restrictedEnabledOverridden", void 0),
        _define_property$1C(this, "_serviceSetupView", void 0),
        _define_property$1C(this, "authBridgeApp", void 0),
        _define_property$1C(this, "reflector", void 0),
        _define_property$1C(this, "_storefrontCountryCode", void 0),
        _define_property$1C(this, "_storefrontIdentifier", void 0),
        _define_property$1C(this, "_dynamicUserToken", void 0),
        (this.developerToken = n),
        (this.apiBase = "https://api.music.apple.com/v1"),
        (this.iTunesBuyBase = ze),
        (this.meParameters = {}),
        (this.persist = "localstorage"),
        (this.playBase = Ye),
        (this.prefix = "music"),
        (this.realm = e.SKRealm.MUSIC),
        (this.storage = getLocalStorage()),
        (this._authorizationStatus = Fe.NOT_DETERMINED),
        (this._disableLogoutURL = true),
        (this._dispatchedSubscribeView = true),
        (this._me = null),
        (this._cids = {}),
        (this._restrictedEnabledOverridden = true),
        (this._dynamicUserToken = getCookie(je.USER_TOKEN)),
        Re.info("StoreKit initialized"),
        d &&
          (d.apiBase && (this.apiBase = d.apiBase),
          d.deeplink && (this.deeplinkParameters = d.deeplink),
          d.meParameters && (this.meParameters = d.meParameters),
          d.persist && (this.persist = d.persist),
          d.prefix && (this.prefix = d.prefix),
          void 0 !== d.realm && (this.realm = d.realm),
          (this.bundleId = Ne[this.realm])),
        (this.fetch =
          void 0 !== d && "function" == typeof d.fetch
            ? d.fetch
            : globalThis.fetch.bind(globalThis)),
        (this.cidNamespace = Ue[this.realm]),
        (this._developerToken = new DeveloperToken(n)),
        (this._serviceSetupView = new ServiceSetupView(n, {
          authenticateMethod: d && d.authenticateMethod,
          iconURL: d && d.iconURL,
          deeplinkParameters: this.deeplinkParameters,
        })),
        (this.storagePrefix =
          `${this.prefix}.${this._developerToken.teamId}`.toLocaleLowerCase()),
        this.updateUserTokenFromStorage(),
        this.developerToken &&
          this.userTokenIsValid &&
          (this._restrictedEnabled = this.restrictedEnabled),
        (this._storefrontCountryCode = this.storefrontCountryCode),
        (this.whenAuthCompleted = Promise.resolve()),
        isNodeEnvironment$1() ||
          (this._processLocationHash(window.location.hash),
          "cookie" === this.persist &&
            (this.reflector
              ? this.reflector.refresh()
              : (null == d ? void 0 : d.disableAuthBridge) ||
                (Re.debug("Using auth bridge"),
                (this.authBridgeApp = new AuthBridgeApp()),
                (this.authBridgeApp.authClearedFromOtherFrame =
                  this.revokeUserToken.bind(this)),
                (this.whenAuthCompleted =
                  this.authBridgeApp.whenAuthCompleted.then(() => {
                    this.updateUserTokenFromStorage();
                  })))));
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      (
        (e = 300) =>
        (n, d, p) => {
          if (void 0 === p || "function" != typeof p.value)
            throw new TypeError(
              `Only methods can be decorated with @CachedResult, but ${d} is not a method.`,
            );
          return {
            configurable: true,
            get() {
              const n = p.value,
                h = 1e3 * e;
              let y,
                _ = -1;

              function cachedResultMethod() {
                return _cachedResultMethod.apply(this, arguments);
              }

              function _cachedResultMethod() {
                return (_cachedResultMethod = _async_to_generator$19(function* (
                  ...e
                ) {
                  const d = Date.now();
                  return (
                    (void 0 === y || -1 === _ || (_ > 0 && d > _ + h)) &&
                      ((_ = d), (y = yield n.apply(this, e))),
                    y
                  );
                })).apply(this, arguments);
              }
              return (
                (cachedResultMethod.updateCache = function (e) {
                  (_ = Date.now()), (y = e);
                }),
                (cachedResultMethod.getCachedValue = () => y),
                Object.defineProperty(this, d, {
                  value: cachedResultMethod,
                  configurable: true,
                  writable: true,
                }),
                cachedResultMethod
              );
            },
          };
        }
      )(900),
      _ts_metadata$s("design:type", Function),
      _ts_metadata$s("design:paramtypes", []),
      _ts_metadata$s("design:returntype", Promise),
    ],
    StoreKit.prototype,
    "_getIsActiveSubscription",
    null,
  );
  const Qe = new Logger("player"),
    Xe = new Logger("paf"),
    Je = new Logger("services"),
    Ze = BooleanDevFlag.register("mk-console-logging"),
    et = StringDevFlag.register("mk-logging-levels"),
    tt = Se.ERROR;
  let rt = tt;
  const it = new Logger("mk", {
    level: rt,
    handlers: {
      console: new (class {
        get hasConsole() {
          return "undefined" != typeof console;
        }
        process(e) {
          if (!this.enabled || !this.hasConsole) return;
          let n = "log";
          if (this.mapLevels) {
            const d = this.levelMapping.get(e.level);
            (function (e) {
              return void 0 !== e && e in console;
            })(d) && (n = d);
          }
          var d;
          const p = null !== (d = e.args) && void 0 !== d ? d : [],
            h = this.format(e);
          console[n](h, ...p);
        }
        constructor(e = {}) {
          var n, d, p, h;
          _define_property$1I(this, "enabled", void 0),
            _define_property$1I(this, "mapLevels", void 0),
            _define_property$1I(this, "levelMapping", void 0),
            _define_property$1I(this, "format", void 0),
            (this.enabled = null === (n = e.enabled) || void 0 === n || n),
            (this.mapLevels = null === (d = e.mapLevels) || void 0 === d || d),
            (this.levelMapping =
              null !== (p = e.levelMapping) && void 0 !== p ? p : Oe),
            (this.format = null !== (h = e.formatter) && void 0 !== h ? h : Ie);
        }
      })({
        enabled: true,
      }),
      external: new CallbackHandler(() => {}),
    },
  });

  function applyLoggingLevels(e) {
    !(function (e, n) {
      walk(e, function (e) {
        let d;
        const p = e.namespace;
        e.clearLevel(),
          void 0 === e.parent && void 0 !== n["*"]
            ? (d = getLoggingLevel(n["*"]))
            : void 0 !== n[p] && (d = getLoggingLevel(n[p])),
          void 0 !== d && e.setLevel(d);
      });
    })(
      it,
      (function (e) {
        const n = getLoggingLevel(e.trim(), {
          allowShorthands: true,
        });
        if (void 0 !== n)
          return {
            "*": n,
          };
        const d = {},
          p = e.split(",").filter((e) => "" !== e.trim());
        for (const g of p) {
          var h, y;
          const e = g.split("=", 2);
          if (2 !== e.length) continue;
          var _;
          const n =
            null !==
              (_ = null === (h = e[0]) || void 0 === h ? void 0 : h.trim()) &&
            void 0 !== _
              ? _
              : "";
          var m;
          const p = getLoggingLevel(
            null !==
              (m = null === (y = e[1]) || void 0 === y ? void 0 : y.trim()) &&
              void 0 !== m
              ? m
              : "",
            {
              allowShorthands: true,
            },
          );
          "" !== n && void 0 !== p && (d[n] = p);
        }
        return d;
      })(e),
    );
  }

  function clearLoggingLevels() {
    it.setLevel(rt),
      (function (
        e,
        n = {
          includeRoot: true,
        },
      ) {
        walk(e, function (e) {
          (void 0 !== e.parent || n.includeRoot) && e.clearLevel();
        });
      })(it, {
        includeRoot: true,
      });
  }

  function setConsoleOutput(e) {
    it.handlers.console.enabled = null != e && e;
  }

  function setRootLoggingLevel(e) {
    var n;
    rt = null !== (n = getLoggingLevel(e)) && void 0 !== n ? n : rt;
  }
  const nt = {
    getLogger: (e = "*") => it.getByNamespace(null != e ? e : "*"),
    setConsoleOutput(e) {
      !0 === e
        ? (Ze.enable(),
          setConsoleOutput(true),
          it.info("Console output is enabled with level " + it.levelName))
        : (Ze.disable(), setConsoleOutput(true));
    },
    setLoggingLevels(e, n) {
      "" !== e.trim()
        ? (et.set(e),
          applyLoggingLevels(e),
          nt.setConsoleOutput(null == n || n))
        : nt.clearLoggingLevels(null != n && n);
    },
    clearLoggingLevels(e = true) {
      nt.setConsoleOutput(e), et.clear(), clearLoggingLevels();
    },
    listLoggers: (e) =>
      (function (e) {
        const n = {};
        void 0 !== e && (e = e.startsWith("mk/") ? e : "mk/" + e);
        const d = it.children;
        for (; d.length > 0; ) {
          const p = d.shift();
          if (void 0 === p) break;
          (void 0 === e || p.namespace.startsWith(e)) &&
            ((n[p.namespace] = p.levelName), d.unshift(...p.children));
        }
        return n;
      })(e),
  };
  var ot;
  Ze.enabled && nt.setConsoleOutput(Ze.enabled),
    void 0 !== et.value && nt.setLoggingLevels(et.value, Ze.enabled),
    (function (e) {
      (e.NONE = "none"),
        (e.FAIRPLAY = "com.apple.fps"),
        (e.PLAYREADY = "com.microsoft.playready"),
        (e.WIDEVINE = "com.widevine.alpha");
    })(ot || (ot = {}));
  const at = {
      app: {},
      features: {},
      urls: {},
    },
    st = "mk-player-tsid",
    ct = 'audio/mp4;codecs="mp4a.40.2"';
  var lt, dt, ut;

  function asyncGeneratorStep$14(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$14(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$14(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$14(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function findMediaKeySystemAccess(e, n) {
    return _findMediaKeySystemAccess.apply(this, arguments);
  }

  function _findMediaKeySystemAccess() {
    return (_findMediaKeySystemAccess = _async_to_generator$14(
      function* (e, n) {
        for (let d = 0; d < e.length; d++)
          try {
            const p = e[d];
            return [p, yield navigator.requestMediaKeySystemAccess(p, n)];
          } catch (Vt) {}
        return [];
      },
    )).apply(this, arguments);
  }
  !(function (e) {
    (e.playbackLicenseError = "playbackLicenseError"),
      (e.playbackSessionError = "playbackSessionError"),
      (e.manifestParsed = "manifestParsed"),
      (e.audioCodecIdentified = "audioCodecIdentified"),
      (e.audioTracksSwitched = "audioTracksSwitched"),
      (e.audioTracksUpdated = "audioTracksUpdated"),
      (e.textTracksSwitched = "textTracksSwitched"),
      (e.textTracksUpdated = "textTracksUpdated"),
      (e.inlineStylesParsed = "inlineStylesParsed"),
      (e.levelUpdated = "levelUpdated");
  })(lt || (lt = {})),
    (function (e) {
      (e.MP4 = "audio/mp4"), (e.AVC1 = "video/mp4");
    })(dt || (dt = {})),
    (function (e) {
      (e.WIDEVINE = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"),
        (e.PLAYREADY = "com.microsoft.playready"),
        (e.FAIRPLAY = "com.apple.streamingkeydelivery");
    })(ut || (ut = {}));
  let pt;
  const { NONE: ht, FAIRPLAY: yt, WIDEVINE: _t, PLAYREADY: ft } = ot;

  function supportsDrm() {
    if (!pt) throw new Error("findKeySystemPreference has not been invoked");
    return pt !== ht;
  }

  function potentialKeySystemsForAccess() {
    return (function () {
      const e = getSessionStorage();
      return !!e && "true" === e.getItem("mk-playready-cbcs-unsupported");
    })()
      ? [_t]
      : at.features["prefer-playready"]
        ? [ft, _t]
        : [_t, ft];
  }

  function findKeySystemPreference(e) {
    return _findKeySystemPreference.apply(this, arguments);
  }

  function _findKeySystemPreference() {
    return (_findKeySystemPreference = _async_to_generator$14(function* (e) {
      var n, d, p;
      if (
        null === (p = null == e ? void 0 : e.isNodeEnvironment) ||
        void 0 === p ||
        !p
      ) {
        if (
          null === (n = window.WebKitMediaKeys) || void 0 === n
            ? void 0
            : n.isTypeSupported(yt + ".1_0", dt.AVC1)
        )
          pt = yt;
        else if (
          null === (d = window.MSMediaKeys) || void 0 === d
            ? void 0
            : d.isTypeSupported(ft, dt.AVC1)
        )
          pt = ft;
        else {
          const e = document.createElement("video");
          if (
            hasMediaKeySupport() &&
            e.canPlayType('video/mp4;codecs="avc1.42E01E"') &&
            e.canPlayType(ct)
          ) {
            const e = [
                {
                  initDataTypes: ["keyids", "cenc"],
                  distinctiveIdentifier: "optional",
                  persistentState: "required",
                  videoCapabilities: [
                    {
                      contentType: 'video/mp4;codecs="avc1.42E01E"',
                      robustness: "SW_SECURE_CRYPTO",
                    },
                  ],
                  audioCapabilities: [
                    {
                      contentType: ct,
                    },
                  ],
                },
              ],
              n = potentialKeySystemsForAccess(),
              [d] = yield findMediaKeySystemAccess(n, e);
            pt = d;
          }
        }
        return (pt = null != pt ? pt : ht), pt;
      }
      pt = ht;
    })).apply(this, arguments);
  }

  function hasMediaKeySupport() {
    return !!(
      navigator &&
      navigator.requestMediaKeySystemAccess &&
      window.MediaKeys &&
      window.MediaKeySystemAccess
    );
  }
  const AsyncDebounce =
      (e = 100, n) =>
      (d, p, h) => {
        const y = h.value,
          _ = asyncDebounce(y, e, n);
        h.value = _;
      },
    asyncDebounce = (
      e,
      n = 250,
      d = {
        isImmediate: true,
      },
    ) => {
      let p, h;

      function fulfill(e) {
        return null == e ? void 0 : e.resolve(d.cancelledValue);
      }
      const clearLastPromise = () => {
          p &&
            (p.resolved ||
              (fulfill(p), p.timeoutId && clearTimeout(p.timeoutId)),
            (p = void 0));
        },
        invokeFn = (n, d, h, y) => {
          e.apply(n, y)
            .then((e) => {
              d(e), p && (p.resolved = true);
            })
            .catch(h);
        };
      return d.isImmediate
        ? function (...e) {
            const d = Date.now(),
              y = this;
            return (
              h && d >= h && clearLastPromise(),
              (h = Date.now() + n),
              p
                ? fulfill(Promise)
                : new Promise((n, d) => {
                    (p = {
                      resolve: n,
                      reject: d,
                    }),
                      invokeFn(y, n, d, e);
                  })
            );
          }
        : function (...e) {
            const d = this;
            return (
              p && clearLastPromise(),
              new Promise(function (h, y) {
                const _ = setTimeout(invokeFn.bind(void 0, d, h, y, e), n);
                p = {
                  resolve: h,
                  reject: y,
                  timeoutId: _,
                };
              })
            );
          };
    };

  function asyncGeneratorStep$13(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$13(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$13(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$13(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  const mt = {},
    SerialAsync = (e) => {
      let n = Promise.resolve();
      return (d, p, h) => {
        const y = h.value;
        return (
          (h.value = _async_to_generator$13(function* (...d) {
            return (
              e &&
                (n = ((e) => {
                  let n = mt[e];
                  return n || ((n = Promise.resolve()), (mt[e] = n)), n;
                })(e)),
              (n = n.catch(() => {}).then(() => y.apply(this, d))),
              e && (mt[e] = n),
              n
            );
          })),
          h
        );
      };
    };
  var vt, gt, bt;
  (e.PlaybackBitrate = void 0),
    ((vt = e.PlaybackBitrate || (e.PlaybackBitrate = {}))[(vt.STANDARD = 64)] =
      "STANDARD"),
    (vt[(vt.HIGH = 256)] = "HIGH"),
    (function (e) {
      (e.apiStorefrontChanged = "apiStorefrontChanged"),
        (e.hlsLevelUpdated = "hlsLevelUpdated"),
        (e.mediaContentComplete = "mediaContentComplete"),
        (e.playbackPause = "playbackPause"),
        (e.playbackPlay = "playbackPlay"),
        (e.playbackScrub = "playbackScrub"),
        (e.playbackSeek = "playbackSeek"),
        (e.playbackSkip = "playbackSkip"),
        (e.playbackStop = "playbackStop"),
        (e.lyricsPlay = "lyricsPlay"),
        (e.lyricsStop = "lyricsStop"),
        (e.playerActivate = "playerActivate"),
        (e.playerExit = "playerExit"),
        (e.queueModified = "queueModified"),
        (e.userActivityIntent = "userActivityIntent"),
        (e.applicationActivityIntent = "applicationActivityIntent"),
        (e.timedMetadata = "timedMetadata");
    })(gt || (gt = {})),
    (function (e) {
      (e[(e.ACCURATE = 0)] = "ACCURATE"), (e[(e.ROUND = 1)] = "ROUND");
    })(bt || (bt = {}));
  class TimingAccuracy {
    time(e = 0) {
      return 1 === this.mode ? Math.round(e) : e;
    }
    constructor(e = true) {
      !(function (e, n, d) {
        n in e
          ? Object.defineProperty(e, n, {
              value: d,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          : (e[n] = d);
      })(this, "mode", void 0),
        (this.mode = e ? 0 : 1);
    }
  }
  const Pt = {
    audioTrackAdded: "audioTrackAdded",
    audioTrackChanged: "audioTrackChanged",
    audioTrackRemoved: "audioTrackRemoved",
    bufferedProgressDidChange: "bufferedProgressDidChange",
    drmUnsupported: "drmUnsupported",
    forcedTextTrackChanged: "forcedTextTrackChanged",
    mediaCanPlay: "mediaCanPlay",
    mediaElementCreated: "mediaElementCreated",
    mediaPlaybackError: "mediaPlaybackError",
    nowPlayingItemDidChange: "nowPlayingItemDidChange",
    nowPlayingItemWillChange: "nowPlayingItemWillChange",
    metadataDidChange: "metadataDidChange",
    playbackBitrateDidChange: "playbackBitrateDidChange",
    playbackDurationDidChange: "playbackDurationDidChange",
    playbackProgressDidChange: "playbackProgressDidChange",
    playbackRateDidChange: "playbackRateDidChange",
    playbackStateDidChange: "playbackStateDidChange",
    playbackStateWillChange: "playbackStateWillChange",
    playbackTargetAvailableDidChange: "playbackTargetAvailableDidChange",
    playbackTargetIsWirelessDidChange: "playbackTargetIsWirelessDidChange",
    playbackTimeDidChange: "playbackTimeDidChange",
    playbackVolumeDidChange: "playbackVolumeDidChange",
    playerTypeDidChange: "playerTypeDidChange",
    presentationModeDidChange: "presentationModeDidChange",
    primaryPlayerDidChange: "primaryPlayerDidChange",
    textTrackAdded: "textTrackAdded",
    textTrackChanged: "textTrackChanged",
    textTrackRemoved: "textTrackRemoved",
    timedMetadataDidChange: "timedMetadataDidChange",
  };

  function _define_property$1A(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class BitrateCalculator {
    get bitrate() {
      return this._bitrate;
    }
    set bitrate(e) {
      this._bitrate !== e &&
        ((this._bitrate = e),
        this._dispatcher.publish(Pt.playbackBitrateDidChange, {
          bitrate: e,
        }));
    }
    _calculateAverageDownlink() {
      return 0 === this._downlinkSamples.length
        ? 0
        : this._downlinkSamples.reduce((e, n) => e + n, 0) /
            this._downlinkSamples.length || 0;
    }
    _recalculateBitrate(n) {
      Qe.debug("_recalculateBitrate", n), this._downlinkSamples.push(n);
      this._calculateAverageDownlink() > e.PlaybackBitrate.STANDARD
        ? (Qe.debug("setting bitrate to", e.PlaybackBitrate.HIGH),
          (this.bitrate = e.PlaybackBitrate.HIGH))
        : (Qe.debug("setting bitrate to", e.PlaybackBitrate.STANDARD),
          (this.bitrate = e.PlaybackBitrate.STANDARD));
    }
    constructor(n, d = e.PlaybackBitrate.STANDARD) {
      var p, h, y;
      _define_property$1A(this, "_bitrate", void 0),
        _define_property$1A(this, "_dispatcher", void 0),
        _define_property$1A(this, "_downlinkSamples", []),
        (this._bitrate = d),
        (this._dispatcher = n),
        void 0 !==
          (null === (y = window) ||
          void 0 === y ||
          null === (h = y.navigator) ||
          void 0 === h ||
          null === (p = h.connection) ||
          void 0 === p
            ? void 0
            : p.downlink) &&
          this._recalculateBitrate(
            100 * (window.navigator.connection.downlink || 0),
          );
    }
  }
  var St, Et, Tt, kt, wt, Ot, It;
  !(function (e) {
    (e.MUSICKIT = "music_kit-integration"),
      (e.OTHER = "other"),
      (e.MINI = "mini"),
      (e.SONG = "song"),
      (e.ALBUM = "album"),
      (e.ALBUM_CLASSICAL = "album-classical"),
      (e.ARTIST = "artist"),
      (e.COMPILATION = "compilation"),
      (e.COMPILATION_CLASSICAL = "compilation-classical"),
      (e.PLAYLIST = "playlist"),
      (e.PLAYLIST_CLASSICAL = "playlist-classical"),
      (e.RADIO = "radio"),
      (e.SEARCH = "search"),
      (e.STATION = "station");
  })(St || (St = {})),
    (function (e) {
      (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
        (e[(e.RADIO = 1)] = "RADIO"),
        (e[(e.PLAYLIST = 2)] = "PLAYLIST"),
        (e[(e.ALBUM = 3)] = "ALBUM"),
        (e[(e.ARTIST = 4)] = "ARTIST");
    })(Et || (Et = {})),
    (e.PlayActivityEndReasonType = void 0),
    ((Tt = e.PlayActivityEndReasonType || (e.PlayActivityEndReasonType = {}))[
      (Tt.NOT_APPLICABLE = 0)
    ] = "NOT_APPLICABLE"),
    (Tt[(Tt.OTHER = 1)] = "OTHER"),
    (Tt[(Tt.TRACK_SKIPPED_FORWARDS = 2)] = "TRACK_SKIPPED_FORWARDS"),
    (Tt[(Tt.PLAYBACK_MANUALLY_PAUSED = 3)] = "PLAYBACK_MANUALLY_PAUSED"),
    (Tt[(Tt.PLAYBACK_SUSPENDED = 4)] = "PLAYBACK_SUSPENDED"),
    (Tt[(Tt.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM = 5)] =
      "MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM"),
    (Tt[(Tt.PLAYBACK_PAUSED_DUE_TO_INACTIVITY = 6)] =
      "PLAYBACK_PAUSED_DUE_TO_INACTIVITY"),
    (Tt[(Tt.NATURAL_END_OF_TRACK = 7)] = "NATURAL_END_OF_TRACK"),
    (Tt[(Tt.PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT = 8)] =
      "PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT"),
    (Tt[(Tt.TRACK_BANNED = 9)] = "TRACK_BANNED"),
    (Tt[(Tt.FAILED_TO_LOAD = 10)] = "FAILED_TO_LOAD"),
    (Tt[(Tt.PAUSED_ON_TIMEOUT = 11)] = "PAUSED_ON_TIMEOUT"),
    (Tt[(Tt.SCRUB_BEGIN = 12)] = "SCRUB_BEGIN"),
    (Tt[(Tt.SCRUB_END = 13)] = "SCRUB_END"),
    (Tt[(Tt.TRACK_SKIPPED_BACKWARDS = 14)] = "TRACK_SKIPPED_BACKWARDS"),
    (Tt[(Tt.NOT_SUPPORTED_BY_CLIENT = 15)] = "NOT_SUPPORTED_BY_CLIENT"),
    (Tt[(Tt.QUICK_PLAY = 16)] = "QUICK_PLAY"),
    (Tt[(Tt.EXITED_APPLICATION = 17)] = "EXITED_APPLICATION"),
    (function (e) {
      (e[(e.Manual = 0)] = "Manual"),
        (e[(e.Interval = 1)] = "Interval"),
        (e[(e.SkipIntro = 2)] = "SkipIntro"),
        (e[(e.Automatic = 3)] = "Automatic"),
        (e[(e.SkipToLiveManual = 4)] = "SkipToLiveManual"),
        (e[(e.SkipToLiveAutomatic = 5)] = "SkipToLiveAutomatic");
    })(kt || (kt = {})),
    (function (e) {
      (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
        (e[(e.NO_RIGHTS = 1)] = "NO_RIGHTS"),
        (e[(e.PURCHASED = 2)] = "PURCHASED"),
        (e[(e.UPLOADED = 3)] = "UPLOADED"),
        (e[(e.MATCHED = 4)] = "MATCHED"),
        (e[(e.ADDED = 5)] = "ADDED"),
        (e[(e.SUBSCRIBED = 6)] = "SUBSCRIBED"),
        (e[(e.NOT_SUPPORTED = 7)] = "NOT_SUPPORTED");
    })(wt || (wt = {})),
    (function (e) {
      (e[(e.NO_SELECTION_PLAY = 0)] = "NO_SELECTION_PLAY"),
        (e[(e.RESUME_LAST_PLAYED_SONG = 1)] = "RESUME_LAST_PLAYED_SONG"),
        (e[(e.RESUME_CURRENT_DEVICE_POSITION = 2)] =
          "RESUME_CURRENT_DEVICE_POSITION");
    })(Ot || (Ot = {})),
    (function (e) {
      (e[(e.NOT_APPLICABLE = 0)] = "NOT_APPLICABLE"),
        (e[(e.SIMILARITIES = 1)] = "SIMILARITIES"),
        (e[(e.ESSENTIALS = 2)] = "ESSENTIALS"),
        (e[(e.USER_LIBRARY = 3)] = "USER_LIBRARY"),
        (e[(e.ALGO_HEATSEEKER = 4)] = "ALGO_HEATSEEKER"),
        (e[(e.SEED_TRACK = 5)] = "SEED_TRACK"),
        (e[(e.GN_1M_TEMPORARY = 6)] = "GN_1M_TEMPORARY"),
        (e[(e.VECTOR = 8)] = "VECTOR"),
        (e[(e.ARTIST_SIMILARITIES = 9)] = "ARTIST_SIMILARITIES"),
        (e[(e.STORY_ALBUM_LISTENERS_ALSO_BOUGHT = 10)] =
          "STORY_ALBUM_LISTENERS_ALSO_BOUGHT"),
        (e[(e.STORY_ALBUM_SALES_LEADER = 11)] = "STORY_ALBUM_SALES_LEADER"),
        (e[(e.STORY_BILLBOARD = 12)] = "STORY_BILLBOARD"),
        (e[(e.STORY_COMPLETE_MY_ALBUM = 13)] = "STORY_COMPLETE_MY_ALBUM"),
        (e[(e.STORY_CRITICAL_PICK = 14)] = "STORY_CRITICAL_PICK"),
        (e[(e.STORY_ITUNES_ESSENTIAL = 15)] = "STORY_ITUNES_ESSENTIAL"),
        (e[(e.STORY_HEATSEEKER = 16)] = "STORY_HEATSEEKER"),
        (e[(e.STORY_IDENTITY = 17)] = "STORY_IDENTITY"),
        (e[(e.STORY_POWER_SONG = 18)] = "STORY_POWER_SONG"),
        (e[(e.STORY_SONG_SALES_LEADER = 20)] = "STORY_SONG_SALES_LEADER"),
        (e[(e.GENRE_SIMILARITIES = 21)] = "GENRE_SIMILARITIES"),
        (e[(e.STORY_IMIX = 22)] = "STORY_IMIX"),
        (e[(e.STORY_OTHER_MIX = 23)] = "STORY_OTHER_MIX"),
        (e[(e.EDITORIAL = 24)] = "EDITORIAL"),
        (e[(e.TOP_SONGS = 25)] = "TOP_SONGS"),
        (e[(e.SUBFORMAT_SONGS = 26)] = "SUBFORMAT_SONGS"),
        (e[(e.CRITICAL_PICKS = 27)] = "CRITICAL_PICKS"),
        (e[(e.US_ARTIST_SIMS = 28)] = "US_ARTIST_SIMS"),
        (e[(e.HEAVY_ROTATION = 29)] = "HEAVY_ROTATION"),
        (e[(e.STORY_FORMAT_STATION_HEAVY_ROTATION = 30)] =
          "STORY_FORMAT_STATION_HEAVY_ROTATION"),
        (e[(e.ARTIST_BASED_CORE_SIMILAR_ARTISTS = 31)] =
          "ARTIST_BASED_CORE_SIMILAR_ARTISTS"),
        (e[(e.ARTIST_BASED_FAMILIAR_SIMILAR_ARTISTS = 32)] =
          "ARTIST_BASED_FAMILIAR_SIMILAR_ARTISTS"),
        (e[(e.ARTIST_BASED_DISCOVERIES = 33)] = "ARTIST_BASED_DISCOVERIES"),
        (e[(e.ARTIST_BASED_HOT_SONGS = 34)] = "ARTIST_BASED_HOT_SONGS"),
        (e[(e.ARTIST_BASED_SEED_ARTIST = 35)] = "ARTIST_BASED_SEED_ARTIST"),
        (e[(e.ARTIST_BASED_COMPOSER = 36)] = "ARTIST_BASED_COMPOSER"),
        (e[(e.EDITORIAL_STATION_INTRO = 37)] = "EDITORIAL_STATION_INTRO"),
        (e[(e.EDITORIAL_RELATIVE_REPEAT = 38)] = "EDITORIAL_RELATIVE_REPEAT"),
        (e[(e.EDITORIAL_ABSOLUTE_REPEAT = 39)] = "EDITORIAL_ABSOLUTE_REPEAT"),
        (e[(e.EDITORIAL_SCHEDULED = 40)] = "EDITORIAL_SCHEDULED"),
        (e[(e.EDITORIAL_SUGGESTED_ARTIST = 41)] = "EDITORIAL_SUGGESTED_ARTIST"),
        (e[(e.FOR_YOU_FAMILIAR = 42)] = "FOR_YOU_FAMILIAR"),
        (e[(e.FOR_YOU_RECOMMENDED = 43)] = "FOR_YOU_RECOMMENDED"),
        (e[(e.FOR_YOU_FAVORITE_ARTIST = 44)] = "FOR_YOU_FAVORITE_ARTIST"),
        (e[(e.FOR_YOU_RECOMMENDED_ARTIST = 45)] = "FOR_YOU_RECOMMENDED_ARTIST"),
        (e[(e.EDITORIAL_POSITIONAL = 46)] = "EDITORIAL_POSITIONAL"),
        (e[(e.SIMILAR_SONGS = 47)] = "SIMILAR_SONGS"),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST = 48)] =
          "SONG_ATTRIBUTE_FAVORITE_ARTIST"),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST_DERIVED = 49)] =
          "SONG_ATTRIBUTE_FAVORITE_ARTIST_DERIVED"),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST_EDITORIAL = 50)] =
          "SONG_ATTRIBUTE_FAVORITE_ARTIST_EDITORIAL"),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED = 51)] = "SONG_ATTRIBUTE_RECOMMENDED"),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED_DERIVED = 52)] =
          "SONG_ATTRIBUTE_RECOMMENDED_DERIVED"),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED_EDITORIAL = 53)] =
          "SONG_ATTRIBUTE_RECOMMENDED_EDITORIAL"),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED = 54)] =
          "SONG_ATTRIBUTE_NON_PERSONALIZED"),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED_DERIVED = 55)] =
          "SONG_ATTRIBUTE_NON_PERSONALIZED_DERIVED"),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED_EDITORIAL = 56)] =
          "SONG_ATTRIBUTE_NON_PERSONALIZED_EDITORIAL"),
        (e[(e.PERSONAL_STATION = 57)] = "PERSONAL_STATION"),
        (e[(e.PERSONAL_STATION_FAVORITE_ARTIST = 58)] =
          "PERSONAL_STATION_FAVORITE_ARTIST"),
        (e[(e.PERSONAL_STATION_RECOMMENDED = 59)] =
          "PERSONAL_STATION_RECOMMENDED"),
        (e[(e.NEW_MUSIC_STATION = 60)] = "NEW_MUSIC_STATION"),
        (e[(e.NEW_MUSIC_STATION_FAVORITE_ARTIST = 61)] =
          "NEW_MUSIC_STATION_FAVORITE_ARTIST"),
        (e[(e.NEW_MUSIC_STATION_RECOMMENDED = 62)] =
          "NEW_MUSIC_STATION_RECOMMENDED");
    })(It || (It = {}));
  var At, Rt, $t, Ct, Mt, Dt, xt, jt, Lt, Nt, Ut, Bt, Ft, Kt;

  function t(e, n) {
    var d = "function" == typeof Symbol && e[Symbol.iterator];
    if (!d) return e;
    var p,
      h,
      y = d.call(e),
      _ = [];
    try {
      for (; (void 0 === n || n-- > 0) && !(p = y.next()).done; )
        _.push(p.value);
    } catch (e) {
      h = {
        error: e,
      };
    } finally {
      try {
        p && !p.done && (d = y.return) && d.call(y);
      } finally {
        if (h) throw h.error;
      }
    }
    return _;
  }
  !(function (e) {
    (e[(e.UNKNOWN_FORMAT = 0)] = "UNKNOWN_FORMAT"),
      (e[(e.STEREO = 1)] = "STEREO"),
      (e[(e.SPATIAL = 2)] = "SPATIAL"),
      (e[(e.PREFERENCE_FORMAT_UNSUPPORTED = 3)] =
        "PREFERENCE_FORMAT_UNSUPPORTED");
  })(At || (At = {})),
    (function (e) {
      (e[(e.UNKNOWN_QUALITY = 0)] = "UNKNOWN_QUALITY"),
        (e[(e.HIGH_EFFICIENCY = 1)] = "HIGH_EFFICIENCY"),
        (e[(e.HIGH_QUALITY = 2)] = "HIGH_QUALITY"),
        (e[(e.LOSSLESS = 3)] = "LOSSLESS"),
        (e[(e.HIGH_RESOLUTION_LOSSLESS = 4)] = "HIGH_RESOLUTION_LOSSLESS"),
        (e[(e.PREFERENCE_QUALITY_UNSUPPORTED = 5)] =
          "PREFERENCE_QUALITY_UNSUPPORTED");
    })(Rt || (Rt = {})),
    (function (e) {
      (e[(e.UNSPECIFIED = 0)] = "UNSPECIFIED"),
        (e[(e.STATIC = 1)] = "STATIC"),
        (e[(e.LINE_BY_LINE = 2)] = "LINE_BY_LINE"),
        (e[(e.WORD_BY_WORD = 3)] = "WORD_BY_WORD");
    })($t || ($t = {})),
    (function (e) {
      (e[(e.REPEAT_UNKNOWN = 0)] = "REPEAT_UNKNOWN"),
        (e[(e.REPEAT_OFF = 1)] = "REPEAT_OFF"),
        (e[(e.REPEAT_ONE = 2)] = "REPEAT_ONE"),
        (e[(e.REPEAT_ALL = 3)] = "REPEAT_ALL");
    })(Ct || (Ct = {})),
    (function (e) {
      (e[(e.SHUFFLE_UNKNOWN = 0)] = "SHUFFLE_UNKNOWN"),
        (e[(e.SHUFFLE_OFF = 1)] = "SHUFFLE_OFF"),
        (e[(e.SHUFFLE_ON = 2)] = "SHUFFLE_ON");
    })(Mt || (Mt = {})),
    (function (e) {
      (e[(e.AUTO_UNKNOWN = 0)] = "AUTO_UNKNOWN"),
        (e[(e.AUTO_OFF = 1)] = "AUTO_OFF"),
        (e[(e.AUTO_ON = 2)] = "AUTO_ON"),
        (e[(e.AUTO_ON_CONTENT_UNSUPPORTED = 3)] =
          "AUTO_ON_CONTENT_UNSUPPORTED");
    })(Dt || (Dt = {})),
    (function (e) {
      (e[(e.NOT_SPECIFIED = 0)] = "NOT_SPECIFIED"),
        (e[(e.CONTAINER_CHANGED = 1)] = "CONTAINER_CHANGED");
    })(xt || (xt = {})),
    (function (e) {
      (e[(e.PLAY_END = 0)] = "PLAY_END"),
        (e[(e.PLAY_START = 1)] = "PLAY_START"),
        (e[(e.LYRIC_DISPLAY = 2)] = "LYRIC_DISPLAY");
    })(jt || (jt = {})),
    (function (e) {
      (e[(e.INVALID = 0)] = "INVALID"),
        (e[(e.ITUNES_STORE_CONTENT = 1)] = "ITUNES_STORE_CONTENT"),
        (e[(e.NON_SONG_CLIP = 2)] = "NON_SONG_CLIP"),
        (e[(e.AD = 3)] = "AD"),
        (e[(e.STREAM = 4)] = "STREAM"),
        (e[(e.AUDIO_AD = 5)] = "AUDIO_AD"),
        (e[(e.VIDEO_AD = 6)] = "VIDEO_AD"),
        (e[(e.TIMED_METADATA_PING = 7)] = "TIMED_METADATA_PING"),
        (e[(e.ARTIST_UPLOADED_CONTENT = 8)] = "ARTIST_UPLOADED_CONTENT"),
        (e[(e.AGGREGATE_NON_CATALOG_PLAY_TIME = 9)] =
          "AGGREGATE_NON_CATALOG_PLAY_TIME"),
        (e[(e.ORIGINAL_CONTENT_MOVIES = 10)] = "ORIGINAL_CONTENT_MOVIES"),
        (e[(e.ORIGINAL_CONTENT_SHOWS = 11)] = "ORIGINAL_CONTENT_SHOWS");
    })(Lt || (Lt = {})),
    (function (e) {
      (e[(e.AUDIO = 0)] = "AUDIO"), (e[(e.VIDEO = 1)] = "VIDEO");
    })(Nt || (Nt = {})),
    (function (e) {
      (e[(e.AUTO = 0)] = "AUTO"), (e[(e.MANUAL = 1)] = "MANUAL");
    })(Ut || (Ut = {})),
    (function (e) {
      (e[(e.ORIGINATING_DEVICE = 0)] = "ORIGINATING_DEVICE"),
        (e[(e.PAIRED_WATCH = 1)] = "PAIRED_WATCH"),
        (e[(e.SONOS = 2)] = "SONOS"),
        (e[(e.CAR_PLAY = 3)] = "CAR_PLAY"),
        (e[(e.WEB_AUC = 4)] = "WEB_AUC"),
        (e[(e.TWITTER_AUC = 5)] = "TWITTER_AUC"),
        (e[(e.MUSIC_SDK = 6)] = "MUSIC_SDK"),
        (e[(e.ATV_REMOTE = 7)] = "ATV_REMOTE"),
        (e[(e.WEBPLAYER = 8)] = "WEBPLAYER"),
        (e[(e.WHOLE_HOUSE_AUDIO = 9)] = "WHOLE_HOUSE_AUDIO"),
        (e[(e.MUSICKIT = 10)] = "MUSICKIT"),
        (e[(e.VW = 11)] = "VW"),
        (e[(e.UNKNOWN_SOURCE_TYPE = 12)] = "UNKNOWN_SOURCE_TYPE"),
        (e[(e.AMAZON = 13)] = "AMAZON"),
        (e[(e.PORSCHE = 14)] = "PORSCHE"),
        (e[(e.CHROMECAST = 15)] = "CHROMECAST"),
        (e[(e.WEB_APP = 16)] = "WEB_APP"),
        (e[(e.MERCEDES_BENZ = 17)] = "MERCEDES_BENZ"),
        (e[(e.THIRD_PARTY_TV = 18)] = "THIRD_PARTY_TV"),
        (e[(e.SEAT = 19)] = "SEAT"),
        (e[(e.CUPRA = 20)] = "CUPRA");
    })(Bt || (Bt = {})),
    (function (e) {
      (e[(e.EPISODE = 1)] = "EPISODE"), (e[(e.SHOUTCAST = 2)] = "SHOUTCAST");
    })(Ft || (Ft = {})),
    (function (e) {
      (e[(e.NotStarted = 0)] = "NotStarted"),
        (e[(e.Running = 1)] = "Running"),
        (e[(e.Stopped = 2)] = "Stopped");
    })(Kt || (Kt = {}));
  var Vt = {
    type: "xstate.init",
  };

  function r(e) {
    return void 0 === e ? [] : [].concat(e);
  }

  function o(e) {
    return {
      type: "xstate.assign",
      assignment: e,
    };
  }

  function i(e, n) {
    return "string" == typeof (e = "string" == typeof e && n && n[e] ? n[e] : e)
      ? {
          type: e,
        }
      : "function" == typeof e
        ? {
            type: e.name,
            exec: e,
          }
        : e;
  }

  function a(e) {
    return function (n) {
      return e === n;
    };
  }

  function u(e) {
    return "string" == typeof e
      ? {
          type: e,
        }
      : e;
  }

  function c(e, n) {
    return {
      value: e,
      context: n,
      actions: [],
      changed: true,
      matches: a(e),
    };
  }

  function f(e, n, d) {
    var p = n,
      h = true;
    return [
      e.filter(function (e) {
        if ("xstate.assign" === e.type) {
          h = true;
          var n = Object.assign({}, p);
          return (
            "function" == typeof e.assignment
              ? (n = e.assignment(p, d))
              : Object.keys(e.assignment).forEach(function (h) {
                  n[h] =
                    "function" == typeof e.assignment[h]
                      ? e.assignment[h](p, d)
                      : e.assignment[h];
                }),
            (p = n),
            true
          );
        }
        return true;
      }),
      p,
      h,
    ];
  }

  function s(e, n) {
    void 0 === n && (n = {});
    var d = t(
        f(
          r(e.states[e.initial].entry).map(function (e) {
            return i(e, n.actions);
          }),
          e.context,
          Vt,
        ),
        2,
      ),
      p = d[0],
      h = d[1],
      y = {
        config: e,
        _options: n,
        initialState: {
          value: e.initial,
          actions: p,
          context: h,
          matches: a(e.initial),
        },
        transition: function (n, d) {
          var p,
            h,
            _ =
              "string" == typeof n
                ? {
                    value: n,
                    context: e.context,
                  }
                : n,
            m = _.value,
            g = _.context,
            b = u(d),
            P = e.states[m];
          if (P.on) {
            var S = r(P.on[b.type]);
            try {
              for (
                var E = (function (e) {
                    var n = "function" == typeof Symbol && Symbol.iterator,
                      d = n && e[n],
                      p = 0;
                    if (d) return d.call(e);
                    if (e && "number" == typeof e.length)
                      return {
                        next: function () {
                          return (
                            e && p >= e.length && (e = void 0),
                            {
                              value: e && e[p++],
                              done: !e,
                            }
                          );
                        },
                      };
                    throw new TypeError(
                      n
                        ? "Object is not iterable."
                        : "Symbol.iterator is not defined.",
                    );
                  })(S),
                  T = E.next();
                !T.done;
                T = E.next()
              ) {
                var k = T.value;
                if (void 0 === k) return c(m, g);
                var w =
                    "string" == typeof k
                      ? {
                          target: k,
                        }
                      : k,
                  O = w.target,
                  I = w.actions,
                  A = void 0 === I ? [] : I,
                  R = w.cond,
                  $ =
                    void 0 === R
                      ? function () {
                          return true;
                        }
                      : R,
                  C = void 0 === O,
                  M = null != O ? O : m,
                  D = e.states[M];
                if ($(g, b)) {
                  var x = t(
                      f(
                        (C
                          ? r(A)
                          : [].concat(P.exit, A, D.entry).filter(function (e) {
                              return e;
                            })
                        ).map(function (e) {
                          return i(e, y._options.actions);
                        }),
                        g,
                        b,
                      ),
                      3,
                    ),
                    j = x[0],
                    L = x[1],
                    N = x[2],
                    U = null != O ? O : m;
                  return {
                    value: U,
                    context: L,
                    actions: j,
                    changed: O !== m || j.length > 0 || N,
                    matches: a(U),
                  };
                }
              }
            } catch (t) {
              p = {
                error: t,
              };
            } finally {
              try {
                T && !T.done && (h = E.return) && h.call(E);
              } finally {
                if (p) throw p.error;
              }
            }
          }
          return c(m, g);
        },
      };
    return y;
  }
  var l = function (e, n) {
    return e.actions.forEach(function (d) {
      var p = d.exec;
      return p && p(e.context, n);
    });
  };

  function v(e) {
    var n = e.initialState,
      d = Kt.NotStarted,
      p = new Set(),
      h = {
        _machine: e,
        send: function (h) {
          d === Kt.Running &&
            ((n = e.transition(n, h)),
            l(n, u(h)),
            p.forEach(function (e) {
              return e(n);
            }));
        },
        subscribe: function (e) {
          return (
            p.add(e),
            e(n),
            {
              unsubscribe: function () {
                return p.delete(e);
              },
            }
          );
        },
        start: function (p) {
          if (p) {
            var y =
              "object" == typeof p
                ? p
                : {
                    context: e.config.context,
                    value: p,
                  };
            n = {
              value: y.value,
              actions: [],
              context: y.context,
              matches: a(y.value),
            };
          }
          return (d = Kt.Running), l(n, Vt), h;
        },
        stop: function () {
          return (d = Kt.Stopped), p.clear(), h;
        },
        get state() {
          return n;
        },
        get status() {
          return d;
        },
      };
    return h;
  }
  const Gt = /(?:st|ra)\.([0-9]+)/,
    Ht = /st\.([0-9]+)/;

  function asyncGeneratorStep$12(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1z(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$I(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1z(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$r(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _object_without_properties$3(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  const toTimeMeasuredData = (e) => {
    var { timestamp: n } = e;
    return _object_spread_props$r(
      _object_spread$I({}, _object_without_properties$3(e, ["timestamp"])),
      {
        "milliseconds-since-play": Date.now() - n,
      },
    );
  };
  class PlayActivitySender {
    get accessToken() {
      return invoke(this._accessToken);
    }
    get musicUserToken() {
      return invoke(this._musicUserToken);
    }
    get url() {
      return this._isQA
        ? "https://universal-activity-service.itunes.apple.com/qa/play"
        : "https://universal-activity-service.itunes.apple.com/play";
    }
    send(e) {
      var n,
        d = this;
      return ((n = function* () {
        const n = {
          client_id: d._clientId,
          event_type: d._eventType,
          data: ensureArray(e).map(toTimeMeasuredData),
        };
        if (0 === n.data.length)
          throw new Error("send() called without any data");
        const p = d._generateFetchOptions({
          method: "POST",
          body: JSON.stringify(n),
          headers: d.headers(),
        });
        return (
          yield d._fetch(d.url, p),
          d._logInfo &&
            console.info(
              "play activity:",
              d._sourceType === Bt.AMAZON ? JSON.stringify(n) : n,
            ),
          n
        );
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);

          function _next(e) {
            asyncGeneratorStep$12(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$12(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    baseHeaders() {
      var e, n;
      const d =
        null !==
          (n =
            null === (e = this._fetchOptions) || void 0 === e
              ? void 0
              : e.headers) && void 0 !== n
          ? n
          : {};
      return d instanceof this._headersClass
        ? new this._headersClass(Array.from(d.entries()))
        : new this._headersClass(d);
    }
    headers() {
      const e = this._preferDSID ? "X-Dsid" : "media-user-token",
        n = this.baseHeaders();
      return (
        n.set("Authorization", "Bearer " + this.accessToken),
        n.set("Content-Type", "application/json"),
        n.set(e, "" + this.musicUserToken),
        this._isQA &&
          void 0 !== this._traceTag &&
          n.set("Data-Trace-Tag", this._traceTag),
        n
      );
    }
    _generateFetchOptions(e) {
      return _object_spread$I({}, this._fetchOptions, e);
    }
    constructor(e) {
      var n, d, p, h;
      _define_property$1z(this, "mode", Ut.AUTO),
        _define_property$1z(this, "_accessToken", void 0),
        _define_property$1z(this, "_musicUserToken", void 0),
        _define_property$1z(this, "_clientId", void 0),
        _define_property$1z(this, "_eventType", void 0),
        _define_property$1z(this, "_fetch", void 0),
        _define_property$1z(this, "_fetchOptions", void 0),
        _define_property$1z(this, "_headersClass", void 0),
        _define_property$1z(this, "_isQA", true),
        _define_property$1z(this, "_logInfo", true),
        _define_property$1z(this, "_preferDSID", true),
        _define_property$1z(this, "_sourceType", void 0),
        _define_property$1z(this, "_traceTag", void 0),
        (this._accessToken = e.accessToken),
        (this._clientId = e.clientId),
        (this._eventType = e.eventType),
        (this._fetch = null !== (n = e.fetch) && void 0 !== n ? n : fetch),
        (this._fetchOptions =
          null !== (d = e.fetchOptions) && void 0 !== d ? d : {}),
        (this._headersClass =
          null !== (p = e.headersClass) && void 0 !== p ? p : Headers),
        (this._isQA = null !== (h = e.isQA) && void 0 !== h && h),
        (this._logInfo = e.logInfo || this._isQA),
        (this._musicUserToken = e.musicUserToken),
        (this._preferDSID = e.preferDSID),
        (this._sourceType = e.sourceType),
        (this._traceTag = e.traceTag);
    }
  }
  const fullAppId = (e, n) => {
      if (void 0 === (null == n ? void 0 : n.name)) return "MusicKitApp/1.0";
      if (void 0 !== e) return e;
      return `${(function (e) {
        return e
          .toLowerCase()
          .replace(/[-_]+/g, " ")
          .replace(/[^\w\s]/g, "")
          .replace(/\b./g, (e) => e.toUpperCase())
          .replace(/\s/g, "");
      })(n.name)}/${(null == n ? void 0 : n.version) || "1.0"}`;
    },
    os = (e) => {
      var n, d;
      const p = e.toLowerCase();
      let h,
        y = "Unidentified OS";
      const _ = /mobile/.test(p);
      var m;
      _ && /android|adr/.test(p)
        ? ((y = "Android"), (h = p.match(/(?:android|adr)\ ((\d+[._])+\d+)/)))
        : _ && /iphone|ipad|ipod/.test(p)
          ? ((y = "iOS"),
            (h = p.match(/os\ ((\d+[._])+\d+)\ like\ mac\ os\ x/)))
          : /tizen/.test(p)
            ? ((y = "Tizen"), (h = p.match(/tizen (.*)/)))
            : /web0s|webos/.test(p)
              ? ((y = "WebOS"), (h = p.match(/[web0s|webos] (.*)/)))
              : !_ && /cros/.test(p)
                ? (y = "ChromeOS")
                : !_ && /macintosh/.test(p)
                  ? ((y = "macOS"), (h = p.match(/os\ x\ ((\d+[._])+\d+)\b/)))
                  : !_ && /linux/.test(p)
                    ? (y = "Linux")
                    : !_ &&
                      /windows/.test(p) &&
                      ((y = "Windows"), (h = p.match(/windows ([^\)]*)/)));
      return `${y}/${
        null !==
          (m =
            null == h ||
            null === (d = h[1]) ||
            void 0 === d ||
            null === (n = d.replace) ||
            void 0 === n
              ? void 0
              : n.call(d, /_/g, ".")) && void 0 !== m
          ? m
          : "0.0"
      }`;
    },
    model = (e) =>
      "model/" + ((null == e ? void 0 : e.platform) || "Unavailable"),
    build = (e) => {
      const n = null == e ? void 0 : e.build;
      return void 0 === n || "" === n ? "build/0.0.0" : "build/" + n;
    };

  function asyncGeneratorStep$11(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$H(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1y(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$q(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const qt = {
    platform: "",
    userAgent: "",
  };
  class PlayActivityBase {
    get accessToken() {
      return invoke(this._accessToken);
    }
    get appID() {
      return (
        void 0 === this._appId &&
          (this._appId = fullAppId(this._appId, this._appInfo)),
        this._appId
      );
    }
    get deviceName() {
      return this._deviceName;
    }
    get musicUserToken() {
      return invoke(this._musicUserToken);
    }
    get navigator() {
      var e;
      return null !== (e = this._navigator) && void 0 !== e
        ? e
        : "undefined" == typeof navigator
          ? qt
          : navigator;
    }
    get storefrontId() {
      return invoke(this._storefrontId);
    }
    get userAgent() {
      var e;
      return null !== (e = this._userAgent) && void 0 !== e
        ? e
        : this.navigator.userAgent;
    }
    get userIsSubscribed() {
      return invoke(this._userIsSubscribed);
    }
    get allowReportingId() {
      return invoke(this._allowReportingId);
    }
    get utcOffsetInSeconds() {
      if (
        void 0 === this._utcOffsetInSeconds &&
        void 0 !== this._utcOffset &&
        !isNaN(this._utcOffset)
      ) {
        const e = 60 * this._utcOffset;
        this._utcOffsetInSeconds = e <= 0 ? Math.abs(e) : -e;
      }
      return void 0 === this._utcOffsetInSeconds ||
        isNaN(this._utcOffsetInSeconds)
        ? -1
        : this._utcOffsetInSeconds;
    }
    send(e) {
      var n,
        d = this;
      return ((n = function* () {
        return d.sender.send(e);
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);

          function _next(e) {
            asyncGeneratorStep$11(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$11(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    buildDescriptorForPlayParams(e, n, d, p, h) {
      const y = "stream" === e.format ? Lt.STREAM : Lt.ITUNES_STORE_CONTENT;
      return _object_spread$H(
        _object_spread_props$q(_object_spread$H({}, e), {
          container: d,
          duration: null != p ? p : 0,
          eventType: n,
          itemType: y,
        }),
        h,
      );
    }
    buildForPlayParams(e, n, d, p = 0, h = {}, y = true) {
      return this.build(this.buildDescriptorForPlayParams(e, n, d, p, h), y);
    }
    constructor(e, n, d, p) {
      var h, y, _, m;
      (_define_property$1y(this, "_accessToken", void 0),
      _define_property$1y(this, "_musicUserToken", void 0),
      _define_property$1y(this, "_storefrontId", void 0),
      _define_property$1y(this, "privateEnabled", void 0),
      _define_property$1y(this, "siriInitiated", void 0),
      _define_property$1y(this, "buildVersion", void 0),
      _define_property$1y(this, "clientId", void 0),
      _define_property$1y(this, "eventType", void 0),
      _define_property$1y(this, "guid", void 0),
      _define_property$1y(this, "internalBuild", void 0),
      _define_property$1y(this, "metricsClientId", void 0),
      _define_property$1y(this, "preferDSID", void 0),
      _define_property$1y(this, "sender", void 0),
      _define_property$1y(this, "sourceType", void 0),
      _define_property$1y(this, "_appId", void 0),
      _define_property$1y(this, "_appInfo", void 0),
      _define_property$1y(this, "_deviceName", void 0),
      _define_property$1y(this, "_navigator", void 0),
      _define_property$1y(this, "_utcOffset", void 0),
      _define_property$1y(this, "_utcOffsetInSeconds", void 0),
      _define_property$1y(this, "_userAgent", void 0),
      _define_property$1y(this, "_userIsSubscribed", void 0),
      _define_property$1y(this, "_allowReportingId", void 0),
      (this._accessToken = e),
      (this._musicUserToken = n),
      (this._storefrontId = d),
      (this.privateEnabled = true),
      (this.siriInitiated = true),
      (this.clientId = "JSCLIENT"),
      (this.eventType = "JSPLAY"),
      (this.internalBuild = true),
      (this.preferDSID = true),
      (this.sourceType = Bt.MUSICKIT),
      (this._utcOffset = new Date().getTimezoneOffset()),
      (this._userIsSubscribed = true),
      (this._allowReportingId = true),
      p) &&
        ((this._appInfo = p.app),
        (this._navigator = p.navigator),
        (this._userAgent = p.userAgent),
        hasOwn(p, "utcOffset") && isNaN(p.utcOffset)
          ? (this._utcOffsetInSeconds = -1)
          : hasOwn(p, "utcOffset") && (this._utcOffset = p.utcOffset),
        (this.clientId = p.clientId || "JSCLIENT"),
        (this._deviceName = p.deviceName),
        (this.guid = p.guid),
        (this.metricsClientId = p.metricsClientId),
        (this.preferDSID = null !== (y = p.preferDSID) && void 0 !== y && y),
        (this.sourceType =
          void 0 !== p.sourceType && "number" == typeof p.sourceType
            ? p.sourceType
            : Bt.MUSICKIT),
        (this._userIsSubscribed =
          null === (_ = p.userIsSubscribed) || void 0 === _ || _),
        (this._allowReportingId =
          null !== (m = p.allowReportingId) && void 0 !== m && m));
      (this.buildVersion = ((e, n, d, p) =>
        [fullAppId(e, n), os(p), model(d), build(n)].join(" "))(
        this._appId,
        this._appInfo,
        this.navigator,
        this.userAgent,
      )),
        (this.sender = new PlayActivitySender({
          accessToken: this._accessToken,
          clientId: this.clientId,
          eventType: this.eventType,
          fetch: null == p ? void 0 : p.fetch,
          fetchOptions: null == p ? void 0 : p.fetchOptions,
          headersClass:
            null == p || null === (h = p.fetch) || void 0 === h
              ? void 0
              : h.Headers,
          isQA: null == p ? void 0 : p.isQA,
          logInfo: null == p ? void 0 : p.logInfo,
          musicUserToken: this._musicUserToken,
          preferDSID: this.preferDSID,
          sourceType: this.sourceType,
          traceTag: null == p ? void 0 : p.traceTag,
        }));
    }
  }
  const Wt = new Map([
    ["play", jt.PLAY_START],
    ["playbackstarted", jt.PLAY_START],
    ["stop", jt.PLAY_END],
    ["playbackstopped", jt.PLAY_END],
  ]);

  function mapEventTypeString(e) {
    return "number" == typeof e
      ? e
      : null !== (n = Wt.get(e)) && void 0 !== n
        ? n
        : jt.PLAY_END;
  }
  const zt = new Map([
    ["exit", e.PlayActivityEndReasonType.EXITED_APPLICATION],
    ["next", e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS],
    ["pause", e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED],
    ["playbackfinished", e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK],
    ["playbackstopped", e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED],
    ["previous", e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS],
    ["scrub_begin", e.PlayActivityEndReasonType.SCRUB_BEGIN],
    ["scrub_end", e.PlayActivityEndReasonType.SCRUB_END],
    ["stop", e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK],
  ]);

  function normalizePlayActivityDescriptor(e) {
    const n = deepClone(e),
      d = (function (e) {
        var n;
        const d =
          null !== (n = e.eventType) && void 0 !== n ? n : jt.PLAY_START;
        if ("number" == typeof d)
          return {
            eventType: d,
          };
        return {
          eventTypeString: d,
          eventType: mapEventTypeString(d),
        };
      })(e);
    return (
      (n.eventType = d.eventType),
      (n.eventTypeString = d.eventTypeString),
      void 0 === n.endReasonType &&
        void 0 !== d.eventTypeString &&
        (n.endReasonType = (function (e) {
          if (void 0 !== e) return zt.get(e);
        })(d.eventTypeString)),
      !1 !== n.reporting && (n.reporting = true),
      n
    );
  }

  function _define_property$1x(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$p(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const createHelper = (e, n) => (d, p, h) => {
    const { helpers: y } = h.cache;
    return e in y || (y[e] = n(d, p, h)), y[e];
  };
  const returnAsField =
      (e, n) =>
      (...d) =>
        (function (e, n) {
          if (void 0 !== n)
            return {
              [e]: n,
            };
        })(e, n(...d)),
    createFieldFn = (e, n) => {
      const normalizeReturnValue = (n) =>
        null == n
          ? void 0
          : {
              [e]: n,
            };
      return (d, p, h) => {
        const { fields: y } = h.cache;
        return (
          e in y ||
            (h.cache.fields = _object_spread_props$p(
              (function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var d = null != arguments[n] ? arguments[n] : {},
                    p = Object.keys(d);
                  "function" == typeof Object.getOwnPropertySymbols &&
                    (p = p.concat(
                      Object.getOwnPropertySymbols(d).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(d, e).enumerable;
                      }),
                    )),
                    p.forEach(function (n) {
                      _define_property$1x(e, n, d[n]);
                    });
                }
                return e;
              })({}, y),
              {
                [e]: normalizeReturnValue(n(d, p, h)),
              },
            )),
          h.cache.fields[e]
        );
      };
    },
    createClientFieldFn = (e, n) =>
      createFieldFn(e, (e, d, { client: p }) => p[n]),
    Yt = createFieldFn("event-type", (e, n, d) => {
      return void 0 === e.eventType
        ? jt.PLAY_START
        : e.itemType === Lt.TIMED_METADATA_PING && void 0 !== e.timedMetadata
          ? jt.PLAY_END
          : null !== (p = e.eventType) && void 0 !== p
            ? p
            : jt.PLAY_START;
    }),
    Qt = createHelper("should-include-audio-quality", (e, n, d) => {
      var p, h;
      const y = e.userPreference;
      return (
        Yt(e, n, d)["event-type"] === jt.PLAY_END &&
        void 0 !==
          (null === (p = e.audioQuality) || void 0 === p
            ? void 0
            : p.provided) &&
        void 0 !==
          (null === (h = e.audioQuality) || void 0 === h
            ? void 0
            : h.targeted) &&
        void 0 !== (null == y ? void 0 : y.audioQuality) &&
        void 0 !== (null == y ? void 0 : y.playbackFormat)
      );
    }),
    Xt = createFieldFn("audio-quality-provided", (e, n, d) => {
      if (!Qt(e, n, d)) return;
      const p = e.audioQuality;
      if (void 0 === (null == p ? void 0 : p.provided)) return;
      const { provided: h } = p;
      var y, _, m;
      return {
        "audio-sample-rate-in-hz":
          null !== (y = h.audioSampleRateHz) && void 0 !== y ? y : 0,
        "audio-bit-depth":
          null !== (_ = h.audioBitDepth) && void 0 !== _ ? _ : 0,
        "bit-rate-in-bps": null !== (m = h.bitRateBps) && void 0 !== m ? m : 0,
        codec: h.codec,
        "audio-channel-type": h.audioChannelType,
        "playback-format": h.playbackFormat,
      };
    }),
    Jt = createFieldFn("audio-quality-targeted", (e, n, d) => {
      if (!Qt(e, n, d)) return;
      const p = e.audioQuality;
      if (void 0 === (null == p ? void 0 : p.targeted)) return;
      const { targeted: h } = p;
      var y, _, m;
      return {
        "audio-sample-rate-in-hz":
          null !== (y = h.audioSampleRateHz) && void 0 !== y ? y : 0,
        "audio-bit-depth":
          null !== (_ = h.audioBitDepth) && void 0 !== _ ? _ : 0,
        "bit-rate-in-bps": null !== (m = h.bitRateBps) && void 0 !== m ? m : 0,
        codec: h.codec,
        "audio-channel-type": h.audioChannelType,
        "playback-format": h.playbackFormat,
      };
    }),
    Zt = createClientFieldFn("build-version", "buildVersion"),
    er = [
      "uploadedVideo",
      "uploadedAudio",
      "uploaded-videos",
      "uploaded-audios",
    ],
    tr = createHelper(
      "is-auc",
      ({ kind: e }) => void 0 !== e && er.includes(e),
    ),
    rr = createHelper(
      "should-send-timed-metadata",
      ({ endReasonType: n, eventType: d, itemType: p, timedMetadata: h }) =>
        void 0 !== h &&
        (p === Lt.TIMED_METADATA_PING ||
          d === jt.PLAY_START ||
          n === e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED),
    ),
    ir = createFieldFn("type", (e, n, d) => {
      const { id: p, reporting: h } = e;
      var y;
      if ("-1" === p || !h)
        switch (
          null === (y = Yt(e, n, d)) || void 0 === y ? void 0 : y["event-type"]
        ) {
          case jt.PLAY_END:
            return Lt.AGGREGATE_NON_CATALOG_PLAY_TIME;
          case jt.PLAY_START:
            if ("-1" === p) return Lt.INVALID;
        }
      const { format: _, kind: m, itemType: g } = e;
      return "musicMovie" === m
        ? Lt.ORIGINAL_CONTENT_MOVIES
        : rr(e, n, d)
          ? g === Lt.TIMED_METADATA_PING
            ? g
            : Lt.STREAM
          : "stream" === _
            ? Lt.STREAM
            : tr(e, n, d)
              ? Lt.ARTIST_UPLOADED_CONTENT
              : null != g
                ? g
                : Lt.ITUNES_STORE_CONTENT;
    }),
    nr = createFieldFn("container-type", (e, n, d) => {
      var p;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const { container: h } = e;
      if (void 0 === h) return Et.UNKNOWN;
      var y;
      const _ = null !== (y = h.type) && void 0 !== y ? y : h.kind;
      if ("number" == typeof _) return _;
      switch (_) {
        case "album":
        case "albums":
        case "library-albums":
          return Et.ALBUM;
        case "artist":
        case "artists":
        case "library-artists":
          return Et.ARTIST;
        case "playlist":
        case "playlists":
        case "library-playlists":
          return Et.PLAYLIST;
        case "radio":
        case "radioStation":
        case "station":
        case "stations":
          return Et.RADIO;
        default:
          return Et.UNKNOWN;
      }
    });

  function _define_property$1w(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const or = [
      returnAsField("album-adam-id", (e, n, d) => {
        var p;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.ALBUM
        )
          return;
        const { container: h } = e,
          y = null == h ? void 0 : h.id;
        return void 0 === y || T(y) ? void 0 : y;
      }),
      returnAsField("cloud-album-id", (e, n, d) => {
        var p;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.ALBUM
        )
          return;
        const { container: h } = e,
          y = null == h ? void 0 : h.id;
        return void 0 !== y && T(y) ? y : void 0;
      }),
      returnAsField("global-playlist-id", (e, n, d) => {
        var p;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.PLAYLIST
        )
          return;
        const { container: h } = e;
        var y;
        const _ =
          null !== (y = null == h ? void 0 : h.catalogId) && void 0 !== y
            ? y
            : null == h
              ? void 0
              : h.globalId;
        return (null == h ? void 0 : h.isLibrary) && _
          ? _
          : T(null == h ? void 0 : h.id) || null == h
            ? void 0
            : h.id;
      }),
      returnAsField("playlist-version-hash", (e, n, d) => {
        var p;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.PLAYLIST
        )
          return;
        const { container: h } = e,
          y = null == h ? void 0 : h.versionHash;
        return void 0 !== y && "" !== y ? y : void 0;
      }),
      returnAsField("station-hash", (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.RADIO
        )
          return;
        const y =
          null === (h = e.container) || void 0 === h ? void 0 : h.stationHash;
        return void 0 !== y && "" !== y ? y : void 0;
      }),
      returnAsField("station-id", (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) === Et.RADIO
        )
          return null === (h = e.container) || void 0 === h ? void 0 : h.id;
      }),
      returnAsField("station-personalized-id", (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.RADIO
        )
          return;
        const y = null === (h = e.container) || void 0 === h ? void 0 : h.id;
        return void 0 !== y && Ht.test(y)
          ? parseInt(y.replace(Ht, "$1"), 10)
          : void 0;
      }),
      returnAsField("universal-library-id", (e, n, d) => {
        var p;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p["container-type"]) !== Et.PLAYLIST
        )
          return;
        const { container: h } = e;
        var y;
        const _ =
            null !== (y = null == h ? void 0 : h.catalogId) && void 0 !== y
              ? y
              : null == h
                ? void 0
                : h.globalId,
          m = null == h ? void 0 : h.id;
        if (void 0 !== m)
          if ((null == h ? void 0 : h.isLibrary) && _) {
            if ("" !== m) return m;
          } else if (T(m)) return m;
      }),
    ],
    ar = createFieldFn("container-ids", (e, n, d) => {
      var p;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const h = or.reduce(
        (p, h) =>
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              "function" == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$1w(e, n, d[n]);
                });
            }
            return e;
          })({}, p, h(e, n, d)),
        Object.create(null),
      );
      return isEmpty(h) ? void 0 : h;
    }),
    sr = createClientFieldFn("developer-token", "accessToken"),
    cr = createClientFieldFn("device-name", "deviceName"),
    lr = createFieldFn("display-type", (e, n, d) => {
      var p, h;
      if (
        (null === (p = Yt(e, n, d)) || void 0 === p
          ? void 0
          : p["event-type"]) === jt.LYRIC_DISPLAY
      )
        return null === (h = e.lyricDescriptor) || void 0 === h
          ? void 0
          : h.displayType;
    }),
    dr = createHelper(
      "initial-start-position-in-milliseconds",
      ({ position: e = 0, startPositionInMilliseconds: n }) =>
        n || Math.round(1e3 * e),
    ),
    ur = createFieldFn("end-position-in-milliseconds", (e, n, d) => {
      var p;
      switch (
        null === (p = Yt(e, n, d)) || void 0 === p ? void 0 : p["event-type"]
      ) {
        case jt.LYRIC_DISPLAY:
          var h;
          if (
            void 0 ===
            (null === (h = e.lyricDescriptor) || void 0 === h
              ? void 0
              : h.duration)
          )
            return;
          return Math.round(e.lyricDescriptor.duration);
        case jt.PLAY_START:
          return;
        default:
          if (n && void 0 === n.position) return;
          return e.endPositionInMilliseconds || dr(e, n, d);
      }
    }),
    pr = createHelper(
      "is-private",
      ({ id: e, reporting: n }) => "-1" === e || !n,
    ),
    hr = createFieldFn("end-reason-type", (n, d, p) => {
      var h;
      if (!d || void 0 !== (null == d ? void 0 : d.position))
        return ((null === (h = ir(n, d, p)) || void 0 === h
          ? void 0
          : h.type) === Lt.TIMED_METADATA_PING &&
          void 0 !== n.timedMetadata) ||
          (pr(n, d, p) && n.eventType === jt.PLAY_END)
          ? e.PlayActivityEndReasonType.NOT_APPLICABLE
          : n.endReasonType;
    }),
    { CONTAINER_CHANGED: yr, NOT_SPECIFIED: _r } = xt,
    fr = createFieldFn("event-reason-hint-type", (e, n, d) => {
      var p, h;
      if (
        (null === (p = Yt(e, n, d)) || void 0 === p
          ? void 0
          : p["event-type"]) !== jt.PLAY_START
      )
        return;
      const y = e.container;
      return void 0 === y
        ? _r
        : !1 === n
          ? d.isAlexa
            ? _r
            : yr
          : (null == n || null === (h = n.container) || void 0 === h
                ? void 0
                : h.id) !== y.id
            ? yr
            : _r;
    }),
    mr = createFieldFn("feature-name", (e, n, d) => {
      var p, h, y;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      return (
        "" +
        (null !==
          (y = null === (h = e.container) || void 0 === h ? void 0 : h.name) &&
        void 0 !== y
          ? y
          : St.MUSICKIT)
      );
    }),
    vr = createClientFieldFn("guid", "guid"),
    gr = createHelper("should-have-auc-adam-id", tr),
    br = createHelper(
      "should-have-radio-adam-id",
      ({ id: e, container: n }) =>
        Gt.test(e) || "radioStation" === (null == n ? void 0 : n.kind),
    ),
    Pr = createHelper(
      "is-library-item-or-library-type",
      ({ id: e, isLibrary: n }, d, p) => n || T(e),
    ),
    Sr = createHelper("catalog-id", ({ catalogId: e, container: n }) =>
      null != e ? e : null == n ? void 0 : n.catalogId,
    ),
    Er = createHelper(
      "is-library-item-with-catalog-id",
      (e, n, d) => e.isLibrary && !!Sr(e, n, d),
    );

  function _define_property$1v(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const Tr = [
      returnAsField("auc-adam-id", (e, n, d) => {
        if (!pr(e, n, d) && !br(e, n, d)) return gr(e, n, d) ? e.id : void 0;
      }),
      returnAsField("cloud-id", (e, n, d) => {
        var p;
        const { id: h } = e,
          y = void 0 !== h && "" !== h;
        return pr(e, n, d) &&
          (null === (p = Yt(e, n, d)) || void 0 === p
            ? void 0
            : p["event-type"]) === jt.PLAY_START &&
          y &&
          "-1" !== h
          ? h
          : br(e, n, d) || gr(e, n, d)
            ? e.cloudId
            : (Er(e, n, d) && y) || Pr(e, n, d)
              ? h
              : e.cloudId;
      }),
      returnAsField("lyric-id", (e, n, d) => {
        var p, h;
        if (
          (null === (p = Yt(e, n, d)) || void 0 === p
            ? void 0
            : p["event-type"]) === jt.LYRIC_DISPLAY
        )
          return null === (h = e.lyricDescriptor) || void 0 === h
            ? void 0
            : h.id;
      }),
      returnAsField("purchased-adam-id", (e, n, d) => e.purchasedId),
      returnAsField("reporting-adam-id", (e, n, d) => {
        if (!0 !== d.client.allowReportingId) return;
        var p;
        return (
          (null !== (p = Yt(e, n, d)) && void 0 !== p ? p : {})["event-type"],
          Pr(e, n, d) ? e.reportingId : void 0
        );
      }),
      returnAsField("radio-adam-id", (e, n, d) => {
        if (pr(e, n, d)) return;
        const { container: p, id: h } = e;
        return Gt.test(h) || "radioStation" === (null == p ? void 0 : p.kind)
          ? parseInt(("" + h).replace(Gt, "$1"), 10)
          : void 0;
      }),
      returnAsField("subscription-adam-id", (e, n, d) => {
        if (!(pr(e, n, d) || br(e, n, d) || gr(e, n, d))) {
          if (Er(e, n, d)) return Sr(e, n, d);
          if (!Pr(e, n, d)) return e.id;
        }
      }),
    ],
    kr = createFieldFn("ids", (e, n, d) => {
      var p;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const h = Tr.reduce(
        (p, h) =>
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              "function" == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$1v(e, n, d[n]);
                });
            }
            return e;
          })({}, p, h(e, n, d)),
        Object.create(null),
      );
      return isEmpty(h) ? void 0 : h;
    }),
    wr = createClientFieldFn("internal-build", "internalBuild"),
    Or = createFieldFn("is-collaborative", (e, n, d) => {
      var p;
      return (
        !0 ===
          (null === (p = e.container) || void 0 === p
            ? void 0
            : p.isCollaborative) || void 0
      );
    }),
    Ir = createFieldFn("lyric-language", (e, n, d) => {
      var p, h;
      if (
        (null === (p = Yt(e, n, d)) || void 0 === p
          ? void 0
          : p["event-type"]) === jt.LYRIC_DISPLAY
      )
        return null === (h = e.lyricDescriptor) || void 0 === h
          ? void 0
          : h.language;
    }),
    Ar = createHelper(
      "has-episode-streaming-kind",
      ({ streamingKind: e }, n, d) => e === Ft.EPISODE,
    ),
    Rr = createHelper("is-stream", (e, n, d) => {
      var p;
      return (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Lt.STREAM
      );
    }),
    $r = createHelper(
      "is-live-stream",
      (e, n, d) => Rr(e, n, d) && !Ar(e, n, d),
    ),
    Cr = createFieldFn("media-duration-in-milliseconds", (e, n, d) => {
      var p;
      const h =
        null === (p = Yt(e, n, d)) || void 0 === p ? void 0 : p["event-type"];
      if (h === jt.LYRIC_DISPLAY) return 0;
      if ($r(e, n, d)) return 0;
      const y = Math.round(1e3 * e.duration);
      if (h === jt.PLAY_START) return y;
      var _, m;
      const g =
        null !== (m = e.startPositionInMilliseconds) && void 0 !== m
          ? m
          : Math.round(
              1e3 * (null !== (_ = e.position) && void 0 !== _ ? _ : 0),
            );
      return g > 1e3 * e.duration ? g : y;
    }),
    { AUDIO: Mr, VIDEO: Dr } = Nt,
    xr = createFieldFn("media-type", (e, n, d) => {
      var p;
      if (
        (null === (p = Yt(e, n, d)) || void 0 === p
          ? void 0
          : p["event-type"]) === jt.LYRIC_DISPLAY
      )
        return Mr;
      const { kind: h, mediaType: y } = e;
      if ("number" == typeof y) return y;
      const _ = "string" == typeof y ? y : h;
      return _ && /video|movie/i.test(_) ? Dr : Mr;
    }),
    jr = createClientFieldFn("metrics-client-id", "metricsClientId"),
    Lr = createFieldFn("offline", () => true),
    Nr = createFieldFn("persistent-id", () => generateUUID()),
    Ur = createFieldFn("play-mode", (e, n, d) => {
      var p, h, y, _, m;
      if (
        (null === (p = Yt(e, n, d)) || void 0 === p
          ? void 0
          : p["event-type"]) === jt.LYRIC_DISPLAY ||
        (null === (h = ir(e, n, d)) || void 0 === h ? void 0 : h.type) ===
          Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return {
          "auto-play-mode":
            null !== (y = Ur.autoplayMode) && void 0 !== y ? y : 0,
          "repeat-play-mode":
            null !== (_ = Ur.repeatPlayMode) && void 0 !== _ ? _ : 0,
          "shuffle-play-mode":
            null !== (m = Ur.shufflePlayMode) && void 0 !== m ? m : 0,
        };
      const g = invoke(e.playMode);
      var b, P, S;
      return void 0 !== g
        ? {
            "auto-play-mode":
              null !== (b = g.autoplayMode) && void 0 !== b ? b : 0,
            "repeat-play-mode":
              null !== (P = g.repeatPlayMode) && void 0 !== P ? P : 0,
            "shuffle-play-mode":
              null !== (S = g.shufflePlayMode) && void 0 !== S ? S : 0,
          }
        : void 0;
    }),
    Br = createClientFieldFn("private-enabled", "privateEnabled"),
    Fr = createFieldFn("reco-data", (e, n, d) => {
      var p, h;
      if (
        (null === (p = Yt(e, n, d)) || void 0 === p
          ? void 0
          : p["event-type"]) !== jt.LYRIC_DISPLAY &&
        (null === (h = ir(e, n, d)) || void 0 === h ? void 0 : h.type) !==
          Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return e.recoData;
    }),
    Kr = createClientFieldFn("sb-enabled", "userIsSubscribed"),
    Vr = createClientFieldFn("siri-initiated", "siriInitiated"),
    Gr = createClientFieldFn("source-type", "sourceType"),
    Hr = createFieldFn("start-position-in-milliseconds", (e, n, d) => {
      var p, h;
      const y =
        null === (p = Yt(e, n, d)) || void 0 === p ? void 0 : p["event-type"];
      return y === jt.LYRIC_DISPLAY ||
        (null === (h = ir(e, n, d)) || void 0 === h ? void 0 : h.type) ===
          Lt.AGGREGATE_NON_CATALOG_PLAY_TIME ||
        $r(e, n, d)
        ? 0
        : y === jt.PLAY_START
          ? dr(e, n, d)
          : null !==
                (m =
                  null !== (_ = e.startPositionInMilliseconds) && void 0 !== _
                    ? _
                    : previousPosition(n)) && void 0 !== m
            ? m
            : 0;
    }),
    previousPosition = (e) =>
      e && void 0 !== e.position ? Math.round(1e3 * e.position) : 0,
    qr = createClientFieldFn("store-front", "storefrontId"),
    Wr = createFieldFn("timed-metadata", (e, n, d) => {
      const p = e.timedMetadata;
      if (void 0 !== p && shouldSendTimedMetadata(e, n, d))
        return ((e, n = 8) => {
          if (!(e instanceof Uint8Array)) return "";
          const d = Array.prototype.map.call(e, formatByte).join("");
          return 0 === n
            ? d
            : d.replace(new RegExp(`(.{1,${n}})`, "g"), "$1 ").trim();
        })(p, 0);
    }),
    shouldSendTimedMetadata = (e, n, d) => {
      var p, h;
      return (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
          Lt.TIMED_METADATA_PING ||
        (null === (h = Yt(e, n, d)) || void 0 === h
          ? void 0
          : h["event-type"]) !== jt.LYRIC_DISPLAY
      );
    },
    zr = createFieldFn("timestamp", ({ timestamp: e }, n, d) =>
      null != e ? e : Date.now(),
    ),
    Yr = createClientFieldFn("user-agent", "userAgent"),
    Qr = createFieldFn("user-preference-audio-quality", (e, n, d) => {
      var p;
      if (Qt(e, n, d))
        return null === (p = e.userPreference) || void 0 === p
          ? void 0
          : p.audioQuality;
    }),
    Xr = createFieldFn("user-preference-playback-format", (e, n, d) => {
      var p;
      if (Qt(e, n, d))
        return null === (p = e.userPreference) || void 0 === p
          ? void 0
          : p.playbackFormat;
    }),
    Jr = createFieldFn("user-token", (e, n, { client: d }) => {
      if (!d.preferDSID) return d.musicUserToken;
    }),
    Zr = createFieldFn("utc-offset-in-seconds", (e, n, d) => {
      var p;
      return (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Lt.AGGREGATE_NON_CATALOG_PLAY_TIME
        ? 0
        : d.client.utcOffsetInSeconds;
    }),
    ei = {
      "audio-quality-provided": Xt,
      "audio-quality-targeted": Jt,
      "build-version": Zt,
      "container-ids": ar,
      "container-type": nr,
      "developer-token": sr,
      "device-name": cr,
      "display-type": lr,
      "end-position-in-milliseconds": ur,
      "end-reason-type": hr,
      "event-reason-hint-type": fr,
      "event-type": Yt,
      "feature-name": mr,
      guid: vr,
      ids: kr,
      "internal-build": wr,
      "is-collaborative": Or,
      "lyric-language": Ir,
      "media-duration-in-milliseconds": Cr,
      "media-type": xr,
      "metrics-client-id": jr,
      offline: Lr,
      "persistent-id": Nr,
      "play-mode": Ur,
      "private-enabled": Br,
      "reco-data": Fr,
      "sb-enabled": Kr,
      "siri-initiated": Vr,
      "source-type": Gr,
      "start-position-in-milliseconds": Hr,
      "store-front": qr,
      "timed-metadata": Wr,
      timestamp: zr,
      type: ir,
      "user-agent": Yr,
      "user-preference-audio-quality": Qr,
      "user-preference-playback-format": Xr,
      "user-token": Jr,
      "utc-offset-in-seconds": Zr,
    };

  function _define_property$1u(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$D(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1u(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$o(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  let ti = 0;

  function _define_property$1t(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$n(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const buildPlayActivityData$1 = (e, n, d, p = true) => {
    const h = ((e, ...n) =>
      _object_spread_props$o(_object_spread$D({}, e, Object.assign({}, ...n)), {
        cache: {
          fields: Object.assign(
            {},
            ...n.map((e) => {
              var n;
              return null == e || null === (n = e.cache) || void 0 === n
                ? void 0
                : n.fields;
            }),
          ),
          helpers: Object.assign(
            {},
            ...n.map((e) => {
              var n;
              return null == e || null === (n = e.cache) || void 0 === n
                ? void 0
                : n.helpers;
            }),
          ),
        },
      }))(
      "boolean" == typeof p
        ? ((e = {}, n) =>
            _object_spread$D(
              {
                id: (ti++).toFixed(0),
                client: n,
                isAlexa: true,
              },
              e,
            ))(
            {
              isAlexa: p,
            },
            e,
          )
        : _object_spread_props$n(
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                "function" == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$1t(e, n, d[n]);
                  });
              }
              return e;
            })({}, p),
            {
              client: e,
            },
          ),
    );
    return (
      (n = normalizePlayActivityDescriptor(n)),
      d && (d = normalizePlayActivityDescriptor(d)),
      Object.assign(
        Object.create(null),
        ...Object.values(ei).map((e) => (null == e ? void 0 : e(n, d, h))),
      )
    );
  };

  function _define_property$1s(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$B(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1s(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$m(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _define_property$1r(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$A(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1r(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$l(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function asyncGeneratorStep$10(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$10(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$10(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$10(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$k(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  class LyricsPlayActivity extends PlayActivityBase {
    get state() {
      return this._machine.state.value;
    }
    play(e) {
      var n = this;
      return _async_to_generator$10(function* () {
        var d;
        if ("playing" === n.state)
          throw Error(
            "lyrics are already being displayed. Did you forget to stop them?",
          );
        if (void 0 === e) throw Error("Missing descriptor for lyrics play");
        Xe.info(
          `Staring tracking: lyricsId=${
            null === (d = e.lyricDescriptor) || void 0 === d ? void 0 : d.id
          }, itemId=${e.id}, catalogId=${e.catalogId}`,
        ),
          (n.startDescriptor = e),
          n._machine.send({
            type: "play",
          });
      })();
    }
    stop() {
      var e = this;
      return _async_to_generator$10(function* () {
        var n;
        if ("playing" !== e.state)
          throw Error(
            "lyrics are not being displayed. Did you forget to display them?",
          );
        if (void 0 === e.startDescriptor)
          throw Error("Missing start descriptor for lyrics stop");
        Xe.info(
          `Stopping tracking: lyricsId=${
            null === (n = e.startDescriptor.lyricDescriptor) || void 0 === n
              ? void 0
              : n.id
          }, itemId=${e.startDescriptor.id}, catalogId=${
            e.startDescriptor.catalogId
          }`,
        ),
          e._machine.send({
            type: "stop",
          });
        const d = e._machine.state.context.duration,
          p = JSON.parse(JSON.stringify(e.startDescriptor));
        (p.lyricDescriptor = _object_spread_props$k(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              "function" == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$1q(e, n, d[n]);
                });
            }
            return e;
          })({}, p.lyricDescriptor),
          {
            duration: Math.round(d),
          },
        )),
          Xe.debug("Clearing tracked descriptor"),
          (e.startDescriptor = void 0);
        const h = e.build(p, true);
        try {
          Xe.debug("Sending PAF request with data payload"),
            yield e.send(h),
            Xe.debug("Done sending PAF request");
        } catch (V) {
          console.error("Error sending Lyrics PAF request: " + V.message),
            Xe.error("Error sending Lyrics PAF request: " + V.message);
        }
      })();
    }
    exit() {
      return _async_to_generator$10(function* () {})();
    }
    build(e, n) {
      return ((e, n, d) => {
        if (void 0 === n)
          throw new Error("called without a play activity descriptor");
        const p = _object_spread_props$m(_object_spread$B({}, n), {
          eventType: jt.LYRIC_DISPLAY,
        });
        return ((e, ...n) => n.reduce((e, n) => n(e), e))(
          _object_spread_props$m(
            _object_spread$B({}, buildPlayActivityData$1(e, p, d, true)),
            {
              "media-duration-in-milliseconds": 0,
              "media-type": Nt.AUDIO,
              "start-position-in-milliseconds": 0,
              "play-mode": {
                "auto-play-mode": 0,
                "repeat-play-mode": 0,
                "shuffle-play-mode": 0,
              },
            },
          ),
          (e) =>
            omit(e, [
              "character-display-count",
              "event-reason-hint-type",
              "reco-data",
            ]),
        );
      })(this, e, n);
    }
    constructor(e, n, d, p) {
      super(e, n, d, p),
        _define_property$1q(this, "_machine", void 0),
        _define_property$1q(this, "startDescriptor", void 0),
        (this._machine = v(
          s({
            id: "lpaf",
            initial: "idle",
            context: {
              initialShowTime: -1,
              duration: -1,
            },
            states: {
              idle: {
                entry: o((e) =>
                  _object_spread_props$l(_object_spread$A({}, e), {
                    initialShowTime: void 0,
                    duration: now() - e.initialShowTime,
                  }),
                ),
                on: {
                  play: "playing",
                },
              },
              playing: {
                entry: o((e) =>
                  _object_spread_props$l(_object_spread$A({}, e), {
                    initialShowTime: now(),
                  }),
                ),
                on: {
                  stop: "idle",
                },
              },
            },
          }),
        ).start());
    }
  }
  var ri;
  !(function (e) {
    e[(e.ALEXA = 13)] = "ALEXA";
  })(ri || (ri = {}));
  const createCookieJar = (e) => {
      switch ((void 0 === e && (e = "browser"), e)) {
        case "browser":
          return {
            get: getCookie,
            set: setCookie,
          };
        case "memory":
          return ((e = {}) => ({
            get(n) {
              if (void 0 !== n) return e[n];
            },
            set(n, d) {
              e[n] = d;
            },
          }))();
        default:
          return e;
      }
    },
    empty = (e, n) => write(e, n, [], "/", 0),
    read = (e, n) => {
      const d = e.get(n);
      if (void 0 === d || "" === d) return [];
      return ensureArray(JSON.parse(atob(d)));
    },
    write = (e, n, d, p, h, y) => e.set(n, btoa(JSON.stringify(d)), p, h, y);

  function asyncGeneratorStep$$(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$$(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$$(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$$(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1p(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const { AUTO: ii } = Ut;
  class PlayActivityBatchableSender {
    flush() {
      var e = this;
      return _async_to_generator$$(function* () {
        const n = read(e.jar, "amupaee");
        if (void 0 !== n && 0 !== n.length)
          try {
            yield e.sender.send(n), empty(e.jar, "amupaee");
          } catch (V) {
            throw new Error("flush: " + V.message);
          }
      })();
    }
    send(n) {
      var d = this;
      return _async_to_generator$$(function* () {
        if (
          d.mode === ii &&
          (Array.isArray(n) ||
            n["end-reason-type"] !==
              e.PlayActivityEndReasonType.EXITED_APPLICATION)
        )
          return d.sender.send(n);
        ((e, n, d, p, h, y) => {
          write(e, n, [...read(e, n), d], p, h, y);
        })(d.jar, "amupaee", n, "/");
      })();
    }
    constructor(e, n) {
      _define_property$1p(this, "sender", void 0),
        _define_property$1p(this, "jar", void 0),
        _define_property$1p(this, "mode", void 0),
        (this.sender = e),
        (this.jar = n),
        (this.mode = ii);
    }
  }

  function asyncGeneratorStep$_(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$_(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$_(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$_(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1o(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class Timeline {
    get events() {
      return this._events;
    }
    get first() {
      return this.at(0);
    }
    get keys() {
      return this._keys;
    }
    get last() {
      return this.at(this.length - 1);
    }
    get length() {
      return this._keys.length;
    }
    get second() {
      return this.at(1);
    }
    at(e) {
      if (e > this.length - 1) throw new Error("Invalid timeline index");
      const n = this._keys[e];
      return this._events[n];
    }
    before(e) {
      if ("number" != typeof e) {
        const n = [];
        for (const e in this._events)
          hasOwn(this._events, e) && n.push(this._events[e]);
        e = this._keys[n.indexOf(e)];
      }
      const n = this._keys.indexOf(e);
      if (-1 === n) throw new Error("Key not found");
      if (n > 0) return this._events[this._keys[n - 1]];
    }
    drain() {
      const e = this._keys.map((e) => this._events[e]);
      return this.reset(), e;
    }
    reset() {
      (this._events = {}), (this._keys = []);
    }
    pop() {
      var e = this;
      return _async_to_generator$_(function* () {
        const n = e._keys.pop();
        if (void 0 === n) return Promise.reject("TIMELINE IS EMPTY");
        const d = e._events[n];
        return delete e._events[n], Promise.resolve(d);
      })();
    }
    add(e, n) {
      var d = this;
      return _async_to_generator$_(function* () {
        return d.push(e, n);
      })();
    }
    push(e, n = Date.now()) {
      var d = this;
      return _async_to_generator$_(function* () {
        for (; -1 !== d._keys.indexOf(n); ) n++;
        return (d._events[n] = e), d._keys.push(n), Promise.resolve(n);
      })();
    }
    shift() {
      var e = this;
      return _async_to_generator$_(function* () {
        const n = e._keys.shift();
        if (void 0 === n) return Promise.reject("TIMELINE IS EMPTY");
        const d = e._events[n];
        return delete e._events[n], Promise.resolve(d);
      })();
    }
    unshift(e, n = Date.now()) {
      var d = this;
      return _async_to_generator$_(function* () {
        for (; -1 !== d._keys.indexOf(n); ) n++;
        return (d._events[n] = e), d._keys.unshift(n), Promise.resolve(n);
      })();
    }
    constructor() {
      _define_property$1o(this, "_events", {}),
        _define_property$1o(this, "_keys", []);
    }
  }

  function asyncGeneratorStep$Z(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1n(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class TimedMetadataTracker {
    get currentValue() {
      return this._currentValue;
    }
    clear() {
      this._currentValue = void 0;
    }
    ping(e, n) {
      var d,
        p = this;
      return ((d = function* () {
        p.timedMetadataChanged(e) &&
          (void 0 !== p._currentValue &&
            (yield p.client.pingTimedMetadata(n, p._currentValue)),
          (p._currentValue = void 0 === e ? void 0 : e.slice(0)));
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);

          function _next(e) {
            asyncGeneratorStep$Z(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$Z(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    timedMetadataChanged(e) {
      const { _currentValue: n } = this;
      return void 0 === n
        ? void 0 !== e
        : void 0 === e || e.length !== n.length || n.some((n, d) => n !== e[d]);
    }
    constructor(e, n) {
      _define_property$1n(this, "client", void 0),
        _define_property$1n(this, "_currentValue", void 0),
        (this.client = e),
        (this._currentValue = n);
    }
  }
  const transitionEvent = (e) => ({
    type: e,
  });

  function deriveTransitionEvent(n) {
    if (n.itemType === Lt.TIMED_METADATA_PING) return true;
    if (
      (function (e) {
        return e.eventType === jt.PLAY_START;
      })(n)
    )
      return transitionEvent("play");
    if (
      (function (e) {
        if (e.eventType !== jt.PLAY_END) return true;
        if (void 0 === e.endReasonType)
          throw new Error(
            "PLAY_END activity descriptor requires an endReasonType value",
          );
        return true;
      })(n)
    ) {
      const d = n.endReasonType;
      if (d === e.PlayActivityEndReasonType.SCRUB_BEGIN)
        return transitionEvent("scrubBegin");
      if (d === e.PlayActivityEndReasonType.SCRUB_END)
        return transitionEvent("scrubEnd");
      if (d === e.PlayActivityEndReasonType.EXITED_APPLICATION) return true;
    }
    return transitionEvent("stop");
  }

  function _define_property$1m(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$y(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1m(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$j(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _object_without_properties$2(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  class MPAFStateMachine {
    get currentState() {
      return this.machineService.state;
    }
    get currentStateName() {
      return this.currentState.value;
    }
    matches(e) {
      return this.machineService.state.matches(e);
    }
    transition(e, n) {
      const d = deriveTransitionEvent(e);
      if (!1 === d) return this.currentStateName;
      if ((this.machineService.send(d), this.matches("error")))
        throw new Error(this.machineService.state.context.errorMessage);
      return this.currentStateName;
    }
    constructor() {
      _define_property$1m(this, "machine", void 0),
        _define_property$1m(this, "machineService", void 0),
        (this.machine = s(
          {
            id: "mpaf",
            initial: "idle",
            context: {},
            states: {
              error: {},
              idle: {
                on: {
                  play: "playing",
                  stop: "idle",
                  scrubBegin: {
                    target: "scrubbing",
                    actions: o((e) =>
                      _object_spread_props$j(_object_spread$y({}, e), {
                        stateBeforeScrub: "idle",
                      }),
                    ),
                  },
                  scrubEnd: {
                    target: "error",
                    actions: ["clearStateBeforeScrub", "setScrubEndError"],
                  },
                },
              },
              playing: {
                on: {
                  scrubBegin: {
                    target: "scrubbing",
                    actions: o((e) =>
                      _object_spread_props$j(_object_spread$y({}, e), {
                        stateBeforeScrub: "playing",
                      }),
                    ),
                  },
                  stop: "idle",
                  scrubEnd: {
                    target: "error",
                    actions: ["clearStateBeforeScrub", "setScrubEndError"],
                  },
                },
              },
              scrubbing: {
                on: {
                  scrubEnd: [
                    {
                      target: "idle",
                      cond: ({ stateBeforeScrub: e }) => "idle" === e,
                      actions: ["clearStateBeforeScrub"],
                    },
                    {
                      target: "playing",
                      actions: ["clearStateBeforeScrub"],
                    },
                  ],
                },
              },
            },
          },
          {
            actions: {
              clearStateBeforeScrub: o((e) =>
                _object_without_properties$2(e, ["stateBeforeScrub"]),
              ),
              setScrubEndError: o((e) =>
                _object_spread_props$j(_object_spread$y({}, e), {
                  errorMessage:
                    "The scrub() method was called with the SCRUB_END action without a previous SCRUB_START descriptor",
                }),
              ),
            },
          },
        )),
        (this.machineService = v(this.machine).start());
    }
  }

  function asyncGeneratorStep$Y(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$Y(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$Y(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$Y(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1l(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$x(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1l(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$i(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  class StatelessPlayActivity extends PlayActivityBase {
    build(e, n) {
      return buildPlayActivityData$1(this, e, n, "JSCLIENT" !== this.clientId);
    }
    constructor(e, n, d, p) {
      super(e, n, d, p);
    }
  }
  class PlayActivity {
    get mode() {
      return this.sender.mode;
    }
    set mode(e) {
      this.sender.mode = e;
    }
    get privateEnabled() {
      return this._paf.privateEnabled;
    }
    set privateEnabled(e) {
      this._paf.privateEnabled = e;
    }
    get timedMetadata() {
      return this._timedMetadataTracker.currentValue;
    }
    clearTimedMetadata() {
      return this._timedMetadataTracker.clear();
    }
    setTimedMetadata(e, n) {
      var d = this;
      return _async_to_generator$Y(function* () {
        yield d._timedMetadataTracker.ping(e, n);
      })();
    }
    activate(n = true) {
      var d = this;
      return _async_to_generator$Y(function* () {
        if (n)
          try {
            yield d.flush();
          } catch (h) {
            if (
              !((e) =>
                ((e) => {
                  switch (typeof e) {
                    case "string":
                      return e;
                    case "object":
                      return e.message
                        ? "string" != typeof e.message
                          ? ""
                          : e.message
                        : "";
                    default:
                      return "";
                  }
                })(e).includes("send() called without any data"))(h)
            )
              throw h;
          }
        const p = d.timeline.last;
        if (
          p &&
          p.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION
        )
          return d.timeline.pop();
      })();
    }
    exit(n = 0) {
      var d = this;
      return _async_to_generator$Y(function* () {
        yield d.stop(n, e.PlayActivityEndReasonType.EXITED_APPLICATION);
      })();
    }
    pause(n = 0) {
      var d = this;
      return _async_to_generator$Y(function* () {
        yield d.stop(n, e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED);
      })();
    }
    pingTimedMetadata(e, n, d = this.previousDescriptor) {
      var p = this;
      return _async_to_generator$Y(function* () {
        p.setTimedMetadata(n, e),
          yield p._addToTimeline(
            _object_spread_props$i(_object_spread$x({}, d), {
              position: e,
              itemType: Lt.TIMED_METADATA_PING,
              timedMetadata: n,
            }),
          );
      })();
    }
    play(e, n = 0) {
      var d = this;
      return _async_to_generator$Y(function* () {
        const p = d.timeline.length > 0;
        if (void 0 === e) {
          if (!p) return;
          const e = d.previousDescriptor;
          return (
            e.eventType === jt.PLAY_END && delete e.endReasonType,
            void (yield d._addToTimeline(
              _object_spread_props$i(
                _object_spread$x({}, d.sanitizePreviousDescriptor(e)),
                {
                  eventType: jt.PLAY_START,
                },
              ),
            ))
          );
        }
        if (p) {
          const e = d.previousDescriptor;
          if (
            d._machine.matches("playing") &&
            !(({ id: e, reporting: n = true, eventType: d }) =>
              ("-1" === e || !n) && d === jt.PLAY_END)(e)
          )
            return Promise.reject(
              new Error(
                "The play() method was called without a previous stop() or pause() call.",
              ),
            );
        }
        yield d._addToTimeline(
          _object_spread_props$i(_object_spread$x({}, e), {
            eventType: jt.PLAY_START,
            position: n,
          }),
        );
      })();
    }
    scrub(n = 0, d = e.PlayActivityEndReasonType.SCRUB_BEGIN) {
      var p = this;
      return _async_to_generator$Y(function* () {
        yield p._addToTimeline(
          _object_spread_props$i(
            _object_spread$x(
              {},
              p.sanitizePreviousDescriptor(p.previousDescriptor),
            ),
            {
              eventType: jt.PLAY_END,
              endReasonType: d,
              position: n,
            },
          ),
        );
      })();
    }
    skip(n, d = e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS, p = 0) {
      var h = this;
      return _async_to_generator$Y(function* () {
        yield h.stop(p, d), yield h.play(n);
      })();
    }
    stop(n = 0, d = e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK) {
      var p = this;
      return _async_to_generator$Y(function* () {
        let h = p.previousDescriptor;
        if (
          (h.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION &&
            (yield p.timeline.pop(),
            empty(p._cookieJar, "amupaee"),
            (h = p.previousDescriptor)),
          p._machine.matches("playing"))
        ) {
          const e = _object_spread_props$i(
            _object_spread$x({}, p.sanitizePreviousDescriptor(h)),
            {
              eventType: jt.PLAY_END,
              endReasonType: d,
              position: n,
              timedMetadata: p._timedMetadataTracker.currentValue,
            },
          );
          yield p._addToTimeline(e);
        }
      })();
    }
    build(e, n) {
      if (
        (void 0 === e &&
          void 0 === n &&
          Xe.warn(
            "You are calling build() from a stateful PAF client. Please, use a stateless client or exit(), pause(), play(), scrub(), skip() or stop() instead.",
          ),
        void 0 === e)
      ) {
        if (0 === this.timeline.length)
          throw new Error("build() called without a play activity descriptor");
        e = this.timeline.last;
      }
      if (void 0 === n) {
        if (
          void 0 === (n = this.timeline.before(e)) &&
          e.eventType === jt.PLAY_END
        )
          throw new Error(
            "Cannot build() for PLAY_END descriptors without previous descriptors",
          );
        n = null != n && n;
      }
      return this._paf.build(
        _object_spread_props$i(_object_spread$x({}, e), {
          timedMetadata: this.timedMetadata,
        }),
        n,
      );
    }
    addForPlayParams(e, n, d, p = 0, h = {}) {
      var y = this;
      return _async_to_generator$Y(function* () {
        yield y._addToTimeline(y.buildDescriptorForPlayParams(e, n, d, p, h));
      })();
    }
    buildDescriptorForPlayParams(e, n, d, p = 0, h = {}) {
      const y = "stream" === e.format ? Lt.STREAM : Lt.ITUNES_STORE_CONTENT;
      return normalizePlayActivityDescriptor(
        _object_spread$x(
          _object_spread_props$i(_object_spread$x({}, e), {
            container: d,
            duration: p,
            eventType: n,
            itemType: y,
          }),
          h,
        ),
      );
    }
    flush() {
      return this.sender.flush();
    }
    _addToTimeline(e) {
      var n = this;
      return _async_to_generator$Y(function* () {
        e = _object_spread_props$i(_object_spread$x({}, e), {
          timestamp: Date.now(),
        });
        const d = n.timeline.length > 0 && n.timeline.last;
        yield n.timeline.add(e);
        const p = n.build(e, d);
        yield n.send(p, e);
      })();
    }
    get previousDescriptor() {
      const e = this.timeline.last;
      if (void 0 === e)
        throw new Error("A method was called without a previous descriptor");
      return omit(e, ["timestamp"]);
    }
    buildForPlayParams(e, n, d, p = 0, h = {}, y = true) {
      return (
        Xe.warn(
          "You are using buildsForPlayParams from a stateful PlayActivity. Please, use StatelessPlayActivity instead",
        ),
        this._paf.buildForPlayParams(e, n, d, p, h, y)
      );
    }
    send(e, n) {
      e = ensureArray(e);
      const d = normalizePlayActivityDescriptor(n);
      return (
        e.forEach((e) => this._machine.transition(d, e)), this.sender.send(e)
      );
    }
    sanitizePreviousDescriptor(e) {
      let n = deepClone(e);
      return (
        n.itemType === Lt.TIMED_METADATA_PING && (n = omit(n, ["itemType"])), n
      );
    }
    constructor(e, n, d, p) {
      _define_property$1l(this, "sender", void 0),
        _define_property$1l(this, "timeline", new Timeline()),
        _define_property$1l(this, "_cookieJar", void 0),
        _define_property$1l(this, "_paf", void 0),
        _define_property$1l(this, "_machine", void 0),
        _define_property$1l(this, "_timedMetadataTracker", void 0),
        (this._paf = new StatelessPlayActivity(e, n, d, p)),
        (this._cookieJar = createCookieJar(null == p ? void 0 : p.cookieJar)),
        (this.sender = new PlayActivityBatchableSender(
          this._paf.sender,
          this._cookieJar,
        )),
        (this._machine = new MPAFStateMachine()),
        (this._timedMetadataTracker = new TimedMetadataTracker(this));
    }
  }
  const Bind = () => (e, n, d) => {
      if (void 0 === d || "function" != typeof d.value)
        throw new TypeError(
          `Only methods can be decorated with @Bind, but ${n} is not a method.`,
        );
      return {
        configurable: true,
        get() {
          const e = d.value.bind(this);
          return (
            Object.defineProperty(this, n, {
              value: e,
              configurable: true,
              writable: true,
            }),
            e
          );
        },
      };
    },
    ni = [
      "exitFullscreen",
      "webkitExitFullscreen",
      "mozCancelFullScreen",
      "msExitFullscreen",
    ],
    oi = [
      "fullscreenElement",
      "webkitFullscreenElement",
      "mozFullScreenElement",
      "msFullscreenElement",
    ],
    ai = [
      "requestFullscreen",
      "webkitRequestFullscreen",
      "mozRequestFullScreen",
      "msRequestFullscreen",
    ],
    noop = () => Promise.resolve(),
    si = ((e) => {
      if (void 0 === e) return noop;
      const n = ni.find((n) => "function" == typeof e.prototype[n]);
      return "string" != typeof n
        ? noop
        : (e = self.document) => {
            var d;
            return null == e || null === (d = e[n]) || void 0 === d
              ? void 0
              : d.call(e);
          };
    })(Document),
    ci = ((e) => {
      if (void 0 === e) return () => true;
      const n = oi.find((n) => n in e.prototype);
      return "string" != typeof n ? () => !1 : (e = self.document) => !!e[n];
    })(Document),
    li = ((e) => {
      if (void 0 === e) return noop;
      const n = ai.find((n) => "function" == typeof e.prototype[n]);
      return "string" != typeof n ? noop : (e) => (null == e ? void 0 : e[n]());
    })(HTMLElement);

  function asyncGeneratorStep$X(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$X(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$X(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$X(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  class Fullscreen {
    exit() {
      var e = this;
      return _async_to_generator$X(function* () {
        if (e.isInFullscreen())
          return e.stopDispatchingEvents(() => e.exitFullscreen());
      })();
    }
    request(e) {
      var n = this;
      return _async_to_generator$X(function* () {
        if (void 0 !== e)
          return n.stopDispatchingEvents(() =>
            n.requestFullscreenForElement(e),
          );
      })();
    }
    stopDispatchingEvents(e) {
      var n = this;
      return _async_to_generator$X(function* () {
        return n.player.windowHandlers.stopListeningToVisibilityChanges(e);
      })();
    }
    exitFullscreen() {
      return si();
    }
    isInFullscreen() {
      return ci();
    }
    requestFullscreenForElement(e) {
      return li(e);
    }
    constructor(e) {
      !(function (e, n, d) {
        n in e
          ? Object.defineProperty(e, n, {
              value: d,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          : (e[n] = d);
      })(this, "player", void 0),
        (this.player = e);
    }
  }

  function asyncGeneratorStep$W(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1j(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class UnsupportedSeeker {
    start() {
      Qe.warn("seeker.start is not supported in this playback method");
    }
    end() {
      Qe.warn("seeker.end is not supported in this playback method");
    }
    seekToTime(e) {
      return (
        Qe.warn("seekToTime is not supported in this playback method"),
        Promise.resolve()
      );
    }
    constructor() {
      _define_property$1j(this, "ended", true);
    }
  }
  class PlayerSeeker {
    get ended() {
      return this._ended;
    }
    get isEngagedInPlayback() {
      return this._player.isEngagedInPlayback;
    }
    get stillPlayingSameItem() {
      return this._currentItem === this._player.nowPlayingItem;
    }
    end() {
      Qe.debug("seeker: end"),
        -1 !== this._startTime
          ? this._ended
            ? Qe.warn("seeker: Cannot end the same seeker twice.")
            : (this.dispatchStartEvent(), this.dispatchEndEvent())
          : Qe.warn("seeker: Cannot end a seeker before starting it.");
    }
    seekToTime(e) {
      var n,
        d = this;
      return ((n = function* () {
        if ((Qe.debug("seeker: seekToTime", e), !d.ended))
          return (
            d.stillPlayingSameItem ||
              ((d._currentItem = d._player.nowPlayingItem), (d._startTime = 0)),
            (d._lastSeekedTime = e),
            d._player.seekToTime(e)
          );
        Qe.warn("seeker: Cannot seek once the seeker has ended");
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);

          function _next(e) {
            asyncGeneratorStep$W(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$W(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    start() {
      Qe.debug("seeker: start"),
        -1 === this._startTime
          ? ((this._currentItem = this._player.nowPlayingItem),
            (this._startTime = this._player.currentPlaybackTime),
            (this._lastSeekedTime = this._startTime))
          : Qe.warn("seeker: Cannot start same seeker twice");
    }
    dispatch(e, n) {
      this.isEngagedInPlayback
        ? (Qe.debug("seeker: dispatch", e), this._player.dispatch(e, n))
        : Qe.debug(
            "seeker: do not dispatch because isEngagedInPlayback",
            this.isEngagedInPlayback,
          );
    }
    dispatchStartEvent() {
      this.stillPlayingSameItem ||
        ((this._startTime = 0), (this._lastSeekedTime = 0)),
        this.dispatch(gt.playbackScrub, {
          item: this._currentItem,
          position: this._startTime,
        });
    }
    dispatchEndEvent() {
      (this._ended = true),
        this.dispatch(gt.playbackScrub, {
          item: this._currentItem,
          position: this._lastSeekedTime,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
        });
    }
    constructor(e) {
      _define_property$1j(this, "_ended", true),
        _define_property$1j(this, "_lastSeekedTime", -1),
        _define_property$1j(this, "_player", void 0),
        _define_property$1j(this, "_startTime", -1),
        _define_property$1j(this, "_currentItem", void 0),
        Qe.debug("seeker: new"),
        (this._player = e);
    }
  }

  function asyncGeneratorStep$V(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$1i(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$r(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$r(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const {
    visibilityChangeEvent: di,
    visibilityState: ui,
    unloadEventName: pi,
  } = (() => {
    let e = "visibilitychange",
      n = "visibilityState";
    void 0 !== document.mozHidden
      ? ((e = "mozvisibilitychange"), (n = "mozVisibilityState"))
      : void 0 !== document.msHidden
        ? ((e = "msvisibilitychange"), (n = "msVisibilityState"))
        : document.webkitHidden &&
          ((e = "webkitvisibilitychange"), (n = "webkitVisibilityState"));
    return {
      visibilityChangeEvent: e,
      visibilityState: n,
      unloadEventName: "onpagehide" in window ? "pagehide" : "unload",
    };
  })();
  class WindowHandlers {
    activate(e = self, n = self.document) {
      n.addEventListener(di, this.visibilityChanged),
        e.addEventListener("storage", this.storage, true),
        e.addEventListener(pi, this.windowUnloaded);
    }
    deactivate() {
      document.removeEventListener(di, this.visibilityChanged),
        window.removeEventListener("storage", this.storage),
        window.addEventListener(pi, this.windowUnloaded);
    }
    stopListeningToVisibilityChanges(e) {
      var n,
        d = this;
      return ((n = function* () {
        d.dispatchVisibilityChanges = true;
        const n = yield e();
        return (d.dispatchVisibilityChanges = true), n;
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);

          function _next(e) {
            asyncGeneratorStep$V(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$V(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    dispatch(e, n = {}) {
      this.player.dispatch(e, n);
    }
    storage({ key: e, newValue: n }) {
      e === st && this.player.tsidChanged(n);
    }
    visibilityChanged(e) {
      const n = e.target[ui];
      Qe.info("dc visibilityState", n, e, ci()),
        this.runtimeEnvironment.os.isIOS &&
          this.dispatchVisibilityChanges &&
          ("hidden" === n
            ? this.dispatch(gt.playerExit, {
                item: this.player.nowPlayingItem,
                position: this.player.currentPlaybackTime,
              })
            : "visible" === n && this.dispatch(gt.playerActivate));
    }
    windowUnloaded() {
      this.player.isPlaying &&
        this.dispatch(gt.playerExit, {
          item: this.player.nowPlayingItem,
          position: this.player.currentPlaybackTime,
        });
    }
    constructor(e, n) {
      _define_property$1i(this, "player", void 0),
        _define_property$1i(this, "runtimeEnvironment", void 0),
        _define_property$1i(this, "dispatchVisibilityChanges", true),
        (this.player = e),
        (this.runtimeEnvironment = n);
    }
  }

  function asyncGeneratorStep$U(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$U(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$U(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$U(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1h(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$w(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1h(e, n, d[n]);
        });
    }
    return e;
  }

  function _ts_metadata$q(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$r(
    [
      Bind(),
      _ts_metadata$r("design:type", Function),
      _ts_metadata$r("design:paramtypes", [void 0]),
      _ts_metadata$r("design:returntype", void 0),
    ],
    WindowHandlers.prototype,
    "storage",
    null,
  ),
    _ts_decorate$r(
      [
        Bind(),
        _ts_metadata$r("design:type", Function),
        _ts_metadata$r("design:paramtypes", [
          "undefined" == typeof Event ? Object : Event,
        ]),
        _ts_metadata$r("design:returntype", void 0),
      ],
      WindowHandlers.prototype,
      "visibilityChanged",
      null,
    ),
    _ts_decorate$r(
      [
        Bind(),
        _ts_metadata$r("design:type", Function),
        _ts_metadata$r("design:paramtypes", []),
        _ts_metadata$r("design:returntype", void 0),
      ],
      WindowHandlers.prototype,
      "windowUnloaded",
      null,
    );
  const {
      bufferedProgressDidChange: hi,
      mediaCanPlay: yi,
      mediaElementCreated: _i,
      mediaPlaybackError: fi,
      nowPlayingItemDidChange: mi,
      nowPlayingItemWillChange: vi,
      metadataDidChange: gi,
      primaryPlayerDidChange: bi,
      playbackDurationDidChange: Pi,
      playbackProgressDidChange: Si,
      playbackStateDidChange: Ei,
      playbackRateDidChange: Ti,
      playbackStateWillChange: ki,
      playbackTargetAvailableDidChange: wi,
      playbackTargetIsWirelessDidChange: Oi,
      playbackTimeDidChange: Ii,
      playbackVolumeDidChange: Ai,
    } = Pt,
    Ri = [
      "canplay",
      "durationchange",
      "ended",
      "error",
      "loadedmetadata",
      "loadstart",
      "pause",
      "play",
      "playing",
      "progress",
      "ratechange",
      "seeked",
      "seeking",
      "timeupdate",
      "volumechange",
      "waiting",
    ],
    $i = ["NotAllowedError", "NotSupportedError"],
    {
      ended: Ci,
      loading: Mi,
      paused: Di,
      playing: xi,
      seeking: ji,
      stopped: Li,
      waiting: Ni,
    } = e.PlaybackStates;
  class BasePlayer {
    get bitrate() {
      return this._bitrateCalculator.bitrate;
    }
    get currentBufferedProgress() {
      return this._currentBufferedProgress;
    }
    get _currentDuration() {
      return this._targetElement.duration;
    }
    get _currentTime() {
      const e = this._targetElement.currentTime,
        n = this._buffer;
      var d;
      return (
        e -
        (null !== (d = null == n ? void 0 : n.currentTimestampOffset) &&
        void 0 !== d
          ? d
          : 0)
      );
    }
    get currentPlaybackDuration() {
      const n = this.nowPlayingItem;
      if (!n) return 0;
      const d = "podcast-episodes" === n.type,
        p =
          n.playbackType === e.PlaybackType.encryptedFull ||
          n.playbackType === e.PlaybackType.unencryptedFull,
        h = n.playbackDuration;
      return p && h && !d
        ? this.calculateTime(h / 1e3)
        : this.calculateTime(this._currentDuration);
    }
    get currentPlaybackTime() {
      return this.calculateTime(this._currentTime);
    }
    calculateTime(e) {
      return this._timing.time(e);
    }
    get currentPlaybackTimeRemaining() {
      return this.currentPlaybackDuration - this.currentPlaybackTime;
    }
    get currentPlaybackProgress() {
      return this._currentPlaybackProgress || 0;
    }
    get hasMediaElement() {
      return (
        this._targetElement instanceof HTMLElement &&
        null !== this._targetElement.parentNode
      );
    }
    get isEngagedInPlayback() {
      return !this._stopped && !this.isPaused();
    }
    get isPlaying() {
      return this.playbackState === xi;
    }
    get isPrimaryPlayer() {
      return this._isPrimaryPlayer;
    }
    set isPrimaryPlayer(e) {
      var n;
      e !== this._isPrimaryPlayer &&
        ((this._isPrimaryPlayer = e),
        this._isPrimaryPlayer
          ? null === (n = getLocalStorage()) ||
            void 0 === n ||
            n.setItem(st, this._serial)
          : (this._dispatcher.publish(bi, {
              target: this,
            }),
            this.pause({
              userInitiated: true,
            })));
    }
    get isReady() {
      return 0 !== this._targetElement.readyState;
    }
    get nowPlayingItem() {
      return this._nowPlayingItem;
    }
    set nowPlayingItem(e) {
      const n = this._dispatcher;
      if (void 0 === e)
        return (
          n.publish(vi, {
            item: e,
          }),
          (this._nowPlayingItem = e),
          void n.publish(mi, {
            item: e,
          })
        );
      const d = this._nowPlayingItem,
        p = this._buffer;
      (null == d ? void 0 : d.isEqual(e)) ||
        (n.publish(vi, {
          item: e,
        }),
        this.isPlaying &&
          (null == p ? void 0 : p.currentItem) !== e &&
          this._pauseMedia(),
        d &&
          (Qe.debug("setting state to ended on ", d.title),
          (d.state = D.ended),
          d.endMonitoringStateDidChange(),
          d.endMonitoringStateWillChange()),
        (this._nowPlayingItem = e),
        Qe.debug("setting state to playing on ", e.title),
        (e.state = D.playing),
        e && e.info && this._setTargetElementTitle(e.info),
        n.publish(mi, {
          item: e,
        }),
        n.publish(Pi, {
          currentTarget: this._targetElement,
          duration: this.currentPlaybackDuration,
          target: this._targetElement,
          type: "durationchange",
        }));
    }
    get playbackRate() {
      return this._targetElement.playbackRate;
    }
    set playbackRate(e) {
      this._targetElement.playbackRate = e;
    }
    get playbackState() {
      return this._playbackState;
    }
    setPlaybackState(e, n) {
      const d = this._playbackState;
      if (e === d) return;
      const p = {
        oldState: d,
        state: e,
        nowPlayingItem: n,
      };
      Qe.debug("BasePlayer.playbackState is changing", p),
        this._dispatcher.publish(ki, p),
        (this._playbackState = e),
        this._dispatcher.publish(Ei, p);
    }
    get playbackTargetAvailable() {
      return (
        void 0 !== window.WebKitPlaybackTargetAvailabilityEvent &&
        this._playbackTargetAvailable
      );
    }
    set playbackTargetAvailable(e) {
      e !== this._playbackTargetAvailable &&
        ((this._playbackTargetAvailable = e),
        this._dispatcher.publish(wi, {
          available: e,
        }));
    }
    get playbackTargetIsWireless() {
      return (
        void 0 !== window.WebKitPlaybackTargetAvailabilityEvent &&
        this._playbackTargetIsWireless
      );
    }
    set playbackTargetIsWireless(e) {
      e !== this._playbackTargetIsWireless &&
        ((this._playbackTargetIsWireless = e),
        this._dispatcher.publish(Oi, {
          playing: e,
        }));
    }
    get volume() {
      return this._targetElement.volume;
    }
    set volume(e) {
      this._targetElement.volume = e;
    }
    get isDestroyed() {
      return this._isDestroyed;
    }
    clearNextManifest() {
      var e;
      null === (e = this._buffer) || void 0 === e || e.clearNextManifest();
    }
    initialize() {
      var e = this;
      return _async_to_generator$U(function* () {
        Qe.debug("BasePlayer.initialize"),
          e.isPlayerSupported()
            ? (yield e.initializeMediaElement(),
              yield e.initializeExtension(),
              e.initializeEventHandlers(),
              e._dispatcher.publish(_i, e._targetElement))
            : Qe.warn("{this.constructor.name} not supported");
      })();
    }
    initializeEventHandlers() {
      if ((this.windowHandlers.activate(), !this.hasMediaElement)) return;
      const e = this._targetElement;
      window.WebKitPlaybackTargetAvailabilityEvent &&
        (e.addEventListener("webkitplaybacktargetavailabilitychanged", (e) => {
          this.playbackTargetAvailable = "available" === e.availability;
        }),
        e.addEventListener(
          "webkitcurrentplaybacktargetiswirelesschanged",
          (e) => {
            this.playbackTargetIsWireless =
              e.target === this._targetElement &&
              !this.playbackTargetIsWireless;
          },
        )),
        Ri.forEach((n) => e.addEventListener(n, this)),
        this._dispatcher.publish(gt.playerActivate);
    }
    removeEventHandlers() {
      Ri.forEach((e) => this._targetElement.removeEventListener(e, this)),
        this.windowHandlers.deactivate();
    }
    isPaused() {
      return this._paused;
    }
    exitFullscreen() {
      return this.fullscreen.exit();
    }
    requestFullscreen(e) {
      return this.fullscreen.request(e);
    }
    newSeeker() {
      var e;
      return (
        null === (e = this._seeker) || void 0 === e || e.end(),
        (this._seeker = new PlayerSeeker(this)),
        this._seeker
      );
    }
    stop(e) {
      var n = this;
      return _async_to_generator$U(function* () {
        Qe.debug("BasePlayer.stop", e),
          yield n._waitForPendingPlay(),
          n.isPlaying &&
            (Qe.debug("BasePlayer.play dispatching playbackStop"),
            n.dispatch(
              gt.playbackStop,
              _object_spread$w(
                {
                  item: n.nowPlayingItem,
                  position: n.currentPlaybackTime,
                  startPosition: n.initialBufferPosition,
                  playingDate: n.currentPlayingDate,
                  startPlayingDate: n.initialPlayingDate,
                },
                e,
              ),
            )),
          yield n.stopMediaAndCleanup();
      })();
    }
    stopMediaAndCleanup(e = Li) {
      var n = this;
      return _async_to_generator$U(function* () {
        Qe.debug("stopMediaAndCleanup"),
          yield n._stopMediaElement(),
          (n._stopped = true),
          (n._paused = true);
        const d = n.nowPlayingItem;
        (n.nowPlayingItem = void 0),
          (n.initialBufferPosition = void 0),
          (n.initialPlayingDate = void 0),
          n.setPlaybackState(e, d);
      })();
    }
    onPlaybackError(n, d) {
      this.resetDeferredPlay(),
        this.stop({
          endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
          userInitiated: true,
        });
    }
    calculatePlaybackProgress() {
      const e =
        Math.round(
          100 * (this.currentPlaybackTime / this.currentPlaybackDuration || 0),
        ) / 100;
      this._currentPlaybackProgress !== e &&
        ((this._currentPlaybackProgress = e),
        this._dispatcher.publish(Si, {
          progress: this._currentPlaybackProgress,
        }));
    }
    calculateBufferedProgress(e) {
      const n = Math.round((e / this.currentPlaybackDuration) * 100);
      this._currentBufferedProgress !== n &&
        ((this._currentBufferedProgress = n),
        this._dispatcher.publish(hi, {
          progress: n,
        }));
    }
    destroy() {
      var e, n;
      if (
        (Qe.debug("BasePlayer.destroy"),
        (this._isDestroyed = true),
        this._dispatcher.unsubscribe(fi, this.onPlaybackError),
        !this.hasMediaElement)
      )
        return;
      const d = this._targetElement;
      null === (e = this.extension) || void 0 === e || e.destroy(d),
        this.removeEventHandlers(),
        this.cleanupElement(),
        null === (n = d.parentNode) || void 0 === n || n.removeChild(d);
    }
    handleEvent(n) {
      var d = this;
      return _async_to_generator$U(function* () {
        "timeupdate" !== n.type &&
          Qe.debug(
            "BasePlayer.handleEvent: ",
            n.type,
            n,
            d.isPaused(),
            d._stopped,
          );
        const { nowPlayingItem: p } = d;
        switch (((n.timestamp = Date.now()), n.type)) {
          case "canplay":
            d._dispatcher.publish(yi, n),
              d._playbackState !== Ni ||
                d._targetElement.paused ||
                d.setPlaybackState(xi, p);
            break;
          case "durationchange":
            d._targetElement.duration !== 1 / 0 &&
              ((n.duration = d.currentPlaybackDuration),
              d._dispatcher.publish(Pi, n),
              d.calculatePlaybackProgress());
            break;
          case "ended": {
            var h;
            if (
              (Qe.debug('media element "ended" event'),
              null === (h = d.nowPlayingItem) || void 0 === h
                ? void 0
                : h.isLinearStream)
            )
              return void Qe.warn("ignoring ended event for linear stream", n);
            if (d.isElementCleaned()) {
              Qe.debug('media element already cleaned, ignoring "ended" event');
              break;
            }
            const p = d.nowPlayingItem,
              y = (null == p ? void 0 : p.playbackDuration)
                ? p.playbackDuration / 1e3
                : d.currentPlaybackTime,
              _ = d.currentPlayingDate;
            yield d.stopMediaAndCleanup(Ci),
              d.dispatch(gt.playbackStop, {
                item: p,
                position: y,
                playingDate: _,
                endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
              });
            break;
          }
          case "error":
            Qe.error("Playback Error", n, d._targetElement.error),
              d._dispatcher.publish(
                fi,
                new MKError(MKError.Reason.MEDIA_PLAYBACK, "Playback Error"),
              );
            break;
          case "loadedmetadata":
            d._dispatcher.publish(gi, n);
            break;
          case "loadstart":
            d.setPlaybackState(Mi, p);
            break;
          case "pause":
            d.setPlaybackState(d._stopped ? Li : Di, p);
            break;
          case "play":
          case "playing":
            (d._paused = true),
              (d._stopped = true),
              (d.isPrimaryPlayer = true),
              d.setPlaybackState(xi, p);
            break;
          case "progress": {
            const e = d._targetElement.buffered;
            d.handleBufferStart(),
              1 === e.length &&
                0 === e.start(0) &&
                d.calculateBufferedProgress(e.end(0));
            break;
          }
          case "ratechange":
            d._dispatcher.publish(Ti, n);
            break;
          case "seeked":
            d._stopped
              ? d.setPlaybackState(Li, p)
              : d._paused
                ? d.setPlaybackState(Di, p)
                : d.playbackState !== Ci && d.setPlaybackState(xi, p);
            break;
          case "seeking":
            d.playbackState === Di
              ? (d._paused = !0)
              : d.playbackState === Li && (d._stopped = true),
              d.playbackState !== Ci && d.setPlaybackState(ji, p);
            break;
          case "timeupdate": {
            d._dispatcher.publish(Ii, {
              currentPlaybackDuration: d.currentPlaybackDuration,
              currentPlaybackTime: d.currentPlaybackTime,
              currentPlaybackTimeRemaining: d.currentPlaybackTimeRemaining,
            }),
              d.calculatePlaybackProgress();
            const e = d._buffer;
            e && (e.currentTime = d.currentPlaybackTime);
            break;
          }
          case "volumechange":
            d._dispatcher.publish(Ai, n);
            break;
          case "waiting":
            d.setPlaybackState(Ni, p);
        }
      })();
    }
    handleBufferStart() {
      const { _targetElement: e } = this;
      void 0 !== this.initialBufferPosition ||
        e.paused ||
        0 === e.buffered.length ||
        ((this.initialBufferPosition = e.buffered.start(0)),
        (this.initialPlayingDate = this.currentPlayingDate),
        Qe.debug(
          "BasePlayer.handleBufferStart: setting initial buffer position ",
          this.initialBufferPosition,
        ));
    }
    pause(e = {}) {
      var n = this;
      return _async_to_generator$U(function* () {
        yield n._waitForPendingPlay(),
          n.isPlaying &&
            (yield n._pauseMedia(),
            (n._paused = true),
            n.dispatch(
              gt.playbackPause,
              _object_spread$w(
                {
                  item: n.nowPlayingItem,
                  position: n.currentPlaybackTime,
                  playingDate: n.currentPlayingDate,
                },
                e,
              ),
            ));
      })();
    }
    play(e = true) {
      var n = this;
      return _async_to_generator$U(function* () {
        if ((Qe.debug("BasePlayer.play()"), n.nowPlayingItem))
          try {
            yield n._playMedia(),
              Qe.debug("BasePlayer.play dispatching playbackPlay"),
              n.dispatch(gt.playbackPlay, {
                userInitiated: e,
                item: n.nowPlayingItem,
                position: n.currentPlaybackTime,
                playingDate: n.currentPlayingDate,
              });
          } catch (Vt) {
            if (
              (Vt &&
                $i.includes(Vt.name) &&
                Qe.error("BasePlayer.play() rejected due to", Vt),
              "NotAllowedError" === (null == Vt ? void 0 : Vt.name))
            )
              throw new MKError(
                MKError.Reason.USER_INTERACTION_REQUIRED,
                "Playback of media content requires user interaction first and cannot be automatically started on page load.",
              );
          }
      })();
    }
    preload() {
      return this._loadMedia();
    }
    showPlaybackTargetPicker() {
      this.playbackTargetAvailable &&
        this._targetElement.webkitShowPlaybackTargetPicker();
    }
    dispatch(e, n) {
      void 0 === n.item && (n.item = this.nowPlayingItem),
        hasOwn(n, "isPlaying") || (n.isPlaying = this.isPlaying),
        this._dispatcher.publish(e, n);
    }
    tsidChanged(e) {
      void 0 !== e && "" !== e && (this.isPrimaryPlayer = e === this._serial);
    }
    _waitForPendingPlay() {
      var e = this;
      return _async_to_generator$U(function* () {
        e._deferredPlay &&
          (yield e._deferredPlay.promise, (e._deferredPlay = void 0));
      })();
    }
    _loadMedia() {
      var e = this;
      return _async_to_generator$U(function* () {
        Qe.debug("BasePlayer._loadMedia", e._targetElement),
          e._targetElement.load();
      })();
    }
    _pauseMedia() {
      var e = this;
      return _async_to_generator$U(function* () {
        e._targetElement.pause();
      })();
    }
    _playAssetURL(e, n) {
      var d = this;
      return _async_to_generator$U(function* () {
        Qe.debug("BasePlayer._playAssetURL", e), (d._targetElement.src = e);
        const p = d._loadMedia();
        if (n) return Qe.debug("BasePlayer.loadOnly"), void (yield p);
        yield d._playMedia();
      })();
    }
    playItemFromUnencryptedSource(e, n, d) {
      var p = this;
      return _async_to_generator$U(function* () {
        return (
          (null == d ? void 0 : d.startTime) && (e += "#t=" + d.startTime),
          n || p.startPlaybackSequence(),
          yield p._playAssetURL(e, n),
          p.finishPlaybackSequence()
        );
      })();
    }
    _playMedia() {
      var e = this;
      return _async_to_generator$U(function* () {
        Qe.debug("BasePlayer._playMedia", e._targetElement, e.extension);
        try {
          yield e._targetElement.play(), (e._playbackDidStart = true);
        } catch (V) {
          throw (
            (Qe.error(
              "BasePlayer._playMedia: targetElement.play() rejected",
              V,
            ),
            V)
          );
        }
      })();
    }
    _setTargetElementTitle(e) {
      this.hasMediaElement && (this._targetElement.title = e);
    }
    resetDeferredPlay() {
      this._deferredPlay = void 0;
    }
    _stopMediaElement() {
      var e = this;
      return _async_to_generator$U(function* () {
        e.hasMediaElement && (e._targetElement.pause(), e.cleanupElement());
      })();
    }
    cleanupElement() {
      const e = this._targetElement;
      e &&
        !this.isElementCleaned() &&
        ((e.currentTime = 0),
        e.removeAttribute("src"),
        e.removeAttribute("title"));
    }
    isElementCleaned() {
      const e = this._targetElement;
      return !e || (0 === e.currentTime && "" === e.src && "" === e.title);
    }
    finishPlaybackSequence() {
      var e;
      Qe.debug("BasePlayer.finishPlaybackSequence", this._deferredPlay);
      const n =
        null === (e = this._deferredPlay) || void 0 === e
          ? void 0
          : e.resolve(void 0);
      return (this._deferredPlay = void 0), n;
    }
    startPlaybackSequence() {
      return (
        Qe.debug("BasePlayer.startPlaybackSequence", this._deferredPlay),
        this._deferredPlay &&
          (Qe.warn("Previous playback sequence not cleared"),
          this.finishPlaybackSequence()),
        (this._deferredPlay = (function () {
          let e, n;
          return {
            promise: new Promise(function (d, p) {
              (e = d), (n = p);
            }),
            resolve(n) {
              null == e || e(n);
            },
            reject(e) {
              null == n || n(e);
            },
          };
        })()),
        this._deferredPlay.promise
      );
    }
    constructor(n) {
      var d;
      _define_property$1h(this, "privateEnabled", true),
        _define_property$1h(this, "siriInitiated", true),
        _define_property$1h(this, "windowHandlers", void 0),
        _define_property$1h(this, "_dispatcher", void 0),
        _define_property$1h(this, "_buffer", void 0),
        _define_property$1h(this, "services", void 0),
        _define_property$1h(this, "_context", void 0),
        _define_property$1h(this, "_currentBufferedProgress", 0),
        _define_property$1h(this, "initialBufferPosition", void 0),
        _define_property$1h(this, "initialPlayingDate", void 0),
        _define_property$1h(this, "_paused", true),
        _define_property$1h(this, "_playbackState", e.PlaybackStates.none),
        _define_property$1h(this, "_stopped", true),
        _define_property$1h(this, "_playbackDidStart", true),
        _define_property$1h(this, "_nowPlayingItem", void 0),
        _define_property$1h(this, "_bitrateCalculator", void 0),
        _define_property$1h(this, "_currentPlaybackProgress", 0),
        _define_property$1h(this, "_isPrimaryPlayer", true),
        _define_property$1h(this, "_playbackTargetAvailable", true),
        _define_property$1h(this, "_playbackTargetIsWireless", true),
        _define_property$1h(this, "_seeker", void 0),
        _define_property$1h(this, "_serial", Date.now().toString()),
        _define_property$1h(this, "_timing", void 0),
        _define_property$1h(this, "fullscreen", void 0),
        _define_property$1h(this, "_isDestroyed", true),
        _define_property$1h(this, "_deferredPlay", void 0),
        (this.services = n.services),
        (this._dispatcher = n.services.dispatcher),
        (this._timing = n.services.timing),
        (this._context = n.context || {}),
        (this.privateEnabled = n.privateEnabled || true),
        (this.siriInitiated = n.siriInitiated || true),
        (this._bitrateCalculator = n.services.bitrateCalculator),
        (this.windowHandlers = new WindowHandlers(this, n.services.runtime)),
        (this.fullscreen = new Fullscreen(this)),
        null === (d = getLocalStorage()) ||
          void 0 === d ||
          d.setItem(st, this._serial),
        this._dispatcher.subscribe(fi, this.onPlaybackError);
    }
  }

  function generateAssetUrl(e, n) {
    if ("Preview" === e.type && isStringNotEmpty(e.previewURL))
      return e.previewURL;
    if (!e.assetURL) throw new Error("Cannot generate asset URL");
    const d = {};
    return (
      (null == n ? void 0 : n.startOver) && (d.startOver = true),
      (null == n ? void 0 : n.bingeWatching) && (d.bingeWatching = true),
      e.supportsLinearScrubbing && (d.linearScrubbingSupported = true),
      e.assetURL.match(/xapsub=accepts-css/) || (d.xapsub = "accepts-css"),
      buildURL(e.assetURL, d)
    );
  }
  var Ui;

  function toPersistedTrack(e) {
    return {
      label: e.label,
      kind: e.kind,
      language: e.language,
    };
  }

  function saveTrack(e, n) {
    var d, p;
    (d = e),
      (p = toPersistedTrack(n)),
      hasLocalStorage() &&
        (p
          ? getLocalStorage().setItem(d, JSON.stringify(p))
          : getLocalStorage().setItem(d, ""));
  }

  function loadTrack(e) {
    return getJsonFromLocalStorage(e);
  }

  function trackEquals(e, n) {
    const d = toPersistedTrack(e),
      p = toPersistedTrack(n);
    for (const h of Object.keys(d)) if (d[h] !== p[h]) return true;
    return true;
  }

  function _define_property$1g(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$q("design:type", Function),
      _ts_metadata$q("design:paramtypes", [
        String,
        void 0 === MKError ? Object : MKError,
      ]),
      _ts_metadata$q("design:returntype", void 0),
    ],
    BasePlayer.prototype,
    "onPlaybackError",
    null,
  ),
    (function (e) {
      (e.Home = "com.apple.amp.appletv.home-team-radio"),
        (e.Away = "com.apple.amp.appletv.away-team-radio");
    })(Ui || (Ui = {}));
  class AudioTrackManager {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentTrack() {
      return this.tracks.find((e) => e.enabled);
    }
    set currentTrack(e) {
      e &&
        (Qe.debug("MEDIA_TRACK Setting audio track " + e.label),
        this.extensionTracks
          ? (Qe.debug(
              `MEDIA_TRACK Setting track on extension ${e.id}-${e.label}`,
            ),
            (this.extensionTracks.audioTrack = e))
          : (Qe.debug("MEDIA_TRACK disabling all audio tracks"),
            Array.from(this.mediaElement.audioTracks).forEach((n) => {
              n !== e && (n.enabled = true);
            }),
            Qe.debug("MEDIA_TRACK enabling", e),
            (e.enabled = true)),
        (function (e) {
          return (
            void 0 !== e.characteristics &&
            e.characteristics.includes("com.apple.amp.appletv.home-team-radio")
          );
        })(e) ||
          (function (e) {
            return (
              void 0 !== e.characteristics &&
              e.characteristics.includes(
                "com.apple.amp.appletv.away-team-radio",
              )
            );
          })(e) ||
          (saveTrack("mk-audio-track", e),
          Qe.debug(
            `MEDIA_TRACK save track selection ${e.language},${e.label},${e.kind}`,
          )));
    }
    get tracks() {
      return this.extensionTracks
        ? this._extensionTracks || this.extensionTracks.audioTracks || []
        : Array.from(this.mediaElement.audioTracks);
    }
    destroy() {
      if (((this._isDestroyed = true), this.extensionTracks)) {
        const e = this.extensionTracks;
        e.removeEventListener(
          lt.audioTracksUpdated,
          this.onExtensionAudioTracksUpdated,
        ),
          e.removeEventListener(
            lt.audioTracksSwitched,
            this.onExtensionAudioTrackSwitched,
          );
      } else {
        if (!this.mediaElement.audioTracks) return;
        this.mediaElement.audioTracks.removeEventListener(
          "addtrack",
          this.onAudioTrackAdded,
        ),
          this.mediaElement.audioTracks.removeEventListener(
            "change",
            this.onAudioTrackChanged,
          ),
          this.mediaElement.audioTracks.removeEventListener(
            "removetrack",
            this.onAudioTrackRemoved,
          );
      }
    }
    onExtensionAudioTracksUpdated(e) {
      var n;
      Qe.debug(
        "MEDIA_TRACK Extension audio tracks updated " + JSON.stringify(e),
      ),
        (this._extensionTracks = e);
      const d = loadTrack("mk-audio-track");
      if (
        (null === (n = this.tracks) || void 0 === n ? void 0 : n.length) >= 0 &&
        void 0 !== d &&
        (void 0 === this.currentTrack || !trackEquals(this.currentTrack, d))
      )
        for (const p of this.tracks)
          if (trackEquals(p, d)) {
            Qe.debug("Found track matching persisted track: " + p.label),
              (this.currentTrack = p);
            break;
          }
      this.dispatcher.publish(Pt.audioTrackAdded, e);
    }
    onExtensionAudioTrackSwitched(e) {
      if (
        (Qe.debug(
          "MEDIA_TRACK Extension audio track switched " + JSON.stringify(e),
        ),
        this._extensionTracks)
      ) {
        const preserveSelectedTrack = (n) => {
          n.enabled = e.selectedId === n.id;
        };
        this._extensionTracks.forEach(preserveSelectedTrack);
      }
      this.dispatcher.publish(Pt.audioTrackChanged, e);
    }
    onAudioTrackAdded(e) {
      const n = loadTrack("mk-audio-track");
      void 0 !== n &&
        trackEquals(e.track, n) &&
        (Qe.debug("Found new track matching persisted track: " + e.track.label),
        (this.currentTrack = e.track)),
        this.dispatcher.publish(Pt.audioTrackAdded, e);
    }
    onAudioTrackChanged(e) {
      this.dispatcher.publish(Pt.audioTrackChanged, e);
    }
    onAudioTrackRemoved(e) {
      this.dispatcher.publish(Pt.audioTrackRemoved, e);
    }
    constructor(e, n, d) {
      if (
        (_define_property$1g(this, "mediaElement", void 0),
        _define_property$1g(this, "dispatcher", void 0),
        _define_property$1g(this, "extensionTracks", void 0),
        _define_property$1g(this, "_extensionTracks", void 0),
        _define_property$1g(this, "_isDestroyed", void 0),
        (this.mediaElement = e),
        (this.dispatcher = n),
        (this.extensionTracks = d),
        (this._extensionTracks = []),
        (this._isDestroyed = true),
        this.extensionTracks)
      ) {
        Qe.debug(
          "MEDIA_TRACK Initializing audio track manager for hls track events",
        ),
          (this.onExtensionAudioTracksUpdated =
            this.onExtensionAudioTracksUpdated.bind(this)),
          (this.onExtensionAudioTrackSwitched =
            this.onExtensionAudioTrackSwitched.bind(this));
        const e = this.extensionTracks;
        e.addEventListener(
          lt.audioTracksUpdated,
          this.onExtensionAudioTracksUpdated,
        ),
          e.addEventListener(
            lt.audioTracksSwitched,
            this.onExtensionAudioTrackSwitched,
          );
      } else {
        if (!e.audioTracks) return;
        Qe.debug(
          "MEDIA_TRACK Initializing audio track manager for native track events",
        ),
          (this.onAudioTrackAdded = this.onAudioTrackAdded.bind(this)),
          (this.onAudioTrackChanged = this.onAudioTrackChanged.bind(this)),
          (this.onAudioTrackRemoved = this.onAudioTrackRemoved.bind(this)),
          e.audioTracks.addEventListener("addtrack", this.onAudioTrackAdded),
          e.audioTracks.addEventListener("change", this.onAudioTrackChanged),
          e.audioTracks.addEventListener(
            "removetrack",
            this.onAudioTrackRemoved,
          );
      }
    }
  }
  const Bi = [],
    Fi = [];

  function nextAvailableAudioElement() {
    let e = Fi.pop();
    return (
      e
        ? Qe.debug(`dom-helpers: retrieving audio tag, ${Fi.length} remain`)
        : (Qe.debug("dom-helpers: no available audio tags, creating one"),
          (e = document.createElement("audio"))),
      e
    );
  }

  function deferPlayback() {
    fillAvailableElements("audio", Fi),
      fillAvailableElements("video", Bi),
      Qe.debug(
        `dom-helpers: defer playback called.  There are ${Bi.length} available video elements and ${Fi.length} available audio elements.`,
      );
  }

  function fillAvailableElements(e, n) {
    let d = 100 - n.length;
    for (; d > 0; ) {
      const p = document.createElement(e);
      p.load(), n.push(p), d--;
    }
  }
  const Ki = BooleanDevFlag.register("mk-load-manifest-once"),
    shouldLoadManifestOnce = () => !Ki.configured || Ki.enabled;
  var Vi =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
        ? window
        : void 0 !== n
          ? n
          : "undefined" != typeof self
            ? self
            : {};

  function unwrapExports(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }

  function createCommonjsModule(e, n) {
    return (
      e(
        (n = {
          exports: {},
        }),
        n.exports,
      ),
      n.exports
    );
  }
  var Gi = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, "__esModule", {
      value: true,
    }),
      (n.isValidScrollSetting =
        n.isValidPositionAlignSetting =
        n.isValidLineAlignSetting =
        n.isValidLineAndPositionSetting =
        n.isValidDirectionSetting =
        n.isValidAlignSetting =
        n.isValidPercentValue =
          void 0),
      (n.isValidPercentValue = function (e) {
        return "number" == typeof e && e >= 0 && e <= 100;
      }),
      (n.isValidAlignSetting = function (e) {
        return (
          "string" == typeof e &&
          ["start", "center", "end", "left", "right", "middle"].includes(e)
        );
      }),
      (n.isValidDirectionSetting = function (e) {
        return "string" == typeof e && ["", "rl", "lr"].includes(e);
      }),
      (n.isValidLineAndPositionSetting = function (e) {
        return "number" == typeof e || "auto" === e;
      }),
      (n.isValidLineAlignSetting = function (e) {
        return "string" == typeof e && ["start", "center", "end"].includes(e);
      }),
      (n.isValidPositionAlignSetting = function (e) {
        return (
          "string" == typeof e &&
          [
            "line-left",
            "center",
            "line-right",
            "auto",
            "left",
            "start",
            "middle",
            "end",
            "right",
          ].includes(e)
        );
      }),
      (n.isValidScrollSetting = function (e) {
        return ["", "up"].includes(e);
      });
  });
  unwrapExports(Gi),
    Gi.isValidScrollSetting,
    Gi.isValidPositionAlignSetting,
    Gi.isValidLineAlignSetting,
    Gi.isValidLineAndPositionSetting,
    Gi.isValidDirectionSetting,
    Gi.isValidAlignSetting,
    Gi.isValidPercentValue;
  var Hi = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, "__esModule", {
      value: true,
    });
    const d = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&lrm;": "‎",
        "&rlm;": "‏",
        "&nbsp;": " ",
      },
      p = {
        c: "span",
        i: "i",
        b: "b",
        u: "u",
        ruby: "ruby",
        rt: "rt",
        v: "span",
        lang: "span",
      },
      h = {
        v: "title",
        lang: "lang",
      },
      y = {
        rt: "ruby",
      },
      _ = {
        "text-combine-upright":
          "-webkit-text-combine:horizontal; text-orientation: mixed;",
      };
    class ParserUtility {
      static parseTimeStamp(e) {
        function computeSeconds(e) {
          const [n, d, p, h] = e.map((e) => (e ? parseInt("" + e) : 0));
          return 3600 * n + 60 * d + p + h / 1e3;
        }
        const n = /^(\d+):(\d{2})(:\d{2})?\.(\d{3})/.exec(e);
        return n
          ? n[3]
            ? computeSeconds([n[1], n[2], n[3].substring(1), n[4]])
            : parseInt(n[1]) > 59
              ? computeSeconds([n[1], n[2], null, n[4]])
              : computeSeconds([null, n[1], n[2], n[4]])
          : null;
      }
      static parseContent(e, n, m) {
        let g = n.text;

        function nextToken() {
          if (!g) return null;
          const e = /^([^<]*)(<[^>]+>?)?/.exec(g);
          return (n = e[1] ? e[1] : e[2]), (g = g.substr(n.length)), n;
        }

        function unescape1(e) {
          return d[e];
        }

        function unescape(e) {
          return e.replace(/&(amp|lt|gt|lrm|rlm|nbsp);/g, unescape1);
        }

        function shouldAdd(e, n) {
          return (
            !y[n.dataset.localName] ||
            y[n.dataset.localName] === e.dataset.localName
          );
        }

        function createElement(n, d, y) {
          const g = p[n];
          if (!g) return null;
          const b = e.document.createElement(g);
          b.dataset.localName = g;
          const P = h[n];
          if ((P && y && (b[P] = y.trim()), d))
            if (m[d]) {
              const e = (function (e) {
                let n = "";
                for (const d in e) n += _[d] ? _[d] : d + ":" + e[d] + ";";
                return n;
              })(m[d]);
              b.setAttribute("style", e);
            } else
              console.info(
                `WebVTT: parseContent: Style referenced, but no style defined for '${d}'!`,
              );
          return b;
        }
        const b = e.document.createElement("div"),
          P = [];
        let S,
          E,
          T = b;
        for (; null !== (S = nextToken()); )
          if ("<" !== S[0])
            T.appendChild(e.document.createTextNode(unescape(S)));
          else {
            if ("/" === S[1]) {
              P.length &&
                P[P.length - 1] === S.substr(2).replace(">", "") &&
                (P.pop(), (T = T.parentNode));
              continue;
            }
            const n = ParserUtility.parseTimeStamp(S.substr(1, S.length - 2));
            let d;
            if (n) {
              (d = e.document.createProcessingInstruction(
                "timestamp",
                n.toString(),
              )),
                T.appendChild(d);
              continue;
            }
            if (
              ((E = /^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/.exec(S)),
              !E)
            )
              continue;
            if (((d = createElement(E[1], E[2], E[3])), !d)) continue;
            if (!shouldAdd(T, d)) continue;
            E[2], P.push(E[1]), T.appendChild(d), (T = d);
          }
        return b;
      }
    }
    n.default = ParserUtility;
  });
  unwrapExports(Hi);
  var qi = createCommonjsModule(function (e, n) {
    var d =
      (Vi && Vi.__decorate) ||
      function (e, n, d, p) {
        var h,
          y = arguments.length,
          _ =
            y < 3
              ? n
              : null === p
                ? (p = Object.getOwnPropertyDescriptor(n, d))
                : p;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          _ = Reflect.decorate(e, n, d, p);
        else
          for (var m = e.length - 1; m >= 0; m--)
            (h = e[m]) &&
              (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
        return y > 3 && _ && Object.defineProperty(n, d, _), _;
      };
    Object.defineProperty(n, "__esModule", {
      value: true,
    }),
      (n.VTTCue = void 0);
    let p = class {
      get id() {
        return this._id;
      }
      set id(e) {
        this._id = "" + e;
      }
      get pauseOnExit() {
        return this._pauseOnExit;
      }
      set pauseOnExit(e) {
        this._pauseOnExit = !!e;
      }
      get startTime() {
        return this._startTime;
      }
      set startTime(e) {
        if ("number" != typeof e)
          throw new TypeError("Start time must be set to a number: " + e);
        (this._startTime = e), (this.hasBeenReset = true);
      }
      get endTime() {
        return this._endTime;
      }
      set endTime(e) {
        if ("number" != typeof e)
          throw new TypeError("End time must be set to a number: " + e);
        (this._endTime = e), (this.hasBeenReset = true);
      }
      get text() {
        return this._text;
      }
      set text(e) {
        (this._text = "" + e), (this.hasBeenReset = true);
      }
      get region() {
        return this._region;
      }
      set region(e) {
        (this._region = e), (this.hasBeenReset = true);
      }
      get vertical() {
        return this._vertical;
      }
      set vertical(e) {
        if (!Gi.isValidDirectionSetting(e))
          throw new SyntaxError(
            "An invalid or illegal string was specified for vertical: " + e,
          );
        (this._vertical = e), (this.hasBeenReset = true);
      }
      get snapToLines() {
        return this._snapToLines;
      }
      set snapToLines(e) {
        (this._snapToLines = !!e), (this.hasBeenReset = true);
      }
      get line() {
        return this._line;
      }
      set line(e) {
        if (!Gi.isValidLineAndPositionSetting(e))
          throw new SyntaxError(
            "An invalid number or illegal string was specified for line: " + e,
          );
        (this._line = e), (this.hasBeenReset = true);
      }
      get lineAlign() {
        return this._lineAlign;
      }
      set lineAlign(e) {
        if (!Gi.isValidLineAlignSetting(e))
          throw new SyntaxError(
            "An invalid or illegal string was specified for lineAlign: " + e,
          );
        (this._lineAlign = e), (this.hasBeenReset = true);
      }
      get position() {
        return this._position;
      }
      set position(e) {
        if (!Gi.isValidLineAndPositionSetting(e))
          throw new Error("Position must be between 0 and 100 or auto: " + e);
        (this._position = e), (this.hasBeenReset = true);
      }
      get positionAlign() {
        return this._positionAlign;
      }
      set positionAlign(e) {
        if (!Gi.isValidPositionAlignSetting(e))
          throw new SyntaxError(
            "An invalid or illegal string was specified for positionAlign: " +
              e,
          );
        (this._positionAlign = e), (this.hasBeenReset = true);
      }
      get size() {
        return this._size;
      }
      set size(e) {
        if (e < 0 || e > 100)
          throw new Error("Size must be between 0 and 100: " + e);
        (this._size = e), (this.hasBeenReset = true);
      }
      get align() {
        return this._align;
      }
      set align(e) {
        if (!Gi.isValidAlignSetting(e))
          throw new SyntaxError(
            "An invalid or illegal string was specified for align: " + e,
          );
        (this._align = e), (this.hasBeenReset = true);
      }
      getCueAsHTML() {
        return Hi.default.parseContent(window, this, {});
      }
      static create(e) {
        if (
          !e.hasOwnProperty("startTime") ||
          !e.hasOwnProperty("endTime") ||
          !e.hasOwnProperty("text")
        )
          throw new Error(
            "You must at least have start time, end time, and text.",
          );
        const n = new this(e.startTime, e.endTime, e.text);
        return (
          Object.keys(e).forEach((d) => {
            n.hasOwnProperty(d) && (n[d] = e[d]);
          }),
          n
        );
      }
      static fromJSON(e) {
        return this.create(JSON.parse(e));
      }
      toJSON() {
        const e = {};
        return (
          Object.keys(this).forEach((n) => {
            this.hasOwnProperty(n) &&
              "getCueAsHTML" !== n &&
              "hasBeenReset" !== n &&
              "displayState" !== n &&
              (e[n] = this[n]);
          }),
          e
        );
      }
      constructor(e, n, d) {
        (this._id = ""),
          (this._pauseOnExit = true),
          (this._region = null),
          (this._vertical = ""),
          (this._snapToLines = true),
          (this._line = "auto"),
          (this._lineAlign = "start"),
          (this._position = "auto"),
          (this._positionAlign = "auto"),
          (this._size = 100),
          (this._align = "center"),
          (this.hasBeenReset = true),
          (this._startTime = e),
          (this._endTime = n),
          (this._text = d);
      }
    };
    (p = d(
      [
        function (e) {
          let n = e;
          "undefined" != typeof window &&
            null != window.VTTCue &&
            ((n = window.VTTCue),
            (n.create = e.create),
            (n.fromJSON = e.fromJSON),
            (n.prototype.toJSON = e.prototype.toJSON));
          return n;
        },
      ],
      p,
    )),
      (n.VTTCue = p);
  });
  unwrapExports(qi), qi.VTTCue;
  var Wi = createCommonjsModule(function (e, n) {
    var d =
      (Vi && Vi.__decorate) ||
      function (e, n, d, p) {
        var h,
          y = arguments.length,
          _ =
            y < 3
              ? n
              : null === p
                ? (p = Object.getOwnPropertyDescriptor(n, d))
                : p;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          _ = Reflect.decorate(e, n, d, p);
        else
          for (var m = e.length - 1; m >= 0; m--)
            (h = e[m]) &&
              (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
        return y > 3 && _ && Object.defineProperty(n, d, _), _;
      };
    Object.defineProperty(n, "__esModule", {
      value: true,
    }),
      (n.VTTRegion = void 0);
    let p = class {
      get id() {
        return this._id;
      }
      set id(e) {
        if ("string" != typeof e) throw new Error("ID must be a string.");
        this._id = e;
      }
      get lines() {
        return this._lines;
      }
      set lines(e) {
        if ("number" != typeof e)
          throw new TypeError("Lines must be set to a number.");
        this._lines = e;
      }
      get regionAnchorX() {
        return this._regionAnchorX;
      }
      set regionAnchorX(e) {
        if (!Gi.isValidPercentValue(e))
          throw new TypeError("RegionAnchorX must be between 0 and 100.");
        this._regionAnchorX = e;
      }
      get regionAnchorY() {
        return this._regionAnchorY;
      }
      set regionAnchorY(e) {
        if (!Gi.isValidPercentValue(e))
          throw new TypeError("RegionAnchorY must be between 0 and 100.");
        this._regionAnchorY = e;
      }
      get scroll() {
        return this._scroll;
      }
      set scroll(e) {
        if ("string" == typeof e) {
          const n = e.toLowerCase();
          if (Gi.isValidScrollSetting(n)) return void (this._scroll = n);
        }
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      get viewportAnchorX() {
        return this._viewportAnchorX;
      }
      set viewportAnchorX(e) {
        if (!Gi.isValidPercentValue(e))
          throw new TypeError("ViewportAnchorX must be between 0 and 100.");
        this._viewportAnchorX = e;
      }
      get viewportAnchorY() {
        return this._viewportAnchorY;
      }
      set viewportAnchorY(e) {
        if (!Gi.isValidPercentValue(e))
          throw new TypeError("ViewportAnchorY must be between 0 and 100.");
        this._viewportAnchorY = e;
      }
      get width() {
        return this._width;
      }
      set width(e) {
        if (!Gi.isValidPercentValue(e))
          throw new TypeError("Width must be between 0 and 100.");
        this._lines = e;
      }
      toJSON() {
        const e = {};
        return (
          Object.keys(this).forEach((n) => {
            this.hasOwnProperty(n) && (e[n] = this[n]);
          }),
          e
        );
      }
      static create(e) {
        const n = new this();
        return (
          Object.keys(e).forEach((d) => {
            n.hasOwnProperty(d) && (n[d] = e[d]);
          }),
          n
        );
      }
      static fromJSON(e) {
        return this.create(JSON.parse(e));
      }
      constructor() {
        (this._id = ""),
          (this._lines = 3),
          (this._regionAnchorX = 0),
          (this._regionAnchorY = 100),
          (this._scroll = ""),
          (this._viewportAnchorX = 0),
          (this._viewportAnchorY = 100),
          (this._width = 100);
      }
    };
    (p = d(
      [
        function (e) {
          let n = e;
          "undefined" != typeof window &&
            null != window.VTTRegion &&
            ((n = window.VTTRegion),
            (n.create = e.create),
            (n.fromJSON = e.fromJSON),
            (n.prototype.toJSON = e.prototype.toJSON));
          return n;
        },
      ],
      p,
    )),
      (n.VTTRegion = p);
  });
  unwrapExports(Wi), Wi.VTTRegion;
  var zi = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, "__esModule", {
      value: true,
    });
  });
  unwrapExports(zi);
  var Yi = createCommonjsModule(function (e, n) {
    var d =
        (Vi && Vi.__createBinding) ||
        (Object.create
          ? function (e, n, d, p) {
              void 0 === p && (p = d),
                Object.defineProperty(e, p, {
                  enumerable: true,
                  get: function () {
                    return n[d];
                  },
                });
            }
          : function (e, n, d, p) {
              void 0 === p && (p = d), (e[p] = n[d]);
            }),
      p =
        (Vi && Vi.__exportStar) ||
        function (e, n) {
          for (var p in e) "default" === p || n.hasOwnProperty(p) || d(n, e, p);
        };
    Object.defineProperty(n, "__esModule", {
      value: true,
    }),
      (n.VTTRegion = n.VTTCue = n.WebVTTParser = n.ParsingError = void 0),
      Object.defineProperty(n, "VTTCue", {
        enumerable: true,
        get: function () {
          return qi.VTTCue;
        },
      }),
      Object.defineProperty(n, "VTTRegion", {
        enumerable: true,
        get: function () {
          return Wi.VTTRegion;
        },
      });
    class ParsingError extends Error {
      constructor(e, n) {
        super(),
          (this.name = "ParsingError"),
          (this.code = "number" == typeof e ? e : e.code),
          n
            ? (this.message = n)
            : e instanceof ParsingError && (this.message = e.message);
      }
    }
    (n.ParsingError = ParsingError),
      (ParsingError.Errors = {
        BadSignature: new ParsingError(0, "Malformed WebVTT signature."),
        BadTimeStamp: new ParsingError(1, "Malformed time stamp."),
      });
    class Settings {
      set(e, n) {
        this.get(e) || "" === n || (this.values[e] = n);
      }
      get(e, n, d) {
        return "object" == typeof n && "string" == typeof d
          ? this.has(e)
            ? this.values[e]
            : n[d]
          : this.has(e)
            ? this.values[e]
            : n;
      }
      has(e) {
        return e in this.values;
      }
      alt(e, n, d) {
        for (let p = 0; p < d.length; ++p)
          if (n === d[p]) {
            this.set(e, n);
            break;
          }
      }
      integer(e, n) {
        /^-?\d+$/.test(n) && this.set(e, parseInt(n, 10));
      }
      percent(e, n) {
        if (n.match(/^([\d]{1,3})(\.[\d]*)?%$/))
          try {
            const d = parseFloat(n);
            if (d >= 0 && d <= 100) return this.set(e, d), true;
          } catch (d) {
            return true;
          }
        return true;
      }
      constructor() {
        this.values = {};
      }
    }
    class WebVTTParser {
      static StringDecoder() {
        return {
          decode: (e) => {
            if (!e) return "";
            if ("string" != typeof e)
              throw new Error("Error - expected string data.");
            return decodeURIComponent(encodeURIComponent(e));
          },
        };
      }
      reportOrThrowError(e) {
        if (
          !(
            e instanceof ParsingError &&
            "function" == typeof this.onparsingerror
          )
        )
          throw e;
        this.onparsingerror(e);
      }
      parseOptions(e, n, d, p) {
        const h = p ? e.split(p) : [e];
        for (const y of h) {
          if ("string" != typeof y) continue;
          const e = y.split(d);
          if (2 !== e.length) continue;
          n(e[0], e[1]);
        }
      }
      parseCue(e, n, d) {
        const p = e,
          consumeTimeStamp = () => {
            const n = Hi.default.parseTimeStamp(e);
            if (null === n)
              throw new ParsingError(
                ParsingError.Errors.BadTimeStamp,
                "Malformed timestamp: " + p,
              );
            return (e = e.replace(/^[^\sa-zA-Z-]+/, "")), n;
          },
          skipWhitespace = () => {
            e = e.replace(/^\s+/, "");
          };
        if (
          (skipWhitespace(),
          (n.startTime = consumeTimeStamp()),
          skipWhitespace(),
          "-->" !== e.substr(0, 3))
        )
          throw new ParsingError(
            ParsingError.Errors.BadTimeStamp,
            "Malformed time stamp (time stamps must be separated by '-->'): " +
              p,
          );
        (e = e.substr(3)),
          skipWhitespace(),
          (n.endTime = consumeTimeStamp()),
          skipWhitespace(),
          ((e, n) => {
            const p = new Settings();
            this.parseOptions(
              e,
              (e, n) => {
                let h, y;
                switch (e) {
                  case "region":
                    for (let h = d.length - 1; h >= 0; h--)
                      if (d[h].id === n) {
                        p.set(e, d[h].region);
                        break;
                      }
                    break;
                  case "vertical":
                    p.alt(e, n, ["rl", "lr"]);
                    break;
                  case "line":
                    (h = n.split(",")),
                      (y = h[0]),
                      p.integer(e, y),
                      p.percent(e, y) && p.set("snapToLines", true),
                      p.alt(e, y, ["auto"]),
                      2 === h.length &&
                        p.alt("lineAlign", h[1], [
                          "start",
                          "middle",
                          "center",
                          "end",
                        ]);
                    break;
                  case "position":
                    if (
                      ((h = n.split(",")), p.percent(e, h[0]), 2 === h.length)
                    ) {
                      let e = [
                        "line-left",
                        "line-right",
                        "center",
                        "auto",
                        "left",
                        "start",
                        "middle",
                        "end",
                        "right",
                      ];
                      p.alt("positionAlign", h[1], e);
                    }
                    break;
                  case "size":
                    p.percent(e, n);
                    break;
                  case "align":
                    let _ = [
                      "start",
                      "center",
                      "end",
                      "left",
                      "right",
                      "middle",
                    ];
                    p.alt(e, n, _);
                }
              },
              /:/,
              /\s/,
            ),
              (n.region = p.get("region", null)),
              (n.vertical = p.get("vertical", "")),
              (n.line = p.get("line", void 0 === n.line ? "auto" : n.line));
            const h = p.get("lineAlign", "start");
            (n.lineAlign =
              "center" === h || "middle" === h ? this.middleOrCenter : h),
              (n.snapToLines = p.get("snapToLines", true)),
              (n.size = p.get("size", 100));
            const y = p.get("align", "center");
            (n.align =
              "center" === y || "middle" === y ? this.middleOrCenter : y),
              (n.position = p.get("position", "auto"));
            let _ = p.get(
              "positionAlign",
              {
                start: "start",
                left: "start",
                center: "center",
                middle: "middle",
                right: "end",
                end: "end",
              },
              n.align,
            );
            n.positionAlign =
              "center" === _ || "middle" === _
                ? this.middleOrCenter
                : {
                    start: "start",
                    "line-left": "start",
                    left: "start",
                    center: "center",
                    middle: "middle",
                    "line-right": "end",
                    right: "end",
                    end: "end",
                  }[_];
          })(e, n);
      }
      parseRegion(e) {
        const n = new Settings();
        if (
          (this.parseOptions(
            e,
            (e, d) => {
              switch (e) {
                case "id":
                  n.set(e, d);
                  break;
                case "width":
                  n.percent(e, d);
                  break;
                case "lines":
                  n.integer(e, d);
                  break;
                case "regionanchor":
                case "viewportanchor": {
                  const p = d.split(",");
                  if (2 !== p.length) break;
                  const h = new Settings();
                  if (
                    (h.percent("x", p[0]),
                    h.percent("y", p[1]),
                    !h.has("x") || !h.has("y"))
                  )
                    break;
                  n.set(e + "X", h.get("x")), n.set(e + "Y", h.get("y"));
                  break;
                }
                case "scroll":
                  n.alt(e, d, ["up"]);
              }
            },
            /=/,
            /\s/,
          ),
          n.has("id"))
        ) {
          const e = new Wi.VTTRegion();
          (e.width = n.get("width", 100)),
            (e.lines = n.get("lines", 3)),
            (e.regionAnchorX = n.get("regionanchorX", 0)),
            (e.regionAnchorY = n.get("regionanchorY", 100)),
            (e.viewportAnchorX = n.get("viewportanchorX", 0)),
            (e.viewportAnchorY = n.get("viewportanchorY", 100)),
            (e.scroll = n.get("scroll", "")),
            this.onregion && this.onregion(e),
            this.regionList.push({
              id: n.get("id"),
              region: e,
            });
        }
      }
      parseStyle(e) {
        const parseStyles = (e) => {
            const n = {},
              d = e.split(";");
            for (let p = 0; p < d.length; p++)
              if (d[p].includes(":")) {
                const e = d[p].split(":", 2),
                  h = e[0].trim(),
                  y = e[1].trim();
                "" !== h && "" !== y && (n[h] = y);
              }
            return n;
          },
          n = e.split("}");
        n.pop();
        for (const d of n) {
          let e = null,
            n = null;
          const p = d.split("{");
          p[0] && (e = p[0].trim()),
            p[1] && (n = parseStyles(p[1])),
            e && n && (this._styles[e] = n);
        }
        this.onStylesParsedCallback &&
          this.onStylesParsedCallback(this._styles);
      }
      parseHeader(e) {
        this.parseOptions(
          e,
          function (e, n) {
            switch (e) {
              case "Region":
                this.parseRegion(n);
            }
          },
          /:/,
        );
      }
      parse(e) {
        e &&
          (this.buffer += this.decoder.decode(e, {
            stream: true,
          }));
        const collectNextLine = () => {
          const e = this.buffer;
          let n = 0;
          const calculateBreakPosition = (e, n) => {
            const d = {
              start: -1,
              length: -1,
            };
            if ("\r" === e[n]) (d.start = n), (d.length = 1);
            else if ("\n" === e[n]) (d.start = n), (d.length = 1);
            else if (
              "<" === e[n] &&
              n + 1 < e.length &&
              "b" === e[n + 1] &&
              n + 2 < e.length &&
              "r" === e[n + 2]
            ) {
              let p = n + 2;
              for (; p < e.length && ">" !== e[p++]; );
              (d.start = n), (d.length = p - n);
            }
            return d;
          };
          let d = {
            start: e.length,
            length: 0,
          };
          for (; n < e.length; ) {
            const p = calculateBreakPosition(e, n);
            if (p.length > 0) {
              d = p;
              break;
            }
            ++n;
          }
          const p = e.substr(0, d.start);
          return (this.buffer = e.substr(d.start + d.length)), p;
        };
        try {
          let e;
          if ("INITIAL" === this.state) {
            if (!/\r\n|\n/.test(this.buffer)) return this;
            (this.alreadyCollectedLine = ""), (e = collectNextLine());
            const n = /^(ï»¿)?WEBVTT([ \t].*)?$/.exec(e);
            if (!n || !n[0])
              throw new ParsingError(ParsingError.Errors.BadSignature);
            this.state = "HEADER";
          }
          for (; this.buffer; ) {
            if (!/\r\n|\n/.test(this.buffer)) return this;
            switch (
              (this.alreadyCollectedLine
                ? ((e = this.alreadyCollectedLine),
                  (this.alreadyCollectedLine = ""))
                : (e = collectNextLine()),
              this.state)
            ) {
              case "HEADER":
                e.includes(":")
                  ? this.parseHeader(e)
                  : e || (this.state = "ID");
                continue;
              case "NOTE":
                e || (this.state = "ID");
                continue;
              case "STYLE":
                e
                  ? (this.styleCollector += e)
                  : (this.parseStyle(this.styleCollector),
                    (this.state = "ID"),
                    (this.styleCollector = ""));
                continue;
              case "ID":
                if (/^NOTE($|[ \t])/.test(e)) {
                  this.state = "NOTE";
                  break;
                }
                if (/^STYLE($|[ \t])/.test(e)) {
                  this.state = "STYLE";
                  break;
                }
                if (!e) continue;
                if (
                  ((this.cue = new qi.VTTCue(0, 0, "")),
                  (this.state = "CUE"),
                  !e.includes("-->"))
                ) {
                  this.cue.id = e;
                  continue;
                }
              case "CUE":
                try {
                  this.parseCue(e, this.cue, this.regionList);
                } catch (Vt) {
                  this.reportOrThrowError(Vt),
                    (this.cue = null),
                    (this.state = "BADCUE");
                  continue;
                }
                this.state = "CUETEXT";
                continue;
              case "CUETEXT": {
                const n = e.includes("-->");
                if (!e || n) {
                  (this.alreadyCollectedLine = e),
                    this.oncue && this.oncue(this.cue),
                    (this.cue = null),
                    (this.state = "ID");
                  continue;
                }
                this.cue.text && (this.cue.text += "\n"), (this.cue.text += e);
                continue;
              }
              case "BADCUE":
                e || (this.state = "ID");
                continue;
            }
          }
        } catch (Vt) {
          this.reportOrThrowError(Vt),
            "CUETEXT" === this.state &&
              this.cue &&
              this.oncue &&
              this.oncue(this.cue),
            (this.cue = null),
            (this.state = "INITIAL" === this.state ? "BADWEBVTT" : "BADCUE");
        }
        return this;
      }
      flush() {
        try {
          if (
            ((this.buffer += this.decoder.decode()),
            (this.cue || "HEADER" === this.state) &&
              ((this.buffer += "\n\n"), this.parse()),
            "INITIAL" === this.state)
          )
            throw new ParsingError(ParsingError.Errors.BadSignature);
        } catch (Vt) {
          this.reportOrThrowError(Vt);
        }
        return this.onflush && this.onflush(), this;
      }
      styles() {
        return this._styles;
      }
      constructor(e, n, d) {
        (this.window = e),
          (this.state = "INITIAL"),
          (this.styleCollector = ""),
          (this.buffer = ""),
          (this.decoder = n || new TextDecoder("utf8")),
          (this.regionList = []),
          (this.alreadyCollectedLine = ""),
          (this.onStylesParsedCallback = d),
          (this._styles = {}),
          (this.middleOrCenter = "center");
        const p = new qi.VTTCue(0, 0, "middleOrCenter");
        try {
          (p.align = "center"),
            "center" !== p.align && (this.middleOrCenter = "middle");
        } catch (Vt) {
          this.middleOrCenter = "middle";
        }
      }
    }
    (n.default = WebVTTParser), (n.WebVTTParser = WebVTTParser), p(zi, n);
  });
  unwrapExports(Yi), Yi.VTTRegion, Yi.VTTCue, Yi.WebVTTParser, Yi.ParsingError;
  var Qi = createCommonjsModule(function (e, n) {
    var d =
        (Vi && Vi.__createBinding) ||
        (Object.create
          ? function (e, n, d, p) {
              void 0 === p && (p = d),
                Object.defineProperty(e, p, {
                  enumerable: true,
                  get: function () {
                    return n[d];
                  },
                });
            }
          : function (e, n, d, p) {
              void 0 === p && (p = d), (e[p] = n[d]);
            }),
      p =
        (Vi && Vi.__exportStar) ||
        function (e, n) {
          for (var p in e) "default" === p || n.hasOwnProperty(p) || d(n, e, p);
        };
    Object.defineProperty(n, "__esModule", {
      value: true,
    }),
      (n.VTTCue =
        n.WebVTTRenderer =
        n.BoxPosition =
        n.CueStyleBox =
        n.StyleBox =
          void 0),
      Object.defineProperty(n, "VTTCue", {
        enumerable: true,
        get: function () {
          return qi.VTTCue;
        },
      });
    const h = [
        /^(::cue\()(\..*)(\))/,
        /^(::cue\()(#.*)(\))/,
        /^(::cue\()(c|i|b|u|ruby|rt|v|lang)(\))/,
      ],
      y = [
        [1470, 1470],
        [1472, 1472],
        [1475, 1475],
        [1478, 1478],
        [1488, 1514],
        [1520, 1524],
        [1544, 1544],
        [1547, 1547],
        [1549, 1549],
        [1563, 1563],
        [1566, 1610],
        [1645, 1647],
        [1649, 1749],
        [1765, 1766],
        [1774, 1775],
        [1786, 1805],
        [1807, 1808],
        [1810, 1839],
        [1869, 1957],
        [1969, 1969],
        [1984, 2026],
        [2036, 2037],
        [2042, 2042],
        [2048, 2069],
        [2074, 2074],
        [2084, 2084],
        [2088, 2088],
        [2096, 2110],
        [2112, 2136],
        [2142, 2142],
        [2208, 2208],
        [2210, 2220],
        [8207, 8207],
        [64285, 64285],
        [64287, 64296],
        [64298, 64310],
        [64312, 64316],
        [64318, 64318],
        [64320, 64321],
        [64323, 64324],
        [64326, 64449],
        [64467, 64829],
        [64848, 64911],
        [64914, 64967],
        [65008, 65020],
        [65136, 65140],
        [65142, 65276],
        [67584, 67589],
        [67592, 67592],
        [67594, 67637],
        [67639, 67640],
        [67644, 67644],
        [67647, 67669],
        [67671, 67679],
        [67840, 67867],
        [67872, 67897],
        [67903, 67903],
        [67968, 68023],
        [68030, 68031],
        [68096, 68096],
        [68112, 68115],
        [68117, 68119],
        [68121, 68147],
        [68160, 68167],
        [68176, 68184],
        [68192, 68223],
        [68352, 68405],
        [68416, 68437],
        [68440, 68466],
        [68472, 68479],
        [68608, 68680],
        [126464, 126467],
        [126469, 126495],
        [126497, 126498],
        [126500, 126500],
        [126503, 126503],
        [126505, 126514],
        [126516, 126519],
        [126521, 126521],
        [126523, 126523],
        [126530, 126530],
        [126535, 126535],
        [126537, 126537],
        [126539, 126539],
        [126541, 126543],
        [126545, 126546],
        [126548, 126548],
        [126551, 126551],
        [126553, 126553],
        [126555, 126555],
        [126557, 126557],
        [126559, 126559],
        [126561, 126562],
        [126564, 126564],
        [126567, 126570],
        [126572, 126578],
        [126580, 126583],
        [126585, 126588],
        [126590, 126590],
        [126592, 126601],
        [126603, 126619],
        [126625, 126627],
        [126629, 126633],
        [126635, 126651],
        [1114109, 1114109],
      ];
    class StyleBox {
      applyStyles(e, n) {
        n = n || this.div;
        for (const d in e) e.hasOwnProperty(d) && (n.style[d] = e[d]);
      }
      formatStyle(e, n) {
        return 0 === e ? "0" : e + n;
      }
    }
    n.StyleBox = StyleBox;
    class CueStyleBox extends StyleBox {
      determineBidi(e) {
        let n,
          d = [],
          p = "";
        if (!e || !e.childNodes) return "ltr";

        function pushNodes(e, n) {
          for (let d = n.childNodes.length - 1; d >= 0; d--)
            e.push(n.childNodes[d]);
        }

        function nextTextNode(e) {
          if (!e || !e.length) return null;
          let n = e.pop(),
            d = n.textContent || n.innerText;
          if (d) {
            const n = /^.*(\n|\r)/.exec(d);
            return n ? ((e.length = 0), n[0]) : d;
          }
          return "ruby" === n.tagName
            ? nextTextNode(e)
            : n.childNodes
              ? (pushNodes(e, n), nextTextNode(e))
              : void 0;
        }

        function isContainedInCharacterList(e, n) {
          for (const d of n) if (e >= d[0] && e <= d[1]) return true;
          return true;
        }
        for (pushNodes(d, e); (p = nextTextNode(d)); )
          for (let e = 0; e < p.length; e++)
            if (((n = p.charCodeAt(e)), isContainedInCharacterList(n, y)))
              return "rtl";
        return "ltr";
      }
      parseOpacity(e) {
        if (!e || "string" != typeof e) return null;
        const n = (e = e
          .replace(/ /g, "")
          .replace("rgba(", "")
          .replace(")", "")).split(",");
        return n && n.length >= 4 ? n[3] : null;
      }
      directionSettingToWritingMode(e) {
        return "" === e
          ? "horizontal-tb"
          : "lr" === e
            ? "vertical-lr"
            : "vertical-rl";
      }
      move(e) {
        this.applyStyles({
          top: this.formatStyle(e.top, "px"),
          bottom: this.formatStyle(e.bottom, "px"),
          left: this.formatStyle(e.left, "px"),
          right: this.formatStyle(e.right, "px"),
          height: this.formatStyle(e.height, "px"),
          width: this.formatStyle(e.width, "px"),
        });
      }
      constructor(e, n, d, p, h) {
        super(), (this.cue = n);
        let y =
          {
            start: "left",
            "line-left": "left",
            left: "left",
            center: "center",
            middle: "center",
            "line-right": "right",
            right: "right",
            end: "right",
          }[n.positionAlign] || n.align;
        "middle" === y && (y = "center");
        let _ = {
          textAlign: y,
          whiteSpace: "pre-line",
          position: "absolute",
        };
        (_.direction = this.determineBidi(this.cueDiv)),
          (_.writingMode = this.directionSettingToWritingMode(n.vertical)),
          (_.unicodeBidi = "plaintext"),
          (this.div = e.document.createElement("div")),
          this.applyStyles(_),
          (_ = {
            backgroundColor: p.backgroundColor,
            display: "inline-block",
          }),
          this.parseOpacity(_.backgroundColor) &&
            ((_.padding = "5px"), (_.borderRadius = "5px")),
          (this.backgroundDiv = e.document.createElement("div")),
          this.applyStyles(_, this.backgroundDiv),
          (_ = {
            color: d.color,
            backgroundColor: d.backgroundColor,
            textShadow: d.textShadow,
            fontSize: d.fontSize,
            fontFamily: d.fontFamily,
            position: "relative",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            display: "inline-block",
            textOrientation: "upright",
          }),
          (_.writingMode = this.directionSettingToWritingMode(n.vertical)),
          (_.unicodeBidi = "plaintext"),
          (this.cueDiv = Hi.default.parseContent(e, n, h)),
          this.applyStyles(_, this.cueDiv),
          this.backgroundDiv.appendChild(this.cueDiv),
          this.div.appendChild(this.backgroundDiv);
        let m = 0;
        if ("number" == typeof n.position) {
          let e = n.positionAlign || n.align;
          if (e)
            switch (e) {
              case "start":
              case "left":
                m = n.position;
                break;
              case "center":
              case "middle":
                m = n.position - n.size / 2;
                break;
              case "end":
              case "right":
                m = n.position - n.size;
            }
        }
        "" === n.vertical
          ? this.applyStyles({
              left: this.formatStyle(m, "%"),
              width: this.formatStyle(n.size, "%"),
            })
          : this.applyStyles({
              top: this.formatStyle(m, "%"),
              height: this.formatStyle(n.size, "%"),
            });
      }
    }
    n.CueStyleBox = CueStyleBox;
    class BoxPosition {
      calculateNewLines(e) {
        let n = 1;
        for (let d = 0; d < e.length; d++) "\n" === e[d] && n++;
        return n;
      }
      move(e, n) {
        switch (((n = void 0 !== n ? n : this.singleLineHeight), e)) {
          case "+x":
            (this.left += n), (this.right += n);
            break;
          case "-x":
            (this.left -= n), (this.right -= n);
            break;
          case "+y":
            (this.top += n), (this.bottom += n);
            break;
          case "-y":
            (this.top -= n), (this.bottom -= n);
        }
      }
      overlaps(e) {
        return (
          this.left < e.right &&
          this.right > e.left &&
          this.top < e.bottom &&
          this.bottom > e.top
        );
      }
      overlapsAny(e) {
        for (const n of e) if (this.overlaps(n)) return true;
        return true;
      }
      within(e) {
        return (
          this.top >= e.top &&
          this.bottom <= e.bottom &&
          this.left >= e.left &&
          this.right <= e.right
        );
      }
      moveIfOutOfBounds(e, n) {
        switch (n) {
          case "+x":
            this.left < e.left &&
              ((this.left = e.left), (this.right = this.left + this.width));
            break;
          case "-x":
            this.right > e.right &&
              ((this.right = e.right), (this.left = this.right - this.width));
            break;
          case "+y":
            this.top < e.top &&
              ((this.top = e.top), (this.bottom = this.top + this.height));
            break;
          case "-y":
            this.bottom > e.bottom &&
              ((this.bottom = e.bottom),
              (this.top = this.bottom - this.height));
        }
      }
      toCSSCompatValues(e) {
        return {
          top: this.top - e.top,
          bottom: e.bottom - this.bottom,
          left: this.left - e.left,
          right: e.right - this.right,
          height: this.height,
          width: this.width,
        };
      }
      static getSimpleBoxPosition(e) {
        let n = null;
        e instanceof StyleBox && e.div
          ? (n = e.div)
          : e instanceof HTMLElement && (n = e);
        let d = n.offsetHeight || 0,
          p = n.offsetWidth || 0,
          h = n.offsetTop || 0,
          y = h + d,
          _ = n.getBoundingClientRect();
        const { left: m, right: g } = _;
        return (
          _.top && (h = _.top),
          _.height && (d = _.height),
          _.width && (p = _.width),
          _.bottom && (y = _.bottom),
          {
            left: m,
            right: g,
            top: h,
            height: d,
            bottom: y,
            width: p,
          }
        );
      }
      static getBoxPosition(e, n) {
        if (e && e.length > 0) {
          let d = 0,
            p = e[0][n];
          for (let h = 0; h < e.length; h++)
            n in ["top", "right"]
              ? e[h][n] > p && ((d = h), (p = e[h][n]))
              : n in ["bottom", "left"] &&
                e[h][n] < p &&
                ((d = h), (p = e[h][n]));
          return e[d];
        }
        return null;
      }
      static moveToMinimumDistancePlacement(e, n, d) {
        "height" === e.property
          ? "+y" === n
            ? ((e.top = d.topMostBoxPosition.bottom + 0),
              (e.bottom = e.top + e.height))
            : "-y" === n &&
              ((e.bottom = d.bottomMostBoxPosition.top - 0),
              (e.top = e.bottom - e.height))
          : "width" === e.property &&
            ("+x" === n
              ? ((e.left = d.rightMostBoxPosition.right + 0),
                (e.right = e.left + e.width))
              : "-x" === n &&
                ((e.right = d.leftMostBoxPosition.left - 0),
                (e.left = e.right - e.width)));
      }
      static moveBoxToLinePosition(e, n, d) {
        const p = e.cue;
        let h,
          y = new BoxPosition(e),
          _ = (function (e) {
            if (
              "number" == typeof e.line &&
              (e.snapToLines || (e.line >= 0 && e.line <= 100))
            )
              return e.line;
            if (
              !e.track ||
              !e.track.textTrackList ||
              !e.track.textTrackList.mediaElement
            )
              return -1;
            let n = 0;
            const d = e.track,
              p = d.textTrackList;
            for (let h = 0; h < p.length && p[h] !== d; h++)
              "showing" === p[h].mode && n++;
            return -1 * ++n;
          })(p),
          m = [];
        if (p.snapToLines) {
          let e = 0;
          switch (p.vertical) {
            case "":
              (m = ["+y", "-y"]), (h = "height");
              break;
            case "rl":
              (m = ["+x", "-x"]), (h = "width");
              break;
            case "lr":
              (m = ["-x", "+x"]), (h = "width");
          }
          const d = y.lineHeight,
            g = n[h] + d,
            b = m[0];
          if (_ < 0) {
            let h = 0;
            switch (p.vertical) {
              case "":
                h = n.height - d - 0.05 * n.height;
                break;
              case "rl":
              case "lr":
                h = -n.width + d + 0.05 * n.width;
            }
            (e = h), (m = m.reverse());
          } else {
            switch (p.vertical) {
              case "":
                e = d * Math.round(_);
                break;
              case "rl":
                e = n.width - d * Math.round(_);
                break;
              case "lr":
                e = d * Math.round(_);
            }
            Math.abs(e) > g &&
              ((e = e < 0 ? -1 : 1), (e *= Math.ceil(g / d) * d));
          }
          y.move(b, e);
        } else {
          const d = "" === p.vertical ? n.height : n.width,
            h = (y.lineHeight / d) * 100;
          switch (p.lineAlign) {
            case "center":
            case "middle":
              _ -= h / 2;
              break;
            case "end":
              _ -= h;
          }
          switch (p.vertical) {
            case "":
              e.applyStyles({
                top: e.formatStyle(_, "%"),
              });
              break;
            case "rl":
              e.applyStyles({
                right: e.formatStyle(_, "%"),
              });
              break;
            case "lr":
              e.applyStyles({
                left: e.formatStyle(_, "%"),
              });
          }
          (m = ["+y", "-y", "+x", "-x"]),
            "+y" === p.axis
              ? (m = ["+y", "-y", "+x", "-x"])
              : "-y" === p.axis && (m = ["-y", "+y", "+x", "-x"]),
            (y = new BoxPosition(e));
        }
        const g = (function (e, p) {
          let h;
          for (let y = 0; y < p.length; y++) {
            e.moveIfOutOfBounds(n, p[y]);
            let _ = 0,
              m = true;
            for (; e.overlapsAny(d) && !(_ > 9); )
              m
                ? e.move(p[y])
                : (d &&
                    d.length > 0 &&
                    (h ||
                      (h = {
                        topMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          "top",
                        ),
                        bottomMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          "bottom",
                        ),
                        leftMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          "left",
                        ),
                        rightMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          "right",
                        ),
                      }),
                    BoxPosition.moveToMinimumDistancePlacement(e, p[y], h)),
                  (m = true)),
                _++;
          }
          return e;
        })(y, m);
        e.move(g.toCSSCompatValues(n));
      }
      constructor(e) {
        var n;
        let d, p, h, y, _, m;
        if (
          (e instanceof CueStyleBox && e.cue
            ? (n = e.cue) && "" !== n.vertical
              ? (this.property = "width")
              : (this.property = "height")
            : e instanceof BoxPosition &&
              (this.property = e.property || "height"),
          e instanceof CueStyleBox && e.div)
        ) {
          (h = e.div.offsetHeight),
            (y = e.div.offsetWidth),
            (_ = e.div.offsetTop);
          const n = e.div.firstChild;
          if (
            ((m = n
              ? n.getBoundingClientRect()
              : e.div.getBoundingClientRect()),
            (d = (m && m[this.property]) || null),
            n && n.firstChild)
          ) {
            const e = n.firstChild;
            if (e && "string" == typeof e.textContent) {
              p = d / this.calculateNewLines(e.textContent);
            }
          }
        } else e instanceof BoxPosition && (m = e);
        (this.left = m.left),
          (this.right = m.right),
          (this.top = m.top || _),
          (this.height = m.height || h),
          (this.bottom = m.bottom || _ + (m.height || h)),
          (this.width = m.width || y),
          (this.lineHeight = null !== d ? d : m.lineHeight),
          (this.singleLineHeight = null !== p ? p : m.singleLineHeight),
          this.singleLineHeight || (this.singleLineHeight = 41);
      }
    }
    n.BoxPosition = BoxPosition;
    class WebVTTRenderer {
      initSubtitleCSS() {
        const e = [
          new qi.VTTCue(0, 0, "String to init CSS - Won't be visible to user"),
        ];
        (this.paddedOverlay.style.opacity = "0"),
          this.processCues(e),
          this.processCues([]),
          (this.paddedOverlay.style.opacity = "1");
      }
      convertCueToDOMTree(e) {
        return e
          ? Hi.default.parseContent(this.window, e, this.globalStyleCollection)
          : null;
      }
      setStyles(e) {
        function applyStyles(e, n, d) {
          for (const p in n)
            n.hasOwnProperty(p) &&
              ((!0 === d && void 0 !== e[p]) || !1 === d) &&
              (e[p] = n[p]);
        }
        for (const n in e) {
          let d = true,
            p = null;
          "::cue" === n
            ? ((p = this.foregroundStyleOptions), (d = true))
            : "::-webkit-media-text-track-display" === n &&
              ((p = this.backgroundStyleOptions), (d = true));
          const y = e[n];
          if (!0 === d) applyStyles(p, y, d);
          else
            for (let e = 0; e < h.length; e++) {
              const p = h[e].exec(n);
              if (p && 4 === p.length) {
                const e = p[2],
                  n = {};
                applyStyles(n, y, d), (this.globalStyleCollection[e] = n);
              }
            }
        }
        this.initSubtitleCSS(),
          this.loggingEnabled &&
            (console.log(
              "WebVTTRenderer setStyles foregroundStyleOptions: " +
                JSON.stringify(this.foregroundStyleOptions),
            ),
            console.log(
              "WebVTTRenderer setStyles backgroundStyleOptions: " +
                JSON.stringify(this.backgroundStyleOptions),
            ),
            console.log(
              "WebVTTRenderer setStyles globalStyleCollection: " +
                JSON.stringify(this.globalStyleCollection),
            ));
      }
      processCues(e) {
        if (!e) return;
        for (; this.paddedOverlay.firstChild; )
          this.paddedOverlay.removeChild(this.paddedOverlay.firstChild);
        if (
          !(function (e) {
            for (let n = 0; n < e.length; n++)
              if (e[n].hasBeenReset || !e[n].displayState) return true;
            return true;
          })(e)
        ) {
          for (let n = 0; n < e.length; n++)
            this.paddedOverlay.appendChild(e[n].displayState);
          return;
        }
        const n = [],
          d = BoxPosition.getSimpleBoxPosition(this.paddedOverlay);
        e.length > 1 &&
          (e = (function (e) {
            const n = [];
            let d = 0;
            for (let p = 0; p < e.length; p++) {
              let h = e[p];
              if ("number" != typeof h.line) return e;
              (d += h.line), n.push(h);
            }
            return (
              (d /= e.length),
              d > 50
                ? (n.forEach(function (e) {
                    e.axis = "-y";
                  }),
                  n.sort((e, n) => n.line - e.line))
                : (n.forEach(function (e) {
                    e.axis = "+y";
                  }),
                  n.sort((e, n) => e.line - n.line)),
              n
            );
          })(e));
        for (let p = 0; p < e.length; p++) {
          let h = e[p],
            y = new CueStyleBox(
              this.window,
              h,
              this.foregroundStyleOptions,
              this.backgroundStyleOptions,
              this.globalStyleCollection,
            );
          this.paddedOverlay.appendChild(y.div),
            BoxPosition.moveBoxToLinePosition(y, d, n),
            (h.displayState = y.div),
            n.push(BoxPosition.getSimpleBoxPosition(y));
        }
      }
      setSize(e, n) {
        e && (this.overlay.style.width = e + "px"),
          n && (this.overlay.style.height = n + "px");
      }
      getOverlay() {
        return this.overlay;
      }
      constructor(e, n, d = true) {
        if (!e) return null;
        (this.window = e),
          (this.overlay = n),
          (this.loggingEnabled = d),
          (this.foregroundStyleOptions = {
            fontFamily: "Helvetica",
            fontSize: "36px",
            color: "rgba(255, 255, 255, 1)",
            textShadow: "",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }),
          (this.backgroundStyleOptions = {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }),
          (this.globalStyleCollection = {});
        const p = e.document.createElement("div");
        (p.style.position = "absolute"),
          (p.style.left = "0"),
          (p.style.right = "0"),
          (p.style.top = "0"),
          (p.style.bottom = "0"),
          (p.style.margin = "1.5%"),
          (this.paddedOverlay = p),
          n.appendChild(this.paddedOverlay),
          this.initSubtitleCSS();
      }
    }
    (n.default = WebVTTRenderer), (n.WebVTTRenderer = WebVTTRenderer), p(zi, n);
  });
  unwrapExports(Qi),
    Qi.VTTCue,
    Qi.WebVTTRenderer,
    Qi.BoxPosition,
    Qi.CueStyleBox,
    Qi.StyleBox;
  var Xi = createCommonjsModule(function (e, n) {
    var d =
        (Vi && Vi.__createBinding) ||
        (Object.create
          ? function (e, n, d, p) {
              void 0 === p && (p = d),
                Object.defineProperty(e, p, {
                  enumerable: true,
                  get: function () {
                    return n[d];
                  },
                });
            }
          : function (e, n, d, p) {
              void 0 === p && (p = d), (e[p] = n[d]);
            }),
      p =
        (Vi && Vi.__exportStar) ||
        function (e, n) {
          for (var p in e) "default" === p || n.hasOwnProperty(p) || d(n, e, p);
        };
    Object.defineProperty(n, "__esModule", {
      value: true,
    }),
      p(Yi, n),
      p(Qi, n);
  });
  unwrapExports(Xi);
  var Ji = Xi.WebVTTRenderer;

  function isTextTrackID3FrameCue(e) {
    return (
      null != e &&
      "string" == typeof e.id &&
      void 0 !== e.value &&
      "string" == typeof e.value.key
    );
  }

  function _define_property$1f(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const {
    textTracksSwitched: Zi,
    textTracksUpdated: en,
    inlineStylesParsed: tn,
  } = lt;
  class TextTrackManager {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentTrack() {
      return this.tracks.find((e) => "showing" === e.mode);
    }
    set currentTrack(e) {
      if (!e) return;
      let n;
      saveTrack("mk-text-track", e),
        Qe.debug(
          `MEDIA_TRACK save track selection ${e.language},${e.label},${e.kind}`,
        ),
        this.extensionTracks
          ? (Qe.debug("MEDIA_TRACK Setting track on extension " + e.label),
            "Off" === e.label
              ? (this.clearCurrentlyPlayingTrack(),
                (n = this.extensionTracks.selectForcedTrack()),
                void 0 === n &&
                  this.onExtensionTextTrackSwitched({
                    track: e,
                  }))
              : (this.extensionTracks.textTrack = e))
          : (Qe.debug("MEDIA_TRACK Setting track on element " + e.label),
            this._tracks.forEach((n) => {
              n !== e && "showing" === n.mode && (n.mode = "disabled");
            }),
            e &&
              (Qe.debug(
                "MEDIA_TRACK setting track mode to showing for " + e.label,
              ),
              this.isTrackOff(e)
                ? ((this._tracks[0].mode = "showing"),
                  (n = this.selectNativeForcedTrack(
                    this.mediaElement.audioTracks,
                  )))
                : (e.mode = "showing"))),
        this.dispatcher.publish(Pt.forcedTextTrackChanged, n);
    }
    get tracks() {
      return this._tracks;
    }
    destroy() {
      if (
        ((this._isDestroyed = true),
        this.clearCurrentlyPlayingTrack(),
        this.extensionTracks)
      ) {
        const e = this.extensionTracks;
        e.removeEventListener(en, this.onExtensionTextTracksAdded),
          e.removeEventListener(Zi, this.onExtensionTextTrackSwitched),
          e.removeEventListener(tn, this.onExtensionInlineStylesParsed);
      } else
        this.mediaElement.textTracks.removeEventListener(
          "addtrack",
          this.onTextTrackAdded,
        ),
          this.mediaElement.textTracks.removeEventListener(
            "change",
            this.onTextTrackChanged,
          ),
          this.mediaElement.textTracks.removeEventListener(
            "removetrack",
            this.onTextTrackRemoved,
          ),
          this.mediaElement.removeEventListener("playing", this.onPlayStart);
      this.dispatcher.unsubscribe(
        Pt.audioTrackChanged,
        this.onAudioTrackAddedOrChanged,
      ),
        this.dispatcher.unsubscribe(
          Pt.audioTrackAdded,
          this.onAudioTrackAddedOrChanged,
        );
    }
    restoreSelectedTrack() {
      var e;
      const n = loadTrack("mk-text-track");
      if (
        (null === (e = this.tracks) || void 0 === e ? void 0 : e.length) >= 0 &&
        void 0 !== n &&
        (void 0 === this.currentTrack || !trackEquals(this.currentTrack, n))
      )
        for (const d of this.tracks)
          if (trackEquals(d, n)) {
            Qe.debug("Found track matching persisted track: " + d.label),
              (this.currentTrack = d);
            break;
          }
    }
    getSavedTrack() {
      return loadTrack("mk-text-track");
    }
    onExtensionInlineStylesParsed(e) {
      Qe.debug("MEDIA_TRACK Extension inline styles parsed", e),
        this.renderer.setStyles(e.styles);
    }
    onExtensionTextTracksAdded(e) {
      Qe.debug(
        "MEDIA_TRACK Extension text tracks updated " + JSON.stringify(e),
      ),
        this._tracks.push(...e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(Pt.textTrackAdded, e);
    }
    onExtensionTextTrackSwitched(e) {
      Qe.debug("MEDIA_TRACKS Extension text track switched " + e),
        this.handleVTT(e);
      const n = e.track;
      if (this._tracks) {
        const preserveSelectedTrack = (d) => {
          e.track
            ? (n.forced && "Off" === d.label) ||
              ("Off" === n.label && "Off" === d.label)
              ? (d.mode = "showing")
              : (d.mode =
                  e.track.persistentID === d.id ? "showing" : "disabled")
            : (d.mode = "Off" === d.label ? "showing" : "disabled");
        };
        this._tracks.forEach(preserveSelectedTrack);
      }
      this.dispatcher.publish(Pt.textTrackChanged, e);
    }
    handleVTT(e) {
      const n = e && e.track && e.track.id;
      if (void 0 !== n && n >= 0) {
        const e = this.filterSelectableTextTracks(this.mediaElement.textTracks)[
          n
        ];
        this.onNativeTrackChange(e);
      } else this.clearCurrentlyPlayingTrack();
    }
    onAudioTrackAddedOrChanged(e, n) {
      if (
        (Qe.debug("MEDIA_TRACKS text track manager detects audio track change"),
        this.shouldForceSubtitle())
      )
        if (this.extensionTracks) {
          Qe.debug("MEDIA_TRACKS selecting forced text track via extension");
          const e = this.extensionTracks.selectForcedTrack();
          e
            ? this.dispatcher.publish(Pt.forcedTextTrackChanged, e)
            : this.clearCurrentlyPlayingTrack();
        } else
          Qe.debug("MEDIA_TRACKS selecting forced text track natively"),
            (this.currentTrack = this._tracks[0]);
    }
    onTextTrackAdded(e) {
      this._tracks.push(e.track), this.dispatcher.publish(Pt.textTrackAdded, e);
    }
    onPlayStart() {
      this.restoreSelectedTrack();
    }
    onTextTrackRemoved(e) {
      this.dispatcher.publish(Pt.textTrackRemoved, e);
    }
    onTextTrackChanged(e) {
      const n = this.findNativeSelectedTextTrack();
      let d = this.getSavedTrack();
      if ((d || (d = this._tracks[0]), n && !trackEquals(n, d)))
        if (this.isTrackOff(d) && "forced" !== n.kind) {
          const e = this.tracks.find((e) => trackEquals(e, d));
          this.currentTrack = e;
        } else {
          const e = this.findNativeTrack(d);
          e && (this.currentTrack = e);
        }
      else this.dispatcher.publish(Pt.textTrackChanged, e);
    }
    findNativeSelectedTextTrack() {
      for (let e = 0; e < this.mediaElement.textTracks.length; e++) {
        const n = this.mediaElement.textTracks[e];
        if ("showing" === n.mode) return n;
      }
    }
    findNativeTrack(e) {
      for (let n = 0; n < this.mediaElement.textTracks.length; n++) {
        const d = this.mediaElement.textTracks[n];
        if (trackEquals(d, e)) return d;
      }
    }
    selectNativeForcedTrack(e) {
      for (let n = 0; n < e.length; n++) {
        const d = e[n];
        if (d.enabled) {
          const e = this.findNativeForcedTrack(d);
          return e && "showing" !== e.mode && (e.mode = "showing"), e;
        }
      }
    }
    findNativeForcedTrack(e) {
      const n = this.mediaElement.textTracks;
      for (let d = 0; d < n.length; d++) {
        const p = n[d];
        if ("forced" === p.kind && p.language === e.language) return p;
      }
    }
    onNativeTrackChange(e) {
      this.clearCurrentlyPlayingTrack(),
        (this._currentlyPlayingTrack = e),
        e.addEventListener("cuechange", this.onCueChange);
    }
    clearCurrentlyPlayingTrack() {
      void 0 !== this._currentlyPlayingTrack &&
        (function (e) {
          return (
            null != e && "string" == typeof e.id && "removeEventListener" in e
          );
        })(this._currentlyPlayingTrack) &&
        (this._currentlyPlayingTrack.removeEventListener(
          "cuechange",
          this.onCueChange,
        ),
        this.renderer.processCues({}),
        delete this._currentlyPlayingTrack);
    }
    onCueChange(e) {
      const n = e && e.target && e.target.activeCues;
      n && this.renderer.processCues(n);
    }
    filterSelectableTextTracks(e) {
      const n = [];
      for (let d = 0; d < e.length; d++) {
        const p = e[d];
        ("captions" === p.kind ||
          "subtitles" === p.kind ||
          ("metadata" === p.kind && p.customTextTrackCueRenderer)) &&
          n.push(p);
      }
      return n;
    }
    shouldForceSubtitle() {
      Qe.debug("MEDIA_TRACKS Determining whether to select forced text track");
      const e = this.getSavedTrack();
      return !e || this.isTrackOff(e);
    }
    isTrackOff(e) {
      return "Off" === e.label || "Auto" === e.label;
    }
    constructor(e, n, d) {
      _define_property$1f(this, "mediaElement", void 0),
        _define_property$1f(this, "dispatcher", void 0),
        _define_property$1f(this, "extensionTracks", void 0),
        _define_property$1f(this, "_tracks", void 0),
        _define_property$1f(this, "renderer", void 0),
        _define_property$1f(this, "_currentlyPlayingTrack", void 0),
        _define_property$1f(this, "_isDestroyed", void 0),
        (this.mediaElement = e),
        (this.dispatcher = n),
        (this.extensionTracks = d),
        (this._tracks = []),
        (this._isDestroyed = true);
      const p = this.getSavedTrack();
      if (
        (this._tracks.push({
          id: -2,
          label: "Off",
          language: "",
          kind: "subtitles",
          mode: !p || this.isTrackOff(p) ? "showing" : "disabled",
        }),
        this.extensionTracks)
      ) {
        Qe.debug(
          "MEDIA_TRACK Initializing text track manager for HLS.js track events",
        );
        const n = e.parentElement;
        (this.renderer = new Ji(window, n, true)),
          this.renderer.setStyles({
            "::cue": {
              fontSize: "calc(1vw + 1em)",
            },
          }),
          (this.onExtensionTextTracksAdded =
            this.onExtensionTextTracksAdded.bind(this)),
          (this.onExtensionTextTrackSwitched =
            this.onExtensionTextTrackSwitched.bind(this)),
          (this.onExtensionInlineStylesParsed =
            this.onExtensionInlineStylesParsed.bind(this)),
          (this.onCueChange = this.onCueChange.bind(this));
        const d = this.extensionTracks;
        d.addEventListener(en, this.onExtensionTextTracksAdded),
          d.addEventListener(Zi, this.onExtensionTextTrackSwitched),
          d.addEventListener(tn, this.onExtensionInlineStylesParsed);
      } else
        Qe.debug(
          "MEDIA_TRACK Initializing text track manager for native track events",
        ),
          (this.onTextTrackAdded = this.onTextTrackAdded.bind(this)),
          (this.onTextTrackChanged = this.onTextTrackChanged.bind(this)),
          (this.onTextTrackRemoved = this.onTextTrackRemoved.bind(this)),
          (this.onPlayStart = this.onPlayStart.bind(this)),
          e.textTracks.addEventListener("addtrack", this.onTextTrackAdded),
          e.textTracks.addEventListener("change", this.onTextTrackChanged),
          e.textTracks.addEventListener("removetrack", this.onTextTrackRemoved),
          e.addEventListener("playing", this.onPlayStart);
      (this.onAudioTrackAddedOrChanged = debounce(
        this.onAudioTrackAddedOrChanged.bind(this),
      )),
        n.subscribe(Pt.audioTrackChanged, this.onAudioTrackAddedOrChanged),
        n.subscribe(Pt.audioTrackAdded, this.onAudioTrackAddedOrChanged);
    }
  }

  function asyncGeneratorStep$T(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$T(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$T(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$T(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1e(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$p(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const rn = {
      "picture-in-picture": e.PresentationMode.pictureinpicture,
      inline: e.PresentationMode.inline,
    },
    nn = {};
  (nn[e.PresentationMode.pictureinpicture] = "picture-in-picture"),
    (nn[e.PresentationMode.inline] = "inline");
  const { presentationModeDidChange: on } = Pt,
    { playbackLicenseError: an } = lt,
    { stopped: sn } = e.PlaybackStates;
  class VideoPlayer extends BasePlayer {
    get audioTracks() {
      var e, n;
      return null !==
        (n =
          null === (e = this.audioTrackManager) || void 0 === e
            ? void 0
            : e.tracks) && void 0 !== n
        ? n
        : [];
    }
    get containerElement() {
      return this._context.videoContainerElement
        ? this._context.videoContainerElement
        : document.getElementById("apple-music-video-container");
    }
    get currentAudioTrack() {
      var e;
      return null === (e = this.audioTrackManager) || void 0 === e
        ? void 0
        : e.currentTrack;
    }
    set currentAudioTrack(e) {
      void 0 !== this.audioTrackManager &&
        (this.audioTrackManager.currentTrack = e);
    }
    get currentTextTrack() {
      var e;
      return null === (e = this.textTrackManager) || void 0 === e
        ? void 0
        : e.currentTrack;
    }
    set currentTextTrack(e) {
      void 0 !== this.textTrackManager &&
        (this.textTrackManager.currentTrack = e);
    }
    get _targetElement() {
      return (
        this.video ||
        (function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var d = null != arguments[n] ? arguments[n] : {},
              p = Object.keys(d);
            "function" == typeof Object.getOwnPropertySymbols &&
              (p = p.concat(
                Object.getOwnPropertySymbols(d).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(d, e).enumerable;
                }),
              )),
              p.forEach(function (n) {
                _define_property$1e(e, n, d[n]);
              });
          }
          return e;
        })({}, document.createElement("video"))
      );
    }
    get textTracks() {
      var e, n;
      return null !==
        (n =
          null === (e = this.textTrackManager) || void 0 === e
            ? void 0
            : e.tracks) && void 0 !== n
        ? n
        : [];
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$T(function* () {
        const { os: n } = e.services.runtime;
        e.restrictPlatforms && n.isAndroid
          ? Qe.warn(
              "videoPlayer.initializeExtension Not supported on the current platform",
            )
          : e.video ||
            Qe.warn(
              "videoPlayer.initializeExtension No video element, not initializing extension",
            );
      })();
    }
    onPlaybackLicenseError(e) {
      this.resetDeferredPlay(), this._dispatcher.publish(an, e);
    }
    setupTrackManagers(e) {
      var n, d, p, h;
      null === (d = this.textTrackManager) ||
        void 0 === d ||
        null === (n = d.destroy) ||
        void 0 === n ||
        n.call(d),
        (this.textTrackManager = new TextTrackManager(
          this._targetElement,
          this._dispatcher,
          e,
        )),
        null === (h = this.audioTrackManager) ||
          void 0 === h ||
          null === (p = h.destroy) ||
          void 0 === p ||
          p.call(h),
        (this.audioTrackManager = new AudioTrackManager(
          this._targetElement,
          this._dispatcher,
          e,
        ));
    }
    destroy() {
      var e, n;
      this.finishPlaybackSequence(),
        null === (e = this.textTrackManager) || void 0 === e || e.destroy(),
        null === (n = this.audioTrackManager) || void 0 === n || n.destroy(),
        super.destroy();
    }
    initializeEventHandlers() {
      var e = this,
        _superprop_get_initializeEventHandlers = () =>
          super.initializeEventHandlers;
      return _async_to_generator$T(function* () {
        _superprop_get_initializeEventHandlers().call(e),
          e.hasMediaElement &&
            (e._targetElement.addEventListener(
              "webkitpresentationmodechanged",
              e.pipEventHandler,
            ),
            e._targetElement.addEventListener(
              "enterpictureinpicture",
              e.pipEventHandler,
            ),
            e._targetElement.addEventListener(
              "leavepictureinpicture",
              e.pipEventHandler,
            ));
      })();
    }
    removeEventHandlers() {
      if ((super.removeEventHandlers(), !this.hasMediaElement)) return;
      const { _targetElement: e } = this;
      e.removeEventListener(
        "webkitpresentationmodechanged",
        this.pipEventHandler,
      ),
        e.removeEventListener("enterpictureinpicture", this.pipEventHandler),
        e.removeEventListener("leavepictureinpicture", this.pipEventHandler);
    }
    initializeMediaElement() {
      var e = this;
      return _async_to_generator$T(function* () {
        Qe.debug(
          "videoPlayer.initializeMediaElement Initializing media element",
        );
        const n = e.containerElement;
        n
          ? ((e.video = (function () {
              let e = Bi.pop();
              return (
                e
                  ? Qe.debug(
                      `dom-helpers: retrieving video tag, ${Bi.length} remain`,
                    )
                  : (Qe.debug(
                      "dom-helpers: no available video tags, creating one",
                    ),
                    (e = document.createElement("video"))),
                e
              );
            })()),
            (e.video.autoplay = true),
            (e.video.controls = true),
            (e.video.playsInline = true),
            (e.video.id = "apple-music-video-player"),
            n.appendChild(e.video))
          : Qe.warn(
              "videoPlayer.initializeMediaElement No video element; no container defined",
            );
      })();
    }
    isPlayerSupported() {
      return this.services.runtime.isES2015Supported;
    }
    _stopMediaElement() {
      var e = this,
        _superprop_get__stopMediaElement = () => super._stopMediaElement;
      return _async_to_generator$T(function* () {
        yield _superprop_get__stopMediaElement().call(e), e.destroy();
      })();
    }
    pipEventHandler(n) {
      switch (n.type) {
        case "enterpictureinpicture":
          this._dispatcher.publish(on, {
            mode: e.PresentationMode.pictureinpicture,
          });
          break;
        case "leavepictureinpicture":
          this._dispatcher.publish(on, {
            mode: e.PresentationMode.inline,
          });
          break;
        case "webkitpresentationmodechanged": {
          const e = this._targetElement;
          this._dispatcher.publish(on, {
            mode: this._translateStringToPresentationMode(
              e.webkitPresentationMode,
            ),
          });
          break;
        }
      }
    }
    playItemFromEncryptedSource(n, d = true, p = {}) {
      var h = this;
      return _async_to_generator$T(function* () {
        if (
          (Qe.debug("videoPlayer.playItemFromEncryptedSource", n, d),
          h.playbackState === sn)
        )
          return void Qe.debug(
            "video-player.playItemFromEncryptedSource aborting playback because player is stopped",
          );
        (n.playbackType = e.PlaybackType.encryptedFull),
          (h.nowPlayingItem = n),
          (n.state = D.loading),
          (h.userInitiated = d);
        const y = generateAssetUrl(n, p);
        yield h.playHlsStream(y, n, p);
      })();
    }
    playItemFromUnencryptedSource(e, n, d) {
      var p = this;
      return _async_to_generator$T(function* () {
        if (
          (Qe.debug("videoPlayer.playItemFromUnencryptedSource", e, n),
          p.playbackState === sn)
        )
          return void Qe.debug(
            "videoPlayer.playItemFromUnencryptedSource aborting playback because player is stopped",
          );
        const [d] = e.split("?");
        d.endsWith("m3u") || d.endsWith("m3u8")
          ? yield p.playHlsStream(e)
          : yield p._playAssetURL(e, n);
      })();
    }
    setPresentationMode(n) {
      var d = this;
      return _async_to_generator$T(function* () {
        const p = d._targetElement;
        if (
          p.webkitSupportsPresentationMode &&
          "function" == typeof p.webkitSetPresentationMode
        )
          return p.webkitSetPresentationMode(
            d._translatePresentationModeToString(n),
          );
        if (p.requestPictureInPicture && document.exitPictureInPicture) {
          if (n === e.PresentationMode.pictureinpicture)
            return p.requestPictureInPicture();
          if (n === e.PresentationMode.inline)
            return document.exitPictureInPicture();
        }
      })();
    }
    _translateStringToPresentationMode(n) {
      let d = rn[n];
      return (
        void 0 === d &&
          (Qe.warn(
            `videoPlayer._translateStringToPresentationMode ${n} is not a valid presentation mode, setting to inline`,
          ),
          (d = e.PresentationMode.inline)),
        d
      );
    }
    _translatePresentationModeToString(e) {
      let n = nn[e];
      return (
        void 0 === n &&
          (Qe.warn(
            `videoPlayer._translatePresentationModeToString ${e} is not a valid presentation mode, setting to inline`,
          ),
          (n = "inline")),
        n
      );
    }
    setNextSeamlessItem(e) {
      return _async_to_generator$T(function* () {})();
    }
    constructor(e) {
      super(e),
        _define_property$1e(this, "extension", void 0),
        _define_property$1e(this, "video", void 0),
        _define_property$1e(this, "mediaPlayerType", "video"),
        _define_property$1e(this, "restrictPlatforms", void 0),
        _define_property$1e(this, "textTrackManager", void 0),
        _define_property$1e(this, "audioTrackManager", void 0),
        _define_property$1e(this, "_shouldLoadManifestsOnce", true),
        _define_property$1e(this, "userInitiated", true),
        (this.restrictPlatforms =
          !("restrict-platforms" in at.features) ||
          at.features["restrict-platforms"]),
        (this.pipEventHandler = this.pipEventHandler.bind(this)),
        (this._shouldLoadManifestsOnce = shouldLoadManifestOnce());
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$p("design:type", Function),
      _ts_metadata$p("design:paramtypes", [void 0]),
      _ts_metadata$p("design:returntype", void 0),
    ],
    VideoPlayer.prototype,
    "onPlaybackLicenseError",
    null,
  );
  const decayingOperation = (e, n, d, p = 0) =>
    e().catch((h) => {
      const y = p + 1;

      function possiblyRetry(p) {
        if (p && y < 3) {
          const p = 1e3 * y;
          return new Promise((h, _) => {
            setTimeout(() => {
              decayingOperation(e, n, d, y).then(h, _);
            }, p);
          });
        }
        throw h;
      }
      const _ = n(h);
      return "boolean" == typeof _ ? possiblyRetry(_) : _.then(possiblyRetry);
    });
  let cn = {
    developerToken: "developerTokenNotSet",
    musicUserToken: "musicUserTokenNotSet",
    cid: "cidNotSet",
  };

  function asyncGeneratorStep$S(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$S(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$S(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$S(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1d(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$u(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1d(e, n, d[n]);
        });
    }
    return e;
  }

  function createHlsOffersLicenseChallengeBody(e) {
    return {
      "adam-id": e.id,
      id: 1,
    };
  }

  function createStreamingKeysLicenseChallengeBody(e, n, d = 0) {
    var p;
    return _object_spread$u(
      {
        id: d,
        "lease-action": n,
      },
      null !== (p = e.keyServerQueryParameters) && void 0 !== p ? p : {},
    );
  }

  function createLicenseChallengeBody(e, n, d, p, h, y) {
    let _;
    const m = {
      challenge: d.challenge || te(d.licenseChallenge),
      "key-system": p,
      uri: d.keyuri,
    };
    return (
      y && (m["extended-lease"] = y),
      (_ = n.isUTS
        ? {
            "streaming-request": {
              version: 1,
              "streaming-keys": [
                _object_spread$u(
                  {},
                  m,
                  createStreamingKeysLicenseChallengeBody(n, e),
                ),
              ],
            },
          }
        : n.isLiveRadioStation
          ? _object_spread$u(
              {},
              m,
              (function (e) {
                return {
                  event: e.isLiveAudioStation ? "beats1" : "amtv",
                };
              })(n),
            )
          : n.hasOffersHlsUrl
            ? {
                "license-requests": [
                  _object_spread$u(
                    {},
                    m,
                    createHlsOffersLicenseChallengeBody(n),
                  ),
                ],
              }
            : _object_spread$u(
                {},
                m,
                (function (e, n = true) {
                  return {
                    adamId: e.songId,
                    isLibrary: e.isCloudItem,
                    "user-initiated": n,
                  };
                })(n, h),
              )),
      _
    );
  }
  class License {
    fetch(e) {
      const n = {
        Authorization: "Bearer " + cn.developerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Apple-Music-User-Token": "" + cn.musicUserToken,
      };
      this.keySystem === ot.WIDEVINE && (n["X-Apple-Renewal"] = true);
      const d = new Headers(n);
      return decayingOperation(
        () =>
          fetch(this.licenseUrl, {
            method: "POST",
            body: JSON.stringify(e),
            headers: d,
          }),
        (e) => e instanceof TypeError,
        "license fetch",
      );
    }
    reset() {
      (this.licenseUrl = void 0),
        (this.playableItem = void 0),
        (this.data = void 0),
        (this.initiated = void 0),
        (this.keySystem = void 0),
        (this.startResponse = void 0);
    }
    start(e, n, d, p, h = true, y = true) {
      var _ = this;
      return _async_to_generator$S(function* () {
        (_.licenseUrl = e),
          (_.playableItem = n),
          (_.data = d),
          (_.keySystem = p),
          (_.initiated = h);
        const m = d.isRenewalRequest ? "renew" : "start",
          g = createLicenseChallengeBody(m, n, d, p, h, y);
        n.hasOffersHlsUrl &&
          !_.licenseUrl.includes("start") &&
          (_.licenseUrl += "/" + m),
          (_.startResponse = _.fetch(g));
        try {
          var b, P, S;
          const e = yield _.startResponse;
          if (!e.ok) {
            let n;
            try {
              n = yield e.json();
            } catch (Vt) {}
            _.processJsonError(n);
          }
          const n = yield e.json();
          let d = n;
          return (
            (
              null == n ||
              null === (P = n["streaming-response"]) ||
              void 0 === P ||
              null === (b = P["streaming-keys"]) ||
              void 0 === b
                ? void 0
                : b.length
            )
              ? (d = n["streaming-response"]["streaming-keys"][0])
              : (null == n ||
                null === (S = n["license-responses"]) ||
                void 0 === S
                  ? void 0
                  : S.length) && (d = n["license-responses"][0]),
            0 !== d.status && _.processJsonError(d),
            d
          );
        } catch (V) {
          throw ((_.startResponse = void 0), V);
        }
      })();
    }
    processJsonError(e) {
      let n = new MKError(
        MKError.Reason.MEDIA_LICENSE,
        "Error acquiring license",
      );
      if (
        ((null == e ? void 0 : e.errorCode) && (e.status = e.errorCode),
        -1021 === (null == e ? void 0 : e.status) && (e.status = 190121),
        e && 0 !== e.status)
      ) {
        if (!e.message)
          switch (e.status) {
            case -1004:
              e.message = MKError.Reason.DEVICE_LIMIT;
              break;
            case -1017:
              e.message = MKError.Reason.GEO_BLOCK;
              break;
            default:
              e.message = MKError.Reason.MEDIA_LICENSE;
          }
        (n = MKError.serverError(e)),
          (n.data = e),
          n.reason === MKError.Reason.PLAYREADY_CBC_ENCRYPTION_ERROR &&
            (function () {
              const e = getSessionStorage();
              e && e.setItem("mk-playready-cbcs-unsupported", "true");
            })();
      }
      throw n;
    }
    stop() {
      var e = this;
      return _async_to_generator$S(function* () {
        if (e.startResponse)
          try {
            yield e.startResponse;
          } catch (V) {}
        if (!e.playableItem || !e.data || !e.licenseUrl) return;
        if (!e.playableItem.isUTS) return;
        const n = createLicenseChallengeBody(
            "stop",
            e.playableItem,
            e.data,
            e.keySystem,
            e.initiated,
          ),
          d = e.fetch(n);
        e.reset();
        try {
          yield d;
        } catch (V) {
          Qe.warn("license.stop request error", V);
        }
      })();
    }
    constructor() {
      _define_property$1d(this, "licenseUrl", void 0),
        _define_property$1d(this, "playableItem", void 0),
        _define_property$1d(this, "data", void 0),
        _define_property$1d(this, "initiated", void 0),
        _define_property$1d(this, "keySystem", void 0),
        _define_property$1d(this, "startResponse", void 0);
    }
  }

  function asyncGeneratorStep$R(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$R(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$R(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$R(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1c(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$o(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class KeySession extends Notifications {
    get extID() {
      if (this.extURI) return this.extURI.replace("data:;base64,", "");
    }
    get isFairplay() {
      return this.keySystem === ot.FAIRPLAY;
    }
    get isPlayReady() {
      return this.keySystem === ot.PLAYREADY;
    }
    get isWidevine() {
      return this.keySystem === ot.WIDEVINE;
    }
    acquirePlaybackLicense(e, n, d, p) {
      var h = this;
      return _async_to_generator$R(function* () {
        if (!h.keyServerURL || !h.developerToken || !h.userToken) return;
        const { keyServerURL: d, keySystem: y } = h,
          _ = p.item;
        try {
          return yield h.license.start(
            d,
            _,
            {
              challenge: n,
              keyuri: e,
            },
            y,
            h.initiated,
            h.isLegacyEme && _.isUTS,
          );
        } catch (Vt) {
          h.dispatchEvent(lt.playbackLicenseError, Vt);
        }
      })();
    }
    startLicenseSession(e) {
      var n = this;
      return _async_to_generator$R(function* () {
        let d;
        Qe.debug("Starting License Session", e);
        const { message: p, target: h, messageType: y } = e;
        if (n.keySystem !== ot.FAIRPLAY && "license-request" !== y)
          return void Qe.debug("not making license request for", y);
        if (n.isPlayReady) {
          const e = String.fromCharCode.apply(
            null,
            new Uint16Array(p.buffer || p),
          );
          d = new DOMParser()
            .parseFromString(e, "application/xml")
            .getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;
        } else d = te(new Uint8Array(p));
        const _ = h.extURI || n.extURI,
          m = n.mediaKeySessions[_];
        if (!m)
          return void Qe.debug("no key session info, aborting license request");
        const g = n.acquirePlaybackLicense(_, d, n.initiated, m);
        if (m.delayCdmUpdate) m["license-json"] = g;
        else {
          const e = yield g;
          yield n.handleLicenseJson(e, h, _);
        }
      })();
    }
    setKeyURLs(e) {
      (this.keyCertURL =
        e[this.isFairplay ? "hls-key-cert-url" : "widevine-cert-url"]),
        (this.keyServerURL = e["hls-key-server-url"]);
    }
    dispatchKeyError(e) {
      var n, d;
      this.isFairplay &&
      4294955417 ===
        (null == e ||
        null === (d = e.target) ||
        void 0 === d ||
        null === (n = d.error) ||
        void 0 === n
          ? void 0
          : n.systemCode)
        ? Qe.error("Ignoring error", e)
        : (console.error(
            MKError.Reason.MEDIA_KEY + " error in dispatchKeyError:",
            e,
          ),
          this.dispatchEvent(
            lt.playbackSessionError,
            new MKError(MKError.Reason.MEDIA_KEY, e),
          ));
    }
    dispatchSessionError(e) {
      this.dispatchEvent(
        lt.playbackSessionError,
        new MKError(MKError.Reason.MEDIA_SESSION, e),
      );
    }
    loadCertificateBuffer() {
      var e = this;
      return _async_to_generator$R(function* () {
        if (!e.keyCertURL)
          return Promise.reject(
            new MKError(MKError.Reason.MEDIA_SESSION, "No certificate URL"),
          );
        let n;
        try {
          n = yield fetch(`${e.keyCertURL}?t=${Date.now()}`);
        } catch (V) {
          throw (e.dispatchKeyError(V), V);
        }
        const d = yield n.arrayBuffer(),
          p = String.fromCharCode.apply(String, new Uint8Array(d));
        return /^\<\?xml/.test(p)
          ? Promise.reject(
              new MKError(
                MKError.Reason.MEDIA_CERTIFICATE,
                "Invalid certificate.",
              ),
            )
          : d;
      })();
    }
    handleSessionCreation(e) {
      var n = this;
      return _async_to_generator$R(function* () {
        return n.createSession(e).catch((e) => {
          n.dispatchSessionError(e);
        });
      })();
    }
    handleLicenseJson(e, n, d) {
      var p = this;
      return _async_to_generator$R(function* () {
        if (
          (Qe.debug(`updating session ${d} with license response`, e),
          null == e ? void 0 : e.license)
        ) {
          const d = J(e.license);
          try {
            yield n.update(d);
          } catch (Vt) {
            Qe.error("Failed to updated media keys", Vt),
              p.dispatchKeyError(Vt);
          }
        }
      })();
    }
    addMediaKeySessionInfo(e, n, d, p = true) {
      const h = this.mediaKeySessions[e];
      h
        ? (Qe.debug(
            `keySession info exists for ${d.title}, making existing session ${h.session.sessionId} the old session`,
          ),
          (h.oldSession = h.session),
          (h.session = n))
        : (Qe.debug("creating key session info for " + d.title),
          (this.mediaKeySessions[e] = {
            session: n,
            item: d,
            delayCdmUpdate: p,
          }));
    }
    stopLicenseSession() {
      Qe.info("key session sending license stop"), this.license.stop();
    }
    constructor() {
      super([lt.playbackLicenseError, lt.playbackSessionError]),
        _define_property$1c(this, "developerToken", void 0),
        _define_property$1c(this, "adamId", void 0),
        _define_property$1c(this, "userToken", void 0),
        _define_property$1c(this, "extURI", void 0),
        _define_property$1c(this, "item", void 0),
        _define_property$1c(this, "initiated", true),
        _define_property$1c(this, "isLibrary", true),
        _define_property$1c(this, "keyCertURL", void 0),
        _define_property$1c(this, "keyServerURL", void 0),
        _define_property$1c(this, "keySystem", ot.FAIRPLAY),
        _define_property$1c(this, "isLegacyEme", true),
        _define_property$1c(this, "boundDispatchKeyError", void 0),
        _define_property$1c(this, "boundDispatchSessionError", void 0),
        _define_property$1c(this, "boundHandleSessionCreation", void 0),
        _define_property$1c(this, "boundStartLicenseSession", void 0),
        _define_property$1c(this, "mediaKeySessions", {}),
        _define_property$1c(this, "_pendingRenewal", void 0),
        _define_property$1c(this, "license", void 0),
        (this.boundDispatchKeyError = this.dispatchKeyError.bind(this)),
        (this.boundDispatchSessionError = this.dispatchSessionError.bind(this)),
        (this.boundHandleSessionCreation =
          this.handleSessionCreation.bind(this)),
        (this.boundStartLicenseSession = this.startLicenseSession.bind(this)),
        (this.license = new License());
    }
  }

  function asyncGeneratorStep$Q(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$Q(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$Q(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$Q(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1b(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$n(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$o("design:type", Function),
      _ts_metadata$o("design:paramtypes", [void 0]),
      _ts_metadata$o("design:returntype", Promise),
    ],
    KeySession.prototype,
    "startLicenseSession",
    null,
  );
  class FairplayEncryptedSession extends KeySession {
    attachMedia(e, n) {
      var d = this;
      return _async_to_generator$Q(function* () {
        (d.keySystem = n.keySystem),
          (d._keySystemAccess = n),
          e.addEventListener("encrypted", d.boundHandleSessionCreation, true);
      })();
    }
    detachMedia(e) {
      e.removeEventListener("encrypted", this.boundHandleSessionCreation);
      const n = this._mediaKeySessions,
        d = this._mediaKeySessionRenewals;
      Object.values(n).forEach((e) => {
        e.removeEventListener("message", this.boundStartLicenseSession),
          asAsync(e.close());
      }),
        (this._mediaKeySessions = {}),
        Object.values(d).forEach((e) => clearTimeout(e)),
        (this._mediaKeySessionRenewals = {});
    }
    createSession(e) {
      var n = this;
      return _async_to_generator$Q(function* () {
        Qe.debug("fairplay eme:  createSession", e);
        const d = n._keySystemAccess;
        if (!d) return;
        const { initData: p, target: h, initDataType: y } = e;
        var _;
        n._mediaKeysPromise ||
          (n._mediaKeysPromise = new Promise(
            ((_ = _async_to_generator$Q(function* (e, p) {
              const y = yield d.createMediaKeys();
              try {
                yield h.setMediaKeys(y), (n._mediaKeys = y);
                const e = yield n.loadCertificateBuffer();
                yield y.setServerCertificate(e);
              } catch (V) {
                n.dispatchKeyError(V), p(V);
              }
              e(y);
            })),
            function (e, n) {
              return _.apply(this, arguments);
            }),
          ));
        const m = yield n._mediaKeysPromise,
          g = new Uint8Array(p),
          b = String.fromCharCode.apply(void 0, Array.from(g));
        if (n.mediaKeySessions[b])
          return void Qe.error(
            "fairplay eme: not creating new session for extURI",
            b,
          );
        const P = m.createSession();
        Qe.debug("fairplay eme: creating new key session for", b),
          n.addMediaKeySessionInfo(b, P, n.item),
          P.addEventListener("message", n.startFairplayLicenseSession),
          (P.extURI = b),
          yield P.generateRequest(y, p),
          (n._mediaKeySessions[P.sessionId] = P),
          Qe.debug("fairplay eme: created session", P);
      })();
    }
    startFairplayLicenseSession(e) {
      const { message: n, target: d } = e,
        p = te(new Uint8Array(n)),
        h = d.extURI || this.extURI,
        y = this.mediaKeySessions[h];
      if (y)
        return this.acquirePlaybackLicense(h, p, this.initiated, y).then((e) =>
          this.handleLicenseJson(e, d, h),
        );
      Qe.debug(
        "fairplay eme: no key session info, aborting license request",
        h,
      );
    }
    handleLicenseJson(e, n, d) {
      var p = this,
        _superprop_get_handleLicenseJson = () => super.handleLicenseJson;
      return _async_to_generator$Q(function* () {
        if (!e) return;
        const h = p.mediaKeySessions[d];
        if (!h)
          return void Qe.debug(
            "fairplay eme: media key session does not exist, not updating",
          );
        const y = e["renew-after"];
        if (e.license && y) {
          Qe.debug("fairplay eme: got renew after value", y, d);
          const e = p._mediaKeySessionRenewals,
            _ = e[n.sessionId];
          _ && clearTimeout(_),
            (e[n.sessionId] = setTimeout(
              () => p._renewMediaKeySession(h, d),
              1e3 * y,
            ));
        }
        yield _superprop_get_handleLicenseJson().call(p, e, n, d);
      })();
    }
    _renewMediaKeySession(e, n) {
      delete this._mediaKeySessionRenewals[e.session.sessionId],
        Qe.debug("fairplay eme: renewing session", e),
        e.session.update(Z("renew"));
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e) {
      return _async_to_generator$Q(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$Q(function* () {})();
    }
    constructor(...e) {
      super(...e),
        _define_property$1b(this, "_keySystemAccess", void 0),
        _define_property$1b(this, "_mediaKeysPromise", void 0),
        _define_property$1b(this, "_mediaKeySessions", {}),
        _define_property$1b(this, "_mediaKeySessionRenewals", {}),
        _define_property$1b(this, "_mediaKeys", void 0);
    }
  }

  function asyncGeneratorStep$P(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$P(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$P(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$P(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1a(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$n("design:type", Function),
      _ts_metadata$n("design:paramtypes", [void 0]),
      _ts_metadata$n("design:returntype", void 0),
    ],
    FairplayEncryptedSession.prototype,
    "startFairplayLicenseSession",
    null,
  );
  const ln = /^(?:.*)(skd:\/\/.+)$/i;
  class WebKitSession extends KeySession {
    get isDestroyed() {
      return this._isDestroyed;
    }
    attachMedia(e, n) {
      return (
        (this.target = e),
        e.addEventListener(
          "webkitneedkey",
          this.boundHandleSessionCreation,
          true,
        ),
        e.addEventListener("webkitkeyerror", this.boundDispatchKeyError),
        e
      );
    }
    detachMedia(e) {
      e &&
        (e.removeEventListener(
          "webkitneedkey",
          this.boundHandleSessionCreation,
          true,
        ),
        e.removeEventListener("webkitkeyerror", this.boundDispatchKeyError));
    }
    destroy() {
      Qe.debug("FPS destroy"),
        (this._isDestroyed = true),
        this.detachMedia(this.target),
        this.session &&
          (this.session.removeEventListener(
            "webkitkeyerror",
            this.boundDispatchKeyError,
          ),
          this.session.removeEventListener(
            "webkitkeymessage",
            this.boundStartLicenseSession,
          ));
    }
    createSession(e) {
      Qe.debug("FPS createSession", e);
      const { initData: n, target: d } = e,
        { item: p } = this;
      if (!p)
        return Qe.error("Cannot createSession without item"), Promise.resolve();
      const h = this._extractAssetId(n);
      if ((Qe.debug("extURI", h), !d.webkitKeys && window.WebKitMediaKeys)) {
        const e = new window.WebKitMediaKeys(this.keySystem);
        d.webkitSetMediaKeys(e);
      }
      return this.loadCertificateBuffer().then((e) => {
        const y = this._concatInitDataIdAndCertificate(n, h, e),
          _ = "VIDEO" === d.tagName ? dt.AVC1 : dt.MP4,
          m = d.webkitKeys.createSession(_, y);
        this.addMediaKeySessionInfo(h, m, p),
          (this.session = m),
          (m.extURI = h),
          m.addEventListener("webkitkeyerror", this.boundDispatchKeyError),
          m.addEventListener("webkitkeymessage", this.boundStartLicenseSession);
      });
    }
    _extractAssetId(e) {
      let n = String.fromCharCode.apply(null, new Uint16Array(e.buffer || e));
      const d = n.match(ln);
      return (
        d && d.length >= 2 && (n = d[1]),
        Qe.debug("Extracted assetId from EXT-X-KEY URI", n),
        n
      );
    }
    _concatInitDataIdAndCertificate(e, n, d) {
      "string" == typeof n && (n = ee(n)), (d = new Uint8Array(d));
      let p = 0;
      const h = new ArrayBuffer(
          e.byteLength + 4 + n.byteLength + 4 + d.byteLength,
        ),
        y = new DataView(h);
      new Uint8Array(h, p, e.byteLength).set(e),
        (p += e.byteLength),
        y.setUint32(p, n.byteLength, true),
        (p += 4);
      const _ = new Uint8Array(h, p, n.byteLength);
      _.set(n),
        (p += _.byteLength),
        y.setUint32(p, d.byteLength, true),
        (p += 4);
      return (
        new Uint8Array(h, p, d.byteLength).set(d),
        new Uint8Array(h, 0, h.byteLength)
      );
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e) {
      return _async_to_generator$P(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$P(function* () {})();
    }
    constructor(...e) {
      super(...e),
        _define_property$1a(this, "target", void 0),
        _define_property$1a(this, "session", void 0),
        _define_property$1a(this, "_isDestroyed", true),
        _define_property$1a(this, "isLegacyEme", true);
    }
  }

  function asyncGeneratorStep$O(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$O(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$O(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$O(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  class MSSession extends KeySession {
    attachMedia(e, n) {
      return (
        (this.keySystem = n.keySystem),
        e.addEventListener("msneedkey", this.boundHandleSessionCreation, true),
        e.addEventListener("mskeyerror", this.boundDispatchKeyError),
        e
      );
    }
    detachMedia(e) {
      e.removeEventListener("msneedkey", this.boundHandleSessionCreation, true),
        e.removeEventListener("mskeyerror", this.boundDispatchKeyError);
    }
    createSession(e) {
      const { initData: n, target: d } = e;
      if (!d.msKeys) {
        const e = new MSMediaKeys(this.keySystem);
        d.msSetMediaKeys(e);
      }
      const p = d.msKeys.createSession(dt.MP4, n);
      return (
        p.addEventListener("mskeyerror", this.dispatchKeyError),
        p.addEventListener("mskeymessage", this.startLicenseSession.bind(this)),
        p
      );
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e) {
      return _async_to_generator$O(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$O(function* () {})();
    }
  }
  const dn = {
      [ot.WIDEVINE]: ut.WIDEVINE,
      [ot.FAIRPLAY]: ut.FAIRPLAY,
      [ot.PLAYREADY]: ut.PLAYREADY,
    },
    un = [
      0, 0, 1, 222, 112, 115, 115, 104, 0, 0, 0, 0, 154, 4, 240, 121, 152, 64,
      66, 134, 171, 146, 230, 91, 224, 136, 95, 149, 0, 0, 1, 190,
    ],
    pn = [190, 1, 0, 0, 1, 0, 1, 0, 180, 1];

  function concatenate(e, ...n) {
    let d = 0;
    for (const y of n) d += y.length;
    const p = new e(d);
    let h = 0;
    for (const y of n) p.set(y, h), (h += y.length);
    return p;
  }
  const { WIDEVINE: hn, PLAYREADY: yn } = ot,
    _n = {};
  (_n[hn] = (e) => {
    Qe.debug("generating Widevine pssh for keyId");
    const n = new Uint8Array([
      0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214,
      74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1, 18, 16,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    for (let d = 0; d < e.length; d++) n[n.length - 16 + d] = e[d];
    return Qe.debug("generatePSSH", n), n;
  }),
    (_n[yn] = (e) => {
      Qe.debug("generating Playready pssh for keyId"),
        ((e) => {
          const swap = (e, n, d) => {
            const p = e[n];
            (e[n] = e[d]), (e[d] = p);
          };
          swap(e, 0, 3), swap(e, 1, 2), swap(e, 4, 5), swap(e, 6, 7);
        })(e);
      const n = te(e),
        d =
          '<WRMHEADER xmlns="http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.3.0.0"><DATA><PROTECTINFO><KIDS><KID ALGID="AESCTR" VALUE="[KEYID]"></KID></KIDS></PROTECTINFO></DATA></WRMHEADER>'.replace(
            "[KEYID]",
            n,
          ),
        p = ee(d),
        h = new Uint8Array(p.buffer, p.byteOffset, p.byteLength);
      return concatenate(Uint8Array, un, pn, h);
    });

  function asyncGeneratorStep$N(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$N(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$N(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$N(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$19(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class PreloadingEncryptedSession extends KeySession {
    attachMedia(e, n) {
      (this.keySystem = n.keySystem),
        (this._keySystemAccess = n),
        (this._target = e);
    }
    detachMedia() {
      asAsync(this.clearSessions());
    }
    createSession(e) {
      return _async_to_generator$N(function* () {})();
    }
    _mediaKeysSetup() {
      var e = this;
      return _async_to_generator$N(function* () {
        const n = e._keySystemAccess;
        var d;
        n &&
          (e._mediaKeysPromise ||
            (e._mediaKeysPromise = new Promise(
              ((d = _async_to_generator$N(function* (d, p) {
                const h = yield n.createMediaKeys();
                try {
                  var y;
                  yield null === (y = e._target) || void 0 === y
                    ? void 0
                    : y.setMediaKeys(h),
                    (e._mediaKeys = h);
                } catch (V) {
                  e.dispatchKeyError(V), p(V);
                }
                if (e.isWidevine) {
                  const n = yield e.loadCertificateBuffer();
                  yield h.setServerCertificate(n);
                }
                d(h);
              })),
              function (e, n) {
                return d.apply(this, arguments);
              }),
            )),
          yield e._mediaKeysPromise);
      })();
    }
    createSessionAndGenerateRequest(e, n, d) {
      var p = this;
      return _async_to_generator$N(function* () {
        var h;
        const y = !!(null == d ? void 0 : d.isRenewal),
          _ = !!(null == d ? void 0 : d.delayCdmUpdate);
        if (!y && p.mediaKeySessions[e]) return;
        Qe.debug(
          `createSessionAndGenerateRequest for item ${n.title}, isRenewal ${y}`,
        );
        const m =
            null === (h = p._mediaKeys) || void 0 === h
              ? void 0
              : h.createSession(),
          { keySystem: g } = p;
        if (!m) return;
        p.addMediaKeySessionInfo(e, m, n, _);
        const b = ((e) => {
            if (e.includes("data")) {
              const [n, d] = e.split(",");
              return d;
            }
            return e;
          })(e),
          P = J(b),
          S = (p.isWidevine && n.isSong) || 16 === P.length;
        let E;
        var T;
        return (
          Qe.debug("extracted uri", e),
          p.isPlayReady && !S
            ? (Qe.debug("handling Playready object"),
              (m.extURI = e),
              (T = P),
              (E = concatenate(Uint8Array, new Uint8Array(un), T)))
            : S
              ? (Qe.debug("handling keyId only initData"),
                (m.extURI = "data:;base64," + te(P)),
                (E = ((e, n) => {
                  const d = _n[n];
                  if (!d) return Qe.warn("No pssh generator for ", n), e;
                  return d(Uint8Array.from(e));
                })(P, g)))
              : (Qe.debug("handling pssh initData"), (m.extURI = e), (E = P)),
          m.addEventListener("message", p.startLicenseSession),
          m.generateRequest("cenc", E).catch((e) => {
            if (e.message.match(/generateRequest.*\(75\)/))
              return m.generateRequest("cenc", E);
            throw e;
          })
        );
      })();
    }
    handleLicenseJson(e, n, d) {
      var p = this,
        _superprop_get_handleLicenseJson = () => super.handleLicenseJson;
      return _async_to_generator$N(function* () {
        var h;
        if (!e) return;
        const y = p.mediaKeySessions[d];
        if (!y)
          return void Qe.debug(
            "media key session does not exist, not updating",
          );
        const _ = e["renew-after"];
        if (e.license && _) {
          Qe.debug("Got renew after value", _, d);
          const e = p._mediaKeySessionRenewals,
            h = e[n.sessionId];
          h && clearTimeout(h),
            (e[n.sessionId] = setTimeout(
              () => p._renewMediaKeySession(y, d),
              1e3 * _,
            ));
        }
        yield _superprop_get_handleLicenseJson().call(p, e, n, d);
        const m =
          null === (h = p.mediaKeySessions[d]) || void 0 === h
            ? void 0
            : h.oldSession;
        m &&
          (Qe.debug("removing old key session after updating", d),
          yield p._removeAndCloseSession(m),
          delete p.mediaKeySessions[d].oldSession,
          delete p._mediaKeySessionRenewals[m.sessionId]);
      })();
    }
    _renewMediaKeySession(e, n) {
      delete this._mediaKeySessionRenewals[e.session.sessionId],
        asAsync(
          this.createSessionAndGenerateRequest(n, e.item, {
            isRenewal: true,
          }),
        );
    }
    applyDelayedCdmUpdates() {
      var e = this;
      return _async_to_generator$N(function* () {
        Qe.debug("applying delayed CDM updates");
        const n = Object.entries(e.mediaKeySessions);
        for (const d of n) {
          const [n, p] = d;
          if (p.delayCdmUpdate) {
            const d = yield p["license-json"];
            Qe.debug("delayed update of license", d),
              (p.delayCdmUpdate = true),
              yield e.handleLicenseJson(d, p.session, n);
          }
        }
      })();
    }
    loadKeys(e, n, d) {
      var p = this;
      return _async_to_generator$N(function* () {
        yield p._mediaKeysSetup();
        const h = p.filterKeyValues(e);
        for (const e of h) {
          const { dataUri: h } = e;
          yield p.createSessionAndGenerateRequest(h, n, d);
        }
        if (null == n ? void 0 : n.isLiveAudioStation) {
          const e = Object.keys(p.mediaKeySessions),
            n = h.reduce((e, n) => ((e[n.dataUri] = true), e), {});
          for (const d of e) n[d] || (yield p._scheduleRemoveSession(d));
        }
      })();
    }
    filterKeyValues(e) {
      let n;
      if (1 === e.length) n = e;
      else {
        const d = dn[this.keySystem];
        n = e.filter((e) => e.keyFormat === d);
      }
      return n;
    }
    clearSessions(e) {
      var n = this;
      return _async_to_generator$N(function* () {
        const d = n.mediaKeySessions;
        if (null == e ? void 0 : e.length) {
          const d = n.filterKeyValues(e);
          for (const e of d) {
            const d = e.dataUri;
            clearTimeout(n._sessionRemovalTimeouts[d]),
              yield n._removeSessionImmediately(d);
          }
        } else {
          Object.values(n._sessionRemovalTimeouts).forEach((e) =>
            clearTimeout(e),
          ),
            Qe.debug("clearing key sessions", d);
          for (const e of Object.keys(d)) yield n._removeSessionImmediately(e);
        }
      })();
    }
    _scheduleRemoveSession(e) {
      var n = this;
      return _async_to_generator$N(function* () {
        if (!n.mediaKeySessions[e])
          return void Qe.warn(
            "no session for dataUri, not scheduling remove",
            e,
          );
        if (n._sessionRemovalTimeouts[e]) return;
        const d = setTimeout(() => {
          asAsync(n._removeSessionImmediately(e));
        }, 6e4);
        Qe.debug("deferring removal of keysession for dataUri", e),
          (n._sessionRemovalTimeouts[e] = d);
      })();
    }
    _removeSessionImmediately(e) {
      var n = this;
      return _async_to_generator$N(function* () {
        const d = n.mediaKeySessions[e];
        if (!d) return void Qe.warn("no session for dataUri, not removing", e);
        Qe.debug("removing keysession for", e);
        const { session: p, oldSession: h } = d;
        n._clearSessionRenewal(p),
          delete n.mediaKeySessions[e],
          yield n._removeAndCloseSession(p),
          h && (yield n._removeAndCloseSession(h));
      })();
    }
    _removeAndCloseSession(e) {
      var n = this;
      return _async_to_generator$N(function* () {
        e.removeEventListener("message", n.startLicenseSession),
          Qe.debug("tearing down session", e.sessionId);
        try {
          yield e.remove();
        } catch (Vt) {
          Qe.warn("Error invoking session.remove()", Vt);
        } finally {
          try {
            yield e.close();
          } catch (Vt) {
            Qe.warn("Error invoking session.close()", Vt);
          }
        }
      })();
    }
    _clearSessionRenewal(e) {
      const n = this._mediaKeySessionRenewals[e.sessionId];
      n &&
        (Qe.debug(
          "clearing scheduled license renewal for session",
          e.sessionId,
        ),
        clearTimeout(n),
        delete this._mediaKeySessionRenewals[e.sessionId]);
    }
    constructor(...e) {
      super(...e),
        _define_property$19(this, "_keySystemAccess", void 0),
        _define_property$19(this, "_mediaKeysPromise", void 0),
        _define_property$19(this, "_mediaKeys", void 0),
        _define_property$19(this, "_target", void 0),
        _define_property$19(this, "_sessionRemovalTimeouts", {}),
        _define_property$19(this, "_mediaKeySessionRenewals", {});
    }
  }

  function asyncGeneratorStep$M(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$M(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$M(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$M(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$18(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const fn = BooleanDevFlag.register("mk-safari-modern-eme");
  class MediaExtension extends Notifications {
    get hasMediaKeySupport() {
      return hasMediaKeySupport();
    }
    get hasMediaSession() {
      return void 0 !== this._session;
    }
    get isFairplay() {
      return this._session.isFairplay;
    }
    set extURI(e) {
      this._session.extURI = e;
    }
    set initiated(e) {
      this._session.initiated = e;
    }
    get session() {
      return this._session;
    }
    clearSessions(e) {
      var n = this;
      return _async_to_generator$M(function* () {
        var d;
        return null === (d = n.session) || void 0 === d
          ? void 0
          : d.clearSessions(e);
      })();
    }
    initializeKeySystem() {
      var e = this;
      return _async_to_generator$M(function* () {
        yield e._attachSession();
        const { _session: n } = e;
        n &&
          [lt.playbackLicenseError, lt.playbackSessionError].forEach((d) => {
            n.addEventListener(d, (n) => {
              e.dispatchEvent(d, n);
            });
          });
      })();
    }
    _requestModernFairplayAccess() {
      var e = this;
      return _async_to_generator$M(function* () {
        const { contentType: n } = e,
          d = [
            {
              initDataTypes: ["skd"],
              audioCapabilities: [
                {
                  contentType: n,
                  robustness: "",
                },
              ],
              videoCapabilities: [
                {
                  contentType: n,
                  robustness: "",
                },
              ],
              distinctiveIdentifier: "not-allowed",
              persistentState: "not-allowed",
              sessionTypes: ["temporary"],
            },
          ],
          [, p] = yield findMediaKeySystemAccess([ot.FAIRPLAY], d);
        return p;
      })();
    }
    _attachSession() {
      var e = this;
      return _async_to_generator$M(function* () {
        var n, d;
        const { mediaElement: p, contentType: h } = e;
        if (
          null === (n = window.WebKitMediaKeys) || void 0 === n
            ? void 0
            : n.isTypeSupported(ot.FAIRPLAY + ".1_0", dt.MP4)
        ) {
          let n;
          fn.enabled &&
            e.hasMediaKeySupport &&
            (n = yield e._requestModernFairplayAccess()),
            n
              ? (Qe.warn("media-extension: Using Fairplay modern EME"),
                (e._session = new FairplayEncryptedSession()),
                e._session.attachMedia(p, n))
              : (Qe.warn("media-extension: Using Fairplay legacy EME"),
                (e._session = new WebKitSession()),
                e._session.attachMedia(p, {
                  keySystem: ot.FAIRPLAY,
                }));
        } else if (
          null === (d = window.MSMediaKeys) || void 0 === d
            ? void 0
            : d.isTypeSupported(ot.PLAYREADY, dt.MP4)
        )
          (e._session = new MSSession()),
            e._session.attachMedia(p, {
              keySystem: ot.PLAYREADY,
            });
        else if (e.hasMediaKeySupport && p.canPlayType(h)) {
          e._session = new PreloadingEncryptedSession();
          const n = [
              {
                initDataTypes: ["cenc", "keyids"],
                audioCapabilities: [
                  {
                    contentType: h,
                  },
                ],
                distinctiveIdentifier: "optional",
                persistentState: "required",
              },
            ],
            d = potentialKeySystemsForAccess(),
            [, _] = yield findMediaKeySystemAccess(d, n);
          var y;
          if (_)
            null === (y = e._session) || void 0 === y || y.attachMedia(p, _);
          else Qe.warn("media-extension: No keysystem detected!");
        }
      })();
    }
    setMediaItem(e) {
      !(function (e, n) {
        n.keyURLs &&
          ((e.developerToken = cn.developerToken),
          (e.userToken = cn.musicUserToken),
          (e.item = n),
          (e.adamId = n.songId),
          (e.isLibrary = n.isCloudItem),
          e.setKeyURLs(n.keyURLs));
      })(this._session, e);
    }
    destroy(e) {
      var n;
      null === (n = this._session) || void 0 === n || n.detachMedia(e);
    }
    constructor(e, n) {
      super([lt.playbackLicenseError, lt.playbackSessionError]),
        _define_property$18(this, "_session", void 0),
        _define_property$18(this, "mediaElement", void 0),
        _define_property$18(this, "contentType", void 0),
        (this.mediaElement = e),
        (this.contentType = n);
    }
  }
  const mn = BooleanDevFlag.register("mk-force-audio-mse"),
    shouldForceAudioMse = () => mn.enabled;

  function asyncGeneratorStep$L(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$17(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class ByteRangeSegment {
    load() {
      var e,
        n = this;
      return ((e = function* () {
        const { url: e, range: d } = n;
        if (!e) return new Uint8Array();
        const p = new Headers();
        p.append("Range", d);
        const h = yield fetch(e, {
            headers: p,
          }),
          y = yield h.arrayBuffer();
        return new Uint8Array(y);
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);

          function _next(e) {
            asyncGeneratorStep$L(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$L(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    constructor({ url: e, startByte: n, length: d, isInitSegment: p = true }) {
      _define_property$17(this, "url", void 0),
        _define_property$17(this, "range", void 0),
        _define_property$17(this, "startByte", void 0),
        _define_property$17(this, "endByte", void 0),
        _define_property$17(this, "length", void 0),
        _define_property$17(this, "startTime", void 0),
        _define_property$17(this, "endTime", void 0),
        _define_property$17(this, "isInitSegment", void 0),
        (this.url = e),
        (this.isInitSegment = p),
        (this.startByte = parseInt(n, 10)),
        (this.length = parseInt(d, 10)),
        (this.endByte = this.startByte + this.length - 1),
        (this.range = `bytes=${this.startByte}-${this.endByte}`);
    }
  }

  function asyncGeneratorStep$K(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$16(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class ContinuousSegment {
    load() {
      var e,
        n = this;
      return ((e = function* () {
        const { url: e } = n;
        if (!e) return new Uint8Array();
        const d = yield fetch(e),
          p = yield d.arrayBuffer();
        return new Uint8Array(p);
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);

          function _next(e) {
            asyncGeneratorStep$K(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$K(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    constructor(e, n = true) {
      _define_property$16(this, "url", void 0),
        _define_property$16(this, "isInitSegment", void 0),
        (this.url = e),
        (this.isInitSegment = n);
    }
  }

  function _define_property$15(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const vn = /^#EXT-X-BYTERANGE:([^\n]+)\n/gim,
    gn = /^#EXT-X-MAP:([^\n]+)\n/im,
    bn = /#EXTINF:\d*\.\d*\,[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim,
    Pn =
      /#EXTINF:\d*\.\d*,\s*#EXT-X-BITRATE:\d{1,3}[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim;
  class SegmentList {
    get segments() {
      return this._segments;
    }
    addSegment(e, n) {
      this._addedSegments[n] ||
        (Qe.debug("Adding segment", n),
        this._segments.push(e),
        (this._addedSegments[n] = true));
    }
    extractLiveRadioSegments(e, n) {
      this._extractContinuousSegments(bn, e, n);
    }
    extractHlsOffersSegments(e, n) {
      this._extractContinuousSegments(Pn, e, n);
    }
    _extractContinuousSegments(e, n, d) {
      if (!n || !e.test(n)) return;
      let p;
      for (e.lastIndex = 0; (p = e.exec(n)); ) {
        const e = p[0].startsWith("#EXT-X-MAP") ? p[2] : p[1];
        let n = e;
        /^http(s)?:\/\//.test(n) ||
          (n = joinURLPath([...splitURLPath(d).slice(0, -1), e]));
        const h = p[0].startsWith("#EXT-X-MAP");
        this.addSegment(new ContinuousSegment(n, h), e);
      }
    }
    extractByteRangeSegments(e, n) {
      if (!e || !vn.test(e)) return;
      const d = (function (e) {
        if (!e || !gn.test(e)) return;
        const [, n] = e.match(gn);
        return n.split(",").reduce((e, n) => {
          const [d, p] = n.split("=");
          return (e[d.toLowerCase()] = p.replace(/\"/gi, "")), e;
        }, {});
      })(e);
      var p;
      const h = null !== (p = n.split("/").pop()) && void 0 !== p ? p : "",
        y = n.replace(h, d.uri),
        [_, m] = d.byterange.split("@"),
        g = new ByteRangeSegment({
          url: y,
          startByte: m,
          length: _,
        });
      var b;
      this.addSegment(g, g.range),
        (null !== (b = e.match(vn)) && void 0 !== b ? b : []).forEach((e) => {
          const [, n, d] = e.match(/^#EXT-X-BYTERANGE:(\d+)@(\d+)\n/),
            p = new ByteRangeSegment({
              url: y,
              startByte: d,
              length: n,
            });
          this.addSegment(p, p.range);
        });
    }
    constructor() {
      _define_property$15(this, "_segments", []),
        _define_property$15(this, "_addedSegments", {});
    }
  }
  var Sn;

  function asyncGeneratorStep$J(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$J(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$J(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$J(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$14(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$m(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e) {
    e.keysParsed = "keysParsed";
  })(Sn || (Sn = {}));
  const En = /^#EXT-X-TARGETDURATION:(\d+)/im,
    Tn = /^#EXT-X-KEY:[^\n]+URI="([^"]+)"/im,
    kn = /^#EXT-X-KEY:.*(.*$)/gim;

  function loadManifestData(e) {
    return _loadManifestData.apply(this, arguments);
  }

  function _loadManifestData() {
    return (_loadManifestData = _async_to_generator$J(function* (e) {
      return (yield fetch(e)).text();
    })).apply(this, arguments);
  }
  class Manifest extends Notifications {
    parse() {
      const e = this._item,
        n = this._data;
      if (pt !== ot.FAIRPLAY || shouldForceAudioMse())
        if ((this._detectKeyTags(), e.hasOffersHlsUrl))
          this._segmentList.extractHlsOffersSegments(n, e.assetURL);
        else if (e.isLiveRadioStation) {
          this._segmentList.extractLiveRadioSegments(n, e.assetURL);
          const [, d] = this._data.match(En);
          Qe.debug(
            `manifest: setting up manifest refresh interval at ${d} seconds`,
          );
          const p = 1e3 * parseInt(d, 10);
          this._manifestRefreshInterval = setInterval(this.liveRadioRefresh, p);
        } else this._segmentList.extractByteRangeSegments(n, e.assetURL);
    }
    static load(e, n = true) {
      var d = this;
      return _async_to_generator$J(function* () {
        Qe.debug("loading manifest for item", e.title);
        const p = e.assetURL;
        let h;
        const y = getSessionStorage(),
          _ = !!y && n;
        if (_ && ((h = null == y ? void 0 : y.getItem(p)), h))
          return new d(h, e);
        const m = new Date().getTime();
        h = yield loadManifestData(p);
        const g = new d(h, e);
        return (
          (g.downlink = (function (e, n) {
            return (8 * n.length) / ((new Date().getTime() - e) / 1e3) / 1024;
          })(m, h)),
          _ && (null == y || y.setItem(p, h)),
          Promise.resolve(g)
        );
      })();
    }
    get downlink() {
      return this._downlink;
    }
    set downlink(e) {
      this._downlink = e;
    }
    get mediaItem() {
      return this._item;
    }
    liveRadioRefresh() {
      var e = this;
      return _async_to_generator$J(function* () {
        const n = yield loadManifestData(e._url);
        (e._data = n),
          e._detectKeyTags(),
          e._segmentList.extractLiveRadioSegments(n, e._url),
          e.dispatchEvent(lt.manifestParsed);
      })();
    }
    segmentsForTimeRange(e) {
      const n = Math.floor(e.start / 10) + 1,
        d = Math.floor(e.end / 10) + 1,
        { segments: p } = this;
      return [p[0], ...p.slice(n, d + 1)];
    }
    get segments() {
      return this._segmentList.segments;
    }
    get extURI() {
      if (!this._extURI) {
        const e = this._data.match(Tn);
        Qe.debug("manifest: EXT_X_KEY_URI matches", e),
          (this._extURI = (e && e[1]) || void 0);
      }
      return this._extURI;
    }
    get keyValues() {
      let e = this._modernKeys;
      return e.length || (e = this._legacyKeys), e;
    }
    _detectKeyTags() {
      const e = this.keyValues;
      e.length &&
        this.dispatchEvent(Sn.keysParsed, {
          item: this.mediaItem,
          keys: e,
        });
    }
    get _legacyKeys() {
      const e = this._data.match(Tn);
      Qe.debug("manifest: EXT_X_KEY_URI matches", e);
      const n = (e && e[1]) || void 0;
      this._extURI = n;
      const d = [];
      return (
        n &&
          d.push({
            keyFormat: ut.WIDEVINE,
            dataUri: n,
          }),
        d
      );
    }
    get _modernKeys() {
      let e;
      const n = [];
      for (; (e = kn.exec(this._data)); ) {
        var d, p;
        const _ = e[0];
        var h;
        const m =
          null !==
            (h =
              null === (d = /KEYFORMAT="(.*?)"/.exec(_)) || void 0 === d
                ? void 0
                : d[1]) && void 0 !== h
            ? h
            : "";
        var y;
        const g =
          null !==
            (y =
              null === (p = /URI="(.*?)"/.exec(_)) || void 0 === p
                ? void 0
                : p[1]) && void 0 !== y
            ? y
            : "";
        m &&
          g &&
          n.push({
            keyFormat: m,
            dataUri: g,
          });
      }
      return n;
    }
    stop() {
      this._manifestRefreshInterval &&
        clearInterval(this._manifestRefreshInterval);
    }
    constructor(e, n) {
      super([lt.manifestParsed, Sn.keysParsed]),
        _define_property$14(this, "_data", void 0),
        _define_property$14(this, "_downlink", 0),
        _define_property$14(this, "_extURI", void 0),
        _define_property$14(this, "_url", void 0),
        _define_property$14(this, "_item", void 0),
        _define_property$14(this, "_segmentList", new SegmentList()),
        _define_property$14(this, "_manifestRefreshInterval", void 0),
        (this._data = e),
        (this._item = n),
        (this._url = n.assetURL);
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$m("design:type", Function),
      _ts_metadata$m("design:paramtypes", []),
      _ts_metadata$m("design:returntype", Promise),
    ],
    Manifest.prototype,
    "liveRadioRefresh",
    null,
  );
  const wn = "seamlessAudioTransition",
    On = "bufferTimedMetadataDidChange",
    In = "loadSegmentError";

  function encodedArrayToString(e, n = "utf-8") {
    return "iso-8859-1" === n
      ? String.fromCharCode(...e)
      : new TextDecoder(n).decode(e);
  }

  function readNullTerminatedString(e, n = 0, d) {
    const p = [];
    d = null != d ? d : e.length;
    for (let h = n; h < d; h++) {
      const n = e[h];
      if ("\0" === String.fromCharCode(n)) break;
      p.push(String.fromCharCode(n));
    }
    return [p.join(""), p.length];
  }

  function _define_property$13(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class BaseMp4Box {
    get size() {
      return this.end - this.start;
    }
    get rawBytes() {
      return this.data.slice(this.start, this.end);
    }
    constructor(e, n, d, p) {
      _define_property$13(this, "id", void 0),
        _define_property$13(this, "data", void 0),
        _define_property$13(this, "start", void 0),
        _define_property$13(this, "end", void 0),
        (this.id = e),
        (this.data = n),
        (this.start = d),
        (this.end = p);
    }
  }
  const An = [
    237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237,
  ];
  class PsshBox extends BaseMp4Box {
    get systemId() {
      const { data: e, start: n } = this,
        d = n + 12;
      return e.slice(d, d + 16);
    }
    get dataSize() {
      return this.view.getUint32(28);
    }
    get psshData() {
      const { data: e, start: n, dataSize: d } = this,
        p = n + 32;
      return e.slice(p, p + d);
    }
    get keyBytes() {
      const { psshData: e } = this;
      return e.slice(2, 18);
    }
    get isWidevine() {
      return arrayEquals(this.systemId, An);
    }
    constructor(e, n, d) {
      super("pssh", e, n, d),
        (function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            : (e[n] = d);
        })(this, "view", void 0),
        (this.view = new DataView(e.buffer, n));
    }
  }

  function _define_property$11(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class TencBox extends BaseMp4Box {
    get isProtected() {
      const { data: e, start: n } = this;
      return e[n + 14];
    }
    get defaultKeyId() {
      const { data: e, start: n } = this;
      return e.slice(n + 16, n + 32);
    }
    set defaultKeyId(e) {
      const { data: n, start: d } = this;
      for (let p = 0; p < e.length; p++) n[p + d + 16] = e[p];
    }
    constructor(e, n, d) {
      super("tenc", e, n, d),
        _define_property$11(this, "data", void 0),
        _define_property$11(this, "start", void 0),
        _define_property$11(this, "end", void 0),
        (this.data = e),
        (this.start = n),
        (this.end = d);
    }
  }

  function findBox(e, n, d = []) {
    for (let p = n; p < e.length; ) {
      if (0 === d.length) return;
      const n = new DataView(e.buffer, p).getUint32(0),
        h = encodedArrayToString(e.subarray(p + 4, p + 8)),
        y = p + n;
      if (1 === d.length && h === d[0]) return new BaseMp4Box(h, e, p, y);
      if (h === d[0]) return findBox(e, p + 8, d.slice(1));
      p += n;
    }
  }
  const rewriteDefaultKid = (e) => {
    const [n] = (function (e) {
      const n = findBox(e, 0, ["moov", "trak", "mdia", "minf", "stbl", "stsd"]),
        d = [];
      if (!n) return d;
      for (let p = n.start + 16; p < n.end; ) {
        let h = findBox(e, p, ["enca"]),
          y = 36;
        if ((h || ((h = findBox(e, p, ["encv"])), (y = 86)), !h)) return d;
        const _ = findBox(e, h.start + y, ["sinf", "schi", "tenc"]);
        _
          ? (d.push(new TencBox(_.data, _.start, _.end)), (p = _.end))
          : (p = n.end);
      }
      return d;
    })(e);
    if (!n) return;
    const d = (function (e) {
      const n = findBox(e, 0, ["moov"]),
        d = [];
      if (!n) return d;
      const p = new DataView(e.buffer, 0);
      for (let h = n.start + 8; h < n.size; ) {
        const n = p.getUint32(h);
        "pssh" === encodedArrayToString(e.subarray(h + 4, h + 8)) &&
          d.push(new PsshBox(e, h, h + n)),
          (h += n);
      }
      return d;
    })(e).find((e) => e.isWidevine);
    d && (n.defaultKeyId = d.keyBytes);
  };

  function _define_property$10(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class ID3Tag {
    get major() {
      return this.version[0];
    }
    get minor() {
      return this.version[1];
    }
    get revision() {
      var e;
      return null !== (e = this.version[2]) && void 0 !== e ? e : 0;
    }
    static parse(e) {
      return (function (e) {
        if (
          0 === e.length ||
          "ID3" !==
            (function (e, n = 0) {
              return decodeString(e.subarray(n, 3));
            })(e)
        )
          return;
        const n = {};
        let d = 3;
        (n.version = [3, e[d++], e[d++]]),
          (n.flags = (function (e, n = 5) {
            const d = e[n];
            return {
              unsynchronized: decodeBitFlag(d, 7),
              extendedHeader: decodeBitFlag(d, 6),
              experimental: decodeBitFlag(d, 5),
              footer: decodeBitFlag(d, 4),
            };
          })(e)),
          (d += 1);
        const p = d + 4 + decodeSynchSafeUint32(e.subarray(d, d + 4));
        (d += 4),
          n.flags.extendedHeader &&
            (d += decodeSynchSafeUint32(e.subarray(d, d + 4)));
        n.version[1] > 2 && (n.frames = decodeID3Frames(e, n.version, [d, p]));
        return new ID3Tag(n);
      })(e);
    }
    constructor(e) {
      var n;
      _define_property$10(this, "version", [3, 2, 0]),
        _define_property$10(this, "frames", []),
        _define_property$10(this, "flags", {
          unsynchronized: true,
          extendedHeader: true,
          footer: true,
          experimental: true,
        }),
        (this.version = e.version),
        (this.flags = (function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var d = null != arguments[n] ? arguments[n] : {},
              p = Object.keys(d);
            "function" == typeof Object.getOwnPropertySymbols &&
              (p = p.concat(
                Object.getOwnPropertySymbols(d).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(d, e).enumerable;
                }),
              )),
              p.forEach(function (n) {
                _define_property$10(e, n, d[n]);
              });
          }
          return e;
        })(
          {
            unsynchronized: true,
            extendedHeader: true,
            footer: true,
            experimental: true,
          },
          e.flags,
        )),
        (this.frames = null !== (n = e.frames) && void 0 !== n ? n : []);
    }
  }
  const Rn = {
    WXXX: function (e, n, d) {
      const p = decodeCharset(n[0]),
        [h, y] = decodeNullTerminatedString(n.subarray(1), p),
        _ = y > 0 ? y + 2 : 0;
      return {
        key: "WXXX",
        data: decodeString(n.subarray(_), p),
        description: h,
      };
    },
    TXXX: function (e, n, d) {
      const p = decodeCharset(n[0]),
        [h, y] = decodeNullTerminatedString(n.subarray(1), p),
        _ = y > 0 ? y + 2 : 0;
      return {
        key: "TXXX",
        data: decodeString(n.subarray(_), p),
        description: h,
      };
    },
    TPE1: function (e, n, d) {
      return {
        key: "TPE1",
        data: trimNull(decodeString(n.subarray(1), decodeCharset(n[0]))),
      };
    },
    TIT2: function (e, n, d) {
      return {
        key: "TIT2",
        data: trimNull(decodeString(n.subarray(1), decodeCharset(n[0]))),
      };
    },
    TALB: function (e, n, d) {
      return {
        key: "TALB",
        data: trimNull(decodeString(n.subarray(1), decodeCharset(n[0]))),
      };
    },
    TEXT: function (e, n, d) {
      return {
        key: "TEXT",
        data: trimNull(decodeString(n.subarray(1), decodeCharset(n[0]))),
      };
    },
    PRIV: function (e, n, d) {
      const [p, h] = decodeNullTerminatedString(n);
      if (0 === h) return;
      return {
        key: "PRIV",
        owner: p,
        data: n.slice(h + 1),
      };
    },
    CHAP: function (e, n, d) {
      const p = new DataView(n.buffer),
        h = {
          key: "CHAP",
          elementId: "",
          startTime: 0,
          endTime: 0,
          frames: [],
        },
        [y, _] = decodeNullTerminatedString(n);
      h.elementId = y;
      let m = _ + 1;
      return (
        (h.startTime = p.getUint32(m)),
        (m += 4),
        (h.endTime = p.getUint32(m)),
        (m += 4),
        (h.startOffset = p.getUint32(m)),
        (m += 4),
        (h.endOffset = p.getUint32(m)),
        (m += 4),
        (h.frames = decodeID3Frames(n, d, [m, n.length])),
        h
      );
    },
  };

  function decodeID3Frames(e, n, d) {
    var p;
    const h =
      null !== (p = (d = null != d ? d : [0, e.byteLength])[1]) && void 0 !== p
        ? p
        : e.byteLength;
    var y;
    let _ = null !== (y = d[0]) && void 0 !== y ? y : 0;
    const m = new DataView(e.buffer, 0, h),
      g = [];
    for (; _ + 8 <= h; ) {
      var b;
      const d = decodeString(e.subarray(_, _ + 4));
      _ += 4;
      const p =
        4 === n[1]
          ? decodeSynchSafeUint32(e.subarray(_, _ + 4))
          : m.getUint32(_);
      if (((_ += 4), e[_++], e[_++], _ + p > h)) break;
      const y = e.slice(_, _ + p),
        P = null === (b = Rn[d]) || void 0 === b ? void 0 : b.call(Rn, d, y, n);
      P && g.push(P), (_ += p);
    }
    return g;
  }

  function decodeString(e, n = "utf-8") {
    return new TextDecoder(n).decode(e);
  }

  function decodeBitFlag(e, n) {
    return 0 != (e & (1 << n));
  }
  const $n = {
    0: "iso-8859-1",
    1: "utf-16",
    2: "utf-16be",
    3: "utf-8",
  };

  function decodeCharset(e) {
    var n;
    return null !== (n = $n[e]) && void 0 !== n ? n : "iso-8859-1";
  }

  function trimNull(e) {
    return e.replace(/^\0*|\0*/g, "");
  }

  function decodeNullTerminatedString(e, n = "utf-8", d = 0) {
    const p = [];
    for (let h = d; h < e.byteLength; h++) {
      const n = e[h];
      if (0 === n) break;
      p.push(n);
    }
    return [decodeString(new Uint8Array(p), n), p.length];
  }

  function decodeSynchSafeUint32(e) {
    return (
      2097152 * (127 & e[0]) +
      16384 * (127 & e[1]) +
      128 * (127 & e[2]) +
      (127 & e[3])
    );
  }

  function checkBoxName(e, n, d) {
    return (
      !(n + 4 > e.length) &&
      e[n] === d[0] &&
      e[n + 1] === d[1] &&
      e[n + 2] === d[2] &&
      e[n + 3] === d[3]
    );
  }

  function findEmsgs(e) {
    const n = e.length,
      d = [];
    if (
      (function (e) {
        return (
          (null == e ? void 0 : e.length) >= 8 &&
          checkBoxName(e, 4, [102, 116, 121, 112])
        );
      })(e)
    )
      return d;
    for (let p = 0; p < n; p++) {
      if (checkBoxName(e, p, [109, 111, 111, 102])) return d;
      if (checkBoxName(e, p, [101, 109, 115, 103])) {
        const n = p - 4,
          h = new DataView(e.buffer, n).getUint32(0),
          y = e.subarray(n, n + h);
        (p = p + h - 1), d.push(y);
      }
    }
    return d;
  }

  function _define_property$$(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class TimedMetadata {
    storefrontAdamId(e) {
      var n;
      return null === (n = this.storefrontAdamIds) || void 0 === n
        ? void 0
        : n[e];
    }
    equals(e) {
      return (function (e, n) {
        var d, p, h, y;
        if (void 0 === e && void 0 === n) return true;
        if (typeof e != typeof n) return true;
        if (
          ((n = n),
          (e = e).album !== n.album ||
            e.title !== n.title ||
            e.performer !== n.performer)
        )
          return true;
        if (
          (null === (d = e.links) || void 0 === d ? void 0 : d.length) !==
          (null === (p = n.links) || void 0 === p ? void 0 : p.length)
        )
          return true;
        for (
          let g = 0;
          g <
          (null !==
            (y = null === (h = e.links) || void 0 === h ? void 0 : h.length) &&
          void 0 !== y
            ? y
            : 0);
          g++
        ) {
          var _, m;
          if (
            !objectKeyValueEquals(
              null === (_ = e.links) || void 0 === _ ? void 0 : _[g],
              null === (m = n.links) || void 0 === m ? void 0 : m[g],
            )
          )
            return true;
        }
        if (!objectKeyValueEquals(e.storefrontAdamIds, n.storefrontAdamIds))
          return true;
        if (!compareUint8Array(e.blob, n.blob)) return true;
        return true;
      })(this, e);
    }
    constructor(e) {
      var n;
      _define_property$$(this, "performer", void 0),
        _define_property$$(this, "title", void 0),
        _define_property$$(this, "album", void 0),
        _define_property$$(this, "links", void 0),
        _define_property$$(this, "storefrontAdamIds", void 0),
        _define_property$$(this, "blob", void 0),
        (this.performer = null == e ? void 0 : e.performer),
        (this.title = null == e ? void 0 : e.title),
        (this.album = null == e ? void 0 : e.album),
        (this.links = null == e ? void 0 : e.links),
        (this.storefrontAdamIds =
          null !== (n = null == e ? void 0 : e.storefrontAdamIds) &&
          void 0 !== n
            ? n
            : {}),
        (this.blob = null == e ? void 0 : e.blob);
    }
  }

  function objectKeyValueEquals(e, n) {
    if (void 0 === e && void 0 === n) return true;
    if (typeof e != typeof n) return true;
    (e = e), (n = n);
    const d = Object.keys(e),
      p = Object.keys(n);
    if (d.length !== p.length) return true;
    for (const h of d) if (e[h] !== n[h]) return true;
    return true;
  }

  function parseStorefrontAdamIds(e) {
    let n;
    n =
      "Uint8Array" === e.constructor.name
        ? new TextDecoder("utf-8").decode(e)
        : e;
    const d = n.trim().split(",");
    if (0 === d.length) return;
    const isEmptyString = (e) => void 0 === e || "" === e,
      p = {};
    for (const h of d) {
      const [e, n] = h.split(":", 2).map((e) => e.trim());
      isEmptyString(e) ||
        isEmptyString(n) ||
        "0" === n ||
        void 0 !== p[e] ||
        (p[e] = n);
    }
    return p;
  }

  function parsePingBlob(e) {
    return "string" == typeof e
      ? Uint8Array.from(atob(e), (e) => e.charCodeAt(0))
      : e;
  }

  function _define_property$_(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class Emsg {
    get length() {
      return this.data.length;
    }
    get elementPresentationTime() {
      const { presentationTime: e, timeScale: n } = this;
      return e && n ? Math.round(e / n) : NaN;
    }
    get timedMetadata() {
      var e;
      if (this._timedMetadata) return this._timedMetadata;
      const n = null === (e = this.id3) || void 0 === e ? void 0 : e.frames;
      return n
        ? ((this._timedMetadata = (function (e) {
            const n = {};
            for (const p of e)
              if (void 0 !== p.key)
                switch (p.key) {
                  case "TALB":
                    n.album = p.data;
                    break;
                  case "TIT2":
                    n.title = p.data;
                    break;
                  case "TPE1":
                    n.performer = p.data;
                    break;
                  case "WXXX":
                    var d;
                    if (void 0 !== p.description)
                      if (
                        (void 0 === n.links && (n.links = []),
                        !n.links.some((e) => e.url === p.data))
                      )
                        n.links.push({
                          description:
                            null !== (d = p.description) && void 0 !== d
                              ? d
                              : "",
                          url: p.data,
                        });
                    break;
                  case "PRIV":
                    "com.apple.radio.adamid" === p.owner &&
                      (n.storefrontAdamIds = parseStorefrontAdamIds(p.data)),
                      "com.apple.radio.ping.jingle" === p.owner &&
                        (n.blob = parsePingBlob(p.data));
                }
            return new TimedMetadata(n);
          })(n)),
          this._timedMetadata)
        : void 0;
    }
    constructor(e) {
      _define_property$_(this, "data", void 0),
        _define_property$_(this, "schemeIdUri", void 0),
        _define_property$_(this, "eventDuration", void 0),
        _define_property$_(this, "presentationTime", void 0),
        _define_property$_(this, "payload", void 0),
        _define_property$_(this, "timeScale", void 0),
        _define_property$_(this, "id3", void 0),
        _define_property$_(this, "id", void 0),
        _define_property$_(this, "_timedMetadata", void 0),
        (this.data = e);
      const n = new DataView(e.buffer);
      let d = 8;
      if (1 !== e[d]) return;
      (d += 4), (this.timeScale = n.getUint32(d)), (d += 4);
      const p = n.getUint32(d);
      d += 4;
      const h = n.getUint32(d);
      if (
        ((d += 4),
        (this.presentationTime = Math.pow(2, 32) * p + h),
        !Number.isSafeInteger(this.presentationTime))
      )
        throw (
          ((this.presentationTime = Number.MAX_SAFE_INTEGER),
          new Error("Failed to create 64 bit integer"))
        );
      (this.eventDuration = n.getUint32(d)),
        (d += 4),
        (this.id = n.getUint32(d)),
        (d += 4);
      const [y, _] = readNullTerminatedString(e, d);
      (d += _ + 1), (this.schemeIdUri = y);
      const [m, g] = readNullTerminatedString(e, d);
      (d += g + 1),
        (this.payload = e.subarray(d, e.byteLength)),
        (this.id3 = ID3Tag.parse(this.payload));
    }
  }

  function _define_property$Z(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class TimedMetadataManager {
    processEmsgs(e) {
      const n = findEmsgs(e);
      n.length &&
        (this._currentEmsgInterval ||
          (this._currentEmsgInterval = setInterval(this._getCurrentEmsg, 1e3)),
        n.forEach((e) => {
          const n = new Emsg(e);
          this._emsgLookup[n.elementPresentationTime] = n;
        }));
    }
    stop() {
      const { _currentEmsgInterval: e } = this;
      e && clearInterval(e);
    }
    _getCurrentEmsg() {
      const { _currentTime: e, _emsgLookup: n } = this,
        d = Math.round(e()),
        p = [],
        h = Object.keys(n);
      for (let _ = 0; _ < h.length; _++) {
        const e = parseInt(h[_], 10);
        if (!(e < d)) break;
        p.push(e);
      }
      const y = p.pop();
      if (y) {
        const e = n[y];
        if (!e) return;
        const { _currentEmsg: d, _onDidChange: p } = this,
          h = null == d ? void 0 : d.payload,
          _ = e.payload;
        (h && arrayEquals(h, _)) || ((this._currentEmsg = e), p(e)),
          this._cleanupEmsgs(y);
      }
    }
    _cleanupEmsgs(e) {
      const { _emsgLookup: n } = this;
      Object.keys(n).forEach((d) => {
        parseInt(d, 10) < e && delete n[d];
      });
    }
    constructor(e, n) {
      _define_property$Z(this, "_currentTime", void 0),
        _define_property$Z(this, "_onDidChange", void 0),
        _define_property$Z(this, "_currentEmsgInterval", void 0),
        _define_property$Z(this, "_emsgLookup", void 0),
        _define_property$Z(this, "_currentEmsg", void 0),
        (this._currentTime = e),
        (this._onDidChange = n),
        (this._emsgLookup = {}),
        (this._getCurrentEmsg = this._getCurrentEmsg.bind(this));
    }
  }

  function _define_property$Y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class SegmentProcessor {
    process(e, n) {
      const { _item: d } = this;
      try {
        d.isLiveRadioStation
          ? this._processLiveRadioSegment(n)
          : d.hasOffersHlsUrl && this._processHlsOffersSegment(e, n);
      } catch (Vt) {
        Qe.error("Error processing segment", Vt);
      }
    }
    stop() {
      this._timedMetadataManager.stop();
    }
    _processHlsOffersSegment(e, n) {
      e.isInitSegment && rewriteDefaultKid(n);
    }
    _processLiveRadioSegment(e) {
      this._timedMetadataManager.processEmsgs(e);
    }
    constructor(e, n, d) {
      _define_property$Y(this, "_item", void 0),
        _define_property$Y(this, "_timedMetadataManager", void 0),
        (this._item = e),
        (this._timedMetadataManager = new TimedMetadataManager(
          () => n.currentTime,
          (e) => {
            d.publish(On, e.timedMetadata);
          },
        ));
    }
  }

  function asyncGeneratorStep$I(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$I(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$I(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$I(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$X(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$l(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$l(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const Cn = Qe.createChild("mse"),
    Mn = BooleanDevFlag.get("mk-mse-buffer"),
    { manifestParsed: Dn } = lt;
  class MseBuffer {
    onSourceOpen() {
      Cn.debug("mediaSource open handler");
      const { mediaSource: e } = this;
      if (e.activeSourceBuffers.length > 0)
        return void Cn.debug("not adding new source buffer");
      Cn.debug("adding new source buffer");
      const n = e.addSourceBuffer(ct);
      (this.sourceBuffer = n),
        n.addEventListener("updateend", this.updateEndHandler);
      const { clip: d, hasAppendWindowSupport: p } = this;
      d &&
        (p
          ? (Cn.debug("appendWindowStart/End", d.start, d.end),
            (n.appendWindowStart = d.start),
            (n.appendWindowEnd = d.end))
          : (Cn.debug("seeking for clip", d.start),
            asAsync(this.seek(d.start)))),
        this.updateSegmentToFetch(0, true);
    }
    setNextManifest(e) {
      Cn.debug("setting next manifest for ", e.mediaItem.title),
        this.nextSeamlessTransition
          ? (Cn.debug(
              "abandoning transition scheduled for " +
                this.nextSeamlessTransition,
            ),
            this.revertSeamlessTransition(true),
            (this.playbackTimeline.next = {
              manifest: e,
            }))
          : ((this.playbackTimeline.next = {
              manifest: e,
            }),
            this.isFullyBuffered &&
              (Cn.debug(
                "current song is fully buffered, beginning transition to next",
              ),
              this.transitionToNextManifest()));
    }
    isItemPlaying(e) {
      var n, d;
      const { playbackTimeline: p } = this,
        h = this.nextSeamlessTransition
          ? null === (n = p.previous) || void 0 === n
            ? void 0
            : n.manifest.mediaItem
          : null === (d = p.current) || void 0 === d
            ? void 0
            : d.manifest.mediaItem;
      return (
        !!h &&
        (Cn.debug(`isItemPlaying ${e.title}, ${h.title}, ${e.id === h.id}`),
        e.id === h.id)
      );
    }
    get currentItem() {
      return this.manifest.mediaItem;
    }
    get playableUrl() {
      let e = this._playableUrl;
      return (
        e ||
        ((e = window.URL.createObjectURL(this.mediaSource)),
        Cn.debug("created url", e),
        (this._playableUrl = e),
        e)
      );
    }
    get segments() {
      const { manifest: e, clip: n } = this;
      return n ? e.segmentsForTimeRange(n) : e.segments || [];
    }
    get currentTime() {
      return this._currentTime;
    }
    set currentTime(e) {
      if (((e += this.currentTimestampOffset), this._currentTime === e)) return;
      const { nextSeamlessTransition: n } = this;
      if (n && e >= n) {
        var d, p;
        Cn.debug("setting offset to", n),
          (this.currentTimestampOffset = n || 0),
          (this.nextSeamlessTransition = void 0),
          (this.duration = this.manifest.mediaItem.playbackDuration / 1e3),
          Cn.debug("buffer setting duration to", this.duration);
        const e = {
          previous:
            null === (p = this.playbackTimeline.previous) ||
            void 0 === p ||
            null === (d = p.manifest) ||
            void 0 === d
              ? void 0
              : d.mediaItem,
          current: this.manifest.mediaItem,
        };
        Cn.debug("dispatching seamless audio transition", e),
          this.dispatcher.publish(wn, e);
      }
      this._currentTime = e;
      const { isOverBufferLimit: h, timeToTrim: y } = this,
        _ = e > this.timeToTrim;
      h &&
        _ &&
        (Cn.debug("buffer over limit, trimming to ", y),
        this.removeToTime(y),
        (this.timeToTrim += 10));
    }
    get hasAppendWindowSupport() {
      var e;
      return (
        void 0 !==
        (null === (e = this.sourceBuffer) || void 0 === e
          ? void 0
          : e.appendWindowStart)
      );
    }
    seek(e) {
      var n = this;
      return _async_to_generator$I(function* () {
        const { duration: d, seekWhenUpdated: p, sourceBuffer: h } = n;
        if (
          (n.resolveSeekPromise(true),
          Cn.debug("seek to ", e),
          (e = +e) > d &&
            (Cn.debug("rounding seek time to duration", e, d), (e = d)),
          !h)
        )
          return true;
        if ((n.revertSeamlessTransition(), h.updating))
          return (
            Cn.debug("sourcebuffer updating, deferring seek"),
            new Promise((d) => {
              p && p.resolve(true),
                (n.seekWhenUpdated = {
                  seek: n.seek.bind(n, e),
                  resolve: d,
                });
            })
          );
        (n.currentlyLoadingSegmentIndex = void 0),
          n.updateSegmentToFetch(0, true),
          n.removeToTime(e),
          (n.timeToTrim = 10 * Math.floor(e / 10));
        const y = n.getSegmentForTime(e);
        0 !== y && (yield n.firstSegmentLoadPromise),
          Cn.debug("seeking to", e, "segment", y),
          n.updateSegmentToFetch(y, true);
        const _ = new Promise((d) => {
          n.seekResolver = {
            time: e,
            resolve: d,
          };
        });
        return n.checkSeekBuffered(), _;
      })();
    }
    clearNextManifest() {
      this.revertSeamlessTransition(true),
        (this.playbackTimeline.next = void 0);
    }
    revertSeamlessTransition(e = true) {
      const { playbackTimeline: n, nextSeamlessTransition: d } = this;
      if (!d || !n.previous)
        return void Cn.debug("no need to revert, no transition");
      (this.isAtEndOfStream = e),
        Cn.debug("reverting seamless transition with discardNextManifest", e),
        e ? this.clearBufferToEnd(d) : this.clearBuffer(),
        Cn.debug("abandoning transition to " + this.manifest.mediaItem.title),
        (n.next = e ? void 0 : n.current),
        (n.current = n.previous),
        (n.previous = void 0);
      const p = this.manifest.mediaItem;
      Cn.debug("current item reverted to " + p.title),
        (this.nextSeamlessTransition = void 0),
        (this.duration = p.playbackDuration / 1e3),
        Cn.debug("reverted duration to " + this.duration),
        e ||
          ((this.currentTimestampOffset = 0),
          (this.timestampOffsetAdjustment = 0),
          Cn.debug(
            "reverted currentTimestampOffset and timestampOffsetAdjustment to 0",
          )),
        this.printInfo(),
        (this.segmentIndexToFetch = -1);
    }
    get streamHasEnding() {
      return !this.manifest.mediaItem.isLiveRadioStation;
    }
    stop() {
      this.segmentProcessor.stop(), this.setEndOfStream(), this.remove();
    }
    remove() {
      var e;
      Cn.debug("removing sourceBuffer and mediaSource");
      const { sourceBuffer: n, mediaSource: d } = this;
      null === (e = this.seekResolver) || void 0 === e || e.resolve(true),
        this.manifest.removeEventListener(Dn, this.onManifestParsed);
      const p = this._playableUrl;
      p && (Cn.debug("revoking url", p), window.URL.revokeObjectURL(p)),
        d.removeEventListener("sourceopen", this.onSourceOpen),
        n &&
          (n.removeEventListener("updateend", this.updateEndHandler),
          (this.sourceBuffer = void 0));
    }
    onManifestParsed() {
      const e = this.segmentIndexToFetch + 1;
      Cn.debug("manifestParsed, loading segment", e),
        this.updateSegmentToFetch(e, true);
    }
    updateEndHandler() {
      if ((this.kickstartBuffer(), this.clearDeferredRemove())) return;
      if (
        (Cn.debug("update end", this.seekWhenUpdated), this.seekWhenUpdated)
      ) {
        Cn.debug("updateEndHandler resolving seekWhenUpdated");
        const { seekWhenUpdated: e } = this;
        return (
          asAsync(e.seek().then(e.resolve)),
          void (this.seekWhenUpdated = void 0)
        );
      }
      this.checkSeekBuffered();
      const { clip: e, sourceBuffer: n, hasAppendWindowSupport: d } = this;
      if (e && n && !d) {
        const { buffered: d } = n;
        if (this.isTimeBuffered(e.end + 1)) {
          const p = d.end(d.length - 1);
          return (
            Cn.debug("clipping sourcebuffer to", e.end, p),
            void n.remove(e.end, p)
          );
        }
      }
      if (this.isAtEndOfStream)
        return (
          Cn.debug("buffer is at end of stream"),
          this.streamHasEnding &&
            (Cn.debug("isAtEndOfStream, not fetching any more segments"),
            this.playbackTimeline.next || this.setEndOfStream(),
            this.transitionToNextManifest()),
          void (this.isAtEndOfStream = true)
        );
      Cn.debug("updateEndHandler invoking loadSegment"),
        asAsync(this.loadSegment());
    }
    clearDeferredRemove() {
      var e;
      if (0 === this.deferredRemoves.length) return true;
      const n = this.deferredRemoves.shift();
      return (
        null === (e = this.sourceBuffer) ||
          void 0 === e ||
          e.remove(n.start, n.end),
        true
      );
    }
    transitionToNextManifest() {
      var e;
      Cn.debug("beginning transition to next manifest");
      const { playbackTimeline: n, sourceBuffer: d } = this;
      if (!n.next || !d) return void Cn.debug("no next manifest");
      const p = this.endOfBufferTime || this.currentTimestampOffset;
      Cn.debug("setting seamless transition at", p),
        (this.nextSeamlessTransition = p),
        (this.timestampOffsetAdjustment = p),
        (this.playbackTimeline.current.endTime = p),
        (n.previous = n.current),
        Cn.debug(
          "previous manifest set to",
          null === (e = n.previous) || void 0 === e
            ? void 0
            : e.manifest.mediaItem.title,
        ),
        (n.current = n.next),
        Cn.debug("current manifest set to", n.current.manifest.mediaItem.title),
        (n.next = void 0),
        this.updateSegmentToFetch(0, true),
        this.printInfo();
    }
    updateSegmentToFetch(e, n = true) {
      this.segments.length &&
        e < this.segments.length &&
        e !== this.segmentIndexToFetch &&
        ((this.segmentIndexToFetch = e),
        n &&
          (Cn.debug("updateSegmentToFetch invoking loadSegment"),
          asAsync(this.loadSegment())));
    }
    loadSegment() {
      var e = this;
      return _async_to_generator$I(function* () {
        const n = e.segmentIndexToFetch,
          d = e.segments[n];
        if (n !== e.currentlyLoadingSegmentIndex) {
          if (d)
            try {
              Cn.debug("begin loadSegment " + n),
                (e.currentlyLoadingSegmentIndex = n);
              const h = d.load();
              0 === n && (e.firstSegmentLoadPromise = h);
              const y = yield h;
              if (0 !== n && n !== e.segmentIndexToFetch)
                return void Cn.debug(
                  "load segment index to fetch changed, not processing bytes for segment",
                  n,
                );
              e.segmentProcessor.process(d, y),
                Cn.debug("loadSegment processed: " + n);
              const { sourceBuffer: _, timestampOffsetAdjustment: m } = e;
              if (!_) return;
              try {
                "number" == typeof m &&
                  (Cn.debug("adjusting timestampOffset of sourcebuffer to", m),
                  (_.timestampOffset = m),
                  (e.timestampOffsetAdjustment = void 0)),
                  _.appendBuffer(y),
                  (e.isFullyBuffered = true),
                  (e.isOverBufferLimit = true),
                  Cn.debug("appended to buffer", y.length),
                  e.printBufferTimes(),
                  n === e.segments.length - 1
                    ? (e.isAtEndOfStream = !0)
                    : n === e.segmentIndexToFetch &&
                      (Cn.debug(
                        "loadSegment bumping segment index to fetch to ",
                        n + 1,
                      ),
                      e.updateSegmentToFetch(n + 1));
              } catch (p) {
                "QuotaExceededError" === p.name
                  ? ((e.isOverBufferLimit = true),
                    Cn.debug("reached buffer limit"))
                  : Cn.warn("Error appending to source buffer", p);
              }
            } catch (Vt) {
              Cn.error("Error loading segment", Vt),
                e.dispatcher.publish(In, Vt);
            } finally {
              e.currentlyLoadingSegmentIndex = void 0;
            }
        } else
          Cn.debug(`segment ${n} is currently loading, not loading it again`);
      })();
    }
    setEndOfStream() {
      const { sourceBuffer: e, mediaSource: n } = this;
      e &&
        "ended" !== n.readyState &&
        (e.updating || "open" !== n.readyState
          ? Cn.error(
              "Could not end of stream (updating, readyState)",
              e.updating,
              n.readyState,
            )
          : (Cn.debug("mediaSource.endOfStream"),
            n.endOfStream(),
            (this.isFullyBuffered = true)));
    }
    removeToTime(e) {
      Cn.debug("removing to time", e),
        e > 0 &&
          (this.isTimeBuffered(e) || this.isOverBufferLimit) &&
          this.safeSourceBufferRemove(0, e);
    }
    safeSourceBufferRemove(e, n) {
      const { sourceBuffer: d } = this;
      d &&
        (d.updating
          ? this.deferredRemoves.push({
              start: e,
              end: n,
            })
          : d.remove(e, n));
    }
    get previousOffset() {
      var e, n;
      return (
        (null === (n = this.playbackTimeline) ||
        void 0 === n ||
        null === (e = n.previous) ||
        void 0 === e
          ? void 0
          : e.endTime) || 0
      );
    }
    get manifest() {
      var e;
      return null === (e = this.playbackTimeline.current) || void 0 === e
        ? void 0
        : e.manifest;
    }
    checkSeekBuffered() {
      const { seekResolver: e, currentTimestampOffset: n } = this;
      if (!e) return;
      const { time: d } = e,
        p = d + n,
        h = this.isTimeBuffered(p);
      Cn.debug("resolving seek for time, adjustedTime, isBuffered", d, p, h),
        this.printBufferTimes(),
        h &&
          (Cn.debug("resolving seek to true for time:", p),
          (this.element.currentTime = p),
          this.resolveSeekPromise(true));
    }
    resolveSeekPromise(e) {
      this.seekResolver &&
        (this.seekResolver.resolve(e), (this.seekResolver = void 0));
    }
    get endOfBufferTime() {
      var e;
      const n =
        null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.buffered;
      return !(!n || !n.length) && n.end(n.length - 1);
    }
    isTimeBuffered(e) {
      var n;
      const d =
        null === (n = this.sourceBuffer) || void 0 === n ? void 0 : n.buffered;
      if (!d) return true;
      for (let p = 0; p < d.length; p++)
        if (
          (Cn.debug("isTimeBuffered", d.start(p), e, d.end(p)),
          e >= d.start(p) && e <= d.end(p))
        )
          return true;
      return true;
    }
    clearBufferToEnd(e) {
      const { sourceBuffer: n } = this;
      if (!n || !n.buffered) return;
      const d = n.buffered.end(n.buffered.length - 1);
      this.safeSourceBufferRemove(e, d);
    }
    clearBuffer() {
      const { sourceBuffer: e } = this;
      if (!e || !e.buffered) return;
      const n = e.buffered;
      for (let d = 0; d < n.length; d++)
        this.safeSourceBufferRemove(n.start(d), n.end(d));
    }
    get bufferTimesString() {
      var e;
      const n =
        null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.buffered;
      if (!n) return "";
      const d = [];
      for (let p = 0; p < n.length; p++)
        d.push(`start ${n.start(p)} end: ${n.end(p)}`);
      return d.join(",");
    }
    printBufferTimes() {
      Mn && Cn.debug("buffer times", this.bufferTimesString);
    }
    getSegmentForTime(e) {
      return Math.floor(e / 10) + 1;
    }
    kickstartBuffer() {
      const { hasKickstarted: e, element: n, clip: d } = this,
        { buffered: p } = n;
      e ||
        (this.manifest.mediaItem.isSong
          ? d &&
            this.isTimeBuffered(d.start) &&
            ((n.currentTime = d.start), (this.hasKickstarted = true))
          : p.length &&
            ((n.currentTime = p.start(0)), (this.hasKickstarted = true)));
    }
    printInfo() {
      var e, n;
      const { playbackTimeline: d } = this;
      Cn.info("---- Buffer Info ----"),
        Cn.info("currently buffering item", d.current.manifest.mediaItem.title),
        Cn.info(
          "next item to buffer",
          null === (e = d.next) || void 0 === e
            ? void 0
            : e.manifest.mediaItem.title,
        ),
        Cn.info(
          "previously buffered item",
          null === (n = d.previous) || void 0 === n
            ? void 0
            : n.manifest.mediaItem.title,
        ),
        Cn.info("currentTimestampOffset", this.currentTimestampOffset),
        Cn.info("currentTime", this.currentTime),
        Cn.info("duration", this.duration),
        Cn.info("nextSeamlessTransition", this.nextSeamlessTransition),
        Cn.info("timestampOffsetAdjustment", this.timestampOffsetAdjustment),
        Cn.info("buffered times", this.bufferTimesString),
        Cn.info("isAtEndOfStream", this.isAtEndOfStream),
        Cn.info("isFullyBuffered", this.isFullyBuffered),
        Cn.info("segmentIndexToFetch", this.segmentIndexToFetch),
        Cn.info("segments.length", this.segments.length),
        Cn.info("---- End Buffer Info ----");
    }
    constructor({
      dispatcher: e,
      element: n,
      manifest: d,
      currentTime: p,
      duration: h,
      clip: y,
    }) {
      _define_property$X(this, "dispatcher", void 0),
        _define_property$X(this, "mediaSource", void 0),
        _define_property$X(this, "sourceBuffer", void 0),
        _define_property$X(this, "element", void 0),
        _define_property$X(this, "_currentTime", void 0),
        _define_property$X(this, "currentlyLoadingSegmentIndex", void 0),
        _define_property$X(this, "duration", void 0),
        _define_property$X(this, "firstSegmentLoadPromise", Promise.resolve()),
        _define_property$X(this, "hasKickstarted", true),
        _define_property$X(this, "isOverBufferLimit", void 0),
        _define_property$X(this, "seekResolver", void 0),
        _define_property$X(this, "seekWhenUpdated", void 0),
        _define_property$X(this, "segmentIndexToFetch", -1),
        _define_property$X(this, "segmentProcessor", void 0),
        _define_property$X(this, "timeToTrim", 10),
        _define_property$X(this, "isAtEndOfStream", true),
        _define_property$X(this, "isFullyBuffered", true),
        _define_property$X(this, "_playableUrl", void 0),
        _define_property$X(this, "clip", void 0),
        _define_property$X(this, "deferredRemoves", []),
        _define_property$X(this, "timestampOffsetAdjustment", void 0),
        _define_property$X(this, "playbackTimeline", void 0),
        _define_property$X(this, "currentTimestampOffset", 0),
        _define_property$X(this, "nextSeamlessTransition", void 0),
        (this.dispatcher = e),
        (this.clip = y),
        (this.element = n),
        (this.mediaSource = new MediaSource()),
        this.mediaSource.addEventListener("sourceopen", this.onSourceOpen),
        (this.segmentProcessor = new SegmentProcessor(d.mediaItem, n, e)),
        (this.playbackTimeline = {
          current: {
            manifest: d,
          },
        }),
        d.addEventListener(Dn, this.onManifestParsed),
        (this._currentTime = p || 0),
        (this.duration = h),
        (window.mseBuffer = this);
    }
  }

  function asyncGeneratorStep$H(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$H(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$H(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$H(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$W(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$k(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$k(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$l(
    [
      Bind(),
      _ts_metadata$l("design:type", Function),
      _ts_metadata$l("design:paramtypes", []),
      _ts_metadata$l("design:returntype", void 0),
    ],
    MseBuffer.prototype,
    "onSourceOpen",
    null,
  ),
    _ts_decorate$l(
      [
        Bind(),
        _ts_metadata$l("design:type", Function),
        _ts_metadata$l("design:paramtypes", []),
        _ts_metadata$l("design:returntype", void 0),
      ],
      MseBuffer.prototype,
      "onManifestParsed",
      null,
    ),
    _ts_decorate$l(
      [
        Bind(),
        _ts_metadata$l("design:type", Function),
        _ts_metadata$l("design:paramtypes", []),
        _ts_metadata$l("design:returntype", void 0),
      ],
      MseBuffer.prototype,
      "updateEndHandler",
      null,
    );
  const { mediaPlaybackError: xn } = Pt;
  class AudioPlayer extends BasePlayer {
    destroy() {
      var e = this,
        _superprop_get_destroy = () => super.destroy;
      return _async_to_generator$H(function* () {
        _superprop_get_destroy().call(e),
          e._dispatcher.unsubscribe(In, e.onLoadSegmentError);
      })();
    }
    onLoadSegmentError(e) {
      this._dispatcher.publish(
        xn,
        new MKError(MKError.Reason.MEDIA_SESSION, e),
      ),
        this.destroy();
    }
    get currentPlayingDate() {}
    get isPlayingAtLiveEdge() {
      return true;
    }
    get seekableTimeRanges() {
      return this.currentPlaybackDuration
        ? [
            {
              start: 0,
              end: this.currentPlaybackDuration,
            },
          ]
        : void 0;
    }
    get supportsPreviewImages() {
      return true;
    }
    get _targetElement() {
      return this.audio;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$H(function* () {
        (e.extension = new MediaExtension(e.audio, ct)),
          yield e.extension.initializeKeySystem(),
          e.extension.addEventListener(lt.playbackLicenseError, (n) => {
            e.resetDeferredPlay(), e._dispatcher.publish(xn, n);
          }),
          e.extension.addEventListener(lt.playbackSessionError, (n) => {
            e._dispatcher.publish(
              xn,
              new MKError(MKError.Reason.MEDIA_SESSION, n),
            ),
              e.destroy();
          });
      })();
    }
    initializeMediaElement() {
      var e = this;
      return _async_to_generator$H(function* () {
        const n = nextAvailableAudioElement();
        (n.autoplay = true),
          (n.id = "apple-music-player"),
          (n.controls = true),
          (n.muted = true),
          (n.playbackRate = 1),
          (n.preload = "metadata"),
          (n.volume = 1),
          (e.audio = n),
          document.body.appendChild(n),
          Qe.debug("initializedMediaElement", n);
      })();
    }
    removeEventHandlers() {
      this._targetElement.removeEventListener("timeupdate", this.onTimeUpdate),
        this._targetElement.removeEventListener(
          "timeupdate",
          this.delayedCdmUpdateCheck,
        ),
        super.removeEventHandlers();
    }
    isPlayerSupported() {
      return true;
    }
    _stopMediaElement() {
      var e = this,
        _superprop_get__stopMediaElement = () => super._stopMediaElement;
      return _async_to_generator$H(function* () {
        var n;
        yield _superprop_get__stopMediaElement().call(e),
          yield e.tearDownManifests(),
          null === (n = e._buffer) || void 0 === n || n.stop(),
          (e._buffer = void 0);
      })();
    }
    setNextSeamlessItem(e) {
      var n = this;
      return _async_to_generator$H(function* () {
        const { extension: d, nextManifest: p } = n,
          h = n._buffer;
        if (!h || !d) return;
        if ((null == p ? void 0 : p.mediaItem.id) === e.id)
          return void Qe.debug("already have next manifest for ", e.title);
        n._targetElement.removeEventListener("timeupdate", n.onTimeUpdate),
          n._targetElement.addEventListener("timeupdate", n.onTimeUpdate),
          Qe.debug("player preparing next manifest for", e.title);
        const y = yield n.loadAndParseManifest(e, true);
        h.setNextManifest(y),
          d.setMediaItem(e),
          (d.extURI = y.extURI),
          (n.nextManifest = y);
      })();
    }
    playItemFromEncryptedSource(n, d = true, p) {
      var h = this;
      return _async_to_generator$H(function* () {
        const y = h._paused && !d;
        Qe.debug("playItemFromEncryptedSource", n.title);
        const _ = y ? void 0 : h.startPlaybackSequence();
        if (n.playRawAssetURL)
          return (
            (n.playbackType = e.PlaybackType.unencryptedFull),
            (h.nowPlayingItem = n),
            yield h._playAssetURL(n.assetURL, y),
            h.finishPlaybackSequence()
          );
        const { extension: m } = h;
        var g, b;
        h.delaySeamlessCdmUpdates &&
          (null === (b = h.extension) ||
            void 0 === b ||
            null === (g = b.session) ||
            void 0 === g ||
            g.applyDelayedCdmUpdates());
        if (!m) return _;
        (m.initiated = d),
          m.setMediaItem(n),
          (n.playbackType = e.PlaybackType.encryptedFull),
          (h.nowPlayingItem = n),
          (n.state = D.loading);
        const P = yield h.getManifestForItem(n);
        h.manifest = P;
        const S = shouldForceAudioMse();
        if (
          ((n.isSong || (m.isFairplay && S)) && (m.extURI = P.extURI),
          (n.state = D.ready),
          m.isFairplay && !S)
        ) {
          let e = n.assetURL;
          (null == p ? void 0 : p.startTime) && (e += "#t=" + p.startTime),
            yield h._playAssetURL(e, y);
        } else {
          const e = h._buffer;
          e &&
          h.isSeamlessAudioTransitionsEnabled &&
          e.isItemPlaying(P.mediaItem)
            ? Qe.debug("already have buffer, continuing playback")
            : yield h.beginNewBufferForItem(y, P, p);
        }
        return h.finishPlaybackSequence();
      })();
    }
    getManifestForItem(e) {
      var n = this;
      return _async_to_generator$H(function* () {
        var d, p;
        Qe.debug("reconciling item to play against playing item");
        const {
            nextManifest: h,
            manifest: y,
            isSeamlessAudioTransitionsEnabled: _,
          } = n,
          m = n._buffer;
        if (!m || !y)
          return (
            Qe.debug(
              "no buffer or manifest, creating manifest [title, buffer, manifest]",
              e.title,
              !!m,
              !!y,
            ),
            n.loadAndParseManifest(e)
          );
        if (!_)
          return (
            Qe.debug(
              "seamless transitions disabled, stopping and creating manifest for",
              e.title,
            ),
            yield n.tearDownManifests(),
            n.loadAndParseManifest(e)
          );
        const g = !m.isItemPlaying(e);
        let b;
        return (
          Qe.debug("itemMismatch", g),
          h && !g
            ? (Qe.debug(
                `replacing manifest for ${y.mediaItem.title} with next manifest ${h.mediaItem.title}`,
              ),
              (b = h),
              (n.nextManifest = void 0),
              Qe.debug(
                "cease listening for keys on manifest for",
                y.mediaItem.title,
              ),
              yield n.tearDownManifest(y))
            : g
              ? (null == h ? void 0 : h.mediaItem.id) !== e.id
                ? (Qe.debug(
                    `item to play ${e.title} does not match playing or next items, tearing down all manifests`,
                  ),
                  yield n.tearDownManifests(),
                  (b = yield n.loadAndParseManifest(e)))
                : (Qe.debug(
                    `item to play ${e.title} matches next item, tearing down current manifest`,
                  ),
                  yield n.tearDownManifest(y),
                  (b = h))
              : (Qe.debug(
                  "item is already playing, returning existing manifest",
                ),
                (b = y)),
          Qe.debug("getManifestForItem loading keys for", y.mediaItem.title),
          null === (p = n.extension) ||
            void 0 === p ||
            null === (d = p.session) ||
            void 0 === d ||
            d.loadKeys(b.keyValues, b.mediaItem),
          b
        );
      })();
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$H(function* () {
        const d = n._buffer;
        if (d) {
          Qe.debug("audio-player: buffer seek to", e);
          if (!(yield d.seek(e))) return;
          n.isSeamlessAudioTransitionsEnabled && n.onTimeUpdate();
        } else
          Qe.debug("audio-player: media element seek to", e),
            (n._targetElement.currentTime = e);
      })();
    }
    tearDownManifests() {
      var e = this;
      return _async_to_generator$H(function* () {
        (e.manifest = yield e.tearDownManifest(e.manifest)),
          (e.nextManifest = yield e.tearDownManifest(e.nextManifest));
      })();
    }
    tearDownManifest(e) {
      var n = this;
      return _async_to_generator$H(function* () {
        const { extension: d } = n;
        e &&
          (Qe.debug("tearing down manifest for", e.mediaItem.title),
          e.stop(),
          d && (yield d.clearSessions(e.keyValues)),
          e.removeEventListener(Sn.keysParsed, n.loadKeysHandler));
      })();
    }
    loadAndParseManifest(e, n = true) {
      var d = this;
      return _async_to_generator$H(function* () {
        let p;
        Qe.debug(`will load and parse manifest for ${e.title}, loadKeys ${n}`);
        try {
          return (
            (p = yield Manifest.load(e, true)),
            n && p.addEventListener(Sn.keysParsed, d.loadKeysHandler),
            p.parse(),
            p
          );
        } catch (V) {
          d.resetDeferredPlay();
          const n = new MKError(
            MKError.Reason.NETWORK_ERROR,
            "Could not fetch manifest",
          );
          throw ((n.data = V), d._dispatcher.publish(xn, n), n);
        }
      })();
    }
    onTimeUpdate() {
      if (!this._buffer) return;
      const {
        currentPlaybackTimeRemaining: e,
        nextManifest: n,
        delaySeamlessCdmUpdates: d,
      } = this;
      if (n && e < 15) {
        var p, h, y, _;
        if ((Qe.debug("player loading keys for", n.mediaItem.title, d), d))
          null === (h = this.extension) ||
            void 0 === h ||
            null === (p = h.session) ||
            void 0 === p ||
            p.loadKeys(n.keyValues, n.mediaItem, {
              delayCdmUpdate: true,
            }),
            this._targetElement.addEventListener(
              "timeupdate",
              this.delayedCdmUpdateCheck,
            );
        else
          null === (_ = this.extension) ||
            void 0 === _ ||
            null === (y = _.session) ||
            void 0 === y ||
            y.loadKeys(n.keyValues, n.mediaItem);
        this._targetElement.removeEventListener(
          "timeupdate",
          this.onTimeUpdate,
        );
      }
    }
    delayedCdmUpdateCheck() {
      var e;
      const n =
          null === (e = this.nowPlayingItem) || void 0 === e
            ? void 0
            : e.playbackDuration,
        d = n ? n / 1e3 : this.currentPlaybackDuration,
        p = this._currentTime,
        h = Number((d - p).toFixed(3));
      if (h < 1) {
        const e = 1e3 * h;
        Qe.debug("delayed CDM update in ", e),
          setTimeout(() => {
            var e, n;
            Qe.debug("applying delayed CDM update"),
              null === (n = this.extension) ||
                void 0 === n ||
                null === (e = n.session) ||
                void 0 === e ||
                e.applyDelayedCdmUpdates();
          }, e),
          this._targetElement.removeEventListener(
            "timeupdate",
            this.delayedCdmUpdateCheck,
          );
      }
    }
    loadKeysHandler(e) {
      var n, d;
      null === (d = this.extension) ||
        void 0 === d ||
        null === (n = d.session) ||
        void 0 === n ||
        n.loadKeys(e.keys, e.item);
    }
    beginNewBufferForItem(e, n, d) {
      var p = this;
      return _async_to_generator$H(function* () {
        if (
          (Qe.debug("creating new MseBuffer for item", n.mediaItem.title, e),
          p._buffer && (Qe.debug("stopping old buffer"), p._buffer.stop()),
          (p._buffer = new MseBuffer({
            dispatcher: p._dispatcher,
            element: p._targetElement,
            duration: n.mediaItem.playbackDuration / 1e3,
            manifest: n,
          })),
          yield p._playAssetURL(p._buffer.playableUrl, true),
          !e)
        ) {
          let e = Promise.resolve();
          return (
            (null == d ? void 0 : d.startTime) &&
              (e = p.seekToTime(d.startTime)),
            e.then(() => p._playMedia())
          );
        }
      })();
    }
    setPresentationMode(e) {
      return _async_to_generator$H(function* () {
        return Promise.resolve();
      })();
    }
    loadPreviewImage(e) {
      return _async_to_generator$H(function* () {})();
    }
    constructor(e) {
      var n, d;
      super(e),
        _define_property$W(this, "currentAudioTrack", void 0),
        _define_property$W(this, "currentTextTrack", void 0),
        _define_property$W(this, "textTracks", []),
        _define_property$W(this, "audioTracks", []),
        _define_property$W(this, "audio", void 0),
        _define_property$W(this, "isSeamlessAudioTransitionsEnabled", true),
        _define_property$W(this, "delaySeamlessCdmUpdates", true),
        _define_property$W(this, "extension", void 0),
        _define_property$W(this, "mediaPlayerType", "audio"),
        _define_property$W(this, "manifest", void 0),
        _define_property$W(this, "nextManifest", void 0);
      const p =
        null !==
          (d = null === (n = e.bag) || void 0 === n ? void 0 : n.features) &&
        void 0 !== d
          ? d
          : {};
      (this.isSeamlessAudioTransitionsEnabled =
        !!p["seamless-audio-transitions"]),
        (this.delaySeamlessCdmUpdates = !!p["delay-seamless-cdm-updates"]),
        (window.audioPlayer = this),
        this._dispatcher.subscribe(In, this.onLoadSegmentError);
    }
  }

  function asyncGeneratorStep$G(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$G(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$G(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$G(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$V(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$k(
    [
      Bind(),
      _ts_metadata$k("design:type", Function),
      _ts_metadata$k("design:paramtypes", [void 0]),
      _ts_metadata$k("design:returntype", void 0),
    ],
    AudioPlayer.prototype,
    "onLoadSegmentError",
    null,
  ),
    _ts_decorate$k(
      [
        AsyncDebounce(250),
        _ts_metadata$k("design:type", Function),
        _ts_metadata$k("design:paramtypes", [Number]),
        _ts_metadata$k("design:returntype", Promise),
      ],
      AudioPlayer.prototype,
      "seekToTime",
      null,
    ),
    _ts_decorate$k(
      [
        Bind(),
        _ts_metadata$k("design:type", Function),
        _ts_metadata$k("design:paramtypes", []),
        _ts_metadata$k("design:returntype", void 0),
      ],
      AudioPlayer.prototype,
      "onTimeUpdate",
      null,
    ),
    _ts_decorate$k(
      [
        Bind(),
        _ts_metadata$k("design:type", Function),
        _ts_metadata$k("design:paramtypes", []),
        _ts_metadata$k("design:returntype", void 0),
      ],
      AudioPlayer.prototype,
      "delayedCdmUpdateCheck",
      null,
    ),
    _ts_decorate$k(
      [
        Bind(),
        _ts_metadata$k("design:type", Function),
        _ts_metadata$k("design:paramtypes", [void 0]),
        _ts_metadata$k("design:returntype", void 0),
      ],
      AudioPlayer.prototype,
      "loadKeysHandler",
      null,
    );
  class EncryptedSession extends KeySession {
    attachMedia(e, n) {
      var d = this;
      return _async_to_generator$G(function* () {
        (d.keySystem = n.keySystem),
          (d._keySystemAccess = n),
          e.addEventListener("encrypted", d.boundHandleSessionCreation, true);
      })();
    }
    detachMedia(e) {
      e.removeEventListener("encrypted", this.boundHandleSessionCreation);
    }
    createSession(e) {
      var n = this;
      return _async_to_generator$G(function* () {
        Qe.debug("Encrypted createSession", e);
        const d = n._keySystemAccess;
        if (!d) return;
        const { initData: p, initDataType: h, target: y } = e;
        var _;
        return (
          n._mediaKeysPromise ||
            (n._mediaKeysPromise = new Promise(
              ((_ = _async_to_generator$G(function* (e, p) {
                const h = yield d.createMediaKeys();
                try {
                  yield y.setMediaKeys(h);
                } catch (V) {
                  n.dispatchKeyError(V), p(V);
                }
                const _ = yield n.loadCertificateBuffer();
                yield h.setServerCertificate(_),
                  (n._mediaKeysServerCertificate = _),
                  e(h);
              })),
              function (e, n) {
                return _.apply(this, arguments);
              }),
            )),
          yield n._mediaKeysPromise,
          n._mediaKeysServerCertificate ? n._createSession(y, p, h) : void 0
        );
      })();
    }
    generatePSSH(e) {
      const n = new Uint8Array([
          0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121,
          214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1,
          18, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]),
        d = J(e);
      for (let p = 0; p < d.length; p++) n[n.length - 16 + p] = d[p];
      return Qe.debug("generatePSSH", n), n;
    }
    _createSession(e, n, d) {
      const p = e.mediaKeys.createSession(),
        { item: h } = this;
      if (!h) return;
      this._teardownCurrentSession(), Qe.debug("creating media key session", p);
      let y;
      if (this.isWidevine && h.isSong) y = this.generatePSSH(this.extID);
      else {
        const e = (function (e) {
            const n = [],
              d = new DataView(e.buffer);
            for (let p = 0; p < e.length; ) {
              const h = d.getUint32(p);
              n.push(new PsshBox(e, p, p + h)), (p += h);
            }
            return n;
          })(new Uint8Array(n)).find((e) => e.isWidevine),
          d = null == e ? void 0 : e.rawBytes,
          h = te(d);
        Qe.debug("extracted uri", h), (p.extURI = h), (y = n);
      }
      return (
        p.addEventListener("message", this.startLicenseSession),
        (this._currentSession = p),
        p.generateRequest(d, y).catch((e) => {
          if (e.message.match(/generateRequest.*\(75\)/))
            return p.generateRequest(d, y);
          throw e;
        })
      );
    }
    _teardownCurrentSession() {
      this._currentSession &&
        (Qe.debug("tearing down media key session", this._currentSession),
        this._currentSession.removeEventListener(
          "message",
          this.startLicenseSession,
        ),
        (this._currentSession = void 0));
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e, n, d) {
      return _async_to_generator$G(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$G(function* () {})();
    }
    constructor(...e) {
      super(...e),
        _define_property$V(this, "_currentSession", void 0),
        _define_property$V(this, "_keySystemAccess", void 0),
        _define_property$V(this, "_mediaKeysPromise", void 0),
        _define_property$V(this, "_mediaKeysServerCertificate", void 0);
    }
  }

  function asyncGeneratorStep$F(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$F(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$F(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$F(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$U(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class MediaExtensionStub extends Notifications {
    destroy(e) {}
    setMediaItem(e) {}
    initializeKeySystem() {
      var e = this;
      return _async_to_generator$F(function* () {
        e.session = new EncryptedSession();
      })();
    }
    clearSessions() {
      return _async_to_generator$F(function* () {})();
    }
    constructor(e) {
      super(e),
        _define_property$U(this, "audioTracks", []),
        _define_property$U(this, "textTracks", []),
        _define_property$U(this, "session", void 0),
        _define_property$U(this, "extURI", void 0),
        _define_property$U(this, "hasMediaKeySupport", void 0),
        _define_property$U(this, "hasMediaSession", void 0),
        _define_property$U(this, "initiated", void 0),
        _define_property$U(this, "isFairplay", void 0),
        (this.extURI = ""),
        (this.hasMediaKeySupport = true),
        (this.initiated = true),
        (this.isFairplay = true),
        (this.hasMediaKeySupport = true),
        (this.hasMediaSession = true);
    }
  }

  function asyncGeneratorStep$E(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$E(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$E(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$E(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$T(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class PlayerStub {
    get hasMediaElement() {
      return true;
    }
    get isEngagedInPlayback() {
      return !this.paused;
    }
    get playbackRate() {
      return this._playbackRate;
    }
    set playbackRate(e) {
      (this._playbackRate = e),
        this._dispatcher.publish(
          Pt.playbackRateDidChange,
          new Event("ratechange"),
        );
    }
    get volume() {
      return this._volume;
    }
    set volume(e) {
      (this._volume = e),
        this._dispatcher.publish(
          Pt.playbackVolumeDidChange,
          new Event("volumeChange"),
        );
    }
    destroy() {}
    dispatch() {}
    exitFullscreen() {
      return _async_to_generator$E(function* () {})();
    }
    loadPreviewImage(e) {
      return _async_to_generator$E(function* () {})();
    }
    initialize() {
      return _async_to_generator$E(function* () {})();
    }
    isPaused() {
      return this.paused;
    }
    calculateTime(e) {
      return e;
    }
    clearNextManifest() {}
    mute() {}
    newSeeker() {
      return new PlayerSeeker(this);
    }
    pause(e) {
      return _async_to_generator$E(function* () {})();
    }
    play() {
      return _async_to_generator$E(function* () {})();
    }
    playItemFromEncryptedSource(e, n, d) {
      return _async_to_generator$E(function* () {})();
    }
    playItemFromUnencryptedSource(e, n, d) {
      return _async_to_generator$E(function* () {})();
    }
    preload() {
      return _async_to_generator$E(function* () {})();
    }
    prepareToPlay(e, n, d) {
      return _async_to_generator$E(function* () {})();
    }
    seekToTime(e) {
      return _async_to_generator$E(function* () {})();
    }
    requestFullscreen() {
      return _async_to_generator$E(function* () {})();
    }
    setPlaybackState(e, n) {}
    setPresentationMode(e) {
      return _async_to_generator$E(function* () {})();
    }
    showPlaybackTargetPicker() {}
    stop(e) {
      return _async_to_generator$E(function* () {})();
    }
    stopMediaAndCleanup() {
      return _async_to_generator$E(function* () {})();
    }
    supportsPictureInPicture() {
      return true;
    }
    tsidChanged() {}
    setNextSeamlessItem(e) {
      return _async_to_generator$E(function* () {})();
    }
    constructor(n) {
      _define_property$T(this, "bitrate", e.PlaybackBitrate.STANDARD),
        _define_property$T(this, "audioTracks", []),
        _define_property$T(this, "currentBufferedProgress", 0),
        _define_property$T(this, "currentPlaybackDuration", 0),
        _define_property$T(this, "currentPlaybackProgress", 0),
        _define_property$T(this, "currentPlaybackTime", 0),
        _define_property$T(this, "currentPlaybackTimeRemaining", 0),
        _define_property$T(this, "currentPlayingDate", void 0),
        _define_property$T(this, "isPlayingAtLiveEdge", true),
        _define_property$T(this, "isPlaying", true),
        _define_property$T(this, "isPrimaryPlayer", true),
        _define_property$T(this, "isReady", true),
        _define_property$T(this, "nowPlayingItem", void 0),
        _define_property$T(this, "paused", true),
        _define_property$T(this, "playbackState", e.PlaybackStates.none),
        _define_property$T(this, "playbackTargetAvailable", true),
        _define_property$T(this, "playbackTargetIsWireless", true),
        _define_property$T(this, "previewOnly", true),
        _define_property$T(this, "supportsPreviewImages", true),
        _define_property$T(this, "textTracks", []),
        _define_property$T(this, "extension", new MediaExtensionStub([])),
        _define_property$T(this, "hasAuthorization", true),
        _define_property$T(this, "windowHandlers", void 0),
        _define_property$T(this, "isDestroyed", true),
        _define_property$T(this, "services", void 0),
        _define_property$T(this, "_dispatcher", void 0),
        _define_property$T(this, "_volume", 1),
        _define_property$T(this, "_playbackRate", 1),
        _define_property$T(this, "currentAudioTrack", void 0),
        _define_property$T(this, "currentTextTrack", void 0),
        _define_property$T(this, "seekableTimeRanges", void 0),
        (this.services = n.services),
        (this._dispatcher = n.services.dispatcher),
        (this.windowHandlers = new WindowHandlers(this, n.services.runtime));
    }
  }
  class VideoMediaExtension extends MediaExtension {
    destroy(e) {
      var n;
      null === (n = this._session) || void 0 === n || n.stopLicenseSession(),
        super.destroy(e);
    }
  }
  const jn = BooleanDevFlag.register("mk-send-manifest-headers");

  function asyncGeneratorStep$D(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$D(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$D(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$D(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$S(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const Ln = [
    "https://play.itunes.apple.com/",
    "https://linear.tv.apple.com/",
    "https://play-edge.itunes.apple.com",
  ];
  const Nn = new (class {
    fetchManifest(e) {
      var n = this;
      return _async_to_generator$D(function* () {
        return (
          Qe.info("fetching manifest at", e),
          shouldLoadManifestOnce() ? n.fetchForCache(e) : n.fetchOnly(e)
        );
      })();
    }
    getManifest(e) {
      return this.cache.get(e);
    }
    clear(e) {
      e ? this.cache.delete(e) : this.cache.clear();
    }
    fetchForCache(e) {
      var n = this;
      return _async_to_generator$D(function* () {
        const d = (function (e) {
            const n = {};
            Ln.some((n) => e.startsWith(n)) &&
              cn.musicUserToken &&
              (!jn.configured || jn.enabled) &&
              ((n["media-user-token"] = cn.musicUserToken),
              (n.Authorization = "Bearer " + cn.developerToken));
            return n;
          })(e),
          p = yield n.fetch(e, {
            headers: new Headers(d),
          });
        let h = yield p.text();
        var y;
        h = ((e, n) => {
          Qe.info("converting manifest URIs to absolute paths");
          const d = new URL(e);
          let p = n.replace(/URI="([^"]*)"/g, function (e, n) {
            return `URI="${new URL(n, d).href}"`;
          });
          return (
            (p = p.replace(
              /^(#EXT-X-STREAM-INF:[^\n]*\n)(.*$)/gim,
              function (e, n, p) {
                return `${n}${new URL(p, d).href}`;
              },
            )),
            p
          );
        })(e, h);
        const _ = {
          url: e,
          content: h,
          contentType:
            null !== (y = p.headers.get("content-type")) && void 0 !== y
              ? y
              : void 0,
        };
        return n.cache.set(e, _), _;
      })();
    }
    fetchOnly(e) {
      var n = this;
      return _async_to_generator$D(function* () {
        const d = yield n.fetch(e),
          p = yield d.text();
        var h;
        return {
          url: e,
          content: p,
          contentType:
            null !== (h = d.headers.get("content-type")) && void 0 !== h
              ? h
              : void 0,
        };
      })();
    }
    constructor(e = {}) {
      var n, d;
      _define_property$S(this, "cache", void 0),
        _define_property$S(this, "fetch", void 0),
        (this.fetch =
          null !== (n = e.fetch) && void 0 !== n ? n : fetch.bind(globalThis)),
        (this.cache = null !== (d = e.cache) && void 0 !== d ? d : new Map());
    }
  })();

  function asyncGeneratorStep$C(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$C(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$C(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$C(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _ts_decorate$j(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$j(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const { mediaPlaybackError: Un } = Pt,
    { playbackLicenseError: Bn, playbackSessionError: Fn } = lt;
  class NativeSafariVideoPlayer extends VideoPlayer {
    get currentPlayingDate() {}
    get isPlayingAtLiveEdge() {
      return true;
    }
    get seekableTimeRanges() {
      return this.currentPlaybackDuration
        ? [
            {
              start: 0,
              end: this.currentPlaybackDuration,
            },
          ]
        : void 0;
    }
    get supportsPreviewImages() {
      return true;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$C(function* () {
        if (!e.video)
          return void Qe.warn(
            "NativeSafariVideoPlayer.initializeExtension No video element, not initializing extension",
          );
        const n = new VideoMediaExtension(
          e.video,
          'video/mp4;codecs="avc1.42E01E"',
        );
        (e.extension = n),
          yield n.initializeKeySystem(),
          n.addEventListener(Bn, e.onPlaybackLicenseError),
          n.addEventListener(Fn, e.onPlaybackSessionError);
      })();
    }
    destroy() {
      Qe.debug("native-safari-video-player.destroy");
      const { extension: e, video: n } = this;
      this._blobUrl &&
        (URL.revokeObjectURL(this._blobUrl), (this._blobUrl = void 0)),
        e &&
          n &&
          (e.removeEventListener(Bn, this.onPlaybackLicenseError),
          e.removeEventListener(Fn, this.onPlaybackSessionError),
          n.removeEventListener("loadedmetadata", this.onMetadataLoaded),
          super.destroy());
    }
    loadPreviewImage(e) {
      return _async_to_generator$C(function* () {})();
    }
    playHlsStream(e, n, d = {}) {
      var p = this;
      return _async_to_generator$C(function* () {
        Qe.debug("native-safari-video-player.playHlsStream", e);
        const { video: h } = p;
        if (!h) {
          const e = "NativeSafariVideoPlayer.playHlsStream(): No video element";
          throw (Qe.error(e), new Error(e));
        }
        p.setupTrackManagers();
        const y = p.startPlaybackSequence();
        void 0 === d.startTime &&
          void 0 !== (null == n ? void 0 : n.keyPlayStartTime) &&
          (d.startTime = n.keyPlayStartTime);
        const _ = (
          p._shouldLoadManifestsOnce
            ? p.playByBlob(e, h, d)
            : p.playBySource(e, h, d)
        ).then(() => y);
        var m;
        n && (null === (m = p.extension) || void 0 === m || m.setMediaItem(n));
        return h.addEventListener("loadedmetadata", p.onMetadataLoaded), _;
      })();
    }
    onPlaybackSessionError(e) {
      this._dispatcher.publish(
        Un,
        new MKError(MKError.Reason.MEDIA_SESSION, e),
      );
    }
    onMetadataLoaded() {
      var e = this;
      return _async_to_generator$C(function* () {
        Qe.debug("native-safari-video-player.onMetadataLoaded");
        const { nowPlayingItem: n } = e;
        n && (n.state = D.ready),
          yield e._playMedia(),
          e.finishPlaybackSequence();
      })();
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$C(function* () {
        Qe.debug("native-safari-video-player: media element seek to", e),
          (n._targetElement.currentTime = e);
      })();
    }
    playByBlob(e, n, d = {}) {
      var p = this;
      return _async_to_generator$C(function* () {
        Qe.debug("native-safari-video-player: playing video by blob");
        let h = Nn.getManifest(e);
        if (
          !h &&
          (Qe.debug("native-safari-video-player: fetching manifest"),
          (h = yield Nn.fetchManifest(e)),
          !h)
        )
          throw (
            (Qe.error("No manifest for " + e),
            new MKError(
              MKError.Reason.CONTENT_UNAVAILABLE,
              "Failed to load manifest",
            ))
          );
        Qe.debug("native-safari-video-player: loaded manifest", !!h),
          Nn.clear(e);
        const y = h.contentType,
          _ = h.content.replace(/^#EXT-X-SESSION-DATA-ITUNES:.*$/gm, ""),
          m = new Blob([_], {
            type: y,
          });
        (e = URL.createObjectURL(m)), (p._blobUrl = e);
        const g = document.createElement("source");
        g.setAttribute("src", e),
          y && g.setAttribute("type", y),
          Qe.debug("native-safari-video-player: blob url", e),
          void 0 !== d.startTime && (n.currentTime = d.startTime),
          n.appendChild(g);
      })();
    }
    playBySource(e, n, d = {}) {
      return _async_to_generator$C(function* () {
        Qe.debug("native-safari-video-player: playing video by source"),
          void 0 !== d.startTime && (e += "#t=" + d.startTime),
          (n.src = e);
      })();
    }
    constructor(...e) {
      super(...e),
        (function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            : (e[n] = d);
        })(this, "_blobUrl", void 0);
    }
  }
  _ts_decorate$j(
    [
      Bind(),
      _ts_metadata$j("design:type", Function),
      _ts_metadata$j("design:paramtypes", [void 0]),
      _ts_metadata$j("design:returntype", void 0),
    ],
    NativeSafariVideoPlayer.prototype,
    "onPlaybackSessionError",
    null,
  ),
    _ts_decorate$j(
      [
        Bind(),
        _ts_metadata$j("design:type", Function),
        _ts_metadata$j("design:paramtypes", []),
        _ts_metadata$j("design:returntype", Promise),
      ],
      NativeSafariVideoPlayer.prototype,
      "onMetadataLoaded",
      null,
    ),
    _ts_decorate$j(
      [
        AsyncDebounce(250),
        _ts_metadata$j("design:type", Function),
        _ts_metadata$j("design:paramtypes", [Number]),
        _ts_metadata$j("design:returntype", Promise),
      ],
      NativeSafariVideoPlayer.prototype,
      "seekToTime",
      null,
    );
  const Kn = Qe.createChild("tracks");

  function _define_property$Q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$s(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$Q(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$h(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _ts_decorate$i(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$i(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const {
    audioTracksSwitched: Vn,
    audioTracksUpdated: Gn,
    inlineStylesParsed: Hn,
    textTracksSwitched: qn,
    textTracksUpdated: Wn,
  } = lt;
  class HlsJsTracks extends Notifications {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get audioTracks() {
      return this._audioTracks;
    }
    get textTracks() {
      return this._textTracks;
    }
    set audioTrack(e) {
      this.session &&
        e &&
        void 0 !== e.id &&
        (this.session.audioSelectedPersistentID = e.id);
    }
    set textTrack(e) {
      var n;
      this.session.subtitleSelectedPersistentID =
        null !== (n = null == e ? void 0 : e.id) && void 0 !== n ? n : -1;
    }
    selectForcedTrack() {
      const { session: e } = this;
      if (!(null == e ? void 0 : e.audioTracks)) return;
      const n = e.audioTracks.filter(
          (n) => n.persistentID === e.audioSelectedPersistentID,
        ),
        d = n && n.length && n[0];
      if (!d) return;
      const p = e.subtitleMediaOptions.filter(
          (e) =>
            0 === e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
            e.MediaSelectionOptionsExtendedLanguageTag === d.lang,
        ),
        h = null == p ? void 0 : p[0];
      let y;
      return (
        h
          ? (Kn.debug(
              "hlsjsTracks: found forced track for " +
                h.MediaSelectionOptionsExtendedLanguageTag,
            ),
            (e.subtitleSelectedPersistentID =
              h.MediaSelectionOptionsPersistentID),
            (y = this.normalizeTextTrack(h)))
          : (e.subtitleSelectedPersistentID = -1),
        y
      );
    }
    audioTracksUpdated(e, n) {
      const d = (
        (n &&
          n.audioMediaSelectionGroup &&
          n.audioMediaSelectionGroup.MediaSelectionGroupOptions) ||
        []
      ).map(this.normalizeAudioTrack, this);
      (this._audioTracks = d), this.dispatchEvent(Gn, d);
    }
    handleAudioTrackSwitched() {
      this.dispatchEvent(Vn, {
        selectedId: this.session.audioSelectedPersistentID,
      });
    }
    handleInlineStylesParsed(e, n) {
      this.dispatchEvent(Hn, n);
    }
    handleManifestLoaded(e, n) {
      this.audioTracksUpdated(e, n), this.subtitleTracksUpdated(e, n);
    }
    handleSessionDataComplete(e, n) {
      var d;
      null == n ||
        null === (d = n.itemList) ||
        void 0 === d ||
        d.forEach((e) => {
          if ("_hls.localized-rendition-names" === e["DATA-ID"] && e.VALUE)
            try {
              (this._localizedRenditionNames = JSON.parse(e.VALUE)),
                this._audioTracks.forEach((e) => {
                  var n;
                  const d =
                    null === (n = this._localizedRenditionNames) || void 0 === n
                      ? void 0
                      : n[e.label];
                  d && (e.localizedRenditionNames = d);
                }),
                this.dispatchEvent(Gn, this._audioTracks);
            } catch (Vt) {
              return void Kn.error(
                "Failed to parse _hls.localized-rendition-names",
                Vt,
              );
            }
        });
    }
    handleSubtitleTrackSwitch(e, n) {
      this.dispatchEvent(qn, n);
    }
    subtitleTracksUpdated(e, n) {
      const d =
          (n &&
            n.subtitleMediaSelectionGroup &&
            n.subtitleMediaSelectionGroup.MediaSelectionGroupOptions) ||
          [],
        p = [];
      d.forEach((e) => {
        0 !== e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
          p.push(this.normalizeTextTrack(e));
      }),
        (this._textTracks = p),
        this.dispatchEvent(Wn, p);
    }
    normalizeAudioTrack(e) {
      const n = e.MediaSelectionOptionsTaggedMediaCharacteristics,
        d = (null != n ? n : []).includes(
          "public.accessibility.describes-video",
        )
          ? "description"
          : "main";
      return _object_spread_props$h(
        _object_spread$s({}, this.normalizeSelectionOption(e)),
        {
          enabled: true,
          kind: d,
          characteristics: n,
        },
      );
    }
    normalizeTextTrack(e) {
      var n;
      let d;
      return (
        (d =
          (null === (n = e.MediaSelectionOptionsTaggedMediaCharacteristics) ||
          void 0 === n
            ? void 0
            : n.includes("public.accessibility.describes-music-and-sound")) ||
          "clcp" === e.MediaSelectionOptionsMediaType
            ? "captions"
            : "subtitles"),
        _object_spread_props$h(
          _object_spread$s({}, this.normalizeSelectionOption(e)),
          {
            mode: "disabled",
            kind: d,
          },
        )
      );
    }
    normalizeSelectionOption(e) {
      return {
        id: e.MediaSelectionOptionsPersistentID,
        label: e.MediaSelectionOptionsName,
        language: e.MediaSelectionOptionsExtendedLanguageTag,
      };
    }
    destroy() {
      this._isDestroyed = true;
      const {
        MANIFEST_LOADED: e,
        AUDIO_TRACK_SWITCHED: n,
        SUBTITLE_TRACK_SWITCH: d,
        INLINE_STYLES_PARSED: p,
        SESSION_DATA_COMPLETE: h,
      } = window.Hls.Events;
      this.session.off(e, this.handleManifestLoaded),
        this.session.off(n, this.handleAudioTrackSwitched),
        this.session.off(d, this.handleSubtitleTrackSwitch),
        this.session.off(p, this.handleInlineStylesParsed),
        this.session.off(h, this.handleSessionDataComplete);
    }
    constructor(e) {
      super([Vn, Gn, Hn, qn, Wn]),
        _define_property$Q(this, "session", void 0),
        _define_property$Q(this, "_audioTracks", void 0),
        _define_property$Q(this, "_textTracks", void 0),
        _define_property$Q(this, "_localizedRenditionNames", void 0),
        _define_property$Q(this, "_isDestroyed", void 0),
        (this.session = e),
        (this._audioTracks = []),
        (this._textTracks = []),
        (this._isDestroyed = true);
      const {
        MANIFEST_LOADED: n,
        AUDIO_TRACK_SWITCHED: d,
        SUBTITLE_TRACK_SWITCH: p,
        INLINE_STYLES_PARSED: h,
        SESSION_DATA_COMPLETE: y,
      } = window.Hls.Events;
      this.session.on(n, this.handleManifestLoaded),
        this.session.on(d, this.handleAudioTrackSwitched),
        this.session.on(p, this.handleSubtitleTrackSwitch),
        this.session.on(h, this.handleInlineStylesParsed),
        this.session.on(y, this.handleSessionDataComplete);
    }
  }

  function _define_property$P(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$i(
    [
      Bind(),
      _ts_metadata$i("design:type", Function),
      _ts_metadata$i("design:paramtypes", []),
      _ts_metadata$i("design:returntype", void 0),
    ],
    HlsJsTracks.prototype,
    "handleAudioTrackSwitched",
    null,
  ),
    _ts_decorate$i(
      [
        Bind(),
        _ts_metadata$i("design:type", Function),
        _ts_metadata$i("design:paramtypes", [void 0, void 0]),
        _ts_metadata$i("design:returntype", void 0),
      ],
      HlsJsTracks.prototype,
      "handleInlineStylesParsed",
      null,
    ),
    _ts_decorate$i(
      [
        Bind(),
        _ts_metadata$i("design:type", Function),
        _ts_metadata$i("design:paramtypes", [void 0, void 0]),
        _ts_metadata$i("design:returntype", void 0),
      ],
      HlsJsTracks.prototype,
      "handleManifestLoaded",
      null,
    ),
    _ts_decorate$i(
      [
        Bind(),
        _ts_metadata$i("design:type", Function),
        _ts_metadata$i("design:paramtypes", [void 0, void 0]),
        _ts_metadata$i("design:returntype", void 0),
      ],
      HlsJsTracks.prototype,
      "handleSessionDataComplete",
      null,
    ),
    _ts_decorate$i(
      [
        Bind(),
        _ts_metadata$i("design:type", Function),
        _ts_metadata$i("design:paramtypes", [void 0, void 0]),
        _ts_metadata$i("design:returntype", void 0),
      ],
      HlsJsTracks.prototype,
      "handleSubtitleTrackSwitch",
      null,
    );
  class HlsJsPreviewImageLoader {
    loadPreviewImage(e) {
      return (
        this.lastPosition === e ||
          ((this.lastPosition = e),
          (this.lastPromise = new Promise((n, d) => {
            this.hls.loadImageIframeData$(e).subscribe((e) => {
              const { data: d } = e,
                p = new Blob([d], {
                  type: "image/jpeg",
                });
              n(p);
            });
          }))),
        this.lastPromise
      );
    }
    constructor(e) {
      _define_property$P(this, "hls", void 0),
        _define_property$P(this, "lastPosition", void 0),
        _define_property$P(this, "lastPromise", void 0),
        (this.hls = e);
    }
  }

  function asyncGeneratorStep$B(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$B(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$B(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$B(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$O(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$h(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$h(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const zn = {
    bufferStalledError: "bufferStalledError",
    keySystemGenericError: "keySystemGenericError",
  };
  var Yn;
  !(function (e) {
    (e.Seek = "Seek"),
      (e.HighBuffer = "HighBuffer"),
      (e.LowBuffer = "LowBuffer");
  })(Yn || (Yn = {}));
  const Qn = new Set([
      MKError.Reason.DEVICE_LIMIT,
      MKError.Reason.GEO_BLOCK,
      MKError.Reason.WIDEVINE_CDM_EXPIRED,
    ]),
    Xn = {};
  (Xn[ot.FAIRPLAY] = "fairplaystreaming"),
    (Xn[ot.PLAYREADY] = "playready"),
    (Xn[ot.WIDEVINE] = "widevine");
  const Jn = BooleanDevFlag.get("mk-block-report-cdn-server"),
    Zn = {
      nightly: true,
      carry: true,
    },
    eo = JsonDevFlag.register("mk-hlsjs-config-overrides");
  class HlsJsVideoPlayer extends VideoPlayer {
    get shouldDispatchErrors() {
      return !this.userInitiated || this._playbackDidStart;
    }
    get supportsPreviewImages() {
      var e, n;
      return (
        !this.services.runtime.isMobile &&
        (null === (n = this._hls) ||
        void 0 === n ||
        null === (e = n.iframeVariants) ||
        void 0 === e
          ? void 0
          : e.some((e) => "mjpg" === e.imageCodec))
      );
    }
    get currentPlayingDate() {
      var e;
      return null === (e = this._hls) || void 0 === e ? void 0 : e.playingDate;
    }
    get isPlayingAtLiveEdge() {
      var e;
      const n = this._hls;
      return (
        !(
          !n ||
          !(null === (e = this.nowPlayingItem) || void 0 === e
            ? void 0
            : e.isLinearStream)
        ) && !!n.isPlayingAtLive
      );
    }
    get seekableTimeRanges() {
      const e = this._hls;
      return e
        ? e.seekableTimeRanges
        : this.currentPlaybackDuration
          ? [
              {
                start: 0,
                end: this.currentPlaybackDuration,
              },
            ]
          : void 0;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$B(function* () {
        e._keySystem = yield findKeySystemPreference(e.services.runtime);
        try {
          var n;
          if (!at.urls.hls) throw new Error("bag.urls.hls is not configured");
          yield Promise.all([
            loadScript(at.urls.hls),
            null === (n = e._rtcTracker) || void 0 === n
              ? void 0
              : n.loadScript(),
          ]);
        } catch (Vt) {
          throw (
            (Qe.error(
              "hlsjs-video-player failed to load script " + at.urls.hls,
              Vt,
            ),
            Vt)
          );
        }
      })();
    }
    destroy() {
      var e;
      if (
        (Qe.debug("hlsjs-video-player.destroy"),
        null === (e = this._hlsJsTracks) || void 0 === e || e.destroy(),
        this._hls)
      ) {
        const {
            ERROR: e,
            INTERNAL_ERROR: n,
            MANIFEST_PARSED: d,
            KEY_REQUEST_STARTED: p,
            LICENSE_CHALLENGE_CREATED: h,
            LEVEL_SWITCHED: y,
            UNRESOLVED_URI_LOADING: _,
          } = window.Hls.Events,
          m = this._hls;
        m.stopLoad(),
          m.detachMedia(),
          m.off(e, this.handleHlsError),
          m.off(n, this.handleHlsError),
          m.off(d, this.handleManifestParsed),
          m.off(p, this.handleKeyRequestStarted),
          m.off(h, this.handleLicenseChallengeCreated),
          m.off(y, this.handleLevelSwitched),
          this._shouldLoadManifestsOnce &&
            m.off(_, this.handleUnresolvedUriLoading),
          m.destroy(),
          (window.hlsSession = void 0);
      }
      super.destroy(), asAsync(this._license.stop());
    }
    playHlsStream(e, n, d = {}) {
      var p = this;
      return _async_to_generator$B(function* () {
        Qe.debug("hlsjs-video-player.playHlsStream", e, n);
        const { _keySystem: h } = p;
        if (!h) return;
        let y, _;
        (p._unrecoverableError = void 0), p.createHlsPlayer();
        const hasKey = (e, n) => {
          var d;
          return (
            void 0 !==
            (null == n || null === (d = n.keyURLs) || void 0 === d
              ? void 0
              : d[e])
          );
        };
        h === ot.WIDEVINE &&
          hasKey("widevine-cert-url", n) &&
          ((y = "WIDEVINE_SOFTWARE"),
          (_ = {
            initDataTypes: ["cenc", "keyids"],
            distinctiveIdentifier: "optional",
            persistentState: "required",
          }));
        const m = {
            subs: "accepts-css",
            platformInfo: {
              requiresCDMAttachOnStart: h !== ot.NONE,
              maxSecurityLevel: y,
              keySystemConfig: _,
            },
            appData: {
              serviceName: at.app.name,
            },
          },
          { _rtcTracker: g, _hls: b } = p;
        if (g) {
          const e = g.prepareReportingAgent(n);
          void 0 !== e && (m.appData.reportingAgent = e);
        }
        Qe.debug("RTC: loadSource with load options", m);
        const P = p.startPlaybackSequence();
        var S;
        return (
          p._shouldLoadManifestsOnce &&
            ((e = e.replace("https://", "manifest://")),
            Qe.info("Manifest already loaded, passing url to HLSJS", e)),
          b.loadSource(
            e,
            m,
            null !== (S = d.startTime) && void 0 !== S
              ? S
              : null == n
                ? void 0
                : n.keyPlayStartTime,
          ),
          b.attachMedia(p.video),
          n &&
            ((p._licenseServerUrl = n.keyURLs["hls-key-server-url"]),
            h === ot.FAIRPLAY && hasKey("hls-key-cert-url", n)
              ? b.setProtectionData({
                  fairplaystreaming: {
                    serverCertUrl: n.keyURLs["hls-key-cert-url"],
                  },
                })
              : hasKey("widevine-cert-url", n) &&
                b.setProtectionData({
                  widevine: {
                    serverCertUrl: n.keyURLs["widevine-cert-url"],
                  },
                })),
          P
        );
      })();
    }
    createHlsPlayer() {
      var e;
      const { _keySystem: n } = this,
        { Hls: d } = window,
        p = ge.get(),
        { os: h } = this.services.runtime,
        y = {
          disableAudioCodecList: new Set([7, 6, 3, 5, 4]),
        },
        _ = (function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var d = null != arguments[n] ? arguments[n] : {},
              p = Object.keys(d);
            "function" == typeof Object.getOwnPropertySymbols &&
              (p = p.concat(
                Object.getOwnPropertySymbols(d).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(d, e).enumerable;
                }),
              )),
              p.forEach(function (n) {
                _define_property$O(e, n, d[n]);
              });
          }
          return e;
        })(
          {
            clearMediaKeysOnPromise: true,
            customTextTrackCueRenderer: true,
            debug: !!p,
            debugLevel: p,
            enableIFramePreloading: true,
            enablePerformanceLogging: !!p,
            enablePlayReadyKeySystem: true,
            enableQueryParamsForITunes: !this._shouldLoadManifestsOnce,
            enableRtcReporting: void 0 !== this._rtcTracker,
            keySystemPreference: Xn[n],
            useMediaKeySystemAccessFilter: true,
            maintainMediaKeysBetweenSessions: true,
            nativeControlsEnabled: h.isAndroid,
            enableContentSteering: true,
            allowFastSwitchUp: true,
            liveAllowLowLatencyPlayback: true,
          },
          (
            null === (e = this._runtime) || void 0 === e
              ? void 0
              : e.browser.isEdge
          )
            ? y
            : {},
        );
      ((e) => {
        const { Hls: n } = window;
        if (n && Jn) {
          const d = deepClone(n.DefaultConfig.fragLoadPolicy);
          (d.default.reportCDNServer = true),
            (d.customURL.reportCDNServer = true),
            (e.fragLoadPolicy = d);
        }
      })(_),
        ((e) => {
          const n = _e.value;
          if (!n) return;
          var d;
          const p =
            null !== (d = determineCdnPathPrefix()) && void 0 !== d ? d : "";
          n.socketurl &&
            isAppleHostname(n.socketurl) &&
            Zn[p.split(".")[0]] &&
            ((e.socketurl = n.socketurl),
            (e.socketid = n.socketid),
            (e.log = n.log));
        })(_),
        ((e) => {
          const n = eo.value;
          n && "object" == typeof n && Object.assign(e, n);
        })(_);
      const m = new d(_),
        {
          ERROR: g,
          INTERNAL_ERROR: b,
          MANIFEST_PARSED: P,
          KEY_REQUEST_STARTED: S,
          LICENSE_CHALLENGE_CREATED: E,
          LEVEL_SWITCHED: T,
          UNRESOLVED_URI_LOADING: k,
        } = d.Events;
      m.on(g, this.handleHlsError),
        m.on(b, this.handleHlsError),
        m.on(P, this.handleManifestParsed),
        m.on(S, this.handleKeyRequestStarted),
        m.on(E, this.handleLicenseChallengeCreated),
        m.on(T, this.handleLevelSwitched),
        this._shouldLoadManifestsOnce &&
          m.on(k, this.handleUnresolvedUriLoading),
        (this._hls = m),
        (window.hlsSession = m),
        (this._hlsJsTracks = new HlsJsTracks(this._hls)),
        this.setupTrackManagers(this._hlsJsTracks),
        (this._hlsPreviewImageLoader = new HlsJsPreviewImageLoader(this._hls));
    }
    handleUnresolvedUriLoading(e, n) {
      var d = this;
      return _async_to_generator$B(function* () {
        const e = d._hls,
          p = n.uri,
          h = p.replace("manifest://", "https://");
        var y;
        Qe.debug("handleUnresolvedUriLoading for uri ", p);
        const _ =
          null !== (y = Nn.getManifest(h)) && void 0 !== y
            ? y
            : yield Nn.fetchManifest(h);
        _
          ? (Nn.clear(h),
            e.off(
              window.Hls.Events.UNRESOLVED_URI_LOADING,
              d.handleUnresolvedUriLoading,
            ),
            e.handleResolvedUri(p, {
              url: h,
              status: 200,
              data: _.content,
            }))
          : Qe.error("No cached manifest for " + h);
      })();
    }
    handleLevelSwitched(e, n) {
      var d, p;
      const { level: h } = n;
      if (!h) return;
      const y =
        null === (d = this._levels) || void 0 === d
          ? void 0
          : d.find((e) => e.persistentId === h);
      if (
        !y ||
        (null === (p = this._currentLevel) || void 0 === p
          ? void 0
          : p.persistentId) === (null == y ? void 0 : y.persistentId)
      )
        return;
      this._currentLevel = y;
      const _ =
        void 0 !== y.audioGroupId
          ? this._channelsByGroup[y.audioGroupId]
          : void 0;
      this._dispatcher.publish(gt.hlsLevelUpdated, {
        level: y,
        channels: _,
      });
    }
    handleHlsError(e, n) {
      var d;
      if (
        (Qe.warn("HLS.js error", JSON.stringify(n)), this._unrecoverableError)
      )
        return;
      let p = new MKError(MKError.Reason.UNSUPPORTED_ERROR, n.reason);
      p.data = n;
      const { bufferStalledError: h, keySystemGenericError: y } = zn;
      if (n.details === y) return void this._dispatcher.publish(y, p);
      let _ = true;
      var m;
      n.details === h &&
        "Seek" === n.stallType &&
        -12909 ===
          (null === (d = n.response) || void 0 === d ? void 0 : d.code) &&
        ((p = new MKError(MKError.Reason.BUFFER_STALLED_ERROR, n.stallType)),
        (p.data = {
          stallType: n.stallType,
          code: null === (m = n.response) || void 0 === m ? void 0 : m.code,
        }),
        (_ = true));
      if (
        ("output-restricted" === n.reason &&
          (p = new MKError(MKError.Reason.OUTPUT_RESTRICTED, n.reason)),
        n.fatal)
      ) {
        if ((this._hls.destroy(), !this.shouldDispatchErrors && !_)) throw p;
        this._dispatcher.publish(Pt.mediaPlaybackError, p);
      }
    }
    handleManifestParsed(e, n) {
      var d = this;
      return _async_to_generator$B(function* () {
        var e, p;
        let h;
        Qe.debug("handleManifestParsed", n),
          (d._levels = null !== (e = n.levels) && void 0 !== e ? e : []),
          (d.nowPlayingItem.state = D.ready),
          (d._channelsByGroup = (
            null !== (p = n.audioTracks) && void 0 !== p ? p : []
          ).reduce((e, n) => ((e[n.groupId] = n.channels), e), {}));
        try {
          yield d._playMedia();
        } catch (Vt) {
          throw (
            (Qe.warn("error from media element, possibly non-fatal", Vt), Vt)
          );
        } finally {
          h = yield d.finishPlaybackSequence();
        }
        return h;
      })();
    }
    handleKeyRequestStarted(e, n) {
      Qe.debug("hlsjs-video.handleKeyRequestStarted"),
        this._hls.generateKeyRequest(n.keyuri, {});
    }
    handleLicenseChallengeCreated(n, d) {
      var p = this;
      return _async_to_generator$B(function* () {
        const {
          _licenseServerUrl: n,
          nowPlayingItem: h,
          _keySystem: y,
          userInitiated: _,
        } = p;
        try {
          var m;
          const e = yield null === (m = p._license) || void 0 === m
              ? void 0
              : m.start(n, h, d, y, _),
            g = {
              statusCode: e.status,
            };
          (null == e ? void 0 : e.license) &&
            (y === ot.FAIRPLAY
              ? (g.ckc = J(e.license))
              : (g.license = J(e.license)));
          const b = e["renew-after"];
          b && (g.renewalDate = new Date(Date.now() + 1e3 * b)),
            p._hls.setLicenseResponse(d.keyuri, g);
        } catch (V) {
          if (p._unrecoverableError) return;
          const h = V.data,
            y = {};
          void 0 !== (null == h ? void 0 : h.status) &&
            (y.statusCode = +h.status),
            Qe.warn("Passing license response error to Hls.js", y),
            p._hls.setLicenseResponse(d.keyuri, y),
            MKError.isMKError(V) &&
              Qn.has(V.reason) &&
              ((p._unrecoverableError = V),
              p.resetDeferredPlay(),
              yield p.stop({
                endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
                userInitiated: _,
              })),
            p.onPlaybackLicenseError(V);
        }
      })();
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$B(function* () {
        n._hls
          ? (Qe.debug("hlsjs-video: hls seekTo", e), (n._hls.seekTo = e))
          : (Qe.debug("hlsjs-video: media element seek to", e),
            (n._targetElement.currentTime = e));
      })();
    }
    loadPreviewImage(e) {
      var n = this;
      return _async_to_generator$B(function* () {
        var d;
        return null === (d = n._hlsPreviewImageLoader) || void 0 === d
          ? void 0
          : d.loadPreviewImage(e);
      })();
    }
    constructor(e) {
      var n, d;
      super(e),
        _define_property$O(this, "_hls", void 0),
        _define_property$O(this, "_hlsPreviewImageLoader", void 0),
        _define_property$O(this, "_hlsJsTracks", void 0),
        _define_property$O(this, "_keySystem", void 0),
        _define_property$O(this, "_license", void 0),
        _define_property$O(this, "_rtcTracker", void 0),
        _define_property$O(this, "_levels", void 0),
        _define_property$O(this, "_channelsByGroup", {}),
        _define_property$O(this, "_currentLevel", void 0),
        _define_property$O(this, "_licenseServerUrl", void 0),
        _define_property$O(this, "_unrecoverableError", void 0),
        _define_property$O(this, "_runtime", void 0),
        (this._rtcTracker =
          null == e || null === (n = e.playbackServices) || void 0 === n
            ? void 0
            : n.getRTCStreamingTracker()),
        (this._license = new License()),
        (this._runtime =
          null == e || null === (d = e.services) || void 0 === d
            ? void 0
            : d.runtime);
    }
  }
  var to;
  _ts_decorate$h(
    [
      Bind(),
      _ts_metadata$h("design:type", Function),
      _ts_metadata$h("design:paramtypes", [
        String,
        "undefined" == typeof HlsUnresolvedUriData
          ? Object
          : HlsUnresolvedUriData,
      ]),
      _ts_metadata$h("design:returntype", Promise),
    ],
    HlsJsVideoPlayer.prototype,
    "handleUnresolvedUriLoading",
    null,
  ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [void 0, void 0]),
        _ts_metadata$h("design:returntype", void 0),
      ],
      HlsJsVideoPlayer.prototype,
      "handleLevelSwitched",
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [void 0, void 0]),
        _ts_metadata$h("design:returntype", void 0),
      ],
      HlsJsVideoPlayer.prototype,
      "handleHlsError",
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [void 0, void 0]),
        _ts_metadata$h("design:returntype", Promise),
      ],
      HlsJsVideoPlayer.prototype,
      "handleManifestParsed",
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [void 0, void 0]),
        _ts_metadata$h("design:returntype", void 0),
      ],
      HlsJsVideoPlayer.prototype,
      "handleKeyRequestStarted",
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [void 0, void 0]),
        _ts_metadata$h("design:returntype", Promise),
      ],
      HlsJsVideoPlayer.prototype,
      "handleLicenseChallengeCreated",
      null,
    ),
    _ts_decorate$h(
      [
        AsyncDebounce(250),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [Number]),
        _ts_metadata$h("design:returntype", Promise),
      ],
      HlsJsVideoPlayer.prototype,
      "seekToTime",
      null,
    ),
    _ts_decorate$h(
      [
        ((to = 250),
        (e, n, d) => {
          const p = (function (e, n) {
            let d,
              p,
              h = 0;
            const resetState = () => {
              clearTimeout(p), (p = 0), (d = void 0);
            };
            return function (...y) {
              const _ = this;
              return new Promise(function (m, g) {
                const b = Date.now();
                b - h < n
                  ? (d && (d.resolve(void 0), resetState()),
                    (d = {
                      resolve: m,
                      reject: g,
                      args: y,
                    }),
                    (p = setTimeout(
                      () => {
                        e.apply(_, d.args).then(d.resolve).catch(d.reject),
                          resetState();
                      },
                      n - (b - h + 1),
                    )))
                  : (resetState(), (h = b), e.apply(_, y).then(m).catch(g));
              });
            };
          })(d.value, to);
          d.value = p;
        }),
        _ts_metadata$h("design:type", Function),
        _ts_metadata$h("design:paramtypes", [Number]),
        _ts_metadata$h("design:returntype", Promise),
      ],
      HlsJsVideoPlayer.prototype,
      "loadPreviewImage",
      null,
    ),
    (e.version = "3.2430.3");
  const ro = e.version.split(".");
  ro[0];
  const io = ro[ro.length - 1];
  var no, oo;
  (ro[0] = "3"),
    (ro[ro.length - 1] = io + "-prerelease"),
    (e.version = ro.join(".")),
    (e.PlaybackActions = void 0),
    ((no = e.PlaybackActions || (e.PlaybackActions = {})).REPEAT = "REPEAT"),
    (no.SHUFFLE = "SHUFFLE"),
    (no.AUTOPLAY = "AUTOPLAY"),
    (e.PlaybackMode = void 0),
    ((oo = e.PlaybackMode || (e.PlaybackMode = {}))[(oo.PREVIEW_ONLY = 0)] =
      "PREVIEW_ONLY"),
    (oo[(oo.MIXED_CONTENT = 1)] = "MIXED_CONTENT"),
    (oo[(oo.FULL_PLAYBACK_ONLY = 2)] = "FULL_PLAYBACK_ONLY");
  const ao = {
    configured: "musickitconfigured",
    loaded: "musickitloaded",
    audioTrackAdded: Pt.audioTrackAdded,
    audioTrackChanged: Pt.audioTrackChanged,
    audioTrackRemoved: Pt.audioTrackRemoved,
    authorizationStatusDidChange: We.authorizationStatusDidChange,
    authorizationStatusWillChange: We.authorizationStatusWillChange,
    bufferedProgressDidChange: Pt.bufferedProgressDidChange,
    capabilitiesChanged: "capabilitiesChanged",
    autoplayEnabledDidChange: "autoplayEnabledDidChange",
    drmUnsupported: Pt.drmUnsupported,
    eligibleForSubscribeView: We.eligibleForSubscribeView,
    forcedTextTrackChanged: Pt.forcedTextTrackChanged,
    mediaCanPlay: Pt.mediaCanPlay,
    mediaElementCreated: Pt.mediaElementCreated,
    mediaItemStateDidChange: I.mediaItemStateDidChange,
    mediaItemStateWillChange: I.mediaItemStateWillChange,
    mediaPlaybackError: Pt.mediaPlaybackError,
    mediaSkipAvailable: "mediaSkipAvailable",
    mediaRollEntered: "mediaRollEntered",
    mediaUpNext: "mediaUpNext",
    metadataDidChange: Pt.metadataDidChange,
    nowPlayingItemDidChange: Pt.nowPlayingItemDidChange,
    nowPlayingItemWillChange: Pt.nowPlayingItemWillChange,
    playInitiated: "playInitiated",
    playbackBitrateDidChange: Pt.playbackBitrateDidChange,
    playbackDurationDidChange: Pt.playbackDurationDidChange,
    playbackProgressDidChange: Pt.playbackProgressDidChange,
    playbackRateDidChange: Pt.playbackRateDidChange,
    playbackStateDidChange: Pt.playbackStateDidChange,
    playbackStateWillChange: Pt.playbackStateWillChange,
    playbackTargetAvailableDidChange: Pt.playbackTargetAvailableDidChange,
    playbackTargetIsWirelessDidChange: Pt.playbackTargetIsWirelessDidChange,
    playbackTimeDidChange: Pt.playbackTimeDidChange,
    playbackVolumeDidChange: Pt.playbackVolumeDidChange,
    playerTypeDidChange: Pt.playerTypeDidChange,
    presentationModeDidChange: Pt.presentationModeDidChange,
    primaryPlayerDidChange: Pt.primaryPlayerDidChange,
    queueIsReady: "queueIsReady",
    queueItemsDidChange: "queueItemsDidChange",
    queueItemForStartPosition: "queueItemForStartPosition",
    queuePositionDidChange: "queuePositionDidChange",
    shuffleModeDidChange: "shuffleModeDidChange",
    repeatModeDidChange: "repeatModeDidChange",
    storefrontCountryCodeDidChange: We.storefrontCountryCodeDidChange,
    storefrontIdentifierDidChange: We.storefrontIdentifierDidChange,
    textTrackAdded: Pt.textTrackAdded,
    textTrackChanged: Pt.textTrackChanged,
    textTrackRemoved: Pt.textTrackRemoved,
    timedMetadataDidChange: Pt.timedMetadataDidChange,
    userTokenDidChange: We.userTokenDidChange,
    webComponentsLoaded: "musickitwebcomponentsloaded",
  };

  function asyncGeneratorStep$A(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$N(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$g(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class SpanWatcher {
    startMonitor() {
      this.dispatcher.unsubscribe(
        ao.playbackTimeDidChange,
        this.handleTimeChange,
      ),
        this.dispatcher.subscribe(
          ao.playbackTimeDidChange,
          this.handleTimeChange,
        );
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(
        ao.playbackTimeDidChange,
        this.handleTimeChange,
      );
    }
    handleTimeChange(e, { currentPlaybackTime: n }) {
      var d,
        p = this;
      return ((d = function* () {
        !Number.isFinite(n) || n < p.start || n > p.stop
          ? (p.inWatchSpan = !1)
          : p.inWatchSpan ||
            (p.allowMultiple || p.stopMonitor(),
            (p.inWatchSpan = true),
            yield p.callback(n, p));
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);

          function _next(e) {
            asyncGeneratorStep$A(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$A(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    constructor(e, n, d, p, h = true) {
      _define_property$N(this, "dispatcher", void 0),
        _define_property$N(this, "callback", void 0),
        _define_property$N(this, "start", void 0),
        _define_property$N(this, "stop", void 0),
        _define_property$N(this, "allowMultiple", void 0),
        _define_property$N(this, "inWatchSpan", void 0),
        (this.dispatcher = e),
        (this.callback = n),
        (this.start = d),
        (this.stop = p),
        (this.allowMultiple = h),
        (this.inWatchSpan = true);
    }
  }

  function _define_property$M(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$f(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$g("design:type", Function),
      _ts_metadata$g("design:paramtypes", [void 0, void 0]),
      _ts_metadata$g("design:returntype", Promise),
    ],
    SpanWatcher.prototype,
    "handleTimeChange",
    null,
  );
  class PlaybackMonitor {
    activate() {
      (this.isActive = true), this.startMonitor();
    }
    deactivate() {
      (this.isActive = true), this.clearMonitor();
    }
    clearMonitor() {
      this.isMonitoring &&
        (this.watchers.forEach((e) => e.stopMonitor()),
        (this.isMonitoring = true));
    }
    shouldMonitor() {
      return this.isActive;
    }
    startMonitor() {
      this.shouldMonitor() &&
        (this.watchers.forEach((e) => e.startMonitor()),
        (this.isMonitoring = true));
    }
    handleMediaItemChange() {
      this.isActive &&
        (this.clearMonitor(), this.shouldMonitor() && this.startMonitor());
    }
    constructor(e) {
      _define_property$M(this, "isActive", true),
        _define_property$M(this, "isMonitoring", true),
        _define_property$M(this, "apiManager", void 0),
        _define_property$M(this, "dispatcher", void 0),
        _define_property$M(this, "playbackController", void 0),
        _define_property$M(this, "watchers", []),
        (this.handlePlaybackThreshold =
          this.handlePlaybackThreshold.bind(this)),
        (this.playbackController = e.controller),
        (this.dispatcher = e.services.dispatcher),
        this.dispatcher.subscribe(
          ao.nowPlayingItemDidChange,
          this.handleMediaItemChange,
        ),
        (this.apiManager = e.services.apiManager);
    }
  }

  function asyncGeneratorStep$z(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$f("design:type", Function),
      _ts_metadata$f("design:paramtypes", []),
      _ts_metadata$f("design:returntype", void 0),
    ],
    PlaybackMonitor.prototype,
    "handleMediaItemChange",
    null,
  );
  class RollMonitor extends PlaybackMonitor {
    handlePlaybackThreshold(e, n) {
      var d,
        p = this;
      return ((d = function* () {
        if (!p.rollMap.has(n)) return;
        const e = p.rollMap.get(n);
        p.dispatcher.publish(ao.mediaRollEntered, e), p.rollMap.delete(n);
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);

          function _next(e) {
            asyncGeneratorStep$z(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$z(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return true;
      return this.getRollMetadata().length > 0;
    }
    startMonitor() {
      this.setupWatchers(this.getRollMetadata()), super.startMonitor();
    }
    getRollMetadata() {
      const e = this.playbackController.nowPlayingItem;
      return void 0 === e
        ? []
        : (function (e, n = ["pre-roll", "mid-roll", "post-roll"]) {
            if (void 0 === e.hlsMetadata) return [];
            const d = [];
            return (
              n.forEach((n) => {
                const p = parseInt(e.hlsMetadata[n + ".count"], 10);
                if (!isNaN(p))
                  for (let h = 0; h < p; h++) {
                    const p = `${n}.${h}`,
                      y = {
                        index: h,
                        type: n,
                        skippable: "true" === e.hlsMetadata[p + ".skippable"],
                        "adam-id": e.hlsMetadata[p + ".adam-id"],
                        start: Math.round(
                          parseFloat(e.hlsMetadata[p + ".start"]),
                        ),
                        duration: Math.round(
                          parseFloat(e.hlsMetadata[p + ".duration"]),
                        ),
                      },
                      _ = p + ".dynamic-slot.data-set-id";
                    void 0 !== e.hlsMetadata[_] &&
                      (y["dynamic-id"] = e.hlsMetadata[_]),
                      d.push(y);
                  }
              }),
              d
            );
          })(e, ["pre-roll", "post-roll"]);
    }
    setupWatchers(e) {
      const n = [];
      e.forEach((e) => {
        const { start: d, duration: p } = e,
          h = new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            d,
            d + p,
          );
        n.push(h), this.rollMap.set(h, e);
      }),
        (this.watchers = n);
    }
    constructor(e) {
      super(e),
        (function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            : (e[n] = d);
        })(this, "rollMap", new Map());
    }
  }

  function asyncGeneratorStep$y(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  class SkipAvailable extends PlaybackMonitor {
    handlePlaybackThreshold(e, n) {
      var d,
        p = this;
      return ((d = function* () {
        if (!p.skipMap.has(n)) return;
        const e = p.skipMap.get(n);
        p.dispatcher.publish(ao.mediaSkipAvailable, e);
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);

          function _next(e) {
            asyncGeneratorStep$y(y, p, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$y(y, p, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return true;
      return this.getNowPlayingMetadata().length > 0;
    }
    startMonitor() {
      this.setupWatchers(this.getNowPlayingMetadata()), super.startMonitor();
    }
    getNowPlayingMetadata() {
      const e = this.playbackController.nowPlayingItem;
      return void 0 === e
        ? []
        : (function (e) {
            const n = parseInt(e.hlsMetadata["skip.count"], 10),
              d = [];
            if (isNaN(n) || 0 === n) return d;
            for (let p = 0; p < n; p++) {
              const n = {
                start: parseFloat(e.hlsMetadata[`skip.${p}.start`]),
                duration: parseFloat(e.hlsMetadata[`skip.${p}.duration`]),
                target: parseFloat(e.hlsMetadata[`skip.${p}.target`]),
                label: e.hlsMetadata[`skip.${p}.label`],
              };
              void 0 !== e.hlsMetadata[`skip.${p}.promo.enabled`] &&
                (n.promo = {
                  enabled: "true" === e.hlsMetadata[`skip.${p}.promo.enabled`],
                  image: e.hlsMetadata[`skip.${p}.promo.image`],
                  "image-height": parseInt(
                    e.hlsMetadata[`skip.${p}.promo.image-height`],
                    10,
                  ),
                  "image-width": parseInt(
                    e.hlsMetadata[`skip.${p}.promo.image-width`],
                    10,
                  ),
                  genre: e.hlsMetadata[`skip.${p}.promo.genre`],
                  "release-year": parseInt(
                    e.hlsMetadata[`skip.${p}.promo.release-year`],
                    10,
                  ),
                  "rating-display-name":
                    e.hlsMetadata[`skip.${p}.promo.rating-display-name`],
                  "rating-system":
                    e.hlsMetadata[`skip.${p}.promo.rating-system`],
                  "canonical-id": e.hlsMetadata[`skip.${p}.promo.canonical-id`],
                  title: e.hlsMetadata[`skip.${p}.promo.title`],
                  "rating-tag": e.hlsMetadata[`skip.${p}.promo.rating-tag`],
                  "rating-rank": e.hlsMetadata[`skip.${p}.promo.rating-rank`],
                  "up-next": {
                    "is-added":
                      "true" ===
                      e.hlsMetadata[`skip.${p}.promo.up-next.is-added`],
                    "add-label":
                      e.hlsMetadata[`skip.${p}.promo.up-next.add-label`],
                    "added-label":
                      e.hlsMetadata[`skip.${p}.promo.up-next.added-label`],
                  },
                  runtime: parseInt(
                    e.hlsMetadata[`skip.${p}.promo.runtime`],
                    10,
                  ),
                }),
                d.push(n);
            }
            return d;
          })(e);
    }
    setupWatchers(e) {
      const n = [];
      e.forEach((e) => {
        const { start: d, target: p, duration: h, promo: y } = e,
          _ = new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            d,
            y ? p : d + h,
            true,
          );
        n.push(_), this.skipMap.set(_, e);
      }),
        (this.watchers = n);
    }
    constructor(e) {
      super(e),
        (function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            : (e[n] = d);
        })(this, "skipMap", new Map());
    }
  }

  function asyncGeneratorStep$x(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$J(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const hasContentCompletionThresholdData = (e) =>
      !isNaN(getUpNextStart(e)) && !isNaN(getWatchedTime(e)),
    getUpNextStart = (e) => parseFloat(e.hlsMetadata["up-next.start"]),
    getWatchedTime = (e) => parseFloat(e.hlsMetadata["watched.time"]),
    so =
      ((co = function* (e, n) {
        if (e.isUTS && e.assetURL)
          try {
            const d = generateAssetUrl(e, n),
              p = yield Nn.fetchManifest(d);
            e.hlsMetadata = (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                "function" == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$J(e, n, d[n]);
                  });
              }
              return e;
            })(
              {},
              e.hlsMetadata,
              (function (e, n = {}) {
                const d =
                    /^(?:#EXT-X-SESSION-DATA:?)DATA-ID="([^"]+)".+VALUE="([^"]+)".*$/,
                  p = {};
                for (const h of e.split("\n")) {
                  const e = h.match(d);
                  if (e) {
                    let d = e[1];
                    e[1].startsWith("com.apple.hls.") &&
                      !1 !== n.stripPrefix &&
                      (d = e[1].slice("com.apple.hls.".length));
                    const h = e[2];
                    p[d] = h;
                  }
                }
                return p;
              })(p.content),
            );
          } catch (V) {
            Je.error(V.message, V);
          }
      }),
      (lo = function () {
        var e = this,
          n = arguments;
        return new Promise(function (d, p) {
          var h = co.apply(e, n);

          function _next(e) {
            asyncGeneratorStep$x(h, d, p, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$x(h, d, p, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      }),
      function (e, n) {
        return lo.apply(this, arguments);
      });
  var co, lo;

  function asyncGeneratorStep$w(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _ts_metadata$e(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class UpNextMonitor extends PlaybackMonitor {
    handlePlaybackThreshold() {
      var e = this;
      return (function (e) {
        return function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);

            function _next(e) {
              asyncGeneratorStep$w(y, p, h, _next, _throw, "next", e);
            }

            function _throw(e) {
              asyncGeneratorStep$w(y, p, h, _next, _throw, "throw", e);
            }
            _next(void 0);
          });
        };
      })(function* () {
        e.dispatcher.publish(ao.mediaUpNext);
      })();
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return true;
      const e = this.playbackController.nowPlayingItem;
      return void 0 !== e && hasContentCompletionThresholdData(e);
    }
    startMonitor() {
      this.setupWatchers(), super.startMonitor();
    }
    setupWatchers() {
      const e = this.playbackController.nowPlayingItem;
      e &&
        hasContentCompletionThresholdData(e) &&
        (this.watchers = [
          new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            Math.round(this.getStartTime(e)),
            Number.POSITIVE_INFINITY,
          ),
        ]);
    }
    getStartTime(e) {
      const n = getUpNextStart(e);
      return isNaN(n) ? getWatchedTime(e) : n;
    }
    constructor(e) {
      super(e);
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$e("design:type", Function),
      _ts_metadata$e("design:paramtypes", []),
      _ts_metadata$e("design:returntype", Promise),
    ],
    UpNextMonitor.prototype,
    "handlePlaybackThreshold",
    null,
  );
  const uo = getHlsJsCdnConfig(),
    po = {
      app: {},
      autoplay: {
        maxQueueSizeForAutoplay: 50,
        maxQueueSizeInRequest: 10,
        maxUpcomingTracksToMaintain: 10,
      },
      features: {
        xtrick: true,
        isWeb: true,
        bookmarking: true,
        "seamless-audio-transitions": true,
        "enhanced-hls": true,
      },
      urls: {
        hls: uo.hls,
        rtc: uo.rtc,
        mediaApi: "https://api.music.apple.com/v1",
        webPlayback: `https://${getCommerceHostname(
          "play",
        )}/WebObjects/MZPlay.woa/wa/webPlayback`,
      },
    },
    ho = JsonDevFlag.register("mk-offers-key-urls").get();

  function asyncGeneratorStep$v(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$v(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$v(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$v(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$I(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$g(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  let yo;
  ho && (po.urls.hlsOffersKeyUrls = ho);
  class Store {
    get authorizationStatus() {
      return this.storekit.authorizationStatus;
    }
    get cid() {
      return this.storekit.cid;
    }
    get developerToken() {
      return this.storekit.developerToken;
    }
    get hasAuthorized() {
      return this._hasAuthorized;
    }
    get isAuthorized() {
      return this.storekit.hasAuthorized;
    }
    get isRestricted() {
      return this.storekit.authorizationStatus === Fe.RESTRICTED;
    }
    get isU13() {
      return this.storekit.isU13;
    }
    get metricsClientId() {
      return this._metricsClientId;
    }
    set metricsClientId(e) {
      this._metricsClientId = e;
    }
    get musicUserToken() {
      return this.storekit.userToken;
    }
    set musicUserToken(e) {
      this.storekit.userToken = e;
    }
    set dynamicMusicUserToken(e) {
      this.storekit.dynamicUserToken = e;
    }
    get realm() {
      return this.storekit.realm;
    }
    set requestUserToken(e) {
      (this._providedRequestUserToken = true),
        (this.storekit.requestUserToken = e);
    }
    get restrictedEnabled() {
      return this.storekit.restrictedEnabled;
    }
    set restrictedEnabled(e) {
      this.storekit.overrideRestrictEnabled(e);
    }
    get storefrontCountryCode() {
      var e;
      return this.isAuthorized
        ? this.storekit.storefrontCountryCode
        : null !== (e = this._defaultStorefrontCountryCode) && void 0 !== e
          ? e
          : this.storekit.storefrontCountryCode;
    }
    get storefrontId() {
      return this._apiStorefrontId || this.storekit.storefrontCountryCode;
    }
    set storefrontId(e) {
      e && (e = e.toLowerCase()),
        e !== this._apiStorefrontId &&
          ((this._apiStorefrontId = e),
          this.dispatcher.publish(gt.apiStorefrontChanged, {
            storefrontId: e,
          }));
    }
    get subscribeURL() {
      return this.storekit.deeplinkURL({
        p: "subscribe",
      });
    }
    get subscribeFamilyURL() {
      return this.storekit.deeplinkURL({
        p: "subscribe-family",
      });
    }
    get subscribeIndividualURL() {
      return this.storekit.deeplinkURL({
        p: "subscribe-individual",
      });
    }
    get subscribeStudentURL() {
      return this.storekit.deeplinkURL({
        p: "subscribe-student",
      });
    }
    get userToken() {
      return this.musicUserToken;
    }
    authorize() {
      var e = this;
      return _async_to_generator$v(function* () {
        if (e.storekit.userTokenIsValid) return e.storekit.userToken;
        let n;
        try {
          n = yield e.storekit.requestUserToken();
        } catch (V) {
          try {
            yield e.unauthorize();
          } catch (Vt) {}
          throw new MKError(MKError.Reason.AUTHORIZATION_ERROR, "Unauthorized");
        }
        return (
          e._providedRequestUserToken && (e.storekit.userToken = n),
          e.storekit.userTokenIsValid
            ? (yield e.storekit.requestStorefrontCountryCode().catch(
                (function () {
                  var n = _async_to_generator$v(function* (n) {
                    return yield e.unauthorize(), Promise.reject(n);
                  });
                  return function (e) {
                    return n.apply(this, arguments);
                  };
                })(),
              ),
              n)
            : void 0
        );
      })();
    }
    unauthorize() {
      var e = this;
      return _async_to_generator$v(function* () {
        return e.storekit.revokeUserToken();
      })();
    }
    constructor(n, d = {}) {
      var p, h;
      _define_property$I(this, "precache", void 0),
        _define_property$I(this, "storekit", void 0),
        _define_property$I(this, "dispatcher", void 0),
        _define_property$I(this, "_apiStorefrontId", void 0),
        _define_property$I(this, "_defaultStorefrontCountryCode", void 0),
        _define_property$I(this, "_hasAuthorized", true),
        _define_property$I(this, "_metricsClientId", void 0),
        _define_property$I(this, "_providedRequestUserToken", true),
        (this.dispatcher = d.services.dispatcher),
        "precache" in d && (this.precache = d.precache),
        d.storefrontId && (this.storefrontId = d.storefrontId),
        (this._defaultStorefrontCountryCode = d.storefrontCountryCode),
        ("affiliateToken" in d || "campaignToken" in d) &&
          (d.linkParameters = _object_spread_props$g(
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                "function" == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$I(e, n, d[n]);
                  });
              }
              return e;
            })({}, d.linkParameters || {}),
            {
              at: d.affiliateToken,
              ct: d.campaignToken,
            },
          )),
        (this.storekit = new StoreKit(n, {
          apiBase: po.urls.mediaApi,
          authenticateMethod: po.features["legacy-authenticate-method"]
            ? "POST"
            : "GET",
          deeplink: d.linkParameters,
          disableAuthBridge: d.disableAuthBridge,
          iconURL: po.app.icon,
          meParameters: d.meParameters,
          persist: d.persist,
          realm: d.realm || e.SKRealm.MUSIC,
          fetch:
            null == d ||
            null === (h = d.services) ||
            void 0 === h ||
            null === (p = h.request) ||
            void 0 === p
              ? void 0
              : p.fetch,
        })),
        this.storekit.addEventListener(ao.authorizationStatusDidChange, (e) => {
          const { authorizationStatus: n } = e;
          this._hasAuthorized = [Fe.AUTHORIZED, Fe.RESTRICTED].includes(n);
        });
    }
  }

  function formattedSeconds(e) {
    return {
      hours: Math.floor(e / 3600),
      minutes: Math.floor((e % 3600) / 60),
    };
  }

  function asyncGeneratorStep$u(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$u(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$u(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$u(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function hasAuthorization(e) {
    return (
      void 0 === e && (e = yo && yo.storekit),
      void 0 !== e && e.hasAuthorized && e.userTokenIsValid
    );
  }

  function hasMusicSubscription(e) {
    return _hasMusicSubscription.apply(this, arguments);
  }

  function _hasMusicSubscription() {
    return (_hasMusicSubscription = _async_to_generator$u(function* (e) {
      return void 0 === e && (e = yo && yo.storekit), e.hasMusicSubscription();
    })).apply(this, arguments);
  }

  function _define_property$H(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function transform$7(e) {
    return (function (e) {
      for (var n = 1; n < arguments.length; n++) {
        var d = null != arguments[n] ? arguments[n] : {},
          p = Object.keys(d);
        "function" == typeof Object.getOwnPropertySymbols &&
          (p = p.concat(
            Object.getOwnPropertySymbols(d).filter(function (e) {
              return Object.getOwnPropertyDescriptor(d, e).enumerable;
            }),
          )),
          p.forEach(function (n) {
            _define_property$H(e, n, d[n]);
          });
      }
      return e;
    })(
      {
        attributes: {},
      },
      transform$9(
        {
          id: "metadata.itemId",
          type: "metadata.itemType",
          "attributes.contentRating"() {
            var n;
            if (
              1 ===
              (null == e || null === (n = e.metadata) || void 0 === n
                ? void 0
                : n.isExplicit)
            )
              return "explicit";
          },
          "attributes.playParams"() {
            var n, d, p;
            return (
              0 !==
                (null == e || null === (n = e.metadata) || void 0 === n
                  ? void 0
                  : n.isPlayable) && {
                id:
                  null == e || null === (d = e.metadata) || void 0 === d
                    ? void 0
                    : d.itemId,
                kind:
                  null == e || null === (p = e.metadata) || void 0 === p
                    ? void 0
                    : p.itemType,
              }
            );
          },
          "container.id": "metadata.containerId",
          "container.name": "metadata.containerName",
          "container.type": "metadata.containerType",
        },
        e,
      ),
    );
  }

  function _define_property$G(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$n(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$G(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$f(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const _o = {
    condition: () => true,
    toOptions: (e, n, d) => [
      _object_spread_props$f(_object_spread$n({}, e), {
        context: d,
      }),
    ],
  };

  function _define_property$F(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$m(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$F(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$e(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const fo = {
      condition: (e) => {
        var n;
        return (
          "stations" === e.type &&
          (null === (n = e.attributes) || void 0 === n ? void 0 : n.isLive)
        );
      },
      toOptions: (e, n, d) => [
        _object_spread_props$e(_object_spread$m({}, e), {
          context: d,
          container: {
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            name: null == d ? void 0 : d.featureName,
          },
        }),
      ],
    },
    typeIs =
      (...e) =>
      ({ type: n }) =>
        e.includes(n),
    withBagPrefix = (e) => {
      if (void 0 === e || "" === e) return;
      const { prefix: n } = po;
      return n ? `${n}:${e}` : e;
    };

  function _define_property$E(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$d(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const getContainerName$1 = (e, n) => {
      var d, p;
      return null !==
        (p =
          null != n
            ? n
            : null == e || null === (d = e.container) || void 0 === d
              ? void 0
              : d.name) && void 0 !== p
        ? p
        : St.SONG;
    },
    mo = {
      toOptions: (e, n, d) => {
        const p = _object_spread_props$d(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              "function" == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$E(e, n, d[n]);
                });
            }
            return e;
          })(
            {
              id: e.id,
            },
            n,
          ),
          {
            name: withBagPrefix(
              getContainerName$1(e, null == d ? void 0 : d.featureName),
            ),
          },
        );
        return [
          {
            relationships: e.relationships,
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            container: p,
            context: d,
          },
        ];
      },
      condition: typeIs("songs", "library-songs", "music-videos"),
    };

  function _define_property$D(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$k(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$D(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$c(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const parseAssets = ({ type: e, attributes: { assetTokens: n } }) =>
      e.includes("udio")
        ? ((e) => {
            if (void 0 === e) return;
            const [n] = Object.keys(e);
            return e[n];
          })(n)
        : ((e) => {
            if (void 0 === e) return;
            const n = Object.keys(e);
            return e[n[n.length - 1]];
          })(n),
    vo = {
      condition: typeIs(
        "uploaded-audios",
        "uploadedAudio",
        "uploaded-videos",
        "uploadedVideo",
      ),
      toOptions: (e, n, d) => {
        var p, h;
        const y = _object_spread_props$c(_object_spread$k({}, e), {
          context: d,
          attributes: _object_spread_props$c(
            _object_spread$k({}, e.attributes),
            {
              assetUrl: parseAssets(e),
              playParams:
                null !==
                  (h =
                    null == e || null === (p = e.attributes) || void 0 === p
                      ? void 0
                      : p.playParams) && void 0 !== h
                  ? h
                  : {
                      id: e.id,
                      kind: e.type,
                    },
            },
          ),
        });
        return (
          void 0 !== n && (y.container = n),
          void 0 !== (null == d ? void 0 : d.featureName) &&
            (y.container = _object_spread_props$c(
              _object_spread$k({}, y.container),
              {
                name: null == d ? void 0 : d.featureName,
              },
            )),
          [y]
        );
      },
    };
  const getFeatureName = (e, n) => {
    if (n) return n;
    const d = (function (e = []) {
      return (
        0 !== e.length &&
        e.filter(
          ({ attributes: e }) =>
            !!e &&
            (e.workName ||
              e.movementName ||
              e.movementCount ||
              e.movementNumber),
        ).length > 0
      );
    })(e.relationships.tracks.data);
    return "albums" === e.type || "library-albums" === e.type
      ? d
        ? St.ALBUM_CLASSICAL
        : St.ALBUM
      : "playlists" === e.type || "library-playlists" === e.type
        ? d
          ? St.PLAYLIST_CLASSICAL
          : St.PLAYLIST
        : void 0;
  };
  var go;

  function _define_property$C(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$j(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$C(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$b(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const bo = [
      {
        toOptions: (e, n, d) => {
          const p = {
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            name: withBagPrefix(
              getFeatureName(e, null == d ? void 0 : d.featureName),
            ),
          };
          return e.relationships.tracks.data.map((e) => ({
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            container: p,
            context: d,
          }));
        },
        condition:
          ((go = "tracks"),
          (e) => {
            var n, d;
            return !!(null === (d = e.relationships) ||
            void 0 === d ||
            null === (n = d[go]) ||
            void 0 === n
              ? void 0
              : n.data);
          }),
        requiredRelationships: ["tracks"],
      },
      mo,
      fo,
      vo,
      {
        condition: typeIs("music-movies"),
        toOptions: (e, n, d) => {
          var p, h;
          const y = _object_spread_props$b(_object_spread$j({}, e), {
            context: d,
            attributes: _object_spread_props$b(
              _object_spread$j({}, e.attributes),
              {
                playParams:
                  null !==
                    (h =
                      null == e || null === (p = e.attributes) || void 0 === p
                        ? void 0
                        : p.playParams) && void 0 !== h
                    ? h
                    : {
                        id: e.id,
                        kind: "musicMovie",
                      },
                offers: void 0,
              },
            ),
          });
          return (
            void 0 !== n && (y.container = n),
            void 0 !== (null == d ? void 0 : d.featureName) &&
              (y.container = _object_spread_props$b(
                _object_spread$j({}, y.container),
                {
                  name: null == d ? void 0 : d.featureName,
                },
              )),
            [y]
          );
        },
      },
    ],
    Po = bo.reduce((e, n) => {
      const d = n.requiredRelationships;
      return d && e.push(...d), e;
    }, []),
    So = new Set(Po),
    isArrayOf = (e, n) => Array.isArray(e) && (0 === e.length || n(e[0])),
    isMediaAPIResource = (e) => e && void 0 !== e.id && void 0 !== e.type,
    isMediaItem = (e) => e && void 0 !== e.id,
    isMPMediaItem = (e) =>
      e &&
      void 0 !== e.contentId &&
      void 0 !== e.metadata &&
      void 0 !== e.metadata.itemId &&
      void 0 !== e.metadata.itemType,
    isQueueItems = (e) => e && e.items && Array.isArray(e.items),
    isQueueLoaded = (e) => e && e.loaded,
    isQueueURLOption = (e) => e && e.url;

  function _define_property$B(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const Eo = it.linkChild(new Logger("queue")),
    descriptorToMediaItems = (e) => {
      if (!isQueueItems(e) && !isQueueLoaded(e)) return [];
      const n = isQueueLoaded(e)
        ? loadedDescriptorToMediaItem(e)
        : unloadedDescriptorToMediaItem(e);
      return (
        n.forEach(
          (n) =>
            (n.context = (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                "function" == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$B(e, n, d[n]);
                  });
              }
              return e;
            })({}, e.context, n.context)),
        ),
        n
      );
    },
    unloadedDescriptorToMediaItem = ({ items: e }) =>
      isArrayOf(e, isMPMediaItem)
        ? e.map((e) => new MediaItem(transform$7(e)))
        : isArrayOf(e, isMediaItem)
          ? e.map((e) => new MediaItem(e))
          : [],
    loadedDescriptorToMediaItem = (e) => {
      const n = [],
        { loaded: d, container: p, context: h } = e;
      return void 0 === d
        ? []
        : isArrayOf(d, isDataRecord)
          ? (d.forEach((e) => {
              n.push(...dataRecordToMediaItems(e, p, h));
            }),
            n)
          : isArrayOf(d, isMediaAPIResource)
            ? (d.forEach((e) => {
                n.push(...resourceToMediaItem(e, p, h));
              }),
              n)
            : isDataRecord(d)
              ? dataRecordToMediaItems(d, p, h)
              : isMediaAPIResource(d)
                ? resourceToMediaItem(d, p, h)
                : [];
    },
    dataRecordToMediaItems = (e, n, d = {}) => {
      const { data: p } = e.serialize(true, void 0, {
        includeRelationships: So,
        allowFullDuplicateSerializations: true,
      });
      return resourceToMediaItem(p, n, d);
    },
    resourceToMediaItem = (e, n, d = {}) => (
      Eo.debug("_resourceToMediaItem", e),
      ((e, n, d = {}) => {
        var p, h, y;
        n =
          null !==
            (h =
              null == n || null === (p = n.serialize) || void 0 === p
                ? void 0
                : p.call(n).data) && void 0 !== h
            ? h
            : n;
        return (
          null !== (y = bo.find((p) => p.condition(e, n, d))) && void 0 !== y
            ? y
            : _o
        )
          .toOptions(e, n, d)
          .map((e) => new MediaItem(e));
      })(e, n, d)
    );

  function _define_property$A(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  class BaseModifiableQueue {
    append(e) {
      Je.warn("Append is not supported for this type of playback");
    }
    clear() {
      Je.warn("Clear is not supported for this type of playback");
    }
    insertAt(e, n) {
      Je.warn("InsertAt is not supported for this type of playback");
    }
    prepend(e, n = true) {
      Je.warn("Prepend is not supported for this type of playback");
    }
    constructor() {
      _define_property$A(this, "queue", void 0),
        _define_property$A(this, "canModifyQueue", true);
    }
  }
  class ModifiableQueue {
    append(e) {
      const n = descriptorToMediaItems(e);
      this.queue.splice(this.queue.appendTargetIndex, 0, n);
    }
    clear() {
      this.queue.length &&
        (this.queue.splice(0, this.queue.length), this.queue.reset());
    }
    insertAt(e, n) {
      const d = descriptorToMediaItems(n);
      this.queue.splice(e, 0, d);
    }
    prepend(e, n = true) {
      const d = descriptorToMediaItems(e),
        p = this.queue.position + 1;
      n && this.queue.splice(p, this.queue.length), this.queue.splice(p, 0, d);
    }
    constructor(e, n) {
      _define_property$A(this, "queue", void 0),
        _define_property$A(this, "canModifyQueue", true),
        _define_property$A(this, "_mediaItemPlayback", void 0),
        (this.queue = e),
        (this._mediaItemPlayback = n);
    }
  }

  function _define_property$z(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  var To;
  (e.PlayerRepeatMode = void 0),
    ((To = e.PlayerRepeatMode || (e.PlayerRepeatMode = {}))[(To.none = 0)] =
      "none"),
    (To[(To.one = 1)] = "one"),
    (To[(To.all = 2)] = "all");
  class BaseRepeatable {
    get repeatMode() {
      return 0;
    }
    set repeatMode(e) {
      e !== this.repeatMode &&
        Je.warn("setting repeatMode is not supported in this playback method");
    }
    constructor() {
      _define_property$z(this, "canSetRepeatMode", true);
    }
  }
  class Repeatable {
    get repeatMode() {
      return this._repeatMode;
    }
    set repeatMode(n) {
      n in e.PlayerRepeatMode &&
        n !== this._repeatMode &&
        ((this._repeatMode = n),
        this.dispatcher.publish(ao.repeatModeDidChange, this._repeatMode));
    }
    constructor(e, n = 0) {
      _define_property$z(this, "canSetRepeatMode", true),
        _define_property$z(this, "dispatcher", void 0),
        _define_property$z(this, "_repeatMode", void 0),
        (this.dispatcher = e),
        (this._repeatMode = n);
    }
  }

  function _define_property$y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function asyncGeneratorStep$t(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$t(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$t(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$t(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$x(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$y(e, n, d[n]);
        });
    }
  })(
    {},
    {
      NEXT_ITEM: "NEXT",
    },
    e.PlayActivityEndReasonType,
  );
  const ko = ["musicVideo"],
    wo = (function () {
      var e = _async_to_generator$t(function* () {});
      return function () {
        return e.apply(this, arguments);
      };
    })();
  class BaseSeekable {
    getSeekSeconds(e) {
      return {
        BACK: 0,
        FORWARD: 0,
      };
    }
    seekBackward(e = wo) {
      Je.warn("seekBackward is not supported in this playback method");
    }
    seekForward(e = wo) {
      Je.warn("seekForward is not supported in this playback method");
    }
    seekToTime(e, n) {
      return _async_to_generator$t(function* () {
        Je.warn("seekToTime is not supported in this playback method");
      })();
    }
    constructor(e) {
      _define_property$x(this, "mediaItemPlayback", void 0),
        _define_property$x(this, "canSeek", void 0),
        (this.mediaItemPlayback = e),
        (this.canSeek = true);
    }
  }
  class Seekable {
    getSeekSeconds(e) {
      return ((e) =>
        (null == e ? void 0 : e.isUTS) ||
        ko.includes(null == e ? void 0 : e.type)
          ? {
              FORWARD: 10,
              BACK: 10,
            }
          : (null == e ? void 0 : e.isAOD)
            ? {
                FORWARD: 30,
                BACK: 30,
              }
            : {
                FORWARD: 30,
                BACK: 15,
              })(e);
    }
    seekBackward(e = this._seekToBeginning) {
      var n = this;
      return _async_to_generator$t(function* () {
        if (void 0 === n.mediaItemPlayback.nowPlayingItem)
          return void Je.warn(
            "Cannot seekBackward when nowPlayingItem is not yet set.",
          );
        const d =
          n.mediaItemPlayback.currentPlaybackTime -
          n.getSeekSeconds(n.mediaItemPlayback.nowPlayingItem).BACK;
        d < 0 ? yield e.call(n) : yield n.seekToTime(d, kt.Interval);
      })();
    }
    seekForward(e = this._seekToEnd) {
      var n = this;
      return _async_to_generator$t(function* () {
        if (void 0 === n.mediaItemPlayback.nowPlayingItem)
          return void Je.warn(
            "Cannot seekForward when nowPlayingItem is not yet set.",
          );
        const d =
          n.mediaItemPlayback.currentPlaybackTime +
          n.getSeekSeconds(n.mediaItemPlayback.nowPlayingItem).FORWARD;
        d > n.mediaItemPlayback.currentPlaybackDuration
          ? yield e.call(n)
          : yield n.seekToTime(d, kt.Interval);
      })();
    }
    seekToTime(e, n = kt.Manual) {
      var d = this;
      return _async_to_generator$t(function* () {
        if (void 0 === d.mediaItemPlayback.nowPlayingItem)
          return void Je.warn(
            "Cannot seekToTime when nowPlayingItem is not yet set.",
          );
        const p = d.mediaItemPlayback.nowPlayingItem,
          h = d.mediaItemPlayback.currentPlaybackTime,
          y = d.mediaItemPlayback.currentPlayingDate,
          _ = Math.min(
            Math.max(0, e),
            d.mediaItemPlayback.currentPlaybackDuration,
          );
        let m;
        if (p.isLinearStream && void 0 !== y) {
          const e = 1e3 * (_ - h);
          m = new Date(y.getTime() + e);
        }
        yield d.mediaItemPlayback.seekToTime(_, n),
          d._dispatcher.publish(gt.playbackSeek, {
            item: p,
            startPosition: h,
            position: _,
            playingDate: m,
            startPlayingDate: y,
            seekReasonType: n,
          });
      })();
    }
    _seekToBeginning() {
      var e = this;
      return _async_to_generator$t(function* () {
        yield e.seekToTime(0, kt.Interval);
      })();
    }
    _seekToEnd() {
      var e = this;
      return _async_to_generator$t(function* () {
        yield e.seekToTime(
          e.mediaItemPlayback.currentPlaybackDuration,
          kt.Interval,
        );
      })();
    }
    constructor(e, n) {
      _define_property$x(this, "_dispatcher", void 0),
        _define_property$x(this, "mediaItemPlayback", void 0),
        _define_property$x(this, "canSeek", void 0),
        (this._dispatcher = e),
        (this.mediaItemPlayback = n),
        (this.canSeek = true);
    }
  }
  const shuffleCollection = (e) => {
    const n = [...e],
      { length: d } = n;
    for (let p = 0; p < d; ++p) {
      const e = p + Math.floor(Math.random() * (d - p)),
        h = n[e];
      (n[e] = n[p]), (n[p] = h);
    }
    return n;
  };

  function deprecationWarning(e, n = {}) {
    var d;
    const p =
        null !== (d = n.message) && void 0 !== d
          ? d
          : e + " has been deprecated",
      h = [];
    n.since && h.push("since: " + n.since),
      n.until && h.push("until: " + n.until),
      console.warn(
        "Deprecation Warning: " +
          p +
          (h.length > 0 ? ` (${h.join(", ")})` : ""),
      );
  }

  function _define_property$w(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_without_properties$1(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  const Oo = it.createChild("queue");
  class QueueItem {
    restrict() {
      return this.item.restrict();
    }
    constructor(e, n) {
      var d;
      _define_property$w(this, "isAutoplay", true),
        _define_property$w(this, "item", void 0),
        (this.item = e),
        (this.isAutoplay =
          null !== (d = null == n ? void 0 : n.isAutoplay) &&
          void 0 !== d &&
          d);
    }
  }

  function toQueueItems(e, n) {
    return e.map((e) => new QueueItem(e, n));
  }

  function toMediaItems(e) {
    return e.map((e) => e.item);
  }
  const parseQueueURLOption = (e) => {
      if (!isQueueURLOption(e)) return e;
      const { url: n } = e,
        d = _object_without_properties$1(e, ["url"]),
        { contentId: p, kind: h, storefrontId: y } = formattedMediaURL(n);
      return (
        h && (d[h] = p),
        y && (yo.storefrontId = y),
        Oo.debug("parseQueueURLOption", d),
        d
      );
    },
    { queueItemsDidChange: Io, queuePositionDidChange: Ao } = ao;
  class Queue {
    get isEmpty() {
      return 0 === this.length;
    }
    set isRestricted(e) {
      var n;
      this._isRestricted = e;
      const d = null === (n = this.currentItem) || void 0 === n ? void 0 : n.id;
      this._isRestricted &&
        !this.isEmpty &&
        (this.removeQueueItems((e) => e.item.isExplicitItem),
        this.isEmpty &&
          this._dispatcher.publish(
            ao.mediaPlaybackError,
            new MKError(
              MKError.Reason.CONTENT_RESTRICTED,
              "Content restricted",
            ),
          ),
        d && (this.position = this._getStartItemPosition(d)));
    }
    get isRestricted() {
      return this._isRestricted;
    }
    get appendTargetIndex() {
      let e = this.length;
      const n = this._queueItems.findIndex((e) => e.isAutoplay);
      return -1 !== n && this.position < n && (e = n), e;
    }
    get items() {
      return toMediaItems(this._queueItems);
    }
    get autoplayItems() {
      return toMediaItems(this._queueItems.filter((e) => e.isAutoplay));
    }
    get unplayedAutoplayItems() {
      return toMediaItems(this._unplayedQueueItems.filter((e) => e.isAutoplay));
    }
    get userAddedItems() {
      return toMediaItems(this._queueItems.filter((e) => !e.isAutoplay));
    }
    get unplayedUserItems() {
      return toMediaItems(
        this._unplayedQueueItems.filter((e) => !e.isAutoplay),
      );
    }
    get playableItems() {
      return toMediaItems(
        this._queueItems.filter((e) => canPlay(e.item, this.playbackMode)),
      );
    }
    get unplayedPlayableItems() {
      return toMediaItems(
        this._unplayedQueueItems.filter((e) =>
          canPlay(e.item, this.playbackMode),
        ),
      );
    }
    get length() {
      return this._queueItems.length;
    }
    get nextPlayableItem() {
      if (-1 !== this.nextPlayableItemIndex)
        return this.item(this.nextPlayableItemIndex);
    }
    get nextPlayableItemIndex() {
      return (
        (this._nextPlayableItemIndex = this.findPlayableIndexForward()),
        this._nextPlayableItemIndex
      );
    }
    get position() {
      return this._position;
    }
    set position(e) {
      this._updatePosition(e);
    }
    get isInitiated() {
      return this.position >= 0;
    }
    get previousPlayableItem() {
      if (-1 !== this.previousPlayableItemIndex)
        return this.item(this.previousPlayableItemIndex);
    }
    get previousPlayableItemIndex() {
      return this.findPlayableIndexBackward();
    }
    removeQueueItems(e) {
      for (let n = this.length - 1; n >= 0; n--)
        e(this.queueItem(n), n) && this.spliceQueueItems(n, 1);
    }
    indexForItem(e) {
      return ("string" == typeof e ? this._itemIDs : this.items).indexOf(e);
    }
    item(e) {
      var n;
      return null === (n = this.queueItem(e)) || void 0 === n ? void 0 : n.item;
    }
    get currentItem() {
      return this.item(this.position);
    }
    queueItem(e) {
      var n;
      return null === (n = this._queueItems) || void 0 === n ? void 0 : n[e];
    }
    updateItems(e) {
      (this._queueItems = toQueueItems(e)),
        this._reindex(),
        this._dispatcher.publish(ao.queueItemsDidChange, this.items);
    }
    get currentQueueItem() {
      return this.queueItem(this.position);
    }
    remove(e) {
      if (
        (deprecationWarning("remove", {
          message: "The queue remove function has been deprecated",
        }),
        e === this.position)
      )
        throw new MKError(MKError.Reason.INVALID_ARGUMENTS);
      this.splice(e, 1);
    }
    append(e = []) {
      return this.appendQueueItems(toQueueItems(e));
    }
    appendQueueItems(e = []) {
      return this.spliceQueueItems(this.appendTargetIndex, 0, e);
    }
    splice(e, n, d = []) {
      return toMediaItems(this.spliceQueueItems(e, n, toQueueItems(d)));
    }
    spliceQueueItems(e, n, d = [], p = true) {
      d = d.filter((e) =>
        isPlayable(null == e ? void 0 : e.item, this.playbackMode),
      );
      const h = this._queueItems.splice(e, n, ...d);
      return (
        this._itemIDs.splice(e, n, ...d.map((e) => e.item.id)),
        p &&
          (this._dispatcher.publish(gt.queueModified, {
            start: e,
            added: toMediaItems(d),
            removed: toMediaItems(h),
          }),
          this._dispatcher.publish(Io, this.items)),
        h
      );
    }
    clearAfterCurrent() {
      if (-1 === this.position) this.clear();
      else if (this.length > 0 && this.position + 1 < this.length) {
        const e = this.position + 1;
        this.splice(e, this.length);
      }
    }
    clear() {
      this.length > 0 && (this.splice(0, this.length), this.reset());
    }
    reset() {
      const e = this.position;
      (this._position = -1),
        e >= 0 &&
          this._dispatcher.publish(Ao, {
            oldPosition: e,
            position: this.position,
          });
    }
    _isSameItems(e) {
      if (e.length !== this.length) return true;
      const n = e.map((e) => e.id).sort(),
        d = [...this._itemIDs].sort();
      let p, h;
      try {
        (p = JSON.stringify(n)), (h = JSON.stringify(d));
      } catch (Vt) {
        return true;
      }
      return p === h;
    }
    _reindex() {
      this._queueItems &&
        (this._itemIDs = this._queueItems.map((e) => e.item.id));
    }
    _updatePosition(e) {
      if (e === this._position) return;
      const n = this._position;
      this._position = e;
      const d = this.item(e);
      (d && canPlay(d, this.playbackMode)) ||
        (this._position = this.findPlayableIndexForward(e)),
        this._position !== n &&
          this._dispatcher.publish(Ao, {
            oldPosition: n,
            position: this._position,
          });
    }
    findPlayableIndexForward(n = this.position) {
      var d;
      if (this.isEmpty) return -1;
      if (this.isInitiated && !indexInBounds([0, this.position], n)) return -1;
      const p =
        null === (d = this.repeatable) || void 0 === d ? void 0 : d.repeatMode;
      if (n < this.length)
        for (let e = n + 1; e < this.length; e++) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      if (p === e.PlayerRepeatMode.all)
        for (let e = 0; e <= n; e++) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      return -1;
    }
    findPlayableIndexBackward(n = this.position) {
      var d;
      if (this.isEmpty) return -1;
      if (!indexInBounds([0, this.position], n)) return -1;
      const p =
        null === (d = this.repeatable) || void 0 === d ? void 0 : d.repeatMode;
      if (n > 0)
        for (let e = n - 1; e >= 0; e--) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      if (p === e.PlayerRepeatMode.all)
        for (let e = this.length - 1; e >= n; e--) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      return -1;
    }
    get _unplayedQueueItems() {
      const e = this.position < 0 ? 0 : this.position;
      return this._queueItems.slice(e);
    }
    _getStartItemPosition(e) {
      if (void 0 === e) return -1;
      if (
        ("object" == typeof e && "id" in e && (e = e.id), "string" == typeof e)
      )
        return this.indexForItem(e);
      const n = parseInt("" + e, 10);
      return n >= 0 && n < this.length ? n : -1;
    }
    constructor(n) {
      if (
        (_define_property$w(this, "repeatable", void 0),
        _define_property$w(this, "hasAutoplayStation", true),
        _define_property$w(this, "playbackMode", e.PlaybackMode.MIXED_CONTENT),
        _define_property$w(this, "_itemIDs", []),
        _define_property$w(this, "_queueItems", []),
        _define_property$w(this, "_isRestricted", true),
        _define_property$w(this, "_nextPlayableItemIndex", -1),
        _define_property$w(this, "_position", -1),
        _define_property$w(this, "_dispatcher", void 0),
        (this._dispatcher = n.services.dispatcher),
        (this.playbackMode = n.playbackMode),
        !n.descriptor)
      )
        return;
      const d = descriptorToMediaItems(n.descriptor).filter((e) =>
        isPlayable(e, this.playbackMode),
      );
      (this._queueItems = toQueueItems(d)),
        this._reindex(),
        void 0 !== n.descriptor.startWith &&
          (this.position = this._getStartItemPosition(n.descriptor.startWith));
    }
  }

  function isPlayable(n, d) {
    return (
      n.isPlayable ||
      (d !== e.PlaybackMode.FULL_PLAYBACK_ONLY && void 0 !== n.previewURL)
    );
  }

  function canPlay(e, n) {
    return (
      isPlayable(e, n) &&
      !(function (e) {
        return e.isRestricted;
      })(e) &&
      !(function (e) {
        return e.isUnavailable;
      })(e)
    );
  }

  function indexInBounds(e, n) {
    return e[0] <= n && n <= e[1];
  }

  function _define_property$v(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$d(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  var Ro;
  (e.PlayerShuffleMode = void 0),
    ((Ro = e.PlayerShuffleMode || (e.PlayerShuffleMode = {}))[(Ro.off = 0)] =
      "off"),
    (Ro[(Ro.songs = 1)] = "songs");
  const $o = "Shuffling is not supported in this playback method.";
  class BaseShuffler {
    set shuffle(e) {
      Je.warn($o);
    }
    get shuffleMode() {
      return 0;
    }
    set shuffleMode(e) {
      Je.warn($o);
    }
    checkAndReshuffle(e) {
      Je.warn($o);
    }
    constructor() {
      _define_property$v(this, "canSetShuffleMode", true),
        _define_property$v(this, "queue", void 0);
    }
  }
  class Shuffler {
    get queue() {
      return this._queue;
    }
    set queue(e) {
      (this._queue = e),
        (this._unshuffledIDs = e.userAddedItems.map((e) => e.id)),
        this.checkAndReshuffle(true);
    }
    queueModifiedHandler(e, n) {
      if (this._isSpliceFromShuffle)
        return void (this._isSpliceFromShuffle = true);
      const { start: d, added: p, removed: h } = n;
      if (h.length > 0) {
        const e = h.map((e) => e.id);
        this._unshuffledIDs = this._unshuffledIDs.filter((n) => !e.includes(n));
      }
      p.length > 0 && this._unshuffledIDs.splice(d, 0, ...p.map((e) => e.id));
    }
    set shuffle(e) {
      this.shuffleMode = e ? 1 : 0;
    }
    get shuffleMode() {
      return this.mode;
    }
    set shuffleMode(n) {
      n !== this.shuffleMode &&
        n in e.PlayerShuffleMode &&
        (Je.debug(`mk: set shuffleMode from ${this.shuffleMode} to ${n}`),
        (this.mode = n),
        1 === this.mode ? this.shuffleQueue() : this.unshuffleQueue(),
        this.controller.nowPlayingItem &&
          (this._queue.position = this._queue.indexForItem(
            this.controller.nowPlayingItem.id,
          )),
        this.dispatcher.publish(ao.shuffleModeDidChange, this.shuffleMode));
    }
    checkAndReshuffle(e = true) {
      1 === this.shuffleMode && this.shuffleQueue(e);
    }
    shuffleQueue(e = true) {
      const { userAddedItems: n } = this._queue;
      if (n.length <= 1) return n;
      const d = n.slice(0),
        p = this._queue.position > -1 ? d.splice(this._queue.position, 1) : [];
      let h = [];
      do {
        h = shuffleCollection(d);
      } while (d.length > 1 && arrayEquals(h, d));
      const y = [...p, ...h];
      (this._isSpliceFromShuffle = true),
        this._queue.spliceQueueItems(0, y.length, toQueueItems(y), e);
    }
    unshuffleQueue(e = true) {
      let n = [];
      const d = this._unshuffledIDs.reduce((e, n, d) => ((e[n] = d), e), {}),
        p = [];
      let h = 0;
      const y = this._queue.item(this._queue.position);
      this._queue.userAddedItems.forEach((e) => {
        const _ = d[e.id];
        void 0 === _ && p.push(e),
          (n[_] = e),
          e.id === (null == y ? void 0 : y.id) && (h = _);
      }),
        (n = n.filter(Boolean));
      const _ = n.concat(p);
      (this._isSpliceFromShuffle = true),
        this._queue.spliceQueueItems(0, _.length, toQueueItems(_), e),
        (this._queue.position = h);
    }
    constructor(e, { dispatcher: n }) {
      _define_property$v(this, "controller", void 0),
        _define_property$v(this, "canSetShuffleMode", void 0),
        _define_property$v(this, "dispatcher", void 0),
        _define_property$v(this, "mode", void 0),
        _define_property$v(this, "_queue", void 0),
        _define_property$v(this, "_unshuffledIDs", void 0),
        _define_property$v(this, "_isSpliceFromShuffle", void 0),
        (this.controller = e),
        (this.canSetShuffleMode = true),
        (this.mode = 0),
        (this._unshuffledIDs = []),
        (this._isSpliceFromShuffle = true),
        (this.dispatcher = n),
        this.dispatcher.subscribe(gt.queueModified, this.queueModifiedHandler),
        (this._queue = e.queue);
    }
  }

  function asyncGeneratorStep$s(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$s(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$s(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$s(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$u(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$g(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$u(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$a(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _ts_metadata$c(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  var Co;
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$d("design:type", Function),
      _ts_metadata$d("design:paramtypes", [String, Object]),
      _ts_metadata$d("design:returntype", void 0),
    ],
    Shuffler.prototype,
    "queueModifiedHandler",
    null,
  ),
    (function (e) {
      (e.continuous = "continuous"), (e.serial = "serial");
    })(Co || (Co = {}));
  const { queueItemsDidChange: Mo } = ao;
  class PlaybackController {
    get isDestroyed() {
      return this._isDestroyed;
    }
    updateAutoplay(e, n) {
      this.autoplayEnabled = n;
    }
    constructContext(e, n) {
      let d = e.context;
      var p;
      return (
        void 0 !== e.featureName &&
          void 0 === (null == d ? void 0 : d.featureName) &&
          (Je.warn("featureName is deprecated, pass it inside context"),
          d || (d = {}),
          (d.featureName = e.featureName)),
        null !== (p = null != d ? d : n) && void 0 !== p ? p : {}
      );
    }
    get context() {
      return this._context;
    }
    get continuous() {
      return this._continuous || this.hasAuthorization;
    }
    set continuous(e) {
      this._continuous = e;
    }
    get autoplayEnabled() {
      return this._autoplayEnabled;
    }
    set autoplayEnabled(e) {
      this._autoplayEnabled = e;
    }
    get previewOnly() {
      return this._mediaItemPlayback.previewOnly;
    }
    get _dispatcher() {
      return this._services.dispatcher;
    }
    get hasAuthorization() {
      return hasAuthorization(this.storekit);
    }
    get isPlaying() {
      return this._mediaItemPlayback.isPlaying;
    }
    get isPrimaryPlayer() {
      return this._mediaItemPlayback.isPrimaryPlayer;
    }
    set isPrimaryPlayer(e) {
      this._mediaItemPlayback.isPrimaryPlayer = e;
    }
    get isReady() {
      return this._mediaItemPlayback.isReady;
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback;
    }
    get nowPlayingItem() {
      return this._mediaItemPlayback.nowPlayingItem;
    }
    get nowPlayingItemIndex() {
      return this.queue ? this.queue.position : -1;
    }
    get playbackMode() {
      return this._playbackMode;
    }
    set playbackMode(e) {
      (this._playbackMode = e), this.queue && (this.queue.playbackMode = e);
    }
    get queue() {
      return this._queue;
    }
    set queue(e) {
      this._prepareQueue(e),
        (this._queue = e),
        (this._shuffler.queue = this._queue),
        (this._queueModifier.queue = this._queue),
        this._dispatcher.publish(Mo, e.items);
    }
    get repeatMode() {
      return this._repeatable.repeatMode;
    }
    set repeatMode(e) {
      this._repeatable.repeatMode = e;
    }
    get seekSeconds() {
      const { nowPlayingItem: e } = this;
      if (void 0 !== e) return this._seekable.getSeekSeconds(e);
    }
    set shuffle(e) {
      this._shuffler.shuffle = e;
    }
    get shuffleMode() {
      return this._shuffler.shuffleMode;
    }
    set shuffleMode(e) {
      this._shuffler.shuffleMode = e;
    }
    get storekit() {
      return this._storekit;
    }
    set storekit(n) {
      if (n) {
        var d = this;
        n.addEventListener(
          We.authorizationStatusWillChange,
          (function () {
            var n = _async_to_generator$s(function* ({
              authorizationStatus: n,
              newAuthorizationStatus: p,
            }) {
              n > Fe.DENIED && p < Fe.RESTRICTED
                ? yield d.stop({
                    endReasonType:
                      e.PlayActivityEndReasonType.PLAYBACK_SUSPENDED,
                    userInitiated: true,
                  })
                : yield d.stop({
                    userInitiated: true,
                  });
            });
            return function (e) {
              return n.apply(this, arguments);
            };
          })(),
        ),
          (this._storekit = n);
      }
    }
    _dataForQueueOptions(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        const d = n.constructContext(e, n.context);
        return _object_spread_props$a(_object_spread$g({}, e), {
          context: d,
        });
      })();
    }
    changeToMediaAtIndex(e = 0) {
      var n = this;
      return _async_to_generator$s(function* () {
        var d, p, h;
        yield n.stop();
        const y =
            null === (d = n.queue.item(e)) || void 0 === d ? void 0 : d.id,
          _ =
            null === (h = n._mediaItemPlayback) ||
            void 0 === h ||
            null === (p = h.playOptions) ||
            void 0 === p
              ? void 0
              : p.get(y);
        let m = (null == _ ? void 0 : _.startTime) || 0;
        const g = yield n._changeToMediaAtIndex(e, {
          userInitiated: true,
        });
        g &&
          (g.id !== y && (m = 0),
          n._dispatcher.publish(gt.playbackPlay, {
            item: g,
            position: m,
            playingDate: n._mediaItemPlayback.currentPlayingDate,
          }));
      })();
    }
    changeToMediaItem(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        const d = n.queue.indexForItem(e);
        return -1 === d
          ? Promise.reject(new MKError(MKError.Reason.MEDIA_DESCRIPTOR))
          : n.changeToMediaAtIndex(d);
      })();
    }
    activate() {
      Je.debug("mk: base controller - activate"),
        this._dispatcher.unsubscribe(
          ao.playbackStateDidChange,
          this.onPlaybackStateDidChange,
        ),
        this._dispatcher.subscribe(
          ao.playbackStateDidChange,
          this.onPlaybackStateDidChange,
        ),
        this._skipIntro.activate(),
        this._upNext.activate(),
        this._rollMonitor.activate();
    }
    deactivate() {
      var e = this;
      return _async_to_generator$s(function* () {
        yield e.stop(),
          e._dispatcher.unsubscribe(
            ao.playbackStateDidChange,
            e.onPlaybackStateDidChange,
          ),
          e._skipIntro.deactivate(),
          e._upNext.deactivate(),
          e._rollMonitor.deactivate();
      })();
    }
    destroy() {
      var e = this;
      return _async_to_generator$s(function* () {
        (e._isDestroyed = true),
          yield e.deactivate(),
          e._dispatcher.unsubscribe(
            ao.autoplayEnabledDidChange,
            e.updateAutoplay,
          );
      })();
    }
    pause(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        return n._mediaItemPlayback.pause(e);
      })();
    }
    play() {
      var e = this;
      return _async_to_generator$s(function* () {
        if (e.nowPlayingItem) return e._mediaItemPlayback.play();
        if (!e._queue || e._queue.isEmpty) return;
        if (e.nowPlayingItemIndex >= 0)
          return e.changeToMediaAtIndex(e.nowPlayingItemIndex);
        const { queue: n } = e;
        return -1 !== n.nextPlayableItemIndex
          ? e.changeToMediaAtIndex(n.nextPlayableItemIndex)
          : void 0;
      })();
    }
    playSingleMediaItem(e, n) {
      var d = this;
      return _async_to_generator$s(function* () {
        yield so(e, n), d._dispatcher.publish(ao.queueItemsDidChange, [e]);
        const p = yield d._mediaItemPlayback.startMediaItemPlayback(e, true);
        if (p) {
          var h;
          const e = {
            item: p,
            position:
              null !== (h = d._mediaItemPlayback.currentPlaybackTime) &&
              void 0 !== h
                ? h
                : 0,
            playingDate: d._mediaItemPlayback.currentPlayingDate,
            userInitiated: true,
          };
          Je.debug(
            "playSingleMediaItem: Dispatching DispatchTypes.playbackPlay event",
            e,
          ),
            d._dispatcher.publish(gt.playbackPlay, e);
        }
      })();
    }
    onPlaybackStateDidChange(n, d) {
      var p = this;
      return _async_to_generator$s(function* () {
        d.state === e.PlaybackStates.ended &&
          (p.continuous || p.repeatMode === e.PlayerRepeatMode.one) &&
          (Je.debug(
            "controller detected track ended event, moving to next item.",
          ),
          p._dispatcher.publish(gt.applicationActivityIntent, {
            endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            userInitiated: true,
          }),
          yield p._next());
      })();
    }
    preload() {
      var e = this;
      return _async_to_generator$s(function* () {
        return e._mediaItemPlayback.preload();
      })();
    }
    prepareToPlay(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        return n._mediaItemPlayback.prepareToPlay(e);
      })();
    }
    showPlaybackTargetPicker() {
      this._mediaItemPlayback.showPlaybackTargetPicker();
    }
    seekBackward() {
      var e = this;
      return _async_to_generator$s(function* () {
        return e._seekable.seekBackward();
      })();
    }
    seekForward() {
      var e = this;
      return _async_to_generator$s(function* () {
        return e._seekable.seekForward(e.skipToNextItem.bind(e));
      })();
    }
    skipToNextItem() {
      var e = this;
      return _async_to_generator$s(function* () {
        return e._next({
          userInitiated: true,
        });
      })();
    }
    skipToPreviousItem() {
      var e = this;
      return _async_to_generator$s(function* () {
        return e._previous({
          userInitiated: true,
        });
      })();
    }
    getNewSeeker() {
      return this._mediaItemPlayback.getNewSeeker();
    }
    seekToTime(e, n) {
      var d = this;
      return _async_to_generator$s(function* () {
        yield d._seekable.seekToTime(e, n);
      })();
    }
    setQueue(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        return (
          yield n.extractGlobalValues(e),
          yield n._mediaItemPlayback.stop(),
          n.returnQueueForOptions(e)
        );
      })();
    }
    extractGlobalValues(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        (n._context = n.constructContext(e)),
          void 0 !== e.featureName &&
            e.context &&
            (Je.warn("featureName is deprecated, pass it inside context"),
            (e.context.featureName = e.featureName));
      })();
    }
    stop(e) {
      var n = this;
      return _async_to_generator$s(function* () {
        yield n._mediaItemPlayback.stop(e);
      })();
    }
    _changeToMediaAtIndex(e = 0, n = {}) {
      var d = this;
      return _async_to_generator$s(function* () {
        if (d.queue.isEmpty) return;
        d.queue.position = e;
        const p = d.queue.item(d.queue.position);
        if (!p) return;
        var h;
        const y = yield d._mediaItemPlayback.startMediaItemPlayback(
          p,
          null !== (h = n.userInitiated) && void 0 !== h && h,
        );
        if (y || p.state !== D.unsupported) return y;
        yield d.skipToNextItem();
      })();
    }
    _next(n = {}) {
      var d = this;
      return _async_to_generator$s(function* () {
        if (d.queue.isEmpty) return;
        const { userInitiated: p = true } = n;
        return d.repeatMode === e.PlayerRepeatMode.one &&
          void 0 !== d.queue.currentItem
          ? (yield d.stop(
              _object_spread$g(
                {
                  userInitiated: p,
                },
                n,
              ),
            ),
            void (yield d.play()))
          : (!p &&
              n.seamlessAudioTransition &&
              (d._dispatcher.publish(
                gt.playbackStop,
                _object_spread$g(
                  {
                    userInitiated: p,
                    endReasonType:
                      e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
                  },
                  n,
                ),
              ),
              (n = {
                userInitiated: n.userInitiated,
                seamlessAudioTransition: true,
              })),
            d._nextAtIndex(d.queue.nextPlayableItemIndex, n));
      })();
    }
    _nextAtIndex(n, d = {}) {
      var p = this;
      return _async_to_generator$s(function* () {
        if (p.queue.isEmpty) return;
        const { _mediaItemPlayback: h } = p;
        var y;
        const _ = null !== (y = d.userInitiated) && void 0 !== y && y;
        if (n < 0)
          return (
            Je.debug(
              "controller/index._next no next item available, stopping playback",
            ),
            yield p.stop({
              userInitiated: _,
              seamlessAudioTransition: d.seamlessAudioTransition,
            }),
            void (h.playbackState = e.PlaybackStates.completed)
          );
        const m = p.isPlaying,
          g = h.currentPlaybackTime,
          b = yield p._changeToMediaAtIndex(n, {
            userInitiated: _,
          });
        var P;
        return (
          p._notifySkip(m, b, {
            userInitiated: _,
            seamlessAudioTransition:
              null !== (P = d.seamlessAudioTransition) && void 0 !== P && P,
            position: g,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
          }),
          b
        );
      })();
    }
    _previous(n = {}) {
      var d = this;
      return _async_to_generator$s(function* () {
        if (d.queue.isEmpty) return;
        const { userInitiated: p = true } = n;
        if (
          d.repeatMode === e.PlayerRepeatMode.one &&
          void 0 !== d.queue.currentItem
        )
          return (
            yield d.stop({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              userInitiated: p,
            }),
            void (yield d.play())
          );
        const h = d.queue.previousPlayableItemIndex;
        if (
          p &&
          d.repeatMode === e.PlayerRepeatMode.none &&
          void 0 !== d.nowPlayingItem &&
          -1 === h
        )
          return (
            yield d.stop({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              userInitiated: true,
            }),
            void (yield d.play())
          );
        if (-1 === h) return;
        const y = d.isPlaying,
          _ = d._mediaItemPlayback.currentPlaybackTime,
          m = yield d._changeToMediaAtIndex(h, {
            userInitiated: p,
          });
        return (
          d._notifySkip(y, m, {
            userInitiated: p,
            seamlessAudioTransition: true,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            position: _,
          }),
          m
        );
      })();
    }
    _notifySkip(n, d, p) {
      const {
          userInitiated: h,
          direction: y,
          position: _,
          seamlessAudioTransition: m = true,
        } = p,
        g = this._dispatcher;
      m
        ? (Je.debug("seamlessAudioTransition transition, PAF play"),
          g.publish(gt.playbackPlay, {
            item: d,
            position: 0,
            endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          }))
        : n
          ? d
            ? g.publish(gt.playbackSkip, {
                item: d,
                userInitiated: h,
                direction: y,
                position: _,
              })
            : g.publish(gt.playbackStop, {
                item: d,
                userInitiated: h,
                position: _,
              })
          : d &&
            g.publish(
              gt.playbackPlay,
              _object_spread$g(
                {
                  item: d,
                  playingDate: this._mediaItemPlayback.currentPlayingDate,
                  position: 0,
                },
                h
                  ? {
                      endReasonType:
                        e.PlayActivityEndReasonType
                          .MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
                    }
                  : {},
              ),
            );
    }
    _prepareQueue(e) {
      Je.debug("mk: _prepareQueue"),
        this.hasAuthorization &&
          (e.isRestricted = this.storekit.restrictedEnabled || true),
        (e.repeatable = this._repeatable);
    }
    constructor(e) {
      var n;
      _define_property$u(this, "_context", {}),
        _define_property$u(this, "_continuous", void 0),
        _define_property$u(this, "_autoplayEnabled", void 0),
        _define_property$u(this, "_playerOptions", void 0),
        _define_property$u(this, "_queue", void 0),
        _define_property$u(this, "_storekit", void 0),
        _define_property$u(this, "_queueModifier", void 0),
        _define_property$u(this, "_repeatable", void 0),
        _define_property$u(this, "_shuffler", void 0),
        _define_property$u(this, "_seekable", void 0),
        _define_property$u(this, "_services", void 0),
        _define_property$u(this, "_rollMonitor", void 0),
        _define_property$u(this, "_skipIntro", void 0),
        _define_property$u(this, "_upNext", void 0),
        _define_property$u(this, "_playbackMode", void 0),
        _define_property$u(this, "_isDestroyed", true),
        (this.onPlaybackStateDidChange =
          this.onPlaybackStateDidChange.bind(this)),
        (this._autoplayEnabled =
          null !== (n = null == e ? void 0 : e.autoplayEnabled) &&
          void 0 !== n &&
          n),
        (this._services = e.services),
        (this._playerOptions = e),
        (this.storekit = e.storekit),
        (this._skipIntro = new SkipAvailable({
          controller: this,
          services: e.services,
        })),
        (this._upNext = new UpNextMonitor({
          controller: this,
          services: e.services,
        })),
        (this._rollMonitor = new RollMonitor({
          controller: this,
          services: e.services,
        })),
        (this._queueModifier = new BaseModifiableQueue()),
        (this._shuffler = new BaseShuffler()),
        (this._seekable = new BaseSeekable(this._mediaItemPlayback)),
        (this._repeatable = new BaseRepeatable()),
        this._dispatcher.subscribe(
          ao.autoplayEnabledDidChange,
          this.updateAutoplay,
        ),
        (this._playbackMode = e.playbackMode);
    }
  }

  function _define_property$t(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$b(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$b(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$c("design:type", Function),
      _ts_metadata$c("design:paramtypes", [String, Boolean]),
      _ts_metadata$c("design:returntype", void 0),
    ],
    PlaybackController.prototype,
    "updateAutoplay",
    null,
  );
  class MediaSessionManager {
    onCapabilitiesChanged() {
      this._resetHandlers(), this._setMediaSessionHandlers();
    }
    onNowPlayingItemDidChange(e, { item: n }) {
      this._setMediaSessionMetadata(n);
    }
    _setMediaSessionMetadata(e) {
      var n, d;
      this.session &&
        "MediaMetadata" in window &&
        e &&
        (this.session.metadata = new window.MediaMetadata({
          title: e.title,
          artist:
            null !== (d = e.artistName) && void 0 !== d
              ? d
              : null === (n = e.attributes) || void 0 === n
                ? void 0
                : n.showTitle,
          album: e.albumName,
          artwork: e.artwork
            ? [96, 128, 192, 256, 384, 512].map((n) => ({
                src: formatArtworkURL(e.artwork, n, n),
                sizes: `${n}x${n}`,
                type: "image/jpeg",
              }))
            : [],
        }));
    }
    _setMediaSessionHandlers() {
      this.session &&
        (this._resetHandlers(),
        this.session.setActionHandler("play", () => {
          var e;
          return null === (e = this.controller) || void 0 === e
            ? void 0
            : e.play();
        }),
        this.capabilities.canPause
          ? this.session.setActionHandler("pause", () => {
              var e;
              return null === (e = this.controller) || void 0 === e
                ? void 0
                : e.pause();
            })
          : this.session.setActionHandler("pause", () => {
              var e;
              return null === (e = this.controller) || void 0 === e
                ? void 0
                : e.stop();
            }),
        this.capabilities.canSeek &&
          (this.session.setActionHandler("seekforward", () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.seekForward();
          }),
          this.session.setActionHandler("seekbackward", () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.seekBackward();
          })),
        this.capabilities.canSkipToNextItem &&
          this.session.setActionHandler("nexttrack", () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.skipToNextItem();
          }),
        this.capabilities.canSkipToPreviousItem &&
          this.session.setActionHandler("previoustrack", () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.skipToPreviousItem();
          }));
    }
    _resetHandlers() {
      this.session &&
        (this.session.setActionHandler("play", void 0),
        this.session.setActionHandler("pause", void 0),
        this.session.setActionHandler("seekforward", void 0),
        this.session.setActionHandler("seekbackward", void 0),
        this.session.setActionHandler("nexttrack", void 0),
        this.session.setActionHandler("previoustrack", void 0));
    }
    constructor(e, n) {
      _define_property$t(this, "capabilities", void 0),
        _define_property$t(this, "dispatcher", void 0),
        _define_property$t(this, "controller", void 0),
        _define_property$t(this, "session", void 0),
        (this.capabilities = e),
        (this.dispatcher = n),
        (this.session = navigator.mediaSession),
        this.session &&
          (this.dispatcher.subscribe(
            ao.nowPlayingItemDidChange,
            this.onNowPlayingItemDidChange,
          ),
          this.dispatcher.subscribe(
            ao.capabilitiesChanged,
            this.onCapabilitiesChanged,
          ),
          this._setMediaSessionHandlers());
    }
  }

  function _define_property$s(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  var Do;
  _ts_decorate$b(
    [
      Bind(),
      _ts_metadata$b("design:type", Function),
      _ts_metadata$b("design:paramtypes", []),
      _ts_metadata$b("design:returntype", void 0),
    ],
    MediaSessionManager.prototype,
    "onCapabilitiesChanged",
    null,
  ),
    _ts_decorate$b(
      [
        Bind(),
        _ts_metadata$b("design:type", Function),
        _ts_metadata$b("design:paramtypes", [void 0, void 0]),
        _ts_metadata$b("design:returntype", void 0),
      ],
      MediaSessionManager.prototype,
      "onNowPlayingItemDidChange",
      null,
    ),
    (function (e) {
      (e[(e.PAUSE = 0)] = "PAUSE"),
        (e[(e.EDIT_QUEUE = 1)] = "EDIT_QUEUE"),
        (e[(e.SEEK = 2)] = "SEEK"),
        (e[(e.REPEAT = 3)] = "REPEAT"),
        (e[(e.SHUFFLE = 4)] = "SHUFFLE"),
        (e[(e.SKIP_NEXT = 5)] = "SKIP_NEXT"),
        (e[(e.SKIP_PREVIOUS = 6)] = "SKIP_PREVIOUS"),
        (e[(e.SKIP_TO_ITEM = 7)] = "SKIP_TO_ITEM"),
        (e[(e.AUTOPLAY = 8)] = "AUTOPLAY"),
        (e[(e.VOLUME = 9)] = "VOLUME");
    })(Do || (Do = {}));
  class Capabilities {
    set controller(e) {
      this._mediaSession.controller = e;
    }
    updateChecker(e) {
      this._checkCapability !== e &&
        ((this._checkCapability = e),
        this._dispatcher.publish(ao.capabilitiesChanged));
    }
    get canEditPlaybackQueue() {
      return this._checkCapability(1);
    }
    get canPause() {
      return this._checkCapability(0);
    }
    get canSeek() {
      return this._checkCapability(2);
    }
    get canSetRepeatMode() {
      return this._checkCapability(3);
    }
    get canSetShuffleMode() {
      return this._checkCapability(4);
    }
    get canSkipToNextItem() {
      return this._checkCapability(5);
    }
    get canSkipToMediaItem() {
      return this._checkCapability(7);
    }
    get canSkipToPreviousItem() {
      return this._checkCapability(6);
    }
    get canAutoplay() {
      return this._checkCapability(8);
    }
    get canSetVolume() {
      return this._checkCapability(9);
    }
    constructor(e) {
      _define_property$s(this, "_dispatcher", void 0),
        _define_property$s(this, "_checkCapability", void 0),
        _define_property$s(this, "_mediaSession", void 0),
        (this._dispatcher = e),
        (this._checkCapability = (e) => 9 === e),
        (this._mediaSession = new MediaSessionManager(this, e));
    }
  }

  function rejectOnLast() {
    return Promise.reject(
      "The last middleware in the stack should not call next",
    );
  }

  function processMiddleware(e, ...n) {
    return e.length
      ? (function createNextFunction([e, ...n]) {
          return (...d) => e(createNextFunction(n), ...d);
        })([...e, rejectOnLast])(...n)
      : Promise.reject(
          "processMiddleware requires at mimimum one middleware function",
        );
  }

  function parameterizeString(e, n) {
    return (function (e) {
      try {
        return (function recursiveTokenizeParameterizedString(e, n = []) {
          if (e.startsWith("{{")) {
            const d = e.indexOf("}}");
            if (-1 === d) throw new Error("UNCLOSED_PARAMETER");
            const p = {
              type: 1,
              value: e.slice(2, d),
            };
            return d + 2 < e.length
              ? recursiveTokenizeParameterizedString(e.slice(d + 2), [...n, p])
              : [...n, p];
          }
          {
            const d = e.indexOf("{{");
            return -1 === d
              ? [
                  ...n,
                  {
                    type: 0,
                    value: e,
                  },
                ]
              : recursiveTokenizeParameterizedString(e.slice(d), [
                  ...n,
                  {
                    type: 0,
                    value: e.slice(0, d),
                  },
                ]);
          }
        })(e);
      } catch (V) {
        if ("UNCLOSED_PARAMETER" === V.message)
          throw new Error(`Unclosed parameter in path: "${e}"`);
        throw V;
      }
    })(e)
      .map((e) => {
        switch (e.type) {
          case 1:
            return e.value in n
              ? encodeURIComponent("" + n[e.value])
              : `{{${e.value}}}`;
          case 0:
          default:
            return e.value;
        }
      })
      .join("");
  }
  var xo;

  function _define_property$r(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$9(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function constructUrlMiddleware(e, n) {
    let d = n.url;
    var p;
    return (
      d || (d = buildURL(n.baseUrl, n.path)),
      n.urlParameters && (d = parameterizeString(d, n.urlParameters)),
      e(
        _object_spread_props$9(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              "function" == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$r(e, n, d[n]);
                });
            }
            return e;
          })({}, n),
          {
            url: buildURL(
              d,
              null !== (p = n.queryParameters) && void 0 !== p ? p : {},
            ),
          },
        ),
      )
    );
  }

  function asyncGeneratorStep$r(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$r(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$r(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$r(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function unwrapJSONFromResponse(e) {
    return _unwrapJSONFromResponse.apply(this, arguments);
  }

  function _unwrapJSONFromResponse() {
    return (_unwrapJSONFromResponse = _async_to_generator$r(function* (e) {
      try {
        return yield e.json();
      } catch (V) {
        return;
      }
    })).apply(this, arguments);
  }

  function fetchMiddlewareFactory(e) {
    return (
      (n = _async_to_generator$r(function* (n, d) {
        const p = yield e(d.url, d.fetchOptions),
          h = {
            request: d,
            response: p,
            data: yield unwrapJSONFromResponse(p),
          };
        if (!p.ok) throw MKError.responseError(p);
        return h;
      })),
      function (e, d) {
        return n.apply(this, arguments);
      }
    );
  }
  !(function (e) {
    (e[(e.Static = 0)] = "Static"), (e[(e.Parameter = 1)] = "Parameter");
  })(xo || (xo = {}));
  const jo = fetchMiddlewareFactory(
    "undefined" != typeof fetch
      ? fetch
      : () => {
          throw new Error("window.fetch is not defined");
        },
  );

  function _define_property$q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$e(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$q(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$8(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Lo;
  !(function (e) {
    (e.Replace = "REPLACE"), (e.Merge = "MERGE");
  })(Lo || (Lo = {}));
  const No = ["url"];
  class APISession {
    get config() {
      return this._config;
    }
    request(e, n = {}, d = {}) {
      var p;
      return processMiddleware(
        this.middlewareStack,
        _object_spread_props$8(
          _object_spread$e({}, this.config.defaultOptions, d),
          {
            baseUrl: this.config.url,
            path: e,
            fetchOptions: mergeFetchOptions(
              null === (p = this.config.defaultOptions) || void 0 === p
                ? void 0
                : p.fetchOptions,
              d.fetchOptions,
            ),
            queryParameters: _object_spread$e(
              {},
              this.config.defaultQueryParameters,
              n,
            ),
            urlParameters: _object_spread$e(
              {},
              this.config.defaultUrlParameters,
              d.urlParameters,
            ),
          },
        ),
      );
    }
    reconfigure(e, n = "REPLACE") {
      "MERGE" === n && (e = deepmerge(this.config, e)),
        No.forEach((n) => {
          if (void 0 === e[n])
            throw new Error(
              `Session requires a valid SessionConfig, missing "${n}"`,
            );
        }),
        (this._config = e),
        (this.middlewareStack = this.createMiddlewareStack());
    }
    createMiddlewareStack() {
      return Array.isArray(this.config.middleware)
        ? [
            constructUrlMiddleware,
            ...this.config.middleware,
            this.makeFetchMiddleware(),
          ]
        : [constructUrlMiddleware, this.makeFetchMiddleware()];
    }
    makeFetchMiddleware() {
      return "function" == typeof this.config.fetchFunction
        ? fetchMiddlewareFactory(this.config.fetchFunction)
        : jo;
    }
    constructor(e) {
      _define_property$q(this, "_config", void 0),
        _define_property$q(this, "middlewareStack", void 0),
        this.reconfigure(e);
    }
  }

  function _object_without_properties(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  const Uo = {
    music: {
      url: "https://api.music.apple.com",
    },
  };
  class MediaAPIV3 {
    configure(e, n, d = Lo.Merge) {
      this.storefrontId = n.storefrontId;
      const p = (function (e) {
        let n = {};
        e.url && (n.url = e.url);
        e.storefrontId &&
          (n.defaultUrlParameters = {
            storefrontId: e.storefrontId,
          });
        e.mediaUserToken &&
          (n.defaultOptions = {
            fetchOptions: {
              headers: {
                "Media-User-Token": e.mediaUserToken,
              },
            },
          });
        e.developerToken &&
          (n = deepmerge(n, {
            defaultOptions: {
              fetchOptions: {
                headers: {
                  Authorization: "Bearer " + e.developerToken,
                },
              },
            },
          }));
        e.options && (n = deepmerge(n, e.options));
        return n;
      })(n);
      if (this[e]) this[e].session.reconfigure(p, d);
      else {
        var h;
        const n = new APISession(p),
          d = n.request.bind(n);
        d.session = n;
        const y =
          "undefined" != typeof process &&
          "test" ===
            (null === (h = process.env) || void 0 === h ? void 0 : h.NODE_ENV);
        Object.defineProperty(this, e, {
          value: d,
          writable: y,
          enumerable: true,
        });
      }
    }
    constructor(e) {
      !(function (e, n, d) {
        n in e
          ? Object.defineProperty(e, n, {
              value: d,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          : (e[n] = d);
      })(this, "storefrontId", void 0);
      const { realmConfig: n } = e,
        d = _object_without_properties(e, ["realmConfig"]);
      for (const p in Uo) {
        let e = deepmerge(Uo[p], d);
        const h = null == n ? void 0 : n[p];
        h && (e = deepmerge(e, h)), this.configure(p, e);
      }
    }
  }

  function asyncGeneratorStep$q(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$o(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$a(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class StationTrackLoader {
    activate() {
      this.dispatcher.unsubscribe(
        ao.queuePositionDidChange,
        this.checkLoadMore,
      ),
        this.dispatcher.subscribe(
          ao.queuePositionDidChange,
          this.checkLoadMore,
        ),
        (this.isActive = true);
    }
    deactivate() {
      this.dispatcher.unsubscribe(
        ao.queuePositionDidChange,
        this.checkLoadMore,
      ),
        (this.isActive = true);
    }
    start() {
      return this.isActive || this.activate(), this.loadNextTracks();
    }
    checkLoadMore() {
      if (!(this.queue.isEmpty || this.queue.nextPlayableItemIndex >= 0))
        return this.loadNextTracks();
    }
    loadNextTracks() {
      var e = this;
      return (function (e) {
        return function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);

            function _next(e) {
              asyncGeneratorStep$q(y, p, h, _next, _throw, "next", e);
            }

            function _throw(e) {
              asyncGeneratorStep$q(y, p, h, _next, _throw, "throw", e);
            }
            _next(void 0);
          });
        };
      })(function* () {
        let n = [];
        const { apiManager: d } = e;
        if ((null == d ? void 0 : d.api) instanceof MediaAPIV3) {
          var p;
          const h = yield d.api.music(
            "v1/me/stations/next-tracks/" + e.station.id,
            void 0,
            {
              fetchOptions: {
                method: "POST",
              },
            },
          );
          n =
            null == h || null === (p = h.data) || void 0 === p
              ? void 0
              : p.data;
        } else {
          var h;
          const p = {};
          var y;
          po.features["enhanced-hls"] &&
            (p.extend = {
              songs: ["extendedAssetUrls"],
            }),
            (n =
              null !==
                (y = yield null === (h = d.mediaAPI) || void 0 === h
                  ? void 0
                  : h.nextStationTracks(e.station.id, null, {
                      queryParameters: p,
                    })) && void 0 !== y
                ? y
                : []);
        }
        if (0 === n.length)
          throw (
            (Je.warn("No track data is available for the current station", {
              stationId: e.station.id,
            }),
            new MKError(
              MKError.Reason.CONTENT_UNAVAILABLE,
              "No track data is available for the current station.",
            ))
          );
        const _ = descriptorToMediaItems({
          context: e.context,
          loaded: n,
          container: e.station,
        });
        e.queue.splice(e.queue.length, 0, _);
      })();
    }
    constructor(e, n, { dispatcher: d, apiManager: p }, h = {}) {
      _define_property$o(this, "queue", void 0),
        _define_property$o(this, "station", void 0),
        _define_property$o(this, "context", void 0),
        _define_property$o(this, "apiManager", void 0),
        _define_property$o(this, "dispatcher", void 0),
        _define_property$o(this, "isActive", void 0),
        (this.queue = e),
        (this.station = n),
        (this.context = h),
        (this.isActive = true),
        (this.dispatcher = d),
        (this.apiManager = p);
    }
  }
  var Bo, Fo;
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$a("design:type", Function),
      _ts_metadata$a("design:paramtypes", []),
      _ts_metadata$a("design:returntype", void 0),
    ],
    StationTrackLoader.prototype,
    "checkLoadMore",
    null,
  ),
    (function (e) {
      (e.artist = "artist"),
        (e.song = "song"),
        (e.station = "station"),
        (e.radioStation = "radioStation");
    })(Bo || (Bo = {})),
    (function (e) {
      e.BEATS1 = "beats1";
    })(Fo || (Fo = {}));
  const isIdentityQueue = (e) => e && void 0 !== e.identity;

  function asyncGeneratorStep$p(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$p(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$p(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$p(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$n(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_metadata$9(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const { queueIsReady: Ko } = ao;
  class ContinuousPlaybackController extends PlaybackController {
    get continuous() {
      return true;
    }
    set continuous(e) {
      if (!0 !== e)
        throw new MKError(
          MKError.Reason.UNSUPPORTED_ERROR,
          "Continuous playback cannot be disabled for station queues.",
        );
    }
    get context() {
      return (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var d = null != arguments[n] ? arguments[n] : {},
            p = Object.keys(d);
          "function" == typeof Object.getOwnPropertySymbols &&
            (p = p.concat(
              Object.getOwnPropertySymbols(d).filter(function (e) {
                return Object.getOwnPropertyDescriptor(d, e).enumerable;
              }),
            )),
            p.forEach(function (n) {
              _define_property$n(e, n, d[n]);
            });
        }
        return e;
      })(
        {
          featureName: St.STATION,
        },
        this._context,
      );
    }
    get isLive() {
      return this._isLive;
    }
    set isLive(e) {
      e !== this._isLive &&
        ((this._isLive = e), this._dispatcher.publish(ao.capabilitiesChanged));
    }
    get isAlgorithmic() {
      return this._isAlgorithmic;
    }
    set isAlgorithmic(e) {
      e !== this._isAlgorithmic &&
        ((this._isAlgorithmic = e),
        this._dispatcher.publish(ao.capabilitiesChanged));
    }
    changeToMediaItem(e) {
      var n = this;
      return _async_to_generator$p(function* () {
        n.generateMethodNotAvailable("changeToMediaItem");
      })();
    }
    hasCapabilities(e) {
      switch (e) {
        case Do.VOLUME:
          return true;
        case Do.PAUSE:
        case Do.SKIP_NEXT:
        case Do.SKIP_PREVIOUS:
        case Do.SEEK:
          return !this.isLive;
        case Do.SKIP_TO_ITEM:
        case Do.AUTOPLAY:
        case Do.EDIT_QUEUE:
        case Do.SHUFFLE:
        case Do.REPEAT:
        default:
          return true;
      }
    }
    pause(e) {
      var n = this,
        _superprop_get_pause = () => super.pause;
      return _async_to_generator$p(function* () {
        if (!n.isLive) return _superprop_get_pause().call(n, e);
        n.generateMethodNotAvailable("pause");
      })();
    }
    skipToPreviousItem() {
      var e = this,
        _superprop_get_skipToPreviousItem = () => super.skipToPreviousItem;
      return _async_to_generator$p(function* () {
        if (!e.isLive) return _superprop_get_skipToPreviousItem().call(e);
        e.generateMethodNotAvailable("skipToPreviousItem");
      })();
    }
    _dataForQueueOptions(e) {
      var n = this,
        _superprop_get__dataForQueueOptions = () => super._dataForQueueOptions;
      return _async_to_generator$p(function* () {
        const d = yield _superprop_get__dataForQueueOptions().call(n, e);
        return n.isAlgorithmic || (d.loaded = n.station), d;
      })();
    }
    returnQueueForOptions(e) {
      var n = this;
      return _async_to_generator$p(function* () {
        var d;
        const p = isIdentityQueue(e)
          ? yield n.loadStationByIdentity(e.identity)
          : yield n.loadStationByStationId(n.generateStationId(e));
        if (void 0 === p)
          return Promise.reject(
            new MKError(
              MKError.Reason.UNSUPPORTED_ERROR,
              "Cannot load requested station",
            ),
          );
        (n.station = p),
          (n.isLive =
            isIdentityQueue(e) ||
            !!(null == p ? void 0 : p.isLive) ||
            !!(null == p || null === (d = p.attributes) || void 0 === d
              ? void 0
              : d.isLive)),
          (n.isAlgorithmic = isAlgoStation(p));
        const h = {
          services: {
            runtime: n._services.runtime,
            request: n._services.request,
            dispatcher: n._services.dispatcher,
          },
          descriptor: yield n._dataForQueueOptions(e),
          playbackMode: n.playbackMode,
        };
        return (
          (n.queue = new Queue(h)),
          n.isAlgorithmic &&
            ((n.trackLoader = new StationTrackLoader(
              n.queue,
              p,
              {
                dispatcher: n._dispatcher,
                apiManager: n._services.apiManager,
              },
              n.context,
            )),
            yield n.trackLoader.start()),
          (n._seekable = n.isLive
            ? new BaseSeekable(n._mediaItemPlayback)
            : new Seekable(n._dispatcher, n._mediaItemPlayback)),
          n._dispatcher.publish(Ko, n.queue.items),
          n.queue
        );
      })();
    }
    appendToQueue(e) {
      return _async_to_generator$p(function* () {
        throw new MKError(
          MKError.Reason.UNSUPPORTED_ERROR,
          "Appending to the Queue is not supported for this type of playback",
        );
      })();
    }
    insertInQueue(e, n) {
      return _async_to_generator$p(function* () {
        throw new MKError(
          MKError.Reason.UNSUPPORTED_ERROR,
          "Inserting into the Queue is not supported for this type of playback",
        );
      })();
    }
    prependToQueue(e, n) {
      return _async_to_generator$p(function* () {
        throw new MKError(
          MKError.Reason.UNSUPPORTED_ERROR,
          "Prepending to the Queue is not supported for this type of playback",
        );
      })();
    }
    clearQueue() {
      return _async_to_generator$p(function* () {
        throw new MKError(
          MKError.Reason.UNSUPPORTED_ERROR,
          "Clearing the Queue is not supported for this type of playback",
        );
      })();
    }
    getNewSeeker() {
      return this.hasCapabilities(Do.SEEK)
        ? super.getNewSeeker()
        : new UnsupportedSeeker();
    }
    skipToNextItem() {
      var e = this,
        _superprop_get_skipToNextItem = () => super.skipToNextItem;
      return _async_to_generator$p(function* () {
        if (!e.isLive) return _superprop_get_skipToNextItem().call(e);
        e.generateMethodNotAvailable("skipToNextItem");
      })();
    }
    generateMethodNotAvailable(e) {
      Je.warn(e + " is not supported for this type of playback");
    }
    generateStationId(e) {
      let n;
      if (isQueueURLOption(e)) {
        const {
          contentId: d,
          kind: p,
          storefrontId: h,
        } = formattedMediaURL(e.url);
        p && (e[p] = d), h && (yo.storefrontId = h), (n = p);
      }
      const d = e;
      if (d.artist) return "ra." + d.artist;
      if (d.song) return "ra." + d.song;
      if (d.station) return d.station;
      if (d.radioStation) return d.radioStation;
      throw new MKError(
        MKError.Reason.UNSUPPORTED_ERROR,
        n
          ? n + " is not a supported option. Use setQueue instead."
          : "Unsupported options specified for setStationQueue. You may want setQueue instead.",
      );
    }
    loadStationByIdentity(e) {
      var n = this;
      return _async_to_generator$p(function* () {
        var d;
        const { apiManager: p } = n._services;
        if ((null == p ? void 0 : p.api) instanceof MediaAPIV3) {
          var h, y;
          const n = yield p.api.music("v1/catalog/{{storefrontId}}/stations", {
            filter: {
              identity: e,
            },
          });
          return null == n ||
            null === (y = n.data) ||
            void 0 === y ||
            null === (h = y.data) ||
            void 0 === h
            ? void 0
            : h[0];
        }
        const _ = yield null == p || null === (d = p.mediaAPI) || void 0 === d
          ? void 0
          : d.stations(void 0, {
              filter: {
                identity: e,
              },
            });
        return _ && _[0];
      })();
    }
    loadStationByStationId(e) {
      var n = this;
      return _async_to_generator$p(function* () {
        var d;
        const { apiManager: p } = n._services;
        if ((null == p ? void 0 : p.api) instanceof MediaAPIV3) {
          var h, y;
          const n = yield p.api.music(
            "v1/catalog/{{storefrontId}}/stations/" + e,
          );
          return null == n ||
            null === (y = n.data) ||
            void 0 === y ||
            null === (h = y.data) ||
            void 0 === h
            ? void 0
            : h[0];
        }
        return null == p || null === (d = p.mediaAPI) || void 0 === d
          ? void 0
          : d.station(e);
      })();
    }
    activate() {
      super.activate(), this.trackLoader && this.trackLoader.activate();
    }
    deactivate() {
      var e = this,
        _superprop_get_deactivate = () => super.deactivate;
      return _async_to_generator$p(function* () {
        yield _superprop_get_deactivate().call(e),
          e.trackLoader && e.trackLoader.deactivate();
      })();
    }
    constructor(e) {
      super(e),
        _define_property$n(this, "type", Co.continuous),
        _define_property$n(this, "_isLive", true),
        _define_property$n(this, "_isAlgorithmic", true),
        _define_property$n(this, "trackLoader", void 0),
        _define_property$n(this, "station", void 0),
        (this._continuous = true);
    }
  }

  function asyncGeneratorStep$o(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$m(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$8(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$8(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$9("design:type", Function),
      _ts_metadata$9("design:paramtypes", [void 0 === Do ? Object : Do]),
      _ts_metadata$9("design:returntype", Boolean),
    ],
    ContinuousPlaybackController.prototype,
    "hasCapabilities",
    null,
  );
  class PercentageWatcher {
    startMonitor() {
      this.dispatcher.unsubscribe(
        ao.playbackDurationDidChange,
        this.updateThreshold,
      ),
        this.dispatcher.unsubscribe(
          ao.playbackTimeDidChange,
          this.handleTimeChange,
        ),
        this.dispatcher.subscribe(
          ao.playbackDurationDidChange,
          this.updateThreshold,
        ),
        this.dispatcher.subscribe(
          ao.playbackTimeDidChange,
          this.handleTimeChange,
        );
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(
        ao.playbackDurationDidChange,
        this.updateThreshold,
      ),
        this.dispatcher.unsubscribe(
          ao.playbackTimeDidChange,
          this.handleTimeChange,
        ),
        (this.threshold = -1);
    }
    handleTimeChange(
      e,
      { currentPlaybackDuration: n, currentPlaybackTime: d },
    ) {
      var p = this;
      return (function (e) {
        return function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);

            function _next(e) {
              asyncGeneratorStep$o(y, p, h, _next, _throw, "next", e);
            }

            function _throw(e) {
              asyncGeneratorStep$o(y, p, h, _next, _throw, "throw", e);
            }
            _next(void 0);
          });
        };
      })(function* () {
        p.threshold < 0 &&
          p.updateThreshold(e, {
            duration: n,
          }),
          d < p.threshold || (p.stopMonitor(), yield p.callback(d, p));
      })();
    }
    updateThreshold(e, { duration: n }) {
      this.threshold = n * this.percentage;
    }
    constructor(e, n, d) {
      _define_property$m(this, "dispatcher", void 0),
        _define_property$m(this, "callback", void 0),
        _define_property$m(this, "percentage", void 0),
        _define_property$m(this, "threshold", void 0),
        (this.dispatcher = e),
        (this.callback = n),
        (this.percentage = d),
        (this.threshold = -1);
    }
  }

  function asyncGeneratorStep$n(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  _ts_decorate$8(
    [
      Bind(),
      _ts_metadata$8("design:type", Function),
      _ts_metadata$8("design:paramtypes", [void 0, void 0]),
      _ts_metadata$8("design:returntype", Promise),
    ],
    PercentageWatcher.prototype,
    "handleTimeChange",
    null,
  ),
    _ts_decorate$8(
      [
        Bind(),
        _ts_metadata$8("design:type", Function),
        _ts_metadata$8("design:paramtypes", [void 0, void 0]),
        _ts_metadata$8("design:returntype", void 0),
      ],
      PercentageWatcher.prototype,
      "updateThreshold",
      null,
    );
  class Preloader extends PlaybackMonitor {
    handlePlaybackThreshold() {
      var e = this;
      return (function (e) {
        return function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);

            function _next(e) {
              asyncGeneratorStep$n(y, p, h, _next, _throw, "next", e);
            }

            function _throw(e) {
              asyncGeneratorStep$n(y, p, h, _next, _throw, "throw", e);
            }
            _next(void 0);
          });
        };
      })(function* () {
        const n = e.getNextPlayableItem();
        n && (yield e.playbackController.prepareToPlay(n, true));
      })();
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return true;
      if (
        !this.playbackController.hasAuthorization ||
        this.playbackController.previewOnly
      )
        return true;
      const e = this.getNextPlayableItem(),
        n = void 0 !== e;
      return this.isSeamlessAudioTransitionsEnabled
        ? n
        : n && !(null == e ? void 0 : e.isPreparedToPlay);
    }
    getNextPlayableItem() {
      return this.playbackController.queue.nextPlayableItem;
    }
    constructor(e) {
      super(e),
        (function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            : (e[n] = d);
        })(this, "isSeamlessAudioTransitionsEnabled", true),
        (this.watchers = [
          new PercentageWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            0.3,
          ),
        ]),
        (this.isSeamlessAudioTransitionsEnabled =
          po.features["seamless-audio-transitions"]);
    }
  }

  function dasherize(e) {
    return e
      .replace(/([A-Z])/g, "-$1")
      .replace(/[-_\s]+/g, "-")
      .toLowerCase();
  }

  function asyncGeneratorStep$m(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$m(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$m(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$m(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$k(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$c(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$k(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$7(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function loadRelationshipData(e, n, d) {
    return _loadRelationshipData.apply(this, arguments);
  }

  function _loadRelationshipData() {
    return (_loadRelationshipData = _async_to_generator$m(function* (
      e,
      n,
      d,
      p = {},
    ) {
      if (void 0 === n) return d;
      void 0 === p.limit && (p.limit = 100),
        void 0 === p.offset && (p.offset = 0);
      const { relationship: h, method: y } = n,
        _ = e[y].bind(e);
      let m;
      return (
        isDataRecord(d)
          ? (void 0 === d[h] && d.setProperty(h, [], "relationships"),
            (m = d[h]))
          : ((d.relationships = d.relationships || {}),
            void 0 === d.relationships[h] &&
              Object.defineProperty(d.relationships, h, {
                value: {
                  data: [],
                },
                enumerable: true,
              }),
            (m = d.relationships[h].data)),
        yield Vo(_, [d.id, h, p], m),
        d
      );
    })).apply(this, arguments);
  }
  const Vo = (function () {
      var e = _async_to_generator$m(function* (e, n, d) {
        const [p, h, y] = n,
          _ = d.length;
        if (_ > 0 && _ < y.limit + y.offset) return d;
        const m = _object_spread$c({}, y);
        let g;
        m.offset = _;
        try {
          g = yield e(p, h, m);
        } catch (Vt) {
          return d;
        }
        return d.push(...g), g.length < m.limit ? d : Vo(e, n, d);
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })(),
    getNamedQueueOptions = (e, n) => {
      const d = [],
        p = e.namedQueueOptions;
      for (const h in n) Object.keys(p).includes(h) && d.push([h, p[h]]);
      return d;
    },
    Go = (function () {
      var e = _async_to_generator$m(function* (e, n, d) {
        const [p] = d,
          h = n[p];
        if (!Array.isArray(h)) return loadSelectedQueueValue(e, n, d, h);
        const y = new Map();
        h.forEach((e) => {
          const n = e.indexOf("."),
            d = -1 === n ? "" : e.substring(0, n);
          y.has(d) || y.set(d, []);
          const p = y.get(d);
          p && p.push(e);
        });
        const _ = (yield Promise.all(
            [...y.values()].map((p) => loadSelectedQueueValue(e, n, d, p)),
          )).reduce((e, n) => {
            var d;
            return (
              (n = null !== (d = n.data) && void 0 !== d ? d : n).forEach(
                (n) => {
                  e.set(n.id, n);
                },
              ),
              e
            );
          }, new Map()),
          m = [];
        return (
          h.forEach((e) => {
            const n = _.get(e);
            n && m.push(n);
          }),
          m
        );
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })();

  function loadSelectedQueueValue(e, n, d, p) {
    return _loadSelectedQueueValue.apply(this, arguments);
  }

  function _loadSelectedQueueValue() {
    return (_loadSelectedQueueValue = _async_to_generator$m(
      function* (e, n, d, p) {
        const h = yield e.getAPIForItem(Array.isArray(p) ? p[0] : p);
        return h instanceof MediaAPIV3
          ? loadSelectedQueueValueV3(h, n, d, p)
          : loadSelectedQueueValueV2(h, n, d, p);
      },
    )).apply(this, arguments);
  }

  function loadSelectedQueueValueV2(e, n, d, p) {
    return _loadSelectedQueueValueV2.apply(this, arguments);
  }

  function _loadSelectedQueueValueV2() {
    return (_loadSelectedQueueValueV2 = _async_to_generator$m(
      function* (e, n, d, p) {
        const [, h] = d;
        let y = n.parameters;
        po.features["enhanced-hls"] &&
          (y = _object_spread_props$7(_object_spread$c({}, y), {
            extend: {
              songs: ["extendedAssetUrls"],
            },
          }));
        let _ = yield e[h.apiMethod](p, y);
        return (
          h.loadedQueueTransform && (_ = h.loadedQueueTransform(_)),
          Array.isArray(p) ||
            (yield loadRelationshipData(e, h.relationshipMethod, _)),
          _
        );
      },
    )).apply(this, arguments);
  }

  function loadSelectedQueueValueV3(e, n, d, p) {
    return _loadSelectedQueueValueV3.apply(this, arguments);
  }

  function _loadSelectedQueueValueV3() {
    return (_loadSelectedQueueValueV3 = _async_to_generator$m(
      function* (e, n, d, p) {
        const [h] = d,
          y = Array.isArray(p),
          _ = T(y ? "" + p[0] : "" + p),
          m = /^(?:playlists?|albums?)$/i.test(h);
        let g = dasherize(h);
        g.endsWith("s") || (g += "s");
        let b =
          (_ ? "/v1/me/library" : "/v1/catalog/{{storefrontId}}") + "/" + g;
        y || (b += "/{{id}}");
        const P = {};
        y && (P.ids = p), _ && m && (P.include = "tracks");
        const S = yield e.music(b, P, {
          urlParameters: {
            id: p,
          },
        });
        return y ? S.data.data : S.data.data[0];
      },
    )).apply(this, arguments);
  }

  function asyncGeneratorStep$l(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$l(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$l(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$l(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$j(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$b(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$j(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$6(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _ts_decorate$7(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$7(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const Ho = ["library-songs", "songs"],
    isAutoplaySupportedForType = (e) => Ho.includes(e),
    normalizeTypeForAutoplay = (e, n) =>
      (T(e) && !(null != n ? n : "").startsWith("library-") ? "library-" : "") +
      normalizeContentType(n);
  class AutoplayTrackLoader {
    activate() {
      this.isActive ||
        (this.dispatcher.unsubscribe(
          ao.queuePositionDidChange,
          this.onQueueChanged,
        ),
        this.dispatcher.subscribe(
          ao.queuePositionDidChange,
          this.onQueueChanged,
        ),
        this.dispatcher.unsubscribe(
          ao.repeatModeDidChange,
          this.onRepeatableChanged,
        ),
        this.dispatcher.subscribe(
          ao.repeatModeDidChange,
          this.onRepeatableChanged,
        ),
        (this.isActive = true));
    }
    deactivate() {
      this.isActive &&
        (this.dispatcher.unsubscribe(
          ao.queuePositionDidChange,
          this.onQueueChanged,
        ),
        this.dispatcher.unsubscribe(
          ao.repeatModeDidChange,
          this.onRepeatableChanged,
        ),
        (this.isActive = true),
        (this.station = void 0),
        (this.queue.hasAutoplayStation = true));
    }
    start() {
      if (!this.isActive) return this.activate(), this.loadNextTracks();
    }
    stop() {
      this.isActive && (this.deactivate(), this.cleanupQueue());
    }
    onRepeatableChanged() {
      this.repeatable.repeatMode === e.PlayerRepeatMode.none
        ? this.checkLoadMore()
        : this.cleanupQueue();
    }
    onQueueChanged() {
      if (!(this.queue.nextPlayableItemIndex >= 0)) return this.checkLoadMore();
    }
    get api() {
      const e = this.apiManager.mediaAPI;
      var n;
      return null !== (n = null == e ? void 0 : e.v3) && void 0 !== n ? n : e;
    }
    checkLoadMore() {
      var e;
      const n =
          null !== (e = this.queue.unplayedAutoplayItems.length) && void 0 !== e
            ? e
            : 0,
        d = po.autoplay.maxUpcomingTracksToMaintain;
      if (
        !(
          this.queue.isEmpty ||
          this.queue.unplayedUserItems.length >
            po.autoplay.maxQueueSizeForAutoplay
        )
      )
        return n < d ? this.loadNextTracks(d - n) : this.loadNextTracks();
    }
    cleanupQueue() {
      this.queue.removeQueueItems(
        (e, n) => !(n <= this.queue.position) && !!e.isAutoplay,
      );
    }
    loadNextTracks(n = po.autoplay.maxUpcomingTracksToMaintain) {
      var d = this;
      return _async_to_generator$l(function* () {
        var p;
        if (d.repeatable.repeatMode !== e.PlayerRepeatMode.none) return;
        let h,
          { station: y } = d;
        if (d.station) {
          try {
            var _;
            (h = yield d.api.music(
              "v1/me/stations/next-tracks/" + d.station.id,
              {
                limit: n,
              },
              {
                fetchOptions: {
                  method: "POST",
                },
              },
            )),
              (h =
                null == h || null === (_ = h.data) || void 0 === _
                  ? void 0
                  : _.data);
          } catch (Vt) {
            return;
          }
          if (!d.isActive) return;
        } else {
          var m;
          const e = yield d.startStation(n);
          if (!e || !d.isActive)
            return void (d.queue.hasAutoplayStation = true);
          (y = d.station = e.station),
            (d.queue.hasAutoplayStation = true),
            (h = e.tracks),
            (null == e || null === (m = e.tracks) || void 0 === m
              ? void 0
              : m.length) ||
              Je.warn("No track data is available for the current station", {
                stationId: null == y ? void 0 : y.id,
              });
        }
        const g = descriptorToMediaItems({
          context: _object_spread_props$6(_object_spread$b({}, d.context), {
            featureName: "now_playing",
            reco_id: (
              null === (p = d.context.featureName) || void 0 === p
                ? void 0
                : p.startsWith("listen-now")
            )
              ? void 0
              : d.context.reco_id,
          }),
          loaded: h,
          container: y,
        });
        d.queue.appendQueueItems(
          toQueueItems(g, {
            isAutoplay: true,
          }),
        );
      })();
    }
    startStation(e) {
      var n = this;
      return _async_to_generator$l(function* () {
        const { userAddedItems: d } = n.queue;
        var p;
        const h =
            null !== (p = d[d.length - 2]) && void 0 !== p
              ? p
              : d[d.length - 1],
          y = null == h ? void 0 : h.container,
          _ = y
            ? {
                container: {
                  id: y.id,
                  type: y.type,
                },
              }
            : void 0,
          m = n.queue.items
            .slice(-1 * po.autoplay.maxQueueSizeInRequest)
            .reduce((e, { id: d, type: p }) => {
              const h = normalizeTypeForAutoplay(d, p);
              return (
                isAutoplaySupportedForType(h) &&
                  !n.errorIds.has(d) &&
                  e.push({
                    id: d,
                    type: h,
                    meta: _,
                  }),
                e
              );
            }, []);
        if (0 === m.length) return;
        const g = {
          data: m,
        };
        let b;
        try {
          var P;
          (b = yield n.api.music(
            "v1/me/stations/continuous",
            {
              "limit[results:tracks]": e,
              with: ["tracks"],
            },
            {
              fetchOptions: {
                method: "POST",
                body: JSON.stringify(g, void 0, 2),
              },
            },
          )),
            (b =
              null == b || null === (P = b.data) || void 0 === P
                ? void 0
                : P.results);
        } catch (Vt) {
          m.forEach((e) => n.errorIds.add(e.id));
        }
        return b;
      })();
    }
    constructor(e, n, { dispatcher: d, apiManager: p }, h = {}) {
      _define_property$j(this, "queue", void 0),
        _define_property$j(this, "repeatable", void 0),
        _define_property$j(this, "context", void 0),
        _define_property$j(this, "apiManager", void 0),
        _define_property$j(this, "dispatcher", void 0),
        _define_property$j(this, "isActive", void 0),
        _define_property$j(this, "errorIds", void 0),
        _define_property$j(this, "station", void 0),
        (this.queue = e),
        (this.repeatable = n),
        (this.context = h),
        (this.isActive = true),
        (this.errorIds = new Set()),
        (this.dispatcher = d),
        (this.apiManager = p);
    }
  }

  function asyncGeneratorStep$k(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$k(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$k(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$k(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$i(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$a(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$i(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$5(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function _ts_decorate$6(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$6(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$7(
    [
      Bind(),
      _ts_metadata$7("design:type", Function),
      _ts_metadata$7("design:paramtypes", []),
      _ts_metadata$7("design:returntype", void 0),
    ],
    AutoplayTrackLoader.prototype,
    "onRepeatableChanged",
    null,
  ),
    _ts_decorate$7(
      [
        Bind(),
        _ts_metadata$7("design:type", Function),
        _ts_metadata$7("design:paramtypes", []),
        _ts_metadata$7("design:returntype", void 0),
      ],
      AutoplayTrackLoader.prototype,
      "onQueueChanged",
      null,
    ),
    _ts_decorate$7(
      [
        (e, n, d) => {
          const p = d.value,
            h = "_singlePromise_" + n,
            y = "undefined" != typeof Symbol ? Symbol(h) : h;
          return (
            (d.value = function (...e) {
              if (this[y]) return this[y];
              const n = (this[y] = p.apply(this, e)),
                reset = () => {
                  this[y] = void 0;
                };
              return n.then(reset, reset), n;
            }),
            d
          );
        },
        _ts_metadata$7("design:type", Function),
        _ts_metadata$7("design:paramtypes", [Number]),
        _ts_metadata$7("design:returntype", Promise),
      ],
      AutoplayTrackLoader.prototype,
      "loadNextTracks",
      null,
    );
  const { queueIsReady: qo } = ao;
  var Wo, zo;
  !(function (e) {
    (e.album = "album"),
      (e.musicVideo = "musicVideo"),
      (e.playlist = "playlist"),
      (e.song = "song");
  })(Wo || (Wo = {})),
    (function (e) {
      (e.albums = "albums"),
        (e.musicVideos = "musicVideos"),
        (e.playlists = "playlists"),
        (e.songs = "songs");
    })(zo || (zo = {}));
  class SerialPlaybackController extends PlaybackController {
    get autoplayEnabled() {
      return this._autoplayEnabled;
    }
    set autoplayEnabled(e) {
      var n;
      this._autoplayEnabled = e;
      const d = e ? "start" : "stop";
      null === (n = this._autoplayTrackLoader) || void 0 === n || n[d]();
    }
    activate() {
      super.activate(),
        this._preloader.activate(),
        this._dispatcher.subscribe(wn, this.onSeamlessAudioTransition),
        this._dispatcher.subscribe(
          ao.repeatModeDidChange,
          this.onRepeatModeChange,
        );
    }
    deactivate() {
      var e = this,
        _superprop_get_deactivate = () => super.deactivate;
      return _async_to_generator$k(function* () {
        var n;
        yield _superprop_get_deactivate().call(e),
          e._preloader.deactivate(),
          e._dispatcher.unsubscribe(wn, e.onSeamlessAudioTransition),
          e._dispatcher.unsubscribe(
            ao.repeatModeDidChange,
            e.onRepeatModeChange,
          ),
          null === (n = e._autoplayTrackLoader) || void 0 === n || n.stop();
      })();
    }
    onSeamlessAudioTransition(n, d) {
      Je.debug("controller handling seamless audio transition, PAF stop", d),
        this._next({
          userInitiated: true,
          seamlessAudioTransition: true,
          endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          position: d.previous.playbackDuration / 1e3,
          isPlaying: true,
        });
    }
    hasCapabilities(e) {
      switch (e) {
        case Do.EDIT_QUEUE:
        case Do.SKIP_NEXT:
        case Do.SKIP_TO_ITEM:
        case Do.AUTOPLAY:
        case Do.VOLUME:
        case Do.SKIP_PREVIOUS:
          return true;
        case Do.REPEAT:
        case Do.SHUFFLE:
          var n, d;
          return !(null === (d = this.queue) ||
          void 0 === d ||
          null === (n = d.currentQueueItem) ||
          void 0 === n
            ? void 0
            : n.isAutoplay);
        case Do.PAUSE:
        case Do.SEEK:
          var p;
          return !(null === (p = this.nowPlayingItem) || void 0 === p
            ? void 0
            : p.isAssetScrubbingDisabled);
        default:
          return true;
      }
    }
    onRepeatModeChange() {
      var e;
      this.queue.nextPlayableItem &&
        (Je.info(
          "SerialPlaybackController: preparing new item after RepeatMode change",
          null === (e = this.queue.nextPlayableItem) || void 0 === e
            ? void 0
            : e.title,
        ),
        this.prepareToPlay(this.queue.nextPlayableItem, true));
    }
    prepareToPlay(n, d = true) {
      var p = this;
      return _async_to_generator$k(function* () {
        if (
          (Je.debug("mk: SerialController - prepareToPlay - ", {
            item: n,
            preload: d,
          }),
          n.isPlayable)
        )
          return p._mediaItemPlayback.prepareToPlay(n).catch((n) => {
            const h =
              !d &&
              -1 ===
                [
                  MKError.Reason.DEVICE_LIMIT,
                  MKError.Reason.STREAM_UPSELL,
                ].indexOf(n.reason);
            if (p.continuous && h)
              return (
                p._dispatcher.publish(gt.applicationActivityIntent, {
                  endReasonType:
                    e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
                  userInitiated: true,
                }),
                p._next()
              );
            throw n;
          });
      })();
    }
    returnQueueForOptions(e) {
      var n = this;
      return _async_to_generator$k(function* () {
        void 0 !== (e = parseQueueURLOption(e)).startPosition &&
          (deprecationWarning("startPosition", {
            message: "startPosition has been deprecated in favor of startWith",
          }),
          void 0 === e.startWith && (e.startWith = e.startPosition));
        const d = yield n._dataForQueueOptions(e),
          p = {
            services: {
              runtime: n._services.runtime,
              request: n._services.request,
              dispatcher: n._services.dispatcher,
              mediaItemPlayback: n._services.mediaItemPlayback,
            },
            descriptor: d,
            playbackMode: n.playbackMode,
          };
        if (
          (void 0 !== e.shuffleMode && (n.shuffleMode = e.shuffleMode),
          (n.queue = new Queue(p)),
          "number" == typeof e.startTime)
        ) {
          const d = n.queue.nextPlayableItem;
          d &&
            n._mediaItemPlayback.playOptions.set(d.id, {
              startTime: e.startTime,
            });
        }
        if (0 === n.queue.length)
          throw (
            (Je.warn(
              "No item data is available for the current media queue",
              e,
            ),
            new MKError(
              MKError.Reason.CONTENT_UNAVAILABLE,
              "No item data is available for the current media queue.",
            ))
          );
        return (
          n._autoplayTrackLoader && n._autoplayTrackLoader.deactivate(),
          (n._autoplayTrackLoader = new AutoplayTrackLoader(
            n.queue,
            n._repeatable,
            {
              dispatcher: n._dispatcher,
              apiManager: n._services.apiManager,
            },
            n._context,
          )),
          n.autoplayEnabled &&
            n.hasCapabilities(Do.AUTOPLAY) &&
            n._autoplayTrackLoader.start(),
          n._dispatcher.publish(qo, n.queue.items),
          n.queue
        );
      })();
    }
    _dataForQueueOptions(e) {
      var n = this,
        _superprop_get__dataForQueueOptions = () => super._dataForQueueOptions;
      return _async_to_generator$k(function* () {
        var d;
        const p = e,
          h = ((e, n) => {
            const d = getNamedQueueOptions(e, n);
            if (d.length > 1)
              throw new MKError(
                MKError.Reason.UNSUPPORTED_ERROR,
                "Queues with multiple media types are not supported.",
              );
            if (0 === d.length) return;
            const [p] = d,
              [h, y] = p;
            if (Array.isArray(n[h]) !== y.isPlural)
              throw new MKError(
                MKError.Reason.UNSUPPORTED_ERROR,
                y.isPlural
                  ? `Queue option ${h} must be an array of id values`
                  : `Queue option ${h} must be a single id value`,
              );
            return p;
          })(n._services.apiManager.apiService, e);
        return (
          void 0 === h ||
            ((null === (d = n.storekit) || void 0 === d
              ? void 0
              : d.restrictedEnabled) &&
              (e.parameters = _object_spread_props$5(
                _object_spread$a({}, e.parameters),
                {
                  restrict: "explicit",
                },
              )),
            (p.loaded = yield Go(n._services.apiManager.apiService, e, h))),
          _object_spread$a(
            {},
            yield _superprop_get__dataForQueueOptions().call(n, e),
            p,
          )
        );
      })();
    }
    appendToQueue(e) {
      var n = this;
      return _async_to_generator$k(function* () {
        const d = yield n._dataForQueueOptions(e),
          p = descriptorToMediaItems(d);
        return n.queue.splice(n.queue.appendTargetIndex, 0, p), n.queue;
      })();
    }
    insertInQueue(e, n) {
      var d = this;
      return _async_to_generator$k(function* () {
        const p = yield d._dataForQueueOptions(e),
          h = descriptorToMediaItems(p);
        return d.queue.splice(n, 0, h), d.queue;
      })();
    }
    prependToQueue(e, n) {
      var d = this;
      return _async_to_generator$k(function* () {
        const p = d.queue.position + 1;
        !0 === (null == n ? void 0 : n.clear) && d.queue.clearAfterCurrent();
        const h = yield d._dataForQueueOptions(e),
          y = descriptorToMediaItems(h);
        if ((d.queue.splice(p, 0, y), d.shouldTransitionSeamlessly)) {
          const e = d.queue,
            n = e.position,
            p = e.item(n + 1);
          Je.debug("prepend preparing ", p.title),
            yield d._mediaItemPlayback.prepareToPlay(p);
        }
        return d.queue;
      })();
    }
    clearQueue() {
      var e = this;
      return _async_to_generator$k(function* () {
        return e.queue.clear(), e.queue;
      })();
    }
    _changeToMediaAtIndex(
      e = 0,
      n = {
        userInitiated: true,
      },
    ) {
      var d = this,
        _superprop_get__changeToMediaAtIndex = () =>
          super._changeToMediaAtIndex;
      return _async_to_generator$k(function* () {
        const p = yield _superprop_get__changeToMediaAtIndex().call(d, e, n),
          h = d.queue.nextPlayableItem;
        return (
          h && d.shouldTransitionSeamlessly && (yield d.prepareToPlay(h)), p
        );
      })();
    }
    _prepareQueue(e) {
      super._prepareQueue(e), this._shuffler.checkAndReshuffle();
    }
    get shouldTransitionSeamlessly() {
      return (
        this._isSeamlessAudioTransitionsEnabled &&
        this.hasAuthorization &&
        !this.previewOnly
      );
    }
    constructor(e) {
      var n;
      super(e),
        _define_property$i(this, "type", Co.serial),
        _define_property$i(this, "_preloader", void 0),
        _define_property$i(this, "_isSeamlessAudioTransitionsEnabled", void 0),
        _define_property$i(this, "_autoplayTrackLoader", void 0),
        (this._queue = new Queue(e)),
        (this._repeatable = new Repeatable(this._dispatcher)),
        (this._seekable = new Seekable(
          this._dispatcher,
          this._mediaItemPlayback,
        )),
        (this._shuffler = new Shuffler(this, {
          dispatcher: this._dispatcher,
        })),
        (this._queueModifier = new ModifiableQueue(
          this._queue,
          this._mediaItemPlayback,
        )),
        (this._isSeamlessAudioTransitionsEnabled = !!(null == e ||
        null === (n = e.bag) ||
        void 0 === n
          ? void 0
          : n.features["seamless-audio-transitions"]));
      const d = {
        controller: this,
        services: e.services,
      };
      this._preloader = new Preloader(d);
    }
  }

  function _define_property$h(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$6(
    [
      Bind(),
      _ts_metadata$6("design:type", Function),
      _ts_metadata$6("design:paramtypes", [void 0, void 0]),
      _ts_metadata$6("design:returntype", void 0),
    ],
    SerialPlaybackController.prototype,
    "onSeamlessAudioTransition",
    null,
  ),
    _ts_decorate$6(
      [
        Bind(),
        _ts_metadata$6("design:type", Function),
        _ts_metadata$6("design:paramtypes", [void 0 === Do ? Object : Do]),
        _ts_metadata$6("design:returntype", Boolean),
      ],
      SerialPlaybackController.prototype,
      "hasCapabilities",
      null,
    ),
    _ts_decorate$6(
      [
        Bind(),
        _ts_metadata$6("design:type", Function),
        _ts_metadata$6("design:paramtypes", []),
        _ts_metadata$6("design:returntype", void 0),
      ],
      SerialPlaybackController.prototype,
      "onRepeatModeChange",
      null,
    );
  class MKDialog {
    static presentError(e) {
      const n = e.dialog;
      void 0 !== n
        ? MKDialog.serverDialog(n).present()
        : new MKDialog(e.message).present();
    }
    static serverDialog(e) {
      const n = new this(e.message, e.explanation);
      return (
        e.okButtonAction &&
          e.okButtonAction.url &&
          (n._okButtonActionURL = e.okButtonAction.url),
        e.okButtonString && (n._okButtonString = e.okButtonString),
        e.cancelButtonString && (n._cancelButtonString = e.cancelButtonString),
        n
      );
    }
    static clientDialog(e) {
      const n = new this(e.message, e.explanation);
      return (
        e.okButtonAction && (n._okButtonAction = e.okButtonAction),
        e.cancelButtonAction && (n._cancelButtonAction = e.cancelButtonAction),
        e.okButtonString && (n._okButtonString = e.okButtonString),
        e.cancelButtonString && (n._cancelButtonString = e.cancelButtonString),
        n
      );
    }
    get actions() {
      return this.cancelButton
        ? `<div id="mk-dialog-actions">${this.cancelButton}${this.okButton}</div>`
        : `<div id="mk-dialog-actions">${this.okButton}</div>`;
    }
    get cancelButton() {
      if ("string" == typeof this._cancelButtonString)
        return `<button type="button">${this._cancelButtonString}</button>`;
    }
    set cancelButton(e) {
      this._cancelButtonString = e;
    }
    get explanation() {
      return `<p id="mk-dialog-explanation">${this._explanation}</p>`;
    }
    get hasOKButtonAction() {
      return !!this._okButtonActionURL || !!this._okButtonAction;
    }
    get message() {
      return `<h5 id="mk-dialog-title">${this._message}</h5>`;
    }
    get okButton() {
      return this.hasOKButtonAction && this._okButtonActionURL
        ? `<button type="button" data-ok-action-url='${this._okButtonActionURL}'>${this._okButtonString}</button>`
        : `<button type="button">${this._okButtonString}</button>`;
    }
    present() {
      const e = document.createDocumentFragment(),
        n = document.createElement("div");
      (n.id = this.scrimId), e.appendChild(n);
      const d = document.createElement("div");
      (d.id = this.id),
        d.classList.add("mk-dialog"),
        d.setAttribute("role", "alertDialog"),
        d.setAttribute("aria-modal", "true"),
        d.setAttribute("aria-labeledby", "mk-dialog-title"),
        d.setAttribute("aria-describedby", "mk-dialog-explanation");
      let p = `\n      <div id="mk-dialog-body">\n        ${this.message}\n        ${this.explanation}\n      </div>`;
      (p = `\n      ${p}\n      ${this.actions}\n    `),
        (d.innerHTML = p),
        e.appendChild(d),
        document.body.appendChild(e),
        document
          .querySelector(`#${d.id} #mk-dialog-actions *:first-child`)
          .focus(),
        setTimeout(() => {
          document
            .querySelector(`#${d.id} #mk-dialog-actions *:first-child`)
            .addEventListener("click", () => {
              this._cancelButtonAction && this._cancelButtonAction(),
                d.parentElement.removeChild(d),
                n.parentElement.removeChild(n);
            }),
            this.hasOKButtonAction &&
              (this._okButtonActionURL
                ? document
                    .querySelector(`#${d.id} #mk-dialog-actions *:last-child`)
                    .addEventListener("click", (e) => {
                      window.open(e.target.dataset.okActionUrl, "_blank"),
                        d.parentElement.removeChild(d),
                        n.parentElement.removeChild(n);
                    })
                : this._okButtonAction &&
                  document
                    .querySelector(`#${d.id} #mk-dialog-actions *:last-child`)
                    .addEventListener("click", (e) => {
                      this._okButtonAction(),
                        d.parentElement.removeChild(d),
                        n.parentElement.removeChild(n);
                    }));
        });
    }
    _appendStyle(e) {
      const n = document.createElement("style");
      (n.id = this.styleId),
        n.styleSheet ? (n.styleSheet.cssText = e) : (n.innerHTML = e),
        document.body.appendChild(n);
    }
    constructor(e, n = "") {
      _define_property$h(this, "_message", void 0),
        _define_property$h(this, "_explanation", void 0),
        _define_property$h(this, "id", void 0),
        _define_property$h(this, "scrimId", void 0),
        _define_property$h(this, "styleId", void 0),
        _define_property$h(this, "_cancelButtonString", void 0),
        _define_property$h(this, "_cancelButtonAction", void 0),
        _define_property$h(this, "_okButtonAction", void 0),
        _define_property$h(this, "_okButtonActionURL", void 0),
        _define_property$h(this, "_okButtonString", void 0),
        (this._message = e),
        (this._explanation = n),
        (this.id = "musickit-dialog"),
        (this.scrimId = this.id + "-scrim"),
        (this.styleId = this.id + "-style"),
        (this._okButtonString = "OK"),
        [this.id, this.scrimId, this.styleId].forEach((e) => {
          try {
            const n = document.getElementById(e);
            n.parentElement.removeChild(n);
          } catch (Vt) {}
        }),
        this._appendStyle(
          "\n#musickit-dialog {\n  --mk-dialog-background: rgba(255, 255, 255, 1);\n  --mk-dialog-text: rgba(0, 0, 0, 0.95);\n  --mk-dialog-border: rgba(0, 0, 0, 0.07);\n  --mk-dialog-scrim: rgba(255, 255, 255, 0.8);\n  --mk-dialog-primary: rgba(0, 122, 255, 1);\n}\n\n@media (prefers-color-scheme: dark) {\n  #musickit-dialog {\n      --mk-dialog-background: rgba(30, 30, 30, 1);\n      --mk-dialog-text: rgba(255, 255, 255, 0.85);\n      --mk-dialog-border: rgba(255, 255, 255, 0.1);\n      --mk-dialog-scrim: rgba(38, 38, 38, 0.8);\n      --mk-dialog-primary: rgba(8, 132, 255, 1);\n  }\n}\n\n#musickit-dialog-scrim {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.35);\n}\n\n#musickit-dialog * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -ms-touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, sans-serif;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n#musickit-dialog *:focus { outline: 0; }\n\n#musickit-dialog {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  -webkit-justify-content: space-between;\n  -moz-justify-content: space-between;\n  justify-content: space-between;\n  min-width: 277px;\n  max-width: 290px;\n  min-height: 109px;\n  background: var(--mk-dialog-background);\n  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.18);\n  border-radius: 10px;\n  color: var(--mk-dialog-text);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -142px;\n  margin-top: -67px;\n  z-index: 9999999999999999999999999;\n}\n\n#musickit-dialog #mk-dialog-body {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  flex-grow: 1;\n  -webkit-justify-content: space-evenly;\n  -moz-justify-content: space-evenly;\n  justify-content: space-evenly;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  padding: 10px 20px;\n  min-height: 74px;\n  text-align: center;\n}\n\n#musickit-dialog .mk-dialog h5 {\n  font-weight: 500;\n  line-height: 20px;\n  margin: 7px 0 0 0;\n  padding: 0;\n}\n\n#musickit-dialog .mk-dialog p {\n  margin: 0 0 7px 0;\n  padding: 0;\n  paddin-top: 3px;\n  line-height: 18px;\n  font-size: 13px;\n  font-weight: 300;\n}\n\n#musickit-dialog #mk-dialog-actions {\n  border-top: 1px solid var(--mk-dialog-border);\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: colrowumn;\n  flex-direction: row;\n  max-height: 41px;\n  min-height: 34px;\n  -webkit-justify-self: flex-end;\n  -moz-justify-self: flex-end;\n  justify-self: flex-end;\n}\n\n#musickit-dialog #mk-dialog-actions button {\n  flex-grow: 1;\n  border: 0;\n  background: none;\n  color: var(--mk-dialog-primary);\n  padding: 0;\n  margin: 0;\n  min-height: 34px;\n  height: 41px;\n  text-align: center;\n}\n\n#musickit-dialog #mk-dialog-actions *:nth-child(2) {\n  border-left: 1px solid var(--mk-dialog-border);\n  font-weight: 500;\n}\n",
        );
    }
  }

  function _define_property$g(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$9(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$g(e, n, d[n]);
        });
    }
    return e;
  }

  function transformStoreData(e) {
    const n = _object_spread$9({}, e),
      { href: d } = n;
    return (
      void 0 !== d &&
        (delete n.href,
        (n.attributes = _object_spread$9({}, n.attributes, {
          href: d,
        }))),
      n
    );
  }

  function _define_property$f(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const Yo = ["extend", "include", "l", "platform", "views"];
  class LocalDataStore {
    get hasDataStore() {
      return this.enableDataStore && void 0 !== this._store;
    }
    delete(e, n) {
      this.hasDataStore && this._store.remove(e, n);
    }
    read(e, n, d, p) {
      p || "function" != typeof d || ((p = d), (d = void 0));
      const h = {};
      let y = true;
      if (
        (d &&
          ((y = Object.keys(d).some((e) => /^(fields|extend)/.test(e))),
          d.views && (h.views = d.views),
          d.include && (h.relationships = d.include)),
        this.hasDataStore && !y)
      ) {
        let p,
          y = [];
        if (
          (d &&
            (y = Object.keys(d).reduce(
              (e, n) => (-1 === Yo.indexOf(n) && e.push([n, d[n]]), e),
              y,
            )),
          (p =
            y && 1 === y.length
              ? this._store.query(y[0][0], y[0][1])
              : this._store.peek(e, n, h)),
          Array.isArray(p))
        ) {
          if (!d && p.length) return p;
        } else if (p) return p;
      }
      if ("function" == typeof p) return p();
    }
    write(e) {
      return this._prepareDataForDataStore(e, (e) => this._store.save(e));
    }
    parse(e) {
      return this._prepareDataForDataStore(e, (e) =>
        this._store.populateDataRecords(e, {}),
      );
    }
    _prepareDataForDataStore(e, n) {
      return this.hasDataStore
        ? Array.isArray(e)
          ? n({
              data: e,
            })
          : Object.keys(e).reduce((d, p) => {
              const h = e[p];
              return (
                hasOwn(h, "data") &&
                  (d[p] = n({
                    data: h.data,
                  })),
                "meta" === p && (d[p] = e[p]),
                d
              );
            }, {})
        : e;
    }
    constructor(e = {}) {
      _define_property$f(this, "_store", void 0),
        _define_property$f(this, "enableDataStore", true);
      let n = true;
      e.features &&
        hasOwn(e.features, "api-data-store") &&
        (this.enableDataStore = !!e.features["api-data-store"]),
        e.features &&
          hasOwn(e.features, "disable-data-store-record-reuse") &&
          (n = !!e.features["disable-data-store-record-reuse"]),
        this.enableDataStore &&
          ((this._store =
            e.store ||
            new DataStore({
              shouldDisableRecordReuse: n,
            })),
          (this._store.mapping = transformStoreData));
    }
  }

  function _define_property$e(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread_props$4(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Qo, Xo;
  !(function (e) {
    (e[(e.Global = 0)] = "Global"),
      (e.Catalog = "catalog"),
      (e.Personalized = "me"),
      (e.Editorial = "editorial"),
      (e.Engagement = "engagement"),
      (e.Social = "social");
  })(Qo || (Qo = {})),
    (function (e) {
      (e.songs = "songs"),
        (e.albums = "albums"),
        (e.playlists = "playlists"),
        (e.stations = "stations"),
        (e["music-videos"] = "music-videos"),
        (e["library-music-videos"] = "library-music-videos"),
        (e["library-playlists"] = "library-playlists"),
        (e["library-songs"] = "library-songs");
    })(Xo || (Xo = {}));
  class API extends class extends class {
    clearCacheForRequest(e, n) {
      "object" == typeof e && ((n = e), (e = void 0)),
        this.networkCache.removeItemsMatching(
          buildURL(this.url, null != e ? e : "", n),
        );
    }
    request(e, n, d) {
      var p,
        h = this;
      return ((p = function* () {
        d || "object" != typeof e || ((d = n || {}), (n = e), (e = void 0));
        let p = {};
        "object" ==
        typeof (d = _object_spread$P(
          {
            method: h.method,
            headers: h.headers,
            reload: true,
          },
          h._fetchOptions,
          d,
        )).queryParameters
          ? ((p = d.queryParameters), delete d.queryParameters)
          : ("GET" !== d.method && "DELETE" !== d.method) || (p = n);
        const y = buildURL(h.url, null != e ? e : "", p),
          { method: _, reload: m = true, useRawResponse: g } = d;
        if (
          ((d.headers = h.buildHeaders(d)),
          delete d.reload,
          delete d.useRawResponse,
          "GET" === _ && !m)
        ) {
          const e = h.getCacheItem(y);
          if (e) return Promise.resolve(e);
        }
        n &&
          Object.keys(n).length &&
          ("POST" === _ || "PUT" === _) &&
          ((d.body = d.body || n),
          "application/x-www-form-urlencoded" === d.contentType
            ? ((d.body = encodeQueryParameters(d.body)),
              d.headers.set(
                "Content-Type",
                "application/x-www-form-urlencoded",
              ))
            : ((d.body = JSON.stringify(d.body)),
              d.headers.set("Content-Type", "application/json")));
        const b = yield h._fetchFunction(y, d);
        if (!b.ok) return Promise.reject(b);
        let P;
        try {
          P = yield b.json();
        } catch (Vt) {
          P = {};
        }
        if (P.errors) return Promise.reject(P.errors);
        const S = g ? P : P.results || P.data || P;
        if ("GET" === _) {
          var E;
          const e =
            null !== (E = getMaxAgeFromHeaders(b.headers)) && void 0 !== E
              ? E
              : h.ttl;
          h.setCacheItem(y, S, e);
        }
        return S;
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (d, h) {
          var y = p.apply(e, n);

          function _next(e) {
            asyncGeneratorStep$1j(y, d, h, _next, _throw, "next", e);
          }

          function _throw(e) {
            asyncGeneratorStep$1j(y, d, h, _next, _throw, "throw", e);
          }
          _next(void 0);
        });
      })();
    }
    buildHeaders({ headers: e, reload: n = true } = {}) {
      void 0 === e && (e = this.headers);
      const d = ((e) => new e.constructor(e))(e);
      return n && d.set("Cache-Control", "no-cache"), d;
    }
    getCacheItem(e) {
      const n = this.networkCache.storage,
        d = `${this.prefix}${this.prefix}cache-mut`,
        p = n.getItem(d) || null,
        h =
          this.headers.get("Music-User-Token") ||
          this.headers.get("Media-User-Token") ||
          null;
      return (
        h !== p &&
          (this.networkCache.clear(),
          null === h ? n.removeItem(d) : n.setItem(d, h)),
        this.networkCache.getItem(e)
      );
    }
    setCacheItem(e, n, d = this.ttl) {
      this.networkCache.setItem(e, n, d);
    }
    clearNetworkCache() {
      this.networkCache.clear();
    }
    _key(e, n) {
      const d = (function (e) {
        try {
          const [n, d] = e.split("?", 2);
          if (void 0 === d) return n;
          const p = d.split("&").map((e) => e.split("=", 2)),
            h = [...Array(p.length).keys()];
          h.sort((e, n) => {
            const d = p[e],
              h = p[n];
            return d < h ? -1 : d > h ? 1 : e - n;
          });
          const y = h.map((e) => p[e]);
          return `${n}?${y
            .map(([e, n]) => (void 0 !== n ? `${e}=${n}` : e))
            .join("&")}`;
        } catch (Vt) {
          return e;
        }
      })(e)
        .toLowerCase()
        .replace(this.url, "");
      return `${this.prefix}${d.replace(/[^-_0-9a-z]{1,}/g, ".")}`;
    }
    constructor(e, n) {
      if (
        (_define_property$1R(this, "url", void 0),
        _define_property$1R(this, "headers", void 0),
        _define_property$1R(this, "prefix", ""),
        _define_property$1R(this, "storage", void 0),
        _define_property$1R(this, "networkCache", void 0),
        _define_property$1R(this, "ttl", void 0),
        _define_property$1R(this, "method", "GET"),
        _define_property$1R(this, "_fetchOptions", void 0),
        _define_property$1R(this, "_fetchFunction", void 0),
        (this.url = e),
        (n = n || {}).storage && n.underlyingStorage)
      )
        throw new Error(
          "only pass storage OR underlyingStorage in sessionOptions to URLSession",
        );
      const d = n.underlyingStorage || {};
      if (
        ((this.storage = n.storage || new GenericStorage(d)),
        (this.networkCache = new NetworkCache({
          storage: this.storage,
          prefix: this.prefix,
          cacheKeyFunction: this._key.bind(this),
        })),
        (this.ttl = n.ttl || 3e5),
        (this._fetchOptions = _object_spread$P({}, n.fetchOptions)),
        "function" != typeof n.fetch && "function" != typeof fetch)
      )
        throw new Error("window.fetch is not defined");
      var p;
      (this._fetchFunction =
        null !== (p = n.fetch) && void 0 !== p ? p : fetch.bind(window)),
        (this.headers = this._fetchOptions.headers || new Headers()),
        delete this._fetchOptions.headers;
    }
  } {
    get developerToken() {
      return this._developerToken.token;
    }
    constructor(e, n, d) {
      super(e, d),
        _define_property$1R(this, "userToken", void 0),
        _define_property$1R(this, "_developerToken", void 0),
        (this._developerToken = new DeveloperToken(n)),
        this.headers.set("Authorization", "Bearer " + this.developerToken),
        (d = d || {}),
        (this.userToken = d.userToken),
        this.userToken && this.headers.set("Media-User-Token", this.userToken);
    }
  } {
    constructor(e, n, d, p, h, y, _ = {}, m) {
      super(
        e,
        n,
        _object_spread_props$4(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              "function" == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$e(e, n, d[n]);
                });
            }
            return e;
          })({}, m),
          {
            userToken: p,
            storage: y,
          },
        ),
      ),
        _define_property$e(this, "_store", void 0),
        _define_property$e(this, "v3", void 0),
        _define_property$e(this, "storefrontId", qe.ID),
        _define_property$e(this, "defaultIncludePaginationMetadata", void 0),
        _define_property$e(this, "resourceRelatives", {
          artists: {
            albums: {
              include: "tracks",
            },
            playlists: {
              include: "tracks",
            },
            songs: null,
          },
        }),
        _define_property$e(this, "userStorefrontId", void 0),
        (this.defaultIncludePaginationMetadata =
          _.features && hasOwn(_.features, "api-pagination-metadata")),
        (this._store = new LocalDataStore(_)),
        d && (this.storefrontId = d.toLowerCase()),
        p && h && (this.userStorefrontId = h.toLowerCase()),
        (this.v3 = new MediaAPIV3({
          developerToken: n,
          mediaUserToken: p,
          storefrontId: d,
          realmConfig: {
            music: {
              url: e.replace(/\/v[0-9]+(\/)?$/, ""),
            },
          },
        }));
    }
  }

  function asyncGeneratorStep$j(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$j(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$j(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$j(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$d(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  let Jo;
  const Zo = (function () {
      var e = _async_to_generator$j(function* (e, n = true) {
        if (Jo && !n) {
          if (void 0 === e.storefrontId || e.storefrontId === Jo.storefrontId)
            return Jo;
          Jo.clear();
        }
        return (
          (Jo = new MediaAPIService(e.dispatcher)), yield Jo.configure(e), Jo
        );
      });
      return function (n) {
        return e.apply(this, arguments);
      };
    })(),
    ea = {
      album: {
        isPlural: true,
        apiMethod: "album",
        relationshipMethod: {
          method: "albumRelationship",
          relationship: "tracks",
        },
      },
      albums: {
        isPlural: true,
        apiMethod: "albums",
      },
      musicVideo: {
        isPlural: true,
        apiMethod: "musicVideo",
      },
      musicVideos: {
        isPlural: true,
        apiMethod: "musicVideos",
      },
      musicMovie: {
        isPlural: true,
        apiMethod: "musicMovie",
      },
      musicMovies: {
        isPlural: true,
        apiMethod: "musicMovies",
      },
      playlist: {
        isPlural: true,
        apiMethod: "playlist",
        relationshipMethod: {
          method: "playlistRelationship",
          relationship: "tracks",
        },
      },
      playlists: {
        isPlural: true,
        apiMethod: "playlists",
      },
      song: {
        isPlural: true,
        apiMethod: "song",
      },
      songs: {
        isPlural: true,
        apiMethod: "songs",
      },
    };
  class MediaAPIService {
    get isConfigured() {
      return void 0 !== this._api;
    }
    get api() {
      if (void 0 === this._api)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          "The API cannot be accessed before it is configured.",
        );
      return this._api;
    }
    get storefrontId() {
      return this.store && this.store.storefrontId;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$j(function* () {
        void 0 !== e.store &&
          ((n.store = e.store),
          [
            ao.authorizationStatusDidChange,
            ao.userTokenDidChange,
            ao.storefrontIdentifierDidChange,
            ao.storefrontCountryCodeDidChange,
          ].forEach((e) => {
            n.store.storekit.addEventListener(e, () => n.resetAPI());
          }),
          n._initializeAPI(e));
      })();
    }
    clear() {
      this.api && this.api.clearNetworkCache && this.api.clearNetworkCache();
    }
    getAPIForItem(e) {
      var n = this;
      return _async_to_generator$j(function* () {
        return T(e)
          ? (yield n.store.authorize(), n.api.library || n.api)
          : n.api;
      })();
    }
    resetAPI() {
      var e = this;
      return _async_to_generator$j(function* () {
        e.clear(), e._initializeAPI();
      })();
    }
    _initializeAPI(e) {
      if (void 0 !== (null == e ? void 0 : e.api))
        return void (this._api = e.api);
      const n = (e && e.store) || this.store;
      if (void 0 === n) return;
      const d = po.features["api-session-storage"]
          ? getSessionStorage()
          : void 0,
        p = (e && e.storefrontId) || n.storefrontId,
        h = new API(
          this.url,
          n.developerToken,
          p,
          n.storekit.userToken,
          n.storekit.storefrontCountryCode,
          d,
          po,
          null == e ? void 0 : e.sessionOptions,
        );
      this._api = h.v3;
    }
    _updateStorefrontId(e) {
      var n = this;
      return _async_to_generator$j(function* () {
        (n.api && e === n.api.storefrontId) ||
          (yield n.configure({
            dispatcher: n._dispatcher,
            store: n.store,
            storefrontId: e,
          }));
      })();
    }
    constructor(e) {
      if (
        (_define_property$d(this, "_dispatcher", void 0),
        _define_property$d(this, "namedQueueOptions", void 0),
        _define_property$d(this, "url", void 0),
        _define_property$d(this, "store", void 0),
        _define_property$d(this, "_api", void 0),
        (this._dispatcher = e),
        !po.urls.mediaApi)
      )
        throw new Error("bag.urls.mediaApi is not configured");
      (this.url = po.urls.mediaApi), (this.namedQueueOptions = ea);
      var n = this;
      this._dispatcher.subscribe(
        gt.apiStorefrontChanged,
        (function () {
          var e = _async_to_generator$j(function* (e, { storefrontId: d }) {
            yield n._updateStorefrontId(d);
          });
          return function (n, d) {
            return e.apply(this, arguments);
          };
        })(),
      );
    }
  }

  function asyncGeneratorStep$i(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$i(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$i(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$i(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$c(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function configure$2(e) {
    return _configure$2.apply(this, arguments);
  }

  function _configure$2() {
    return (_configure$2 = _async_to_generator$i(function* (e) {
      const n = new UTSClientService();
      return yield n.configure(e), n;
    })).apply(this, arguments);
  }
  class UTSClientService {
    get isConfigured() {
      return void 0 !== this.api;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$i(function* () {
        n.api = e.api;
      })();
    }
    clear() {}
    getAPIForItem(e) {
      var n = this;
      return _async_to_generator$i(function* () {
        if (void 0 === n.api) throw new Error("UTS has not been configured");
        return n.api;
      })();
    }
    constructor() {
      _define_property$c(this, "api", void 0),
        _define_property$c(this, "namedQueueOptions", {}),
        _define_property$c(this, "url", "");
    }
  }
  var ta;

  function asyncGeneratorStep$h(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$b(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$7(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$b(e, n, d[n]);
        });
    }
    return e;
  }
  !(function (e) {
    (e.MEDIA_API = "media-api"), (e.UTS_CLIENT = "uts-client");
  })(ta || (ta = {}));
  class APIServiceManager {
    get api() {
      return this.getApiByType(this._defaultAPI);
    }
    get apiService() {
      if (void 0 !== this._defaultAPI)
        return this._apisByType[this._defaultAPI];
      Je.error("There is no API instance configured");
    }
    get mediaAPI() {
      return this.getApiByType(ta.MEDIA_API);
    }
    get utsClient() {
      return this.getApiByType(ta.UTS_CLIENT);
    }
    getApiByType(e) {
      let n;
      if (
        (void 0 !== e && (n = this._apisByType[e]),
        void 0 === n || void 0 === n.api)
      )
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          "There is no API instance configured for the requested type: " + e,
        );
      return n.api;
    }
    set defaultApiType(e) {
      this._defaultAPI = e;
    }
    registerAPIService(e) {
      var n = this;
      return (function (e) {
        return function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);

            function _next(e) {
              asyncGeneratorStep$h(y, p, h, _next, _throw, "next", e);
            }

            function _throw(e) {
              asyncGeneratorStep$h(y, p, h, _next, _throw, "throw", e);
            }
            _next(void 0);
          });
        };
      })(function* () {
        const { apiType: d, options: p } = e,
          h = {
            store: n.store,
            dispatcher: n._dispatcher,
          };
        void 0 === n._defaultAPI && (n._defaultAPI = d),
          d === ta.MEDIA_API
            ? (n._apisByType[d] = yield Zo.call(n, _object_spread$7({}, p, h)))
            : d === ta.UTS_CLIENT &&
              (n._apisByType[d] = yield configure$2.call(
                n,
                _object_spread$7({}, p, h),
              ));
      })();
    }
    constructor(e, n) {
      _define_property$b(this, "store", void 0),
        _define_property$b(this, "_dispatcher", void 0),
        _define_property$b(this, "_apisByType", void 0),
        _define_property$b(this, "_defaultAPI", void 0),
        (this.store = e),
        (this._dispatcher = n),
        (this._apisByType = {});
    }
  }
  const ra = {};

  function adaptAddEventListener(e, n, d, p = {}) {
    const { once: h } = p,
      y = (function (e, n) {
        const d = getCallbacksForName(e),
          wrappedCallback = (e, d) => {
            n(d);
          };
        return d.push([n, wrappedCallback]), wrappedCallback;
      })(n, d);
    !0 === h ? e.subscribeOnce(n, y) : e.subscribe(n, y);
  }

  function getCallbacksForName(e) {
    let n = ra[e];
    return n || ((n = []), (ra[e] = n)), n;
  }

  function asyncGeneratorStep$g(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$g(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$g(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$g(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$a(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  const ia = Je.createChild("rtc");
  class RTCStreamingTracker {
    get isConfigured() {
      return void 0 !== this.instance;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$g(function* () {
        n.instance = e.instance;
      })();
    }
    handleEvent(e, n, d) {}
    loadScript() {
      return _async_to_generator$g(function* () {
        if (!po.urls.rtc) throw new Error("bag.urls.rtc is not configured");
        yield loadScript(po.urls.rtc);
      })();
    }
    prepareReportingAgent(e) {
      this.clearReportingAgent();
      const {
        Sender: n,
        ClientName: d,
        ServiceName: p,
        ApplicationName: h,
        ReportingStoreBag: y,
        DeviceName: _,
      } = window.rtc.RTCReportingAgentConfigKeys;
      e = null != e ? e : this.instance.nowPlayingItem;
      const m = (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var d = null != arguments[n] ? arguments[n] : {},
            p = Object.keys(d);
          "function" == typeof Object.getOwnPropertySymbols &&
            (p = p.concat(
              Object.getOwnPropertySymbols(d).filter(function (e) {
                return Object.getOwnPropertyDescriptor(d, e).enumerable;
              }),
            )),
            p.forEach(function (n) {
              _define_property$a(e, n, d[n]);
            });
        }
        return e;
      })(
        {
          firmwareVersion: this.generateBrowserVersion(),
          model: this.options.browserName,
        },
        this.getMediaIdentifiers(e),
      );
      void 0 === this._storeBag && (this._storeBag = this.generateStoreBag());
      const g = {
        [n]: "HLSJS",
        [d]: this.options.clientName,
        [p]: this.options.serviceName,
        [h]: this.options.applicationName,
        [y]: this._storeBag,
        [_]: this.options.osVersion,
        userInfoDict: m,
      };
      return (
        ia.debug("RTC: creating reporting agent with config", g),
        (this.reportingAgent = new window.rtc.RTCReportingAgent(g)),
        ia.debug("RTC: created reporting agent", this.reportingAgent),
        this.reportingAgent
      );
    }
    cleanup() {
      var e = this;
      return _async_to_generator$g(function* () {
        e.clearReportingAgent();
      })();
    }
    getMediaIdentifiers(e) {
      const n = null == e ? void 0 : e.defaultPlayable;
      if (n) {
        var d;
        const e = {};
        return (
          void 0 !==
            (null === (d = n.mediaMetrics) || void 0 === d
              ? void 0
              : d.MediaIdentifier) &&
            (e.MediaIdentifier = n.mediaMetrics.MediaIdentifier),
          void 0 !== n.channelId && (e.ContentProvider = n.channelId),
          e
        );
      }
      return "musicVideo" === (null == e ? void 0 : e.type)
        ? {
            MediaIdentifier: "adamid=" + e.id,
          }
        : (null == e ? void 0 : e.isLiveVideoStation)
          ? {
              MediaIdentifier: "raid=" + e.id,
            }
          : void 0;
    }
    clearReportingAgent() {
      void 0 !== this.reportingAgent &&
        (this.reportingAgent.destroy(),
        ia.debug("RTC: called destroy on reporting agent", this.reportingAgent),
        (this.reportingAgent = void 0));
    }
    generateBrowserVersion() {
      return this.options.browserMajorVersion
        ? `${this.options.browserMajorVersion}.${
            this.options.browserMinorVersion || 0
          }`
        : "unknown";
    }
    generateStoreBag() {
      var e;
      const {
          storeBagURL: n,
          clientName: d,
          applicationName: p,
          serviceName: h,
          browserName: y,
        } = this.options,
        _ = {
          iTunesAppVersion: `${`${po.app.name}-${po.app.build}`}/${
            null === (e = this.instance) || void 0 === e ? void 0 : e.version
          }`,
        },
        m = new window.rtc.RTCStorebag.RTCReportingStoreBag(n, d, h, p, y, _);
      return ia.debug("RTC: created store bag", m), m;
    }
    constructor(e) {
      _define_property$a(this, "options", void 0),
        _define_property$a(this, "reportingAgent", void 0),
        _define_property$a(this, "instance", void 0),
        _define_property$a(this, "currentMediaItem", void 0),
        _define_property$a(this, "_storeBag", void 0),
        _define_property$a(this, "requestedEvents", []),
        (this.options = e);
    }
  }

  function asyncGeneratorStep$f(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _define_property$9(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$5(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$5(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class PlayActivityService {
    cleanup() {
      this.trackers.forEach((e) => {
        var n;
        return null === (n = e.cleanup) || void 0 === n ? void 0 : n.call(e);
      }),
        this.clearIntention(),
        this.teardownListeners(),
        this.registeredEvents.clear();
    }
    configure(e) {
      var n = this;
      return (function (e) {
        return function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);

            function _next(e) {
              asyncGeneratorStep$f(y, p, h, _next, _throw, "next", e);
            }

            function _throw(e) {
              asyncGeneratorStep$f(y, p, h, _next, _throw, "throw", e);
            }
            _next(void 0);
          });
        };
      })(function* () {
        n.cleanup(),
          (n.registeredEvents = (function (e) {
            const n = [];
            for (const d of e) n.push(...d.requestedEvents);
            return new Set(n);
          })(n.trackers)),
          n.setupListeners();
        try {
          yield Promise.all(n.trackers.map((n) => n.configure(e)));
        } catch (Vt) {
          Je.error("Error configuring a play activity service", Vt);
        }
      })();
    }
    getTrackerByType(e) {
      return this.trackers.find((n) => n instanceof e);
    }
    handleEvent(e, n = {}) {
      const d = this.addIntention(e, n);
      e === gt.playerActivate &&
        (d.flush = "boolean" == typeof n.isPlaying ? !n.isPlaying : void 0);
      for (const p of this.trackers) p.handleEvent(e, d, n.item);
    }
    addIntention(e, n) {
      if (![gt.playbackPause, gt.playbackStop].includes(e)) return n;
      const d = (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var d = null != arguments[n] ? arguments[n] : {},
            p = Object.keys(d);
          "function" == typeof Object.getOwnPropertySymbols &&
            (p = p.concat(
              Object.getOwnPropertySymbols(d).filter(function (e) {
                return Object.getOwnPropertyDescriptor(d, e).enumerable;
              }),
            )),
            p.forEach(function (n) {
              _define_property$9(e, n, d[n]);
            });
        }
        return e;
      })({}, this.lastUserIntent, this.lastApplicationIntent, n);
      return this.clearIntention(), d;
    }
    clearIntention() {
      (this.lastUserIntent = void 0), (this.lastApplicationIntent = void 0);
    }
    recordApplicationIntent(e, n) {
      this.lastApplicationIntent = n;
    }
    recordUserIntent(e, n) {
      this.lastUserIntent = n;
    }
    setupListeners() {
      this.registeredEvents.forEach((e) => {
        this.dispatcher.subscribe(e, this.handleEvent);
      }),
        this.dispatcher.subscribe(gt.userActivityIntent, this.recordUserIntent),
        this.dispatcher.subscribe(
          gt.applicationActivityIntent,
          this.recordApplicationIntent,
        );
    }
    teardownListeners() {
      this.registeredEvents.forEach((e) => {
        this.dispatcher.unsubscribe(e, this.handleEvent);
      }),
        this.dispatcher.unsubscribe(
          gt.userActivityIntent,
          this.recordUserIntent,
        ),
        this.dispatcher.unsubscribe(
          gt.applicationActivityIntent,
          this.recordApplicationIntent,
        );
    }
    constructor(e, n) {
      _define_property$9(this, "dispatcher", void 0),
        _define_property$9(this, "trackers", void 0),
        _define_property$9(this, "registeredEvents", void 0),
        _define_property$9(this, "lastUserIntent", void 0),
        _define_property$9(this, "lastApplicationIntent", void 0),
        _define_property$9(this, "isConfigured", void 0),
        (this.dispatcher = e),
        (this.trackers = n),
        (this.registeredEvents = new Set()),
        (this.isConfigured = true);
    }
  }

  function asyncGeneratorStep$e(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$e(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$e(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$e(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  _ts_decorate$5(
    [
      Bind(),
      _ts_metadata$5("design:type", Function),
      _ts_metadata$5("design:paramtypes", [String, Object]),
      _ts_metadata$5("design:returntype", void 0),
    ],
    PlayActivityService.prototype,
    "handleEvent",
    null,
  ),
    _ts_decorate$5(
      [
        Bind(),
        _ts_metadata$5("design:type", Function),
        _ts_metadata$5("design:paramtypes", [
          String,
          "undefined" == typeof ActivityIntention ? Object : ActivityIntention,
        ]),
        _ts_metadata$5("design:returntype", void 0),
      ],
      PlayActivityService.prototype,
      "recordApplicationIntent",
      null,
    ),
    _ts_decorate$5(
      [
        Bind(),
        _ts_metadata$5("design:type", Function),
        _ts_metadata$5("design:paramtypes", [
          String,
          "undefined" == typeof ActivityIntention ? Object : ActivityIntention,
        ]),
        _ts_metadata$5("design:returntype", void 0),
      ],
      PlayActivityService.prototype,
      "recordUserIntent",
      null,
    );
  const na = BooleanDevFlag.register("mk-force-safari-hlsjs");

  function useNativeSafariPlayback() {
    return !na.enabled;
  }

  function requiresHlsJs(e) {
    return _requiresHlsJs.apply(this, arguments);
  }

  function _requiresHlsJs() {
    return (_requiresHlsJs = _async_to_generator$e(function* (e) {
      const n = null != e ? e : yield findKeySystemPreference(),
        d = !useNativeSafariPlayback();
      return n !== ot.FAIRPLAY || d;
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$d(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$d(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$d(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$d(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$8(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$4(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$8(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$3(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }

  function fetchRadioStationAssets(e, n, d) {
    return _fetchRadioStationAssets.apply(this, arguments);
  }

  function _fetchRadioStationAssets() {
    return (_fetchRadioStationAssets = _async_to_generator$d(
      function* (e, n, d) {
        const p = new Headers({
            Authorization: "Bearer " + n,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Apple-Music-User-Token": "" + d,
          }),
          h = encodeQueryParameters(
            _object_spread_props$3(_object_spread$4({}, e.playParams), {
              keyFormat: "web",
            }),
          ),
          y = `${po.urls.mediaApi}/play/assets?${h}`,
          _ = yield fetch(y, {
            method: "GET",
            headers: p,
          });
        if (500 === _.status) {
          const n = new MKError(MKError.Reason.SERVER_ERROR);
          throw ((n.data = e), n);
        }
        if (403 === _.status) {
          let n;
          try {
            var m;
            (n = yield _.json()),
              (n =
                null == n || null === (m = n.errors) || void 0 === m
                  ? void 0
                  : m[0]);
          } catch (Vt) {}
          const d =
            "40303" === (null == n ? void 0 : n.code)
              ? MKError.Reason.SUBSCRIPTION_ERROR
              : MKError.Reason.ACCESS_DENIED;
          var g;
          const p = new MKError(
            d,
            null !== (g = null == n ? void 0 : n.title) && void 0 !== g
              ? g
              : null == n
                ? void 0
                : n.detail,
          );
          throw ((p.data = e), p);
        }
        if (!_.ok) {
          const n = new MKError(MKError.Reason.CONTENT_UNAVAILABLE);
          throw ((n.data = e), n);
        }
        const b = (yield _.json()).results;
        return (
          Je.debug(`media-item: loaded data from ${y}: ${JSON.stringify(b)}`), b
        );
      },
    )).apply(this, arguments);
  }

  function asyncGeneratorStep$c(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$c(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$c(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$c(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function prepareMediaAPIItem(e, n, d) {
    return _prepareMediaAPIItem.apply(this, arguments);
  }

  function _prepareMediaAPIItem() {
    return (_prepareMediaAPIItem = _async_to_generator$c(function* (e, n, d) {
      if (void 0 === d)
        return Promise.reject(
          new MKError(
            MKError.Reason.AUTHORIZATION_ERROR,
            "Unable to prepare media item for play: missing MusicUserToken.",
          ),
        );
      e.hasOffersHlsUrl
        ? yield prepareWithHLSOffers(e)
        : e.isLiveVideoStation
          ? yield prepareLiveVideoStation(e, n, d)
          : e.isLiveRadioStation
            ? yield prepareLiveRadioStation(e, n, d)
            : e.isRadioEpisode
              ? yield prepareRadioStationEpisode(e, n, d)
              : yield prepareItemWithMZPlay(e, n, d);
    })).apply(this, arguments);
  }

  function prepareWithHLSOffers(e) {
    return _prepareWithHLSOffers.apply(this, arguments);
  }

  function _prepareWithHLSOffers() {
    return (_prepareWithHLSOffers = _async_to_generator$c(function* (e) {
      var n, d;
      const p = po.urls.hlsOffersKeyUrls;
      if (!p)
        throw new MKError(MKError.Reason.CONTENT_UNSUPPORTED, "HLS OFFERS");
      var h;
      e.updateWithLoadedKeys(p),
        e.updateWithLoadedAssets(
          void 0,
          null !==
            (h =
              null === (n = e.attributes) || void 0 === n
                ? void 0
                : n.assetUrl) && void 0 !== h
            ? h
            : null === (d = e.attributes.offers) || void 0 === d
              ? void 0
              : d[0].hlsUrl,
        ),
        yield fetchMasterManifestUrl(e, e.assetURL);
    })).apply(this, arguments);
  }

  function prepareRadioStationEpisode(e, n, d) {
    return _prepareRadioStationEpisode.apply(this, arguments);
  }

  function _prepareRadioStationEpisode() {
    return (_prepareRadioStationEpisode = _async_to_generator$c(
      function* (e, n, d) {
        const p = yield fetchRadioStationAssets(e, n, d);
        if (void 0 === p.assets || 0 === p.assets.length)
          throw new MKError(
            MKError.Reason.CONTENT_UNAVAILABLE,
            "Missing RadioStation assets",
          );
        const h = p.assets[0];
        p.assets.length > 1 &&
          Je.warn("RadioStation endpoint returned multiple assets"),
          Object.assign(e, {
            assetURL: h.url,
            keyURLs: {
              "hls-key-cert-url": h.fairPlayKeyCertificateUrl,
              "hls-key-server-url": h.keyServerUrl,
              "widevine-cert-url": h.widevineKeyCertificateUrl,
            },
          });
      },
    )).apply(this, arguments);
  }

  function prepareLiveVideoStation(e, n, d) {
    return _prepareLiveVideoStation.apply(this, arguments);
  }

  function _prepareLiveVideoStation() {
    return (_prepareLiveVideoStation = _async_to_generator$c(
      function* (e, n, d) {
        const p = yield fetchRadioStationAssets(e, n, d);
        if (void 0 === p.assets || 0 === p.assets.length)
          throw new MKError(
            MKError.Reason.CONTENT_UNAVAILABLE,
            "Missing RadioStation assets",
          );
        const h = p.assets[0];
        p.assets.length > 1 &&
          Je.warn("RadioStation endpoint returned multiple assets"),
          filterUnavailableLiveRadioUrls(h, e),
          Object.assign(e, {
            assetURL: h.url,
            keyURLs: {
              "hls-key-cert-url": h.fairPlayKeyCertificateUrl,
              "hls-key-server-url": h.keyServerUrl,
              "widevine-cert-url": h.widevineKeyCertificateUrl,
            },
          });
      },
    )).apply(this, arguments);
  }

  function prepareLiveRadioStation(e, n, d) {
    return _prepareLiveRadioStation.apply(this, arguments);
  }

  function _prepareLiveRadioStation() {
    return (_prepareLiveRadioStation = _async_to_generator$c(
      function* (e, n, d) {
        if (
          !po.features["playready-live-radio"] &&
          pt === ot.PLAYREADY &&
          "video" !== e.attributes.mediaKind &&
          !po.features["mse-live-radio"]
        )
          throw new MKError(MKError.Reason.CONTENT_UNSUPPORTED, "LIVE_RADIO");
        const p = (yield fetchRadioStationAssets(e, n, d)).assets[0];
        e.updateWithLoadedKeys({
          "hls-key-cert-url": p.fairPlayKeyCertificateUrl,
          "hls-key-server-url": p.keyServerUrl,
          "widevine-cert-url": p.widevineKeyCertificateUrl,
        }),
          yield fetchMasterManifestUrl(e, p.url);
      },
    )).apply(this, arguments);
  }

  function fetchMasterManifestUrl(e, n) {
    return _fetchMasterManifestUrl.apply(this, arguments);
  }

  function _fetchMasterManifestUrl() {
    return (_fetchMasterManifestUrl = _async_to_generator$c(function* (e, n) {
      let d;
      try {
        d = yield fetch(n);
      } catch (Vt) {
        throw makeContentUnavailableError(e);
      }
      extractAssetsFromMasterManifest(yield d.text(), n, e);
    })).apply(this, arguments);
  }

  function extractAssetsFromMasterManifest(e, n, d) {
    const p = /^#EXT-X-STREAM-INF:.*\s*\n(.*$)/gim;
    let h;
    for (; (h = p.exec(e)); ) {
      var y, _;
      let e = h[1];
      const p = h[0];
      var m;
      const b =
        null !==
          (m =
            null === (y = /CODECS=("(.*)")/.exec(p)) || void 0 === y
              ? void 0
              : y[2]) && void 0 !== m
          ? m
          : "";
      var g;
      const P =
        null !==
          (g =
            null === (_ = /(?:[^\w-])BANDWIDTH=((\d+))/.exec(p)) || void 0 === _
              ? void 0
              : _[2]) && void 0 !== g
          ? g
          : 0;
      /^http(s)?:\/\//.test(e) ||
        (e = joinURLPath([...splitURLPath(n).slice(0, -1), e])),
        d.assets.push({
          bandwidth: Number(P),
          codec: b,
          URL: e,
        });
    }
  }

  function filterUnavailableLiveRadioUrls(e, n) {
    const d = new URL(e.url);
    if (!d.host.endsWith(".apple.com") && !d.host.endsWith(".applemusic.com"))
      throw makeContentUnavailableError(n);
  }

  function makeContentUnavailableError(e) {
    const n = new MKError(MKError.Reason.CONTENT_UNAVAILABLE);
    return (n.data = e), n;
  }

  function prepareItemWithMZPlay(e, n, d) {
    return _prepareItemWithMZPlay.apply(this, arguments);
  }

  function _prepareItemWithMZPlay() {
    return (_prepareItemWithMZPlay = _async_to_generator$c(function* (e, n, d) {
      var p;
      if (
        (Je.debug("mk: loadWithMZPlay", e.playParams),
        !(yield hasMusicSubscription()))
      )
        return;
      const h = null === (p = e.playParams) || void 0 === p ? void 0 : p.id,
        y = new Headers({
          Authorization: "Bearer " + n,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Apple-Music-User-Token": "" + d,
        });
      let _ = {
        salableAdamId: h,
      };
      if (e.isCloudItem) {
        (_ = {}),
          e.playParams.purchasedId &&
            (_.purchaseAdamId = e.playParams.purchasedId),
          e.playParams.catalogId &&
            (_.subscriptionAdamId = e.playParams.catalogId);
        const n = /^a\.(\d+)$/;
        n.test(h)
          ? (_.subscriptionAdamId = h.replace(n, "$1"))
          : T(h) && (_.universalLibraryId = h);
      }
      if (!po.urls.webPlayback)
        throw new Error("bag.urls.webPlayback is not configured");
      const m = yield fetch(po.urls.webPlayback, {
          method: "POST",
          body: JSON.stringify(_),
          headers: y,
        }),
        g = yield m.text(),
        b = JSON.parse(g);
      if (!b || !b.songList) {
        const n = MKError.serverError(b, MKError.Reason.UNSUPPORTED_ERROR);
        return (
          e.updateFromLoadError(n),
          Je.debug("mk: prepareItemWithMZPlay - rejecting with error", n),
          Promise.reject(n)
        );
      }
      const [P] = b.songList;
      e.updateWithMZPlayData(P);
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$b(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$b(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$b(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$b(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function prepareToPlayMediaItem(e, n) {
    return _prepareToPlayMediaItem.apply(this, arguments);
  }

  function _prepareToPlayMediaItem() {
    return (_prepareToPlayMediaItem = _async_to_generator$b(function* (e, n) {
      if (n.isPreparedToPlay) Je.warn("media-item: item is prepared to play");
      else {
        if (
          (Je.debug("media-item: item.prepareToPlay playParams", n.playParams),
          (n.state = D.loading),
          n.isUTS)
        )
          return Promise.reject(
            new MKError(
              MKError.Reason.UNSUPPORTED_ERROR,
              "Item was not prepared to play",
            ),
          );
        {
          const { developerToken: d, userToken: p } = e.store;
          yield prepareMediaAPIItem(n, d, p);
        }
      }
    })).apply(this, arguments);
  }

  function _shouldPlayPreview() {
    return (_shouldPlayPreview = _async_to_generator$b(function* (e, n) {
      return (
        !!e.previewURL &&
        (!!n ||
          (!e.playRawAssetURL &&
            (!(yield hasMusicSubscription()) ||
              !hasAuthorization() ||
              !e.isPlayable ||
              !supportsDrm())))
      );
    })).apply(this, arguments);
  }

  function _prepareForEncryptedPlayback() {
    return (_prepareForEncryptedPlayback = _async_to_generator$b(
      function* (e, n, d) {
        if (
          (Je.debug("prepareForEncryptedPlayback"),
          !n.isUTS && !hasAuthorization())
        )
          return Promise.reject(
            new MKError(
              MKError.Reason.AUTHORIZATION_ERROR,
              "Unable to prepare for playback.",
            ),
          );
        try {
          yield prepareToPlayMediaItem(e, n);
        } catch (V) {
          if (V.reason === MKError.Reason.AUTHORIZATION_ERROR)
            yield e.store.storekit.revokeUserToken();
          else if (V.reason === MKError.Reason.TOKEN_EXPIRED)
            try {
              return (
                yield e.store.storekit.renewUserToken(),
                yield prepareToPlayMediaItem(e, n),
                (n.playbackData = _playbackDataForItem(n, d)),
                n
              );
            } catch (Vt) {}
          if (V) return Promise.reject(V);
        }
        return (n.playbackData = _playbackDataForItem(n, d)), n;
      },
    )).apply(this, arguments);
  }

  function _playbackDataForItem(n, d) {
    if ((Je.debug("mk: _playbackDataForItem", n), n.isCloudUpload))
      return n.assets[0];
    if ("musicVideo" !== n.type && !n.isLiveVideoStation) {
      if (!n.isLiveRadioStation) {
        const [e] = n.assets.filter((e) => {
          if (!("flavor" in e)) return true;
          const n = new RegExp(
            `\\d{1,2}\\:(c${
              (
                null === (p = window.WebKitMediaKeys) || void 0 === p
                  ? void 0
                  : p.isTypeSupported(yt + ".1_0", dt.AVC1)
              )
                ? "bc"
                : "tr"
            }p)(\\d{2,3})`,
            "i",
          );
          var p;
          const h = n.test(e.flavor);
          var y;
          const _ = null !== (y = e.flavor.match(n)) && void 0 !== y ? y : [];
          return h && parseInt(_[2], 10) <= d.bitrate;
        });
        return e;
      }
      {
        var p;
        const h = n.assets.reduce((e, n) => {
            const d = n.bandwidth;
            return e[d] || (e[d] = []), e[d].push(n), e;
          }, {}),
          y = Object.keys(h).sort((e, n) => parseInt(e, 10) - parseInt(n, 10)),
          _ = d.bitrate === e.PlaybackBitrate.STANDARD ? y[0] : y[y.length - 1];
        (null == h || null === (p = h[_]) || void 0 === p
          ? void 0
          : p[0].URL) && (n.assetURL = h[_][0].URL);
      }
    }
  }

  function _define_property$7(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$4(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$4(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class ID3MetadataTrackManager {
    get activeMetadata() {
      return this._activeMetadata;
    }
    get activeCues() {
      var e;
      const n =
        null === (e = this.metadataTrack) || void 0 === e
          ? void 0
          : e.activeCues;
      return null != n ? Array.from(n) : [];
    }
    get isDestroyed() {
      return this._isDestroyed;
    }
    get tracks() {
      return void 0 !== this.metadataTrack ? [this.metadataTrack] : [];
    }
    get currentTrack() {
      return this.metadataTrack;
    }
    attach(e) {
      if (void 0 !== this.mediaElement && this.mediaElement !== e)
        throw new Error(
          "MetadaTrackManager is already attached to a different HTMLMediaElement.",
        );
      this.mediaElement !== e &&
        ((this.mediaElement = e),
        this.mediaElement.addEventListener(
          "loadedmetadata",
          this.registerMetadataTrack,
        ),
        this.mediaElement.addEventListener(
          "loadeddata",
          this.registerMetadataTrack,
        ));
    }
    detach() {
      void 0 !== this.mediaElement &&
        (this.mediaElement.removeEventListener(
          "loadedmetadata",
          this.registerMetadataTrack,
        ),
        this.mediaElement.removeEventListener(
          "loadeddata",
          this.registerMetadataTrack,
        ),
        (this.mediaElement = void 0)),
        void 0 !== this.metadataTrack &&
          (this.metadataTrack.removeEventListener(
            "cuechange",
            this.onCueChange,
          ),
          (this.metadataTrack = void 0));
    }
    registerMetadataTrack(e) {
      if (void 0 !== this.mediaElement)
        for (let d = 0; d < this.mediaElement.textTracks.length; d++) {
          const e = this.mediaElement.textTracks[d];
          if ("metadata" === e.kind) {
            var n;
            if (void 0 === this.metadataTrack)
              (this.metadataTrack = e),
                this.metadataTrack.addEventListener(
                  "cuechange",
                  this.onCueChange,
                );
            else
              Kn.warning(
                `Skipping registering metadata TextTrack with id "${
                  null !== (n = e.id) && void 0 !== n ? n : "unknown"
                }"`,
              );
            break;
          }
        }
    }
    onCueChange(e) {
      if (
        (Kn.debug("Processing metadata cues"),
        void 0 === this.activeCues || this.activeCues.length <= 0)
      ) {
        var n;
        if (void 0 !== this.activeMetadata)
          null === (n = this.onchange) || void 0 === n || n.call(this);
        this._activeMetadata = void 0;
      } else {
        const e = (function (e) {
          const n = {};
          for (const h of e) {
            if (
              !isTextTrackID3FrameCue(h) ||
              void 0 === (null == h ? void 0 : h.value)
            )
              continue;
            const e = h.value;
            switch (e.key) {
              case "TALB":
                n.album = e.data;
                break;
              case "TIT2":
                n.title = e.data;
                break;
              case "TPE1":
                n.performer = e.data;
                break;
              case "WXXX":
                var d, p;
                if (
                  ((n.links = null !== (d = n.links) && void 0 !== d ? d : []),
                  !n.links.some(({ url: n }) => n === e.data))
                )
                  n.links.push({
                    description:
                      null !== (p = e.description) && void 0 !== p ? p : "",
                    url: e.data,
                  });
                break;
              case "PRIV": {
                const d = e.owner || e.info;
                "com.apple.radio.ping.jingle" === d &&
                  (n.blob = parsePingBlob(e.data)),
                  "com.apple.radio.adamid" === d &&
                    (n.storefrontAdamIds = parseStorefrontAdamIds(e.data));
                break;
              }
            }
          }
          return new TimedMetadata(n);
        })(this.activeCues);
        var d;
        if (void 0 === this.activeMetadata || !e.equals(this.activeMetadata))
          Kn.debug("Track TimedMetadata changed", e),
            (this._activeMetadata = e),
            null === (d = this.onchange) || void 0 === d || d.call(this, e);
      }
    }
    saveTrack() {}
    restoreSelectedTrack() {}
    destroy() {
      (this._isDestroyed = true), (this.onchange = void 0), this.detach();
    }
    constructor(e) {
      _define_property$7(this, "_isDestroyed", true),
        _define_property$7(this, "mediaElement", void 0),
        _define_property$7(this, "metadataTrack", void 0),
        _define_property$7(this, "_activeMetadata", void 0),
        _define_property$7(this, "onchange", void 0),
        (this.onchange = null == e ? void 0 : e.onchange),
        void 0 !== (null == e ? void 0 : e.element) && this.attach(e.element);
    }
  }

  function asyncGeneratorStep$a(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$a(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$a(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$a(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$6(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$3(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$3(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$4(
    [
      Bind(),
      _ts_metadata$4("design:type", Function),
      _ts_metadata$4("design:paramtypes", [Object]),
      _ts_metadata$4("design:returntype", void 0),
    ],
    ID3MetadataTrackManager.prototype,
    "registerMetadataTrack",
    null,
  ),
    _ts_decorate$4(
      [
        Bind(),
        _ts_metadata$4("design:type", Function),
        _ts_metadata$4("design:paramtypes", [Object]),
        _ts_metadata$4("design:returntype", void 0),
      ],
      ID3MetadataTrackManager.prototype,
      "onCueChange",
      null,
    );
  const oa = {
      keySystemGenericError: "keySystemGenericError",
    },
    aa = new Set([MKError.Reason.DEVICE_LIMIT, MKError.Reason.GEO_BLOCK]),
    sa = {};
  (sa[ot.FAIRPLAY] = "fairplaystreaming"),
    (sa[ot.PLAYREADY] = "playready"),
    (sa[ot.WIDEVINE] = "widevine");
  const ca = Qe.createChild("hlsjs-audio"),
    la = JsonDevFlag.register("mk-hlsjs-config-overrides");
  class HlsJsAudioPlayer extends BasePlayer {
    loadPreviewImage() {
      return _async_to_generator$a(function* () {})();
    }
    get _targetElement() {
      return this.mediaElement;
    }
    setNextSeamlessItem(e) {
      return _async_to_generator$a(function* () {})();
    }
    setPresentationMode(e) {
      return _async_to_generator$a(function* () {
        return Promise.resolve();
      })();
    }
    get shouldDispatchErrors() {
      return !this.userInitiated || this._playbackDidStart;
    }
    get currentPlayingDate() {
      var e;
      return null === (e = this.hls) || void 0 === e ? void 0 : e.playingDate;
    }
    get isPlayingAtLiveEdge() {
      var e;
      const n = this.hls;
      return (
        !(
          !n ||
          !(null === (e = this.nowPlayingItem) || void 0 === e
            ? void 0
            : e.isLinearStream)
        ) && !!n.isPlayingAtLive
      );
    }
    playItemFromEncryptedSource(n, d = true, p = {}) {
      var h = this;
      return _async_to_generator$a(function* () {
        h.playbackState !== e.PlaybackStates.stopped
          ? ((n.playbackType = e.PlaybackType.encryptedFull),
            (h.nowPlayingItem = n),
            (n.state = D.loading),
            (h.userInitiated = d),
            yield h.playHlsStream(n.assetURL, n, p))
          : ca.debug(
              "hlsjsAudioPlayer.playItemFromEncryptedSource aborting playback because player is stopped",
            );
      })();
    }
    isPlayerSupported() {
      return true;
    }
    initializeMediaElement() {
      var e = this;
      return _async_to_generator$a(function* () {
        const n = nextAvailableAudioElement();
        (n.autoplay = true),
          (n.id = "apple-music-player"),
          (n.controls = true),
          (n.muted = true),
          (n.playbackRate = 1),
          (n.preload = "metadata"),
          (n.volume = 1),
          (e.mediaElement = n),
          document.body.appendChild(n),
          e.id3MetadataManager.attach(n),
          ca.debug("initializedMediaElement", n);
      })();
    }
    get seekableTimeRanges() {
      const e = this.hls;
      return e
        ? e.seekableTimeRanges
        : this.currentPlaybackDuration
          ? [
              {
                start: 0,
                end: this.currentPlaybackDuration,
              },
            ]
          : void 0;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$a(function* () {
        e._keySystem = yield findKeySystemPreference();
        try {
          var n;
          if (!at.urls.hls) throw new Error("bag.urls.hls is not configured");
          yield Promise.all([
            loadScript(at.urls.hls),
            null === (n = e._rtcTracker) || void 0 === n
              ? void 0
              : n.loadScript(),
          ]);
        } catch (Vt) {
          throw (
            (ca.error(
              "hlsjs-audio-player failed to load script " + at.urls.hls,
              Vt,
            ),
            Vt)
          );
        }
      })();
    }
    _stopMediaElement() {
      var e = this,
        _superprop_get__stopMediaElement = () => super._stopMediaElement;
      return _async_to_generator$a(function* () {
        yield _superprop_get__stopMediaElement().call(e), e.destroy();
      })();
    }
    destroy() {
      if ((ca.debug("hlsjs-audio-player.destroy"), this.hls)) {
        const {
            ERROR: e,
            INTERNAL_ERROR: n,
            MANIFEST_PARSED: d,
            KEY_REQUEST_STARTED: p,
            LICENSE_CHALLENGE_CREATED: h,
            LEVEL_SWITCHED: y,
          } = window.Hls.Events,
          _ = this.hls;
        _.stopLoad(),
          _.detachMedia(),
          _.off(e, this.handleHlsError),
          _.off(n, this.handleHlsError),
          _.off(d, this.handleManifestParsed),
          _.off(p, this.handleKeyRequestStarted),
          _.off(h, this.handleLicenseChallengeCreated),
          _.off(y, this.handleLevelSwitched),
          _.destroy();
      }
      this.id3MetadataManager.destroy(),
        super.destroy(),
        asAsync(this._license.stop());
    }
    playHlsStream(e, n, d = {}) {
      var p = this;
      return _async_to_generator$a(function* () {
        const { _keySystem: h } = p;
        if (!h) return;
        let y, _;
        (p._unrecoverableError = void 0),
          p.createHlsPlayer(),
          h === ot.WIDEVINE &&
            ((y = "WIDEVINE_SOFTWARE"),
            (_ = {
              initDataTypes: ["cenc", "keyids"],
              distinctiveIdentifier: "optional",
              persistentState: "required",
            }));
        const m = {
            subs: "accepts-css",
            platformInfo: {
              requiresCDMAttachOnStart: h !== ot.NONE,
              maxSecurityLevel: y,
              keySystemConfig: _,
            },
            appData: {
              serviceName: at.app.name,
            },
          },
          { _rtcTracker: g, hls: b } = p;
        if (g) {
          const e = g.prepareReportingAgent(n);
          void 0 !== e && (m.appData.reportingAgent = e);
        }
        ca.debug("RTC: loadSource with load options", m);
        const P = p.startPlaybackSequence();
        return (
          ca.info("Manifest already loaded, passing url to HLSJS", e),
          b.loadSource(e, m, d.startTime),
          b.attachMedia(p.mediaElement),
          n &&
            ((p._licenseServerUrl = n.keyURLs["hls-key-server-url"]),
            h === ot.FAIRPLAY
              ? b.setProtectionData({
                  fairplaystreaming: {
                    serverCertUrl: n.keyURLs["hls-key-cert-url"],
                  },
                })
              : b.setProtectionData({
                  widevine: {
                    serverCertUrl: n.keyURLs["widevine-cert-url"],
                  },
                })),
          P
        );
      })();
    }
    createHlsPlayer() {
      const { _keySystem: e } = this,
        { os: n } = this.services.runtime,
        { Hls: d } = window,
        p = ge.get(),
        h = {
          clearMediaKeysOnPromise: true,
          debug: !!p,
          debugLevel: p,
          enablePerformanceLogging: !!p,
          enablePlayReadyKeySystem: true,
          enableRtcReporting: void 0 !== this._rtcTracker,
          keySystemPreference: sa[e],
          useMediaKeySystemAccessFilter: true,
          nativeControlsEnabled: n.isAndroid,
          enableID3Cues: true,
        };
      ((e) => {
        const n = _e.value;
        n &&
          n.socketurl &&
          isAppleHostname(n.socketurl) &&
          "carry-" === determineCdnBasePrefix() &&
          ((e.socketurl = n.socketurl),
          (e.socketid = n.socketid),
          (e.log = n.log));
      })(h),
        ((e) => {
          const n = la.value;
          n && "object" == typeof n && Object.assign(e, n);
        })(h);
      const y = new d(h),
        {
          ERROR: _,
          INTERNAL_ERROR: m,
          MANIFEST_PARSED: g,
          KEY_REQUEST_STARTED: b,
          LICENSE_CHALLENGE_CREATED: P,
          LEVEL_SWITCHED: S,
        } = d.Events;
      y.on(_, this.handleHlsError),
        y.on(m, this.handleHlsError),
        y.on(g, this.handleManifestParsed),
        y.on(b, this.handleKeyRequestStarted),
        y.on(P, this.handleLicenseChallengeCreated),
        y.on(S, this.handleLevelSwitched),
        (this.hls = y);
    }
    handleLevelSwitched(e, n) {
      var d, p;
      const { level: h } = n;
      if (!h) return;
      const y =
        null === (d = this._levels) || void 0 === d
          ? void 0
          : d.find((e) => e.persistentId === h);
      if (
        !y ||
        (null === (p = this._currentLevel) || void 0 === p
          ? void 0
          : p.persistentId) === (null == y ? void 0 : y.persistentId)
      )
        return;
      this._currentLevel = y;
      const _ =
        void 0 !== y.audioGroupId
          ? this._channelsByGroup[y.audioGroupId]
          : void 0;
      this._dispatcher.publish(gt.hlsLevelUpdated, {
        level: y,
        channels: _,
      });
    }
    handleHlsError(e, n) {
      if (
        (ca.warn("HLS.js error", JSON.stringify(n)), this._unrecoverableError)
      )
        return;
      let d = new MKError(MKError.Reason.UNSUPPORTED_ERROR, n.reason);
      d.data = n;
      const { keySystemGenericError: p } = oa;
      if (n.details !== p) {
        if (
          ("output-restricted" === n.reason &&
            (d = new MKError(MKError.Reason.OUTPUT_RESTRICTED, n.reason)),
          n.fatal)
        ) {
          if ((this.hls.destroy(), !this.shouldDispatchErrors)) throw d;
          this._dispatcher.publish(Pt.mediaPlaybackError, d);
        }
      } else this._dispatcher.publish(p, d);
    }
    handleManifestParsed(e, n) {
      var d = this;
      return _async_to_generator$a(function* () {
        var e, p;
        let h;
        ca.debug("handleManifestParsed", n),
          (d._levels = null !== (e = n.levels) && void 0 !== e ? e : []),
          (d.nowPlayingItem.state = D.ready),
          (d._channelsByGroup = (
            null !== (p = n.audioTracks) && void 0 !== p ? p : []
          ).reduce((e, n) => ((e[n.groupId] = n.channels), e), {}));
        try {
          yield d._playMedia();
        } catch (Vt) {
          throw (
            (ca.warn("error from media element, possibly non-fatal", Vt), Vt)
          );
        } finally {
          h = yield d.finishPlaybackSequence();
        }
        return h;
      })();
    }
    handleKeyRequestStarted(e, n) {
      ca.debug("hlsjs-video.handleKeyRequestStarted"),
        this.hls.generateKeyRequest(n.keyuri, {});
    }
    handleLicenseChallengeCreated(n, d) {
      var p = this;
      return _async_to_generator$a(function* () {
        const {
          _licenseServerUrl: n,
          nowPlayingItem: h,
          _keySystem: y,
          userInitiated: _,
        } = p;
        try {
          var m;
          const e = yield null === (m = p._license) || void 0 === m
              ? void 0
              : m.start(n, h, d, y, _),
            g = {
              statusCode: e.status,
            };
          (null == e ? void 0 : e.license) &&
            (y === ot.FAIRPLAY
              ? (g.ckc = J(e.license))
              : (g.license = J(e.license)));
          const b = e["renew-after"];
          b && (g.renewalDate = new Date(Date.now() + 1e3 * b)),
            p.hls.setLicenseResponse(d.keyuri, g);
        } catch (Vt) {
          if (p._unrecoverableError) return;
          const h = Vt.data,
            y = {};
          void 0 !== (null == h ? void 0 : h.status) &&
            (y.statusCode = +h.status),
            ca.warn("Passing license response error to Hls.js", y),
            p.hls.setLicenseResponse(d.keyuri, y),
            aa.has(Vt.name) &&
              ((p._unrecoverableError = Vt),
              p.resetDeferredPlay(),
              yield p.stop({
                endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
                userInitiated: _,
              })),
            p.onPlaybackLicenseError(Vt);
        }
      })();
    }
    onPlaybackLicenseError(e) {
      this.resetDeferredPlay(),
        this._dispatcher.publish(lt.playbackLicenseError, e);
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$a(function* () {
        n.hls
          ? (ca.debug("hlsjs-video: hls seekTo", e), (n.hls.seekTo = e))
          : (ca.debug("hlsjs-video: media element seek to", e),
            (n._targetElement.currentTime = e));
      })();
    }
    constructor(e) {
      var n;
      super(e),
        _define_property$6(this, "currentAudioTrack", void 0),
        _define_property$6(this, "currentTextTrack", void 0),
        _define_property$6(this, "textTracks", []),
        _define_property$6(this, "audioTracks", []),
        _define_property$6(this, "userInitiated", true),
        _define_property$6(this, "mediaElement", void 0),
        _define_property$6(this, "mediaPlayerType", "hlsjs-audio"),
        _define_property$6(this, "hls", void 0),
        _define_property$6(this, "supportsPreviewImages", true),
        _define_property$6(this, "extension", void 0),
        _define_property$6(this, "_keySystem", void 0),
        _define_property$6(this, "_license", void 0),
        _define_property$6(this, "_rtcTracker", void 0),
        _define_property$6(this, "_levels", void 0),
        _define_property$6(this, "_channelsByGroup", {}),
        _define_property$6(this, "_currentLevel", void 0),
        _define_property$6(this, "_licenseServerUrl", void 0),
        _define_property$6(this, "_unrecoverableError", void 0),
        _define_property$6(this, "id3MetadataManager", void 0),
        (this._rtcTracker =
          null == e || null === (n = e.playbackServices) || void 0 === n
            ? void 0
            : n.getRTCStreamingTracker()),
        (this._license = new License()),
        (this.id3MetadataManager = new ID3MetadataTrackManager({
          onchange: (e) => {
            var n;
            ca.debug("Dispatching bufferTimedMetadataDidChange", e),
              null === (n = this._dispatcher) ||
                void 0 === n ||
                n.publish(On, e);
          },
        }));
    }
  }

  function asyncGeneratorStep$9(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$9(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$9(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$9(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$5(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$3(
    [
      Bind(),
      _ts_metadata$3("design:type", Function),
      _ts_metadata$3("design:paramtypes", [void 0, void 0]),
      _ts_metadata$3("design:returntype", void 0),
    ],
    HlsJsAudioPlayer.prototype,
    "handleLevelSwitched",
    null,
  ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3("design:type", Function),
        _ts_metadata$3("design:paramtypes", [void 0, void 0]),
        _ts_metadata$3("design:returntype", void 0),
      ],
      HlsJsAudioPlayer.prototype,
      "handleHlsError",
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3("design:type", Function),
        _ts_metadata$3("design:paramtypes", [void 0, void 0]),
        _ts_metadata$3("design:returntype", Promise),
      ],
      HlsJsAudioPlayer.prototype,
      "handleManifestParsed",
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3("design:type", Function),
        _ts_metadata$3("design:paramtypes", [void 0, void 0]),
        _ts_metadata$3("design:returntype", void 0),
      ],
      HlsJsAudioPlayer.prototype,
      "handleKeyRequestStarted",
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3("design:type", Function),
        _ts_metadata$3("design:paramtypes", [void 0, void 0]),
        _ts_metadata$3("design:returntype", Promise),
      ],
      HlsJsAudioPlayer.prototype,
      "handleLicenseChallengeCreated",
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3("design:type", Function),
        _ts_metadata$3("design:paramtypes", [
          "undefined" == typeof Error ? Object : Error,
        ]),
        _ts_metadata$3("design:returntype", void 0),
      ],
      HlsJsAudioPlayer.prototype,
      "onPlaybackLicenseError",
      null,
    ),
    _ts_decorate$3(
      [
        AsyncDebounce(250),
        _ts_metadata$3("design:type", Function),
        _ts_metadata$3("design:paramtypes", [Number]),
        _ts_metadata$3("design:returntype", Promise),
      ],
      HlsJsAudioPlayer.prototype,
      "seekToTime",
      null,
    );
  const da = BooleanDevFlag.register("mk-force-native-safari-video-player"),
    ua = BooleanDevFlag.register("mk-force-hlsjs-video-player"),
    pa = BooleanDevFlag.register("mk-force-hls-audio-player"),
    ha = Qe.createChild("factory");

  function contentRequiresHLSjs(e) {
    return _contentRequiresHLSjs.apply(this, arguments);
  }

  function _contentRequiresHLSjs() {
    return (_contentRequiresHLSjs = _async_to_generator$9(function* (e) {
      var n, d, p;
      return (
        !!(
          e.isLiveVideoStation ||
          e.isLinearStream ||
          (null === (p = e.defaultPlayable) ||
          void 0 === p ||
          null === (d = p.assets) ||
          void 0 === d ||
          null === (n = d.fpsKeyServerUrl) ||
          void 0 === n
            ? void 0
            : n.startsWith("https://linear.tv.apple.com"))
        ) || !(!e.hasOffersHlsUrl && !e.isRadioEpisode)
      );
    })).apply(this, arguments);
  }
  class Factory {
    get isDestroyed() {
      return this._isDestroyed;
    }
    getPlayerForMediaItem(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        let d;
        if (
          (ha.debug("Factory.getPlayerForMediaItem", e),
          (function (e) {
            return null != e && !isVideo(e);
          })(e))
        ) {
          const p = n.playersByType.get("audio");
          if (!e.hasOffersHlsUrl && p && !p.isDestroyed)
            return ha.debug("Returning pooled AudioPlayer"), p;
          (d = yield n.createAudioPlayer(e, n.playerOptions)),
            "audio" === d.mediaPlayerType && n.playersByType.set("audio", d);
        } else
          isVideo(e) && (d = yield n.createVideoPlayer(e, n.playerOptions));
        if (void 0 === d)
          throw new Error(
            "Unable to create player for MediaItem: " +
              (null == e ? void 0 : e.id),
          );
        return (
          ha.debug("Initializing player: " + d.constructor.name),
          yield d.initialize(),
          d
        );
      })();
    }
    createAudioPlayer(e, n) {
      var d = this;
      return _async_to_generator$9(function* () {
        if (pa.enabled)
          return (
            ha.debug(
              "Creating HLSAudioPlayer with mkForceHlsjsAudioPlayer enabled",
            ),
            new HlsJsAudioPlayer(n)
          );
        if (yield contentRequiresHLSjs(e))
          return (
            ha.debug("Creating HlsJsAudioPlayer required for content item"),
            new HlsJsAudioPlayer(n)
          );
        const { os: p } = d.runtime;
        return p.isIOS || p.isIPadOS
          ? (ha.debug("Creating native AudioPlayer for iOS platform"),
            new AudioPlayer(n))
          : (ha.debug("Creating AudioPlayer as a fall through"),
            new AudioPlayer(n));
      })();
    }
    createVideoPlayer(e, n) {
      var d = this;
      return _async_to_generator$9(function* () {
        if ((ha.debug("Creating VideoPlayer"), da.enabled))
          return (
            ha.debug(
              "Creating NativeSafariVideoPlayer with mkForceSafariNativeVideoPlayer enabled",
            ),
            new NativeSafariVideoPlayer(n)
          );
        if (ua.enabled)
          return (
            ha.debug(
              "Creating HlsJsVideoPlayer with mkForceHlsjsVideoPlayer enabled",
            ),
            new HlsJsVideoPlayer(n)
          );
        if (yield contentRequiresHLSjs(e))
          return (
            ha.debug("Creating HlsJsVideoPlayer required for content item"),
            new HlsJsVideoPlayer(n)
          );
        const { os: p } = d.runtime;
        return p.isIOS || p.isIPadOS
          ? (ha.debug("Creating NativeSafariVideoPlayer for iOS platform"),
            new NativeSafariVideoPlayer(n))
          : (ha.debug("Creating HLSjsVideoPlayer as a fall through"),
            new HlsJsVideoPlayer(n));
      })();
    }
    destroy() {
      this._isDestroyed = true;
      for (const e of this.playersByType.values()) e.destroy();
      this.playersByType.clear();
    }
    constructor(e) {
      _define_property$5(this, "runtime", void 0),
        _define_property$5(this, "playerOptions", void 0),
        _define_property$5(this, "playersByType", void 0),
        _define_property$5(this, "_isDestroyed", true),
        (this.playersByType = new Map()),
        (this.playerOptions = e),
        (this.runtime = e.services.runtime);
    }
  }

  function asyncGeneratorStep$8(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$8(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$8(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$8(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$4(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _ts_decorate$2(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$2(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const { playbackLicenseError: ya } = lt,
    { keySystemGenericError: _a } = zn,
    fa = BooleanDevFlag.register("mk-play-radio-station-episodes");
  const ma = (function () {
    var e = _async_to_generator$8(function* (e, n) {
      var d, p;
      if (
        null === (p = e.container) ||
        void 0 === p ||
        null === (d = p.attributes) ||
        void 0 === d
          ? void 0
          : d.requiresSubscription
      ) {
        if (!(yield n())) {
          const n = new MKError(MKError.Reason.SUBSCRIPTION_ERROR);
          throw ((n.data = e), n);
        }
      }
    });
    return function (n, d) {
      return e.apply(this, arguments);
    };
  })();
  let va = true;
  class MediaItemPlayback {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentPlaybackTime() {
      return this._currentPlayer.currentPlaybackTime;
    }
    get currentPlaybackTimeRemaining() {
      return this._currentPlayer.currentPlaybackTimeRemaining;
    }
    get currentPlayingDate() {
      return this._currentPlayer.currentPlayingDate;
    }
    get isPlayingAtLiveEdge() {
      return this._currentPlayer.isPlayingAtLiveEdge;
    }
    get seekableTimeRanges() {
      return this._currentPlayer.seekableTimeRanges;
    }
    get audioTracks() {
      return this._currentPlayer.audioTracks;
    }
    get currentAudioTrack() {
      return this._currentPlayer.currentAudioTrack;
    }
    set currentAudioTrack(e) {
      this._currentPlayer.currentAudioTrack = e;
    }
    get currentPlaybackDuration() {
      return this._currentPlayer.currentPlaybackDuration;
    }
    get currentBufferedProgress() {
      return this._currentPlayer.currentBufferedProgress;
    }
    get currentPlaybackProgress() {
      return this._currentPlayer.currentPlaybackProgress;
    }
    get currentTextTrack() {
      return this._currentPlayer.currentTextTrack;
    }
    set currentTextTrack(e) {
      this._currentPlayer.currentTextTrack = e;
    }
    get previewOnly() {
      return this._previewOnly;
    }
    set previewOnly(e) {
      this._previewOnly = e;
    }
    get isPlaying() {
      return this._currentPlayer.isPlaying;
    }
    get isPrimaryPlayer() {
      return this._currentPlayer.isPrimaryPlayer;
    }
    set isPrimaryPlayer(e) {
      this._currentPlayer.isPrimaryPlayer = e;
    }
    get isReady() {
      return this._currentPlayer.isReady;
    }
    get nowPlayingItem() {
      return this._currentPlayer.nowPlayingItem;
    }
    get playbackRate() {
      return this._currentPlayer.playbackRate;
    }
    set playbackRate(e) {
      this._updatePlayerState("playbackRate", e);
    }
    get playbackState() {
      return this._currentPlayer.playbackState;
    }
    set playbackState(e) {
      this._currentPlayer.setPlaybackState(e, this.nowPlayingItem);
    }
    get playbackTargetAvailable() {
      return this._currentPlayer.playbackTargetAvailable;
    }
    get playbackTargetIsWireless() {
      return this._currentPlayer.playbackTargetIsWireless;
    }
    get supportsPreviewImages() {
      return this._currentPlayer.supportsPreviewImages;
    }
    get textTracks() {
      return this._currentPlayer.textTracks;
    }
    get volume() {
      return this._currentPlayer.volume;
    }
    set volume(e) {
      var n;
      this._currentPlayer.isDestroyed &&
        (null === (n = this._dispatcher) ||
          void 0 === n ||
          n.publish(Pt.playbackVolumeDidChange, {}));
      this._updatePlayerState("volume", e);
    }
    clearNextManifest() {
      this._currentPlayer.clearNextManifest();
    }
    destroy() {
      var e, n;
      (this._isDestroyed = true),
        this._playerFactory.destroy(),
        null === (e = this._dispatcher) ||
          void 0 === e ||
          e.unsubscribe(ya, this.onPlaybackLicenseError),
        null === (n = this._dispatcher) ||
          void 0 === n ||
          n.unsubscribe(_a, this.onKeySystemGenericError);
    }
    exitFullscreen() {
      return this._currentPlayer.exitFullscreen();
    }
    loadPreviewImage(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        return n._currentPlayer.loadPreviewImage(e);
      })();
    }
    getNewSeeker() {
      return this._currentPlayer.newSeeker();
    }
    mute() {
      (this._volumeAtMute = this.volume), (this.volume = 0);
    }
    pause(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        return n._currentPlayer.pause(e);
      })();
    }
    play() {
      var e = this;
      return _async_to_generator$8(function* () {
        return e._currentPlayer.play();
      })();
    }
    preload() {
      var e = this;
      return _async_to_generator$8(function* () {
        return e._currentPlayer.preload();
      })();
    }
    prepareToPlay(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        var d;
        it.debug("invoking prepareToPlay for ", e.title);
        const p = yield n.prepareForEncryptedPlayback(e, {
            bitrate: n._bitrateCalculator.bitrate,
          }),
          h =
            null === (d = n._currentPlayback) || void 0 === d ? void 0 : d.item,
          y = at.features["seamless-audio-transitions"],
          _ = "song" === (null == h ? void 0 : h.type) && "song" === e.type,
          m = !e.playRawAssetURL;
        return (
          y &&
            _ &&
            m &&
            (it.debug(`setting ${e.title} for seamless audio transition`),
            yield n._currentPlayer.setNextSeamlessItem(e)),
          p
        );
      })();
    }
    requestFullscreen(e) {
      return this._currentPlayer.requestFullscreen(e);
    }
    showPlaybackTargetPicker() {
      this._currentPlayer.showPlaybackTargetPicker();
    }
    seekToTime(e, n = kt.Manual) {
      var d = this;
      return _async_to_generator$8(function* () {
        yield d._currentPlayer.seekToTime(e, n);
      })();
    }
    setPresentationMode(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        return n._currentPlayer.setPresentationMode(e);
      })();
    }
    startMediaItemPlayback(e, n = true) {
      var d = this;
      return _async_to_generator$8(function* () {
        var p;
        it.debug("MediaItemPlayback: startMediaItemPlayback", e),
          e.resetState(),
          (function (e, n) {
            if (e.isRadioEpisode && !fa.enabled) {
              it.warn("Radio Station Episodes are not supported");
              const n = new MKError(
                MKError.Reason.CONTENT_UNSUPPORTED,
                "Radio Station Episodes are not supported",
              );
              throw (
                ((n.data = {
                  item: e,
                }),
                n)
              );
            }
          })(e, d.services.runtime),
          ((e, n) => {
            const { os: d } = n;
            if (e.isLinearStream && ("ios" === d.name || "ipados" === d.name)) {
              it.warn("Cannot play linear stream on iOS or iPad");
              const n = new MKError(
                MKError.Reason.CONTENT_UNSUPPORTED,
                "IOS LINEAR",
              );
              throw (
                ((n.data = {
                  item: e,
                }),
                n)
              );
            }
          })(e, d.services.runtime),
          ((e, n) => {
            const { isMSESupported: d, isMMSSupported: p } = n;
            if (e.hasOffersHlsUrl && !d && !p) {
              it.warn("HLSjs is not supported");
              const n = new MKError(
                MKError.Reason.CONTENT_UNSUPPORTED,
                "HLSjs Unsupported on Device",
              );
              throw (
                ((n.data = {
                  item: e,
                }),
                n)
              );
            }
          })(e, d.services.runtime),
          yield ma(e, d.hasMusicSubscription);
        const h = yield d._getPlayerForMediaItem(e);
        if (
          (yield d.setCurrentPlayer(h),
          !(null === (p = d._currentPlayer) || void 0 === p
            ? void 0
            : p.hasMediaElement))
        )
          return (
            it.warn(
              `MediaItemPlayback: Could not play media of type ${e.type}, marking item as unsupported and skipping.`,
            ),
            void e.notSupported()
          );
        try {
          const { dispatcher: p } = d.services;
          e.beginMonitoringStateDidChange((e) =>
            p.publish(I.mediaItemStateDidChange, e),
          ),
            e.beginMonitoringStateWillChange((e) =>
              p.publish(I.mediaItemStateWillChange, e),
            );
          const h = d.playOptions.get(e.id);
          h && d.playOptions.delete(e.id);
          const y = yield d._playAccordingToPlaybackType(e, n, h);
          return (
            (d._currentPlayback = {
              item: e,
              userInitiated: n,
            }),
            y
          );
        } catch (V) {
          throw (e.updateFromLoadError(V), it.error(V.message, V), V);
        }
      })();
    }
    _playAccordingToPlaybackType(e, n, d) {
      var p = this;
      return _async_to_generator$8(function* () {
        return (yield (function (e, n) {
          return _shouldPlayPreview.apply(this, arguments);
        })(e, p._previewOnly))
          ? p._playPreview(e, n)
          : (function (e) {
                return !!e.rawAssetUrl;
              })(e)
            ? p._playRawAsset(e, n, d)
            : (function (e) {
                  return (
                    isLive(e) &&
                    isStream$1(e) &&
                    void 0 !== e.attributes.stationProviderName &&
                    "Shoutcast" === e.attributes.streamingRadioSubType
                  );
                })(e)
              ? p._playBroadcastRadio(e, n)
              : (((e) => {
                  if (!supportsDrm()) {
                    const n = new MKError(
                      MKError.Reason.CONTENT_UNSUPPORTED,
                      "NO DRM",
                    );
                    throw (
                      ((n.data = {
                        item: e,
                      }),
                      it.warn("No DRM detected"),
                      n)
                    );
                  }
                })(e),
                p._playEncryptedFull(e, n, d));
      })();
    }
    _playEncryptedFull(e, n, d) {
      var p = this;
      return _async_to_generator$8(function* () {
        if (
          (it.debug("MediaItemPlayback: play encrypted full", e),
          !e || !e.isPlayable)
        )
          return Promise.reject(
            new MKError(MKError.Reason.MEDIA_PLAYBACK, "Not Playable"),
          );
        const h = p._currentPlayer;
        try {
          yield p.prepareForEncryptedPlayback(e, {
            bitrate: p._bitrateCalculator.bitrate,
          });
        } catch (V) {
          return (
            it.error("prepareForEncryptedPlayback Error: userInitiated " + n),
            h.destroy(),
            n ? Promise.reject(V) : void h.dispatch(Pt.mediaPlaybackError, V)
          );
        }
        return (
          yield (function (e) {
            return new Promise((n, d) => {
              const { ageGatePolicy: p } = e;
              if (!p || !p.age || !p.frequencyInMinutes)
                return (
                  Je.debug("No ageGatePolicy. Resolving handleAgeGate()"),
                  n(void 0)
                );
              const h = getLocalStorage(),
                y = null == h ? void 0 : h.ageGatePolicyAge,
                _ = null == h ? void 0 : h.ageGatePolicyExpiration;
              if (
                y &&
                _ &&
                parseInt(_, 10) > Date.now() &&
                parseInt(y, 10) >= p.age
              )
                return n(void 0);
              MKDialog.clientDialog({
                okButtonString: "Yes",
                okButtonAction: () => (
                  null == h || h.setItem("ageGatePolicyAge", p.age.toString()),
                  null == h ||
                    h.setItem(
                      "ageGatePolicyExpiration",
                      (Date.now() + 60 * p.frequencyInMinutes * 1e3).toString(),
                    ),
                  n(void 0)
                ),
                cancelButtonString: "No",
                cancelButtonAction: () =>
                  d(new MKError("AGE_GATE", "Age Gate Declined")),
                explanation: `This content may not be appropriate for ages younger than ${p.age}.`,
                message: `Are you ${p.age} or older?`,
              }).present();
            });
          })(e),
          it.debug("About to play item as encrypted", e),
          yield h.playItemFromEncryptedSource(e, n, d),
          e
        );
      })();
    }
    _playBroadcastRadio(n, d) {
      var p = this;
      return _async_to_generator$8(function* () {
        if (
          (it.debug("MediaItemPlayback: play broadcast radio", n),
          !at.features["broadcast-radio"])
        ) {
          const e = new MKError(MKError.Reason.CONTENT_UNAVAILABLE);
          throw ((e.data = n), e);
        }
        const h = p._currentPlayer,
          y = h.isPaused() && !d,
          _ = yield fetchRadioStationAssets(
            n,
            cn.developerToken,
            cn.musicUserToken,
          ),
          m = _.assets[0];
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (n.trackInfo = _["track-info"]),
          (h.nowPlayingItem = n),
          yield h.playItemFromUnencryptedSource(m.url, y),
          n
        );
      })();
    }
    _playRawAsset(n, d, p) {
      var h = this;
      return _async_to_generator$8(function* () {
        it.debug("MediaItemPlayback: play raw asset", n);
        const y = h._currentPlayer,
          _ = y.isPaused() && !d;
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (y.nowPlayingItem = n),
          yield y.playItemFromUnencryptedSource(n.rawAssetUrl, _, p),
          n
        );
      })();
    }
    _playPreview(n, d) {
      var p = this;
      return _async_to_generator$8(function* () {
        it.debug("MediaItemPlayback: play preview", n);
        const h = p._currentPlayer,
          y = h.isPaused() && !d;
        return (
          supportsDrm() ||
            h.dispatch(Pt.drmUnsupported, {
              item: n,
            }),
          (n.playbackType = e.PlaybackType.preview),
          (h.nowPlayingItem = n),
          yield h.playItemFromUnencryptedSource(n.previewURL, y),
          n
        );
      })();
    }
    stop(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        yield n._currentPlayer.stop(e);
      })();
    }
    unmute() {
      this.volume > 0 ||
        ((this.volume = this._volumeAtMute || 1),
        (this._volumeAtMute = void 0));
    }
    _getPlayerForMediaItem(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        it.trace("MediaItemPlayback._getPlayerForMediaItem", e);
        const d = yield n._playerFactory.getPlayerForMediaItem(e);
        return (
          it.trace("Applying default player state", d, n.playerState),
          Object.assign(d, n.playerState),
          d
        );
      })();
    }
    setCurrentPlayer(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        var d;
        n._currentPlayer !== e &&
          (it.debug("MediaItemPlayback: setting currentPlayer", e),
          yield n._currentPlayer.stop(),
          (n._currentPlayer = e),
          null === (d = n._dispatcher) ||
            void 0 === d ||
            d.publish(Pt.playerTypeDidChange, {
              player: e,
            }));
      })();
    }
    getCurrentPlayer() {
      return this._currentPlayer;
    }
    onKeySystemGenericError(e, n) {
      var d = this;
      return _async_to_generator$8(function* () {
        var e;
        va
          ? null === (e = d._dispatcher) ||
            void 0 === e ||
            e.publish(Pt.mediaPlaybackError, n)
          : ((va = true),
            it.warn("Retrying playback after keysystemGenericError"),
            yield d.restartPlayback());
      })();
    }
    onPlaybackLicenseError(e, n) {
      var d = this;
      return _async_to_generator$8(function* () {
        var e;
        n.reason === MKError.Reason.PLAYREADY_CBC_ENCRYPTION_ERROR
          ? (it.warn(
              "MediaItemPlayback: PLAYREADY_CBC_ENCRYPTION_ERROR...retrying with different key system",
            ),
            yield d.restartPlayback())
          : null === (e = d._dispatcher) ||
            void 0 === e ||
            e.publish(Pt.mediaPlaybackError, n);
      })();
    }
    restartPlayback() {
      var e = this;
      return _async_to_generator$8(function* () {
        yield e.stop();
        const { _currentPlayback: n } = e;
        if (n) {
          const { item: d, userInitiated: p } = n;
          d.resetState(), yield e.startMediaItemPlayback(d, p);
        }
      })();
    }
    _updatePlayerState(e, n) {
      (this.playerState[e] = n), (this._currentPlayer[e] = n);
    }
    constructor(e) {
      _define_property$4(this, "playerState", {
        playbackRate: 1,
        volume: 1,
      }),
        _define_property$4(this, "playOptions", new Map()),
        _define_property$4(this, "hasMusicSubscription", void 0),
        _define_property$4(this, "prepareForEncryptedPlayback", void 0),
        _define_property$4(this, "_currentPlayer", void 0),
        _define_property$4(this, "services", void 0),
        _define_property$4(this, "_dispatcher", void 0),
        _define_property$4(this, "_playerFactory", void 0),
        _define_property$4(this, "_previewOnly", true),
        _define_property$4(this, "_volumeAtMute", void 0),
        _define_property$4(this, "_currentPlayback", void 0),
        _define_property$4(this, "_bitrateCalculator", void 0),
        _define_property$4(this, "_isDestroyed", true);
      const { playbackServices: n } = e;
      var d;
      (this.hasMusicSubscription = n.hasMusicSubscription),
        (this.prepareForEncryptedPlayback = n.prepareForEncryptedPlayback),
        (function (e) {
          cn = e;
        })(e.tokens),
        e.bag && ((d = e.bag), Object.assign(at, d)),
        (this.services = e.services),
        (this._dispatcher = e.services.dispatcher),
        (this._bitrateCalculator = e.services.bitrateCalculator),
        (this._playerFactory = new Factory(e)),
        (this._currentPlayer = new PlayerStub(e)),
        this._dispatcher.subscribe(ya, this.onPlaybackLicenseError),
        this._dispatcher.subscribe(_a, this.onKeySystemGenericError);
    }
  }

  function asyncGeneratorStep$7(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$7(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$7(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$7(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$3(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$3(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$3(e, n, d[n]);
        });
    }
    return e;
  }

  function _ts_decorate$1(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }

  function _ts_metadata$1(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$2(
    [
      Bind(),
      _ts_metadata$2("design:type", Function),
      _ts_metadata$2("design:paramtypes", [void 0, void 0]),
      _ts_metadata$2("design:returntype", Promise),
    ],
    MediaItemPlayback.prototype,
    "onKeySystemGenericError",
    null,
  ),
    _ts_decorate$2(
      [
        Bind(),
        _ts_metadata$2("design:type", Function),
        _ts_metadata$2("design:paramtypes", [void 0, void 0]),
        _ts_metadata$2("design:returntype", Promise),
      ],
      MediaItemPlayback.prototype,
      "onPlaybackLicenseError",
      null,
    );
  const ga = [
      MKError.Reason.CONTENT_EQUIVALENT,
      MKError.Reason.CONTENT_RESTRICTED,
      MKError.Reason.CONTENT_UNAVAILABLE,
      MKError.Reason.CONTENT_UNSUPPORTED,
      MKError.Reason.SERVER_ERROR,
      MKError.Reason.SUBSCRIPTION_ERROR,
      MKError.Reason.UNSUPPORTED_ERROR,
      MKError.Reason.USER_INTERACTION_REQUIRED,
    ],
    ba = JsonDevFlag.register("mk-bag-features-overrides");
  class MKInstance {
    get developerToken() {
      return yo.developerToken;
    }
    get api() {
      return this._services.apiManager.api;
    }
    get audioTracks() {
      return this._mediaItemPlayback.audioTracks;
    }
    get authorizationStatus() {
      return yo.authorizationStatus;
    }
    get bitrate() {
      return this._services.bitrateCalculator.bitrate;
    }
    set bitrate(e) {
      this._services.bitrateCalculator.bitrate = e;
    }
    get browserSupportsPictureInPicture() {
      return detectPictureInPictureSupport();
    }
    get browserSupportsVideoDrm() {
      return supportsDrm();
    }
    get cid() {
      return (
        (this.realm === e.SKRealm.TV || this.sourceType !== Bt.MUSICKIT) &&
        yo.cid
      );
    }
    get continuous() {
      return this._playbackController.continuous;
    }
    set continuous(e) {
      this._playbackController.continuous = e;
    }
    get autoplayEnabled() {
      return this._autoplayEnabled;
    }
    set autoplayEnabled(n) {
      this.realm !== e.SKRealm.MUSIC && (n = true),
        n !== this.autoplayEnabled &&
          ((this._autoplayEnabled = n),
          this._services.dispatcher.publish(
            ao.autoplayEnabledDidChange,
            this.autoplayEnabled,
          ));
    }
    get currentAudioTrack() {
      return this._mediaItemPlayback.currentAudioTrack;
    }
    set currentAudioTrack(e) {
      this._mediaItemPlayback.currentAudioTrack = e;
    }
    get currentPlaybackDuration() {
      return this._mediaItemPlayback.currentPlaybackDuration;
    }
    get currentPlaybackProgress() {
      return this._mediaItemPlayback.currentPlaybackProgress;
    }
    get currentPlaybackTime() {
      return this._mediaItemPlayback.currentPlaybackTime;
    }
    get currentPlaybackTimeRemaining() {
      return this._mediaItemPlayback.currentPlaybackTimeRemaining;
    }
    get currentTextTrack() {
      return this._mediaItemPlayback.currentTextTrack;
    }
    set currentTextTrack(e) {
      this._mediaItemPlayback.currentTextTrack = e;
    }
    get isAuthorized() {
      return yo.isAuthorized;
    }
    get isPlaying() {
      return this._playbackController.isPlaying;
    }
    get isRestricted() {
      return yo.isRestricted;
    }
    get isU13() {
      return yo.isU13;
    }
    get metricsClientId() {
      return yo.metricsClientId;
    }
    set metricsClientId(e) {
      yo.metricsClientId = e;
    }
    get musicUserToken() {
      return yo.musicUserToken;
    }
    set musicUserToken(e) {
      (e && yo.musicUserToken === e) || (yo.musicUserToken = e);
    }
    get nowPlayingItem() {
      return this._mediaItemPlayback.nowPlayingItem;
    }
    get nowPlayingItemIndex() {
      return this._playbackController.nowPlayingItemIndex;
    }
    get playbackMode() {
      return this._playbackMode;
    }
    set playbackMode(n) {
      if (-1 === Object.values(e.PlaybackMode).indexOf(n)) return;
      const d = n === e.PlaybackMode.PREVIEW_ONLY,
        p = this._services.mediaItemPlayback;
      p && (p.previewOnly = d),
        this._playbackMode !== n &&
          ((this._playbackController.playbackMode = n),
          (this._playbackMode = n));
    }
    get playbackRate() {
      return this._mediaItemPlayback.playbackRate;
    }
    set playbackRate(e) {
      this._mediaItemPlayback.playbackRate = e;
    }
    get playbackState() {
      return this._mediaItemPlayback.playbackState;
    }
    get playbackTargetAvailable() {
      return this._mediaItemPlayback.playbackTargetAvailable;
    }
    get playbackTargetIsWireless() {
      return this._mediaItemPlayback.playbackTargetIsWireless;
    }
    get previewOnly() {
      return this.playbackMode === e.PlaybackMode.PREVIEW_ONLY;
    }
    set previewOnly(n) {
      this.playbackMode = n
        ? e.PlaybackMode.PREVIEW_ONLY
        : e.PlaybackMode.MIXED_CONTENT;
    }
    get queue() {
      return this._playbackController.queue;
    }
    get queueIsEmpty() {
      return this._playbackController.queue.isEmpty;
    }
    get realm() {
      return yo.realm;
    }
    get repeatMode() {
      return this._playbackController.repeatMode;
    }
    set repeatMode(e) {
      this._playbackController.repeatMode = e;
    }
    set requestUserToken(e) {
      yo.requestUserToken = e;
    }
    get restrictedEnabled() {
      return yo.restrictedEnabled;
    }
    set restrictedEnabled(e) {
      yo.restrictedEnabled = e;
    }
    get supportsPreviewImages() {
      return this._mediaItemPlayback.supportsPreviewImages;
    }
    get seekSeconds() {
      return this._playbackController.seekSeconds;
    }
    get services() {
      return this._services;
    }
    set shuffle(e) {
      this._playbackController.shuffle = e;
    }
    get shuffleMode() {
      return this._playbackController.shuffleMode;
    }
    set shuffleMode(e) {
      this._playbackController.shuffleMode = e;
    }
    get storefrontCountryCode() {
      return yo.storefrontCountryCode;
    }
    get subscribeURL() {
      return yo.subscribeURL;
    }
    get subscribeFamilyURL() {
      return yo.subscribeFamilyURL;
    }
    get subscribeIndividualURL() {
      return yo.subscribeIndividualURL;
    }
    get subscribeStudentURL() {
      return yo.subscribeStudentURL;
    }
    get textTracks() {
      return this._mediaItemPlayback.textTracks;
    }
    get videoContainerElement() {
      return this.context.videoContainerElement;
    }
    set videoContainerElement(e) {
      this.context.videoContainerElement = e;
    }
    get volume() {
      return this._mediaItemPlayback.volume;
    }
    set volume(e) {
      this._mediaItemPlayback.volume = e;
    }
    get storefrontId() {
      return yo.storefrontId;
    }
    set storefrontId(e) {
      yo.storefrontId = e;
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback;
    }
    get _playbackController() {
      if (void 0 !== this._playbackControllerInternal)
        return this._playbackControllerInternal;
      it.debug("setting _playbackController");
      const e = this._getPlaybackControllerByType(Co.serial);
      return (this._playbackController = e), e;
    }
    set _playbackController(e) {
      (this._playbackControllerInternal = e),
        (this._playbackControllerInternal.autoplayEnabled =
          this._autoplayEnabled),
        this._playbackControllerInternal.activate(),
        this.capabilities.updateChecker(
          this._playbackControllerInternal.hasCapabilities,
        ),
        (this.capabilities.controller = this._playbackControllerInternal);
    }
    addEventListener(e, n, d = {}) {
      adaptAddEventListener(this._services.dispatcher, e, n, d);
    }
    authorize() {
      var e = this;
      return _async_to_generator$7(function* () {
        return e.deferPlayback(), yo.authorize();
      })();
    }
    canAuthorize() {
      return supportsDrm() && !this.isAuthorized;
    }
    canUnauthorize() {
      return supportsDrm() && this.isAuthorized;
    }
    changeToMediaAtIndex(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        n._isPlaybackSupported() &&
          (yield n._validateAuthorization(),
          n._signalChangeItemIntent(),
          yield n._playbackController.changeToMediaAtIndex(e));
      })();
    }
    changeToMediaItem(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        it.debug("instance.changeToMediaItem", e),
          n._isPlaybackSupported() &&
            (yield n._validateAuthorization(),
            n._signalChangeItemIntent(),
            yield n._playbackController.changeToMediaItem(e));
      })();
    }
    changeUserStorefront(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        n.storefrontId = e;
      })();
    }
    cleanup() {
      var n = this;
      return _async_to_generator$7(function* () {
        var d;
        null === (d = n._services.mediaItemPlayback) ||
          void 0 === d ||
          d.destroy(),
          n._signalIntent({
            endReasonType: e.PlayActivityEndReasonType.EXITED_APPLICATION,
          });
        const p = Object.keys(n._playbackControllers).map((e) =>
          n._playbackControllers[e].destroy(),
        );
        try {
          yield Promise.all(p);
        } catch (Vt) {
          it.error("Error cleaning up controller", Vt);
        }
        n._services.dispatcher.clear();
      })();
    }
    configure(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        return (n._whenConfigured = n._configure(e)), n._whenConfigured;
      })();
    }
    _configure(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        yield yo.storekit.whenAuthCompleted;
        const d = e.map(
          n._services.apiManager.registerAPIService,
          n._services.apiManager,
        );
        yield Promise.all(d),
          yield n._configurePlayActivity(),
          n._initializeExternalEventPublishing();
      })();
    }
    deferPlayback() {
      it.debug("deferPlayback", this._playbackControllerInternal),
        deferPlayback();
    }
    me() {
      return _async_to_generator$7(function* () {
        try {
          return yield yo.storekit.me();
        } catch (Vt) {
          return Promise.reject(
            new MKError(MKError.Reason.AUTHORIZATION_ERROR, "Unauthorized"),
          );
        }
      })();
    }
    hasMusicSubscription() {
      return hasMusicSubscription(yo.storekit);
    }
    mute() {
      return this._mediaItemPlayback.mute();
    }
    pause(n) {
      var d = this;
      return _async_to_generator$7(function* () {
        if (d._isPlaybackSupported()) {
          try {
            d._signalIntent({
              endReasonType:
                e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED,
            }),
              yield d._playbackController.pause(n);
          } catch (V) {
            d._handlePlaybackError(V);
          }
          return Promise.resolve();
        }
      })();
    }
    play() {
      var e = this;
      return _async_to_generator$7(function* () {
        if ((it.debug("instance.play()"), e._isPlaybackSupported())) {
          yield e._validateAuthorization();
          try {
            yield e._playbackController.play();
          } catch (V) {
            e._handlePlaybackError(V);
          }
          return Promise.resolve();
        }
      })();
    }
    playMediaItem(e, n) {
      var d = this;
      return _async_to_generator$7(function* () {
        var p, h;
        if (
          (it.debug("mk: playMediaItem", e),
          (null == n ? void 0 : n.bingeWatching) || d.deferPlayback(),
          (n = _object_spread$3({}, n)),
          (null == e ? void 0 : e.playEvent) && !hasOwn(n, "startTime"))
        ) {
          const { playEvent: d } = e;
          d.isDone ||
            void 0 === d.playCursorInSeconds ||
            (n.startTime = d.playCursorInSeconds);
        }
        d.services.dispatcher.publish(ao.playInitiated, {
          item: e,
          timestamp:
            null !==
              (h =
                null === (p = n.meta) || void 0 === p
                  ? void 0
                  : p.initiatedTimestamp) && void 0 !== h
              ? h
              : Date.now(),
        });
        try {
          n && d._mediaItemPlayback.playOptions.set(e.id, n);
          const p = yield d._playbackController.playSingleMediaItem(e, n);
          return d.services.dispatcher.publish(ao.capabilitiesChanged), p;
        } catch (V) {
          it.error("mk:playMediaItem error", V), d._handlePlaybackError(V);
        }
      })();
    }
    removeEventListener(e, n) {
      !(function (e, n, d) {
        const p = getCallbacksForName(n);
        let h;
        for (let y = p.length - 1; y >= 0; y--) {
          const [e, n] = p[y];
          if (e === d) {
            (h = n), p.splice(y, 1);
            break;
          }
        }
        h && e.unsubscribe(n, h);
      })(this._services.dispatcher, e, n);
    }
    exitFullscreen() {
      return this._mediaItemPlayback.exitFullscreen();
    }
    requestFullscreen(e) {
      return this._mediaItemPlayback.requestFullscreen(e);
    }
    loadPreviewImage(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        return n._mediaItemPlayback.loadPreviewImage(e);
      })();
    }
    getNewSeeker() {
      return this._playbackController.getNewSeeker();
    }
    seekToTime(e, n = kt.Manual) {
      var d = this;
      return _async_to_generator$7(function* () {
        if (d._isPlaybackSupported()) {
          yield d._validateAuthorization();
          try {
            yield d._playbackController.seekToTime(e, n);
          } catch (V) {
            d._handlePlaybackError(V);
          }
          return Promise.resolve();
        }
      })();
    }
    setPresentationMode(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        return n._mediaItemPlayback.setPresentationMode(e);
      })();
    }
    skipToNextItem() {
      var n = this;
      return _async_to_generator$7(function* () {
        if (n._isPlaybackSupported()) {
          yield n._validateAuthorization(),
            n._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            });
          try {
            yield n._playbackController.skipToNextItem();
          } catch (V) {
            n._handlePlaybackError(V);
          }
        }
      })();
    }
    skipToPreviousItem() {
      var n = this;
      return _async_to_generator$7(function* () {
        if (n._isPlaybackSupported()) {
          yield n._validateAuthorization(),
            n._signalIntent({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            });
          try {
            yield n._playbackController.skipToPreviousItem();
          } catch (V) {
            n._handlePlaybackError(V);
          }
        }
      })();
    }
    seekForward() {
      var n = this;
      return _async_to_generator$7(function* () {
        if (n._isPlaybackSupported()) {
          yield n._validateAuthorization();
          try {
            n._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            }),
              yield n._playbackController.seekForward();
          } catch (V) {
            n._handlePlaybackError(V);
          }
        }
      })();
    }
    seekBackward() {
      var e = this;
      return _async_to_generator$7(function* () {
        if (e._isPlaybackSupported()) {
          yield e._validateAuthorization();
          try {
            yield e._playbackController.seekBackward();
          } catch (V) {
            e._handlePlaybackError(V);
          }
        }
      })();
    }
    showPlaybackTargetPicker() {
      this._playbackController.showPlaybackTargetPicker();
    }
    stop(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        if (n._isPlaybackSupported()) {
          var d;
          n._signalIntent({
            endReasonType: null == e ? void 0 : e.endReasonType,
            userInitiated:
              null === (d = null == e ? void 0 : e.userInitiated) ||
              void 0 === d ||
              d,
          });
          try {
            yield n._playbackController.stop(e);
          } catch (V) {
            n._handlePlaybackError(V);
          }
        }
      })();
    }
    unauthorize() {
      return _async_to_generator$7(function* () {
        return yo.unauthorize();
      })();
    }
    unmute() {
      return this._mediaItemPlayback.unmute();
    }
    _createPlayerControllerOptions() {
      return {
        tokens: yo,
        bag: po,
        playbackServices: {
          getRTCStreamingTracker: () => {
            var e;
            return null === (e = this._services.playActivity) || void 0 === e
              ? void 0
              : e.getTrackerByType(RTCStreamingTracker);
          },
          hasMusicSubscription: hasMusicSubscription,
          prepareForEncryptedPlayback: (e, n) =>
            (function (e, n, d) {
              return _prepareForEncryptedPlayback.apply(this, arguments);
            })(this._services.apiManager, e, n),
          requiresHlsJs: requiresHlsJs,
        },
        services: this._services,
        context: this.context,
        autoplayEnabled: this.autoplayEnabled,
        privateEnabled: this.privateEnabled,
        siriInitiated: this.siriInitiated,
        storekit: null == yo ? void 0 : yo.storekit,
        playbackMode: this.playbackMode,
      };
    }
    _getPlaybackControllerByType(e) {
      const n = this._playbackControllers[e];
      if (n) return n;
      let d;
      switch (e) {
        case Co.serial:
          d = new SerialPlaybackController(
            this._createPlayerControllerOptions(),
          );
          break;
        case Co.continuous:
          d = new ContinuousPlaybackController(
            this._createPlayerControllerOptions(),
          );
          break;
        default:
          throw new MKError(
            MKError.Reason.UNSUPPORTED_ERROR,
            "Unsupported controller requested: " + e,
          );
      }
      return (this._playbackControllers[e] = d), d;
    }
    _handlePlaybackError(e) {
      if (
        (it.error("mediaPlaybackError", e),
        MKError.isMKError(e) && ga.includes(e.reason))
      )
        throw e;
      this._playbackErrorDialog &&
        !this._services.runtime.isNodeEnvironment &&
        MKDialog.presentError(e);
    }
    _initializeInternalEventHandling() {
      yo.storekit.addEventListener(ao.userTokenDidChange, () => {
        this._whenConfigured &&
          this._whenConfigured
            .then(() => this._configurePlayActivity().catch())
            .catch();
      });
      const n = this._services.dispatcher;
      n.subscribe(ao.mediaPlaybackError, (e, n) =>
        this._handlePlaybackError(n),
      ),
        n.subscribe(ao.playbackStateDidChange, (n, d) => {
          d.state === e.PlaybackStates.paused &&
            (it.debug(
              "mk: playbackStateDidChange callback - calling storekit.presentSubscribeViewForEligibleUsers",
            ),
            yo.storekit.presentSubscribeViewForEligibleUsers(
              {
                state: d.state,
                item: this.nowPlayingItem,
              },
              true,
            ));
        }),
        n.subscribe(On, (e, d) => {
          d.blob &&
            (it.debug('Dispatching TimedMetadata "ping" blob', d),
            n.publish(gt.timedMetadata, {
              item: this.nowPlayingItem,
              position: this.currentPlaybackTime,
              playingDate: this.currentPlayingDate,
              storefrontId: this.storefrontId.toUpperCase(),
              metadata: d,
            }));
        });
    }
    _initializeExternalEventPublishing() {
      [
        ao.authorizationStatusDidChange,
        ao.storefrontCountryCodeDidChange,
        ao.storefrontIdentifierDidChange,
        ao.userTokenDidChange,
        ao.eligibleForSubscribeView,
      ].forEach((e) => {
        yo.storekit.addEventListener(e, (n) =>
          this._services.dispatcher.publish(e, n),
        );
      }),
        this._services.dispatcher.subscribe(On, (e, n) => {
          it.debug("Dispatching TimedMetadata change", n),
            this._services.dispatcher.publish(ao.timedMetadataDidChange, n);
        });
    }
    configureLogger(e) {
      var n;
      it.level === tt &&
        (!0 === e.debug
          ? setRootLoggingLevel(Se.DEBUG)
          : void 0 !== e.logLevel && setRootLoggingLevel(e.logLevel)),
        Ze.enabled && setConsoleOutput(Ze.enabled),
        void 0 !== et.value && applyLoggingLevels(et.value),
        void 0 !== e.logHandler &&
          ((n = e.logHandler), (it.handlers.external = new CallbackHandler(n)));
    }
    _configurePlayActivity() {
      var e = this;
      return _async_to_generator$7(function* () {
        void 0 !== e._services.playActivity &&
          (yield e._services.playActivity.configure({
            instance: e,
            services: e._services,
          }));
      })();
    }
    _isPlaybackSupported() {
      return (
        !this._services.runtime.isNodeEnvironment ||
        (it.warn("Media playback is not supported in Node environments."), true)
      );
    }
    _updatePlaybackController(e) {
      var n = this;
      return _async_to_generator$7(function* () {
        it.debug("mk: _updatePlaybackController", e),
          n._playbackControllerInternal !== e &&
            (n._playbackControllerInternal &&
              (yield n._playbackControllerInternal.deactivate()),
            (n._playbackController = e));
      })();
    }
    _signalChangeItemIntent() {
      this._signalIntent({
        endReasonType:
          e.PlayActivityEndReasonType.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
      });
    }
    _signalIntent(e) {
      this.services.dispatcher.publish(
        gt.userActivityIntent,
        _object_spread$3(
          {
            userInitiated: true,
          },
          e,
        ),
      );
    }
    _validateAuthorization(n = true) {
      var d = this;
      return _async_to_generator$7(function* () {
        (n || d.playbackMode === e.PlaybackMode.FULL_PLAYBACK_ONLY) &&
          ((void 0 !== d._playbackControllerInternal &&
            d._playbackControllerInternal.isReady &&
            d._playbackControllerInternal.isPlaying) ||
            (yield d.authorize()));
      })();
    }
    constructor(n) {
      _define_property$3(this, "app", void 0),
        _define_property$3(this, "capabilities", void 0),
        _define_property$3(this, "context", void 0),
        _define_property$3(this, "_autoplayEnabled", true),
        _define_property$3(this, "id", void 0),
        _define_property$3(this, "prefix", void 0),
        _define_property$3(this, "privateEnabled", true),
        _define_property$3(this, "siriInitiated", true),
        _define_property$3(this, "sourceType", Bt.MUSICKIT),
        _define_property$3(this, "version", e.version),
        _define_property$3(this, "playbackActions", void 0),
        _define_property$3(this, "guid", void 0),
        _define_property$3(this, "_bag", po),
        _define_property$3(this, "_playbackControllers", {}),
        _define_property$3(this, "_playbackControllerInternal", void 0),
        _define_property$3(this, "_services", void 0),
        _define_property$3(this, "_playbackErrorDialog", true),
        _define_property$3(this, "_playbackMode", e.PlaybackMode.MIXED_CONTENT),
        _define_property$3(this, "_whenConfigured", void 0);
      const { developerToken: d } = n;
      if ("string" != typeof d || "" === d.trim())
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          "Missing or empty developer token",
        );
      Object.assign(
        po.features,
        (function (e = []) {
          const n = {};
          return (
            e.forEach((e) => {
              "-" === e.charAt(0)
                ? ((e = e.substr(1)), (n[e] = true))
                : (n[e] = true);
            }),
            n
          );
        })(n.features),
      );
      const p = ba.get();
      p &&
        (it.warn("Overriding bag.features with", p),
        (po.features = _object_spread$3({}, po.features, p))),
        Object.assign(po.autoplay, n.autoplay),
        Object.assign(po.app, n.app),
        Object.assign(po.urls, n.urls),
        (this.context = {});
      const h = n.services;
      (this.capabilities = new Capabilities(h.dispatcher)),
        "playbackActions" in n && (this.playbackActions = n.playbackActions),
        "guid" in n && (this.guid = n.guid);
      const y = new TimingAccuracy(!!po.features["player-accurate-timing"]),
        _ = new BitrateCalculator(h.dispatcher, n.bitrate);
      (this._services = {
        runtime: h.runtime,
        request: h.request,
        dispatcher: h.dispatcher,
        timing: y,
        bitrateCalculator: _,
      }),
        void 0 !== n.playActivityAPI &&
          (this._services.playActivity = new PlayActivityService(
            h.dispatcher,
            n.playActivityAPI,
          )),
        (n.services = this._services),
        this.configureLogger(n);
      const m = (function (e, n) {
        return (yo = new Store(e, n)), yo;
      })(d, n);
      this._services.apiManager = new APIServiceManager(m, h.dispatcher);
      const g = new MediaItemPlayback(this._createPlayerControllerOptions());
      (this._services.mediaItemPlayback = g),
        n.sourceType && (this.sourceType = n.sourceType),
        this._initializeInternalEventHandling(),
        n.bitrate && (this.bitrate = n.bitrate),
        "prefix" in n &&
          /^(?:web|preview)$/.test(n.prefix || "") &&
          (this.prefix = po.prefix = n.prefix),
        n.suppressErrorDialog &&
          (this._playbackErrorDialog = !n.suppressErrorDialog),
        void 0 !== n.playbackMode && (this.playbackMode = n.playbackMode),
        "privateEnabled" in n &&
          (this.privateEnabled = n.privateEnabled || true),
        "siriInitiated" in n && (this.siriInitiated = n.siriInitiated || true),
        (this.id = generateUUID()),
        it.info("MusicKit JS Version: " + this.version),
        it.info("InstanceId", this.id),
        it.debug("Link Parameters", n.linkParameters),
        po.app && it.debug("App", po.app);
    }
  }

  function asyncGeneratorStep$6(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$6(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$6(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$6(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function dispatchDocumentEvent(e) {
    if (detectNodeEnvironment()) return;
    const n = new Event(e, {
      bubbles: true,
      cancelable: true,
    });
    setTimeout(() => document.dispatchEvent(n));
  }

  function _loadWebComponents() {
    return (_loadWebComponents = _async_to_generator$6(function* () {
      var e;
      if (detectNodeEnvironment()) return;
      const n = findScript("musickit.js");
      if (
        "" !==
        (null == n || null === (e = n.dataset) || void 0 === e
          ? void 0
          : e.webComponents)
      )
        return;
      const d = "noModule" in n,
        p = `components/musickit-components/musickit-components${
          d ? ".esm" : ""
        }.js`,
        h = "https:" + cdnBaseURL(p) + p,
        y = {};
      d && (y.type = "module"),
        n.hasAttribute("async") && (y.async = ""),
        n.hasAttribute("defer") && (y.defer = ""),
        yield loadScript(h, y),
        dispatchDocumentEvent(ao.webComponentsLoaded);
    })).apply(this, arguments);
  }

  function asyncGeneratorStep$5(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$5(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$5(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$5(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$2(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$2(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$2(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$2(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  _ts_decorate$1(
    [
      AsyncDebounce(250, {
        isImmediate: true,
      }),
      _ts_metadata$1("design:type", Function),
      _ts_metadata$1("design:paramtypes", [
        "undefined" == typeof ActivityNotificationOptions
          ? Object
          : ActivityNotificationOptions,
      ]),
      _ts_metadata$1("design:returntype", Promise),
    ],
    MKInstance.prototype,
    "pause",
    null,
  ),
    _ts_decorate$1(
      [
        AsyncDebounce(250, {
          isImmediate: true,
        }),
        _ts_metadata$1("design:type", Function),
        _ts_metadata$1("design:paramtypes", []),
        _ts_metadata$1("design:returntype", Promise),
      ],
      MKInstance.prototype,
      "play",
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync("skip"),
        _ts_metadata$1("design:type", Function),
        _ts_metadata$1("design:paramtypes", []),
        _ts_metadata$1("design:returntype", Promise),
      ],
      MKInstance.prototype,
      "skipToNextItem",
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync("skip"),
        _ts_metadata$1("design:type", Function),
        _ts_metadata$1("design:paramtypes", []),
        _ts_metadata$1("design:returntype", Promise),
      ],
      MKInstance.prototype,
      "skipToPreviousItem",
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync("seek"),
        _ts_metadata$1("design:type", Function),
        _ts_metadata$1("design:paramtypes", []),
        _ts_metadata$1("design:returntype", Promise),
      ],
      MKInstance.prototype,
      "seekForward",
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync("seek"),
        _ts_metadata$1("design:type", Function),
        _ts_metadata$1("design:paramtypes", []),
        _ts_metadata$1("design:returntype", Promise),
      ],
      MKInstance.prototype,
      "seekBackward",
      null,
    );
  const Pa = "undefined" != typeof window && "undefined" != typeof document;
  let Sa = true;
  const Ea = [];

  function cleanupInstances() {
    return _cleanupInstances.apply(this, arguments);
  }

  function _cleanupInstances() {
    return (_cleanupInstances = _async_to_generator$5(function* () {
      const e = Ea.map((e) => e.cleanup());
      yield Promise.all(e), Ea.splice(0, Ea.length);
    })).apply(this, arguments);
  }

  function configure$1(e) {
    return _configure$1.apply(this, arguments);
  }

  function _configure$1() {
    return (_configure$1 = _async_to_generator$5(function* (
      e,
      n = MKInstance,
      d,
    ) {
      if (!e)
        throw new MKError(
          MKError.Reason.INVALID_ARGUMENTS,
          "configuration required",
        );
      const p = {};
      e.mergeQueryParams &&
        Pa &&
        window.location &&
        (p.linkParameters = _object_spread$2(
          {},
          e.linkParameters || {},
          parseQueryParams(window.location.href),
        ));
      const h = _object_spread$2(
        {
          runtime: yield RuntimeEnvironment.detect(),
          dispatcher: new PubSub(),
          request: new RequestManager(),
        },
        null == e ? void 0 : e.services,
      );
      yield findKeySystemPreference(h.runtime);
      const y = new n(
        _object_spread_props$2(_object_spread$2({}, e, p), {
          services: h,
        }),
      );
      return (
        Sa || (yield cleanupInstances()),
        d && (yield d(y)),
        Ea.push(y),
        dispatchDocumentEvent(ao.configured),
        y
      );
    })).apply(this, arguments);
  }

  function getInstances() {
    return Ea;
  }
  Pa &&
    (asAsync(
      (function () {
        return _loadWebComponents.apply(this, arguments);
      })(),
    ),
    dispatchDocumentEvent(ao.loaded));
  const Ta = [
    "uploadedVideo",
    "uploadedAudio",
    "uploaded-videos",
    "uploaded-audios",
  ];

  function asyncGeneratorStep$4(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$4(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$4(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$4(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property$1(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread$1(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props$1(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const ka = Je.createChild("paf"),
    asCode = (n) => {
      switch (typeof n) {
        case "string":
          return n;
        case "undefined":
          return "undefined";
        default:
          return "PlayActivityEndReasonType." + e.PlayActivityEndReasonType[n];
      }
    };
  class MPAFTracker {
    get requestedEvents() {
      return Array.from(this.dispatchTable.keys());
    }
    get isConfigured() {
      return void 0 !== this.instance;
    }
    get activityTracker() {
      if (void 0 === this._activityTracker)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          "Play Activity service was called before configuration.",
        );
      return this._activityTracker;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$4(function* () {
        var d, p, h;
        (n.instance = e.instance),
          (n.services = e.services),
          (n._activityTracker =
            ((d = e.instance),
            (p = {
              runtime: e.services.runtime,
              request: e.services.request,
            }),
            new PlayActivity(
              d.developerToken,
              d.musicUserToken,
              d.storefrontCountryCode,
              {
                app: {
                  build: po.app.build,
                  name: null !== (h = po.app.name) && void 0 !== h ? h : "",
                  version: po.app.version,
                },
                fetch: p.request.fetch,
                isQA: wa.enabled,
                logInfo: ka.enabled,
                sourceType: d.sourceType,
                guid: d.guid,
                userIsSubscribed: () =>
                  !(
                    !d.isAuthorized ||
                    !yo.storekit._getIsActiveSubscription.getCachedValue()
                  ),
              },
            )));
      })();
    }
    handleEvent(e, n, d) {
      if (!this.shouldTrackPlayActivity(e, d)) return;
      const p = this.dispatchTable.get(e);
      void 0 !== p && "function" == typeof this[p] && this[p](d, n);
    }
    activate(e, n = {}) {
      return this.activityTracker.activate(n.flush);
    }
    exit(e, n = {}) {
      return (
        ka.debug("PAF debug", `client.exit(${n.position})`),
        this.activityTracker.exit(n.position)
      );
    }
    pause(e, n = {}) {
      return "number" == typeof n.endReasonType
        ? (ka.debug(
            "PAF debug",
            `client.stop(${n.position}, ${n.endReasonType})`,
          ),
          this.activityTracker.stop(n.position, n.endReasonType))
        : (ka.debug("PAF debug", `client.pause(${n.position})`),
          this.activityTracker.pause(n.position));
    }
    play(e, n = {}) {
      const d = generateItemDescriptorForPAF(gt.playbackPlay, this.instance, e);
      isLiveRadioKind(e, "video") &&
        (this.musicLiveVideoStartTime = Date.now()),
        ka.debug(
          "PAF debug",
          `client.play(${JSON.stringify(d)}, ${n.position})`,
        ),
        this.activityTracker.play(d, n.position),
        (this.playReported = true);
    }
    scrub(e, n = {}) {
      return (
        ka.debug(
          "PAF debug",
          `client.scrub(${n.position}, ${asCode(n.endReasonType)})`,
        ),
        this.activityTracker.scrub(n.position, n.endReasonType)
      );
    }
    seek(n, d = {}) {
      var p = this;
      return _async_to_generator$4(function* () {
        yield p.scrub(n, {
          position: d.startPosition,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_BEGIN,
        }),
          yield p.scrub(n, {
            position: d.position,
            endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
          });
      })();
    }
    skip(e, n = {}) {
      var d = this;
      return _async_to_generator$4(function* () {
        const p = generateItemDescriptorForPAF(gt.playbackSkip, d.instance, e);
        ka.debug(
          "PAF debug",
          `client.skip(${JSON.stringify(p)}, ${asCode(n.direction)}, ${
            n.position
          })`,
        );
        try {
          yield d.activityTracker.skip(p, n.direction, n.position);
        } catch (Vt) {
          if (
            "A play stop() method was called without a previous play() descriptor" !==
            Vt.message
          )
            return Promise.reject(Vt);
          yield d.play(e, n);
        }
      })();
    }
    stop(n, d = {}) {
      var p;
      (isLiveRadioKind(n, "video")
        ? ((d.position = (Date.now() - this.musicLiveVideoStartTime) / 1e3),
          (this.musicLiveVideoStartTime = 0))
        : (null == n ? void 0 : n.isLiveRadioStation) &&
          d.position &&
          (d.position = d.position - (d.startPosition || 0)),
      null == n ? void 0 : n.isLiveRadioStation) &&
        (d.endReasonType =
          null !== (p = d.endReasonType) && void 0 !== p
            ? p
            : e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED);
      return (
        ka.debug(
          "PAF debug",
          `client.stop(${d.position}, ${asCode(d.endReasonType)})`,
        ),
        this.activityTracker.stop(d.position, d.endReasonType)
      );
    }
    timedMetadata(e, n) {
      var d = this;
      return _async_to_generator$4(function* () {
        var p, h;
        if (
          void 0 === e ||
          void 0 === n ||
          void 0 === n.position ||
          void 0 ===
            (null === (p = n.metadata) || void 0 === p ? void 0 : p.blob)
        )
          return;
        if (!e.isRadioEpisode)
          return void ka.debug(
            `Ignoring TimedMetadata ping at ${n.position}, not a Radio Episode`,
          );
        const y = null === (h = n.metadata) || void 0 === h ? void 0 : h.blob,
          _ = d.activityTracker.timedMetadata;
        ka.debug("Storing TimedMetadata ping at " + n.position),
          d.activityTracker.setTimedMetadata(y, n.position),
          d.playReported || void 0 === y
            ? ((void 0 !== y && void 0 === _) || !compareUint8Array(y, _)) &&
              (ka.debug("Sending TimedMetadata ping at " + n.position),
              d.activityTracker.pingTimedMetadata(n.position, y))
            : ka.debug("Play not reported, skipping TimeMetadata ping");
      })();
    }
    shouldTrackPlayActivity(n, d) {
      const p = hasAuthorization(),
        h = !d || d.playbackType !== e.PlaybackType.preview,
        y = this.alwaysSendForActivityType(n),
        _ = !d || (d && this.mediaRequiresPlayActivity(d));
      return !(!p || !h || (!y && !_));
    }
    alwaysSendForActivityType(e) {
      return e === gt.playerActivate || e === gt.playerExit;
    }
    mediaRequiresPlayActivity(e) {
      return (
        (void 0 !== (n = e.type) && Ta.includes(n)) ||
        -1 !==
          ["musicMovie", "musicVideo", "song", "radioStation"].indexOf(e.type)
      );
    }
    constructor() {
      _define_property$1(this, "instance", void 0),
        _define_property$1(this, "services", void 0),
        _define_property$1(this, "_activityTracker", void 0),
        _define_property$1(this, "playReported", true),
        _define_property$1(this, "musicLiveVideoStartTime", 0),
        _define_property$1(
          this,
          "dispatchTable",
          new Map([
            [gt.playbackPlay, "play"],
            [gt.playbackPause, "pause"],
            [gt.playbackScrub, "scrub"],
            [gt.playbackSeek, "seek"],
            [gt.playbackSkip, "skip"],
            [gt.playbackStop, "stop"],
            [gt.playerActivate, "activate"],
            [gt.playerExit, "exit"],
            [gt.timedMetadata, "timedMetadata"],
          ]),
        );
    }
  }

  function generateItemDescriptorForPAF(n, d, p) {
    const h = _object_spread_props$1(
      _object_spread$1(
        {},
        (function (n, d, p) {
          if (
            void 0 === (null == p ? void 0 : p.playbackActions) ||
            void 0 === d
          )
            return {};
          const h = {
              [e.PlayerRepeatMode.all]: Ct.REPEAT_ALL,
              [e.PlayerRepeatMode.none]: Ct.REPEAT_OFF,
              [e.PlayerRepeatMode.one]: Ct.REPEAT_ONE,
            },
            y = {
              [e.PlayerShuffleMode.off]: Mt.SHUFFLE_OFF,
              [e.PlayerShuffleMode.songs]: Mt.SHUFFLE_ON,
            };
          return {
            playMode() {
              let n = Ct.REPEAT_UNKNOWN,
                d = Mt.SHUFFLE_UNKNOWN,
                _ = Dt.AUTO_UNKNOWN;
              const { playbackActions: m } = p;
              var g;
              return (
                m &&
                  (m.includes(e.PlaybackActions.REPEAT) &&
                    (n = h[p.repeatMode]),
                  m.includes(e.PlaybackActions.SHUFFLE) &&
                    (d = y[p.shuffleMode]),
                  m.includes(e.PlaybackActions.AUTOPLAY) &&
                    (_ = p.autoplayEnabled
                      ? (g = p.queue).hasAutoplayStation &&
                        g.items.some((e) => {
                          const { id: n, type: d, container: p } = e;
                          if (p && "stations" === p.type && p.name === St.RADIO)
                            return true;
                          const h = normalizeTypeForAutoplay(n, d);
                          return isAutoplaySupportedForType(h);
                        })
                        ? Dt.AUTO_ON
                        : Dt.AUTO_ON_CONTENT_UNSUPPORTED
                      : Dt.AUTO_OFF)),
                {
                  repeatPlayMode: n,
                  shufflePlayMode: d,
                  autoplayMode: _,
                }
              );
            },
          };
        })(0, p, d),
        (function (e, n) {
          var d;
          if (!typeRequiresItem(e)) return {};
          if (void 0 === n) return {};
          const p =
            null === (d = n.attributes) || void 0 === d ? void 0 : d.mediaKind;
          return _object_spread$1(
            {},
            void 0 !== p
              ? {
                  mediaType: p,
                }
              : {},
            n.playParams,
          );
        })(n, p),
        (function (e, n) {
          if (!typeRequiresItem(e) || void 0 === n) return {};
          const { context: d = {} } = n;
          return {
            recoData: d.reco_id,
          };
        })(n, p),
        (function (e, n) {
          if (!typeRequiresItem(e) || void 0 === n) return {};
          const d = n.playbackDuration;
          if (!d) return {};
          return {
            duration: d / 1e3,
          };
        })(n, p),
        (function (e, n) {
          var d, p, h, y;
          const _ = (function (e, n) {
              var d;
              return (
                (itemIsRequired(e, n) &&
                  (null == n || null === (d = n.container) || void 0 === d
                    ? void 0
                    : d.name)) ||
                null
              );
            })(e, n),
            m = itemIsRequired(e, n)
              ? _object_spread$1(
                  {},
                  null == n ? void 0 : n.container,
                  null == n ||
                    null === (p = n.container) ||
                    void 0 === p ||
                    null === (d = p.attributes) ||
                    void 0 === d
                    ? void 0
                    : d.playParams,
                  (null == n ||
                  null === (y = n.container) ||
                  void 0 === y ||
                  null === (h = y.attributes) ||
                  void 0 === h
                    ? void 0
                    : h.hasCollaboration) && {
                    isCollaborative: true,
                  },
                )
              : null;
          if (null === _ && null === m) return;
          return {
            container: cleanContainer(
              _object_spread$1(
                {},
                m,
                null !== _
                  ? {
                      name: _,
                    }
                  : {},
              ),
            ),
          };
        })(n, p),
      ),
      {
        trackInfo: null == p ? void 0 : p.trackInfo,
      },
    );
    return ka.trace("PAF descriptor", h), h;
  }
  const wa = BooleanDevFlag.register("mk-use-paf-qa-endpoint");
  const typeRequiresItem = (e) =>
      [gt.playbackPlay, gt.playbackSkip].includes(e),
    itemIsRequired = (e, n) => void 0 !== n && typeRequiresItem(e);

  function cleanContainer(e) {
    const n = _object_spread$1({}, e);
    return delete n.attributes, n;
  }

  function asyncGeneratorStep$3(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$3(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$3(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$3(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _define_property(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        : (e[n] = d),
      e
    );
  }

  function _object_spread(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      "function" == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property(e, n, d[n]);
        });
    }
    return e;
  }

  function _object_spread_props(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const Oa = Je.createChild("lyrics");
  class LyricsTracker {
    get requestedEvents() {
      return Array.from(this.dispatchTable.keys());
    }
    get activityTracker() {
      if (void 0 === this.instance || void 0 === this.services)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          "Lyrics Play Activity service was called before configuration.",
        );
      var e, n, d;
      return (
        void 0 === this._activityTracker &&
          (this._activityTracker =
            ((e = this.instance),
            (n = {
              runtime: this.services.runtime,
              request: this.services.request,
            }),
            new LyricsPlayActivity(
              e.developerToken,
              e.musicUserToken,
              e.storefrontCountryCode,
              {
                app: {
                  build: po.app.build,
                  name: null !== (d = po.app.name) && void 0 !== d ? d : "",
                  version: po.app.version,
                },
                fetch: n.request.fetch,
                logInfo: Oa.level <= Se.INFO,
                sourceType: e.sourceType,
                isQA: Ia.enabled,
                userIsSubscribed: () =>
                  e.isAuthorized &&
                  yo.storekit._getIsActiveSubscription.getCachedValue(),
              },
            ))),
        this._activityTracker
      );
    }
    get isConfigured() {
      return void 0 !== this.instance;
    }
    static configure(e) {
      var n = this;
      return _async_to_generator$3(function* () {
        const d = new n();
        return d.configure(e), d;
      })();
    }
    configure(e) {
      var n = this;
      return _async_to_generator$3(function* () {
        (n.instance = e.instance), (n.services = e.services);
      })();
    }
    handleEvent(e, n, d) {
      const p = this.dispatchTable.get(e);
      void 0 !== p && "function" == typeof this[p] && this[p](d, n);
    }
    lyricsPlay(e, n) {
      var d = this;
      return _async_to_generator$3(function* () {
        const p = null == n ? void 0 : n.lyrics;
        if (void 0 === p)
          throw new MKError(
            MKError.Reason.MEDIA_DESCRIPTOR,
            "Key lyrics is missing from descriptor provided to lyricsPlay",
          );
        if (void 0 === e)
          throw new MKError(
            MKError.Reason.MEDIA_DESCRIPTOR,
            "Cannot display lyrics without a MediaItem",
          );
        d.activityTracker.play(
          (function (e, n, d) {
            var p, h, y, _;
            return _object_spread_props(
              _object_spread(
                {
                  id: n.id,
                  duration: 0,
                  eventType: jt.LYRIC_DISPLAY,
                  container: _object_spread(
                    {},
                    n.container,
                    null === (h = n.container) ||
                      void 0 === h ||
                      null === (p = h.attributes) ||
                      void 0 === p
                      ? void 0
                      : p.playParams,
                  ),
                },
                n.playParams,
              ),
              {
                lyricDescriptor: {
                  id: null !== (_ = d.id) && void 0 !== _ ? _ : n.id,
                  displayType: d.displayType,
                  language: d.language,
                },
                trackInfo: n.trackInfo,
                recoData:
                  null === (y = n.attributes) || void 0 === y
                    ? void 0
                    : y.reco_id,
              },
            );
          })(gt.lyricsPlay, e, p),
        );
      })();
    }
    lyricsStop(e, n) {
      var d = this;
      return _async_to_generator$3(function* () {
        d.activityTracker.stop();
      })();
    }
    exit(e, n) {
      var d = this;
      return _async_to_generator$3(function* () {
        d.activityTracker.exit();
      })();
    }
    constructor() {
      _define_property(
        this,
        "dispatchTable",
        new Map([
          [gt.lyricsPlay, "lyricsPlay"],
          [gt.lyricsStop, "lyricsStop"],
          [gt.playerExit, "exit"],
        ]),
      ),
        _define_property(this, "instance", void 0),
        _define_property(this, "services", void 0),
        _define_property(this, "_activityTracker", void 0);
    }
  }
  const Ia = BooleanDevFlag.register("mk-use-paf-qa-endpoint");

  function asyncGeneratorStep$2(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$2(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$2(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$2(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function _ts_metadata(e, n) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class MusicKitInstance extends MKInstance {
    addToLibrary(e, n) {
      var d = this;
      return _async_to_generator$2(function* () {
        let p;
        return (
          yield d.authorize(),
          n || (n = /[a-z]{2}\.[a-z0-9\-]+/i.test(e) ? "playlists" : "albums"),
          d.api.music &&
            (p = d.api.music(
              "/v1/me/library",
              {
                [`ids[${n}]`]: e,
              },
              {
                fetchOptions: {
                  method: "POST",
                },
              },
            )),
          p
        );
      })();
    }
    changeToMediaItem(e) {
      var n = this,
        _superprop_get_changeToMediaItem = () => super.changeToMediaItem;
      return _async_to_generator$2(function* () {
        return (
          n.assertUserStorefront(),
          _superprop_get_changeToMediaItem().call(n, e)
        );
      })();
    }
    play() {
      var e = this,
        _superprop_get_play = () => super.play;
      return _async_to_generator$2(function* () {
        return e.assertUserStorefront(), _superprop_get_play().call(e);
      })();
    }
    playMediaItem(e, n) {
      var d = this,
        _superprop_get_playMediaItem = () => super.playMediaItem;
      return _async_to_generator$2(function* () {
        if (d._isPlaybackSupported())
          return (
            d.assertUserStorefront(),
            _superprop_get_playMediaItem().call(d, e, n)
          );
      })();
    }
    _isStationQueueOptions(e) {
      return !(
        !((e) =>
          !!e &&
          (!!isIdentityQueue(e) ||
            !!isQueueURLOption(e) ||
            Object.keys(Bo).some((n) => void 0 !== e[n])))(
          (e = parseQueueURLOption(e)),
        ) ||
        ((e) => {
          if (!e) return true;
          if (isQueueURLOption(e)) return true;
          if (isQueueItems(e)) return true;
          return Object.keys(Wo)
            .concat(Object.keys(zo))
            .some((n) => void 0 !== e[n]);
        })(e)
      );
    }
    setStationQueue(e) {
      var n = this,
        _superprop_get__validateAuthorization = () =>
          super._validateAuthorization;
      return _async_to_generator$2(function* () {
        if (!n._isPlaybackSupported())
          return void it.warn("Playback is not supported");
        n._signalChangeItemIntent(),
          n.deferPlayback(),
          yield n._updatePlaybackController(
            n._getPlaybackControllerByType(Co.continuous),
          ),
          yield _superprop_get__validateAuthorization().call(n, true),
          (e = parseQueueURLOption(e));
        const d = n._playbackController.setQueue(e);
        return (
          void 0 !== e.autoplay &&
            (deprecationWarning("autoplay", {
              message: "autoplay has been deprecated, use startPlaying instead",
            }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield n.play()),
          d
        );
      })();
    }
    setQueue(e) {
      var n = this;
      return _async_to_generator$2(function* () {
        if (
          (it.debug("instance.setQueue()", e),
          n.assertUserStorefront(),
          !n._isPlaybackSupported())
        )
          return void it.warn("Playback is not supported");
        if (n._isStationQueueOptions(e))
          return (
            it.warn(
              "setQueue options contained a station queue request. Changing to setStationQueue mode.",
            ),
            n.setStationQueue(e)
          );
        n._signalChangeItemIntent(),
          n.deferPlayback(),
          yield n._updatePlaybackController(
            n._getPlaybackControllerByType(Co.serial),
          );
        const d = yield n._playbackController.setQueue(e);
        return (
          void 0 !== e.repeatMode &&
            (n._playbackController.repeatMode = e.repeatMode),
          void 0 !== e.autoplay &&
            (deprecationWarning("autoplay", {
              message: "autoplay has been deprecated, use startPlaying instead",
            }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield n.play()),
          d
        );
      })();
    }
    assertUserStorefront() {
      const n = yo.storekit.storefrontCountryCode,
        d = yo.storefrontId,
        p = void 0 !== n && n !== d;
      if (this.realm === e.SKRealm.MUSIC && !this.previewOnly && !0 === p)
        throw new MKError(MKError.Reason.CONTENT_EQUIVALENT);
    }
    playNext(e, n = true) {
      var d = this;
      return _async_to_generator$2(function* () {
        if (d._isPlaybackSupported())
          return d._playbackController.queue
            ? (d.deferPlayback(),
              d._playbackController.prependToQueue(e, {
                clear: n,
              }))
            : d.setQueue(e);
        it.warn("Playback is not supported");
      })();
    }
    playLater(e) {
      var n = this;
      return _async_to_generator$2(function* () {
        if (n._isPlaybackSupported())
          return n._playbackController.queue
            ? (n.deferPlayback(), n._playbackController.appendToQueue(e))
            : n.setQueue(e);
        it.warn("Playback is not supported");
      })();
    }
    playAt(e, n) {
      var d = this;
      return _async_to_generator$2(function* () {
        if (d._isPlaybackSupported())
          return d._playbackController.queue
            ? (d.deferPlayback(), d._playbackController.insertInQueue(n, e))
            : d.setQueue(n);
        it.warn("Playback is not supported");
      })();
    }
    clearQueue() {
      var e = this;
      return _async_to_generator$2(function* () {
        return (
          e._mediaItemPlayback.clearNextManifest(),
          e._playbackController.clearQueue()
        );
      })();
    }
  }
  var Aa;

  function asyncGeneratorStep$1(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator$1(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep$1(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep$1(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      (e, n, d) => {
        const p = d.value;
        return (
          (d.value = function (...e) {
            if (!this.isInSharePlay) return p.apply(this, e);
            Aa && this.services.dispatcher.publish(Aa);
          }),
          d
        );
      },
      _ts_metadata("design:type", Function),
      _ts_metadata("design:paramtypes", [
        Number,
        "undefined" == typeof SerialQueueOptions ? Object : SerialQueueOptions,
      ]),
      _ts_metadata("design:returntype", Promise),
    ],
    MusicKitInstance.prototype,
    "playAt",
    null,
  );

  function loadLinksData() {
    return _loadLinksData.apply(this, arguments);
  }

  function _loadLinksData() {
    return (_loadLinksData = _async_to_generator$1(function* () {
      const e = [
        {
          feature: "album-song",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/albums?/(?:[^/]+/)?(?<album>\\d+)$",
          requiredQueryParams: {
            i: "(?<identifier>\\d+)",
          },
          mediaAPI: {
            resources: ["songs"],
          },
        },
        {
          feature: "albums",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/albums?/(?:[^/]+/)?(?<identifier>\\d+)$",
          mediaAPI: {
            resources: ["albums"],
          },
        },
        {
          feature: "algo-stations",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/stations?/(?:[^/]+/)?(?<identifier>(?:ra|st).\\d+)",
          mediaAPI: {
            resources: ["stations"],
          },
        },
        {
          feature: "artist-default-playable-content",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/artists?/(?:[^/]+/)?(?<identifier>\\d+)$",
          mediaAPI: {
            resources: ["artists", "default-playable-content"],
          },
        },
        {
          feature: "genre-stations",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/genre-stations?",
          mediaAPI: {
            resources: ["stations"],
            parameterMapping: {
              genres: "filter[genres]",
              eras: "filter[eras]",
              tags: "filter[tags]",
              moods: "filter[moods]",
            },
          },
        },
        {
          feature: "library-albums",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/library/albums?/(?:[^/]+/)?(?<identifier>(?:l).[a-zA-Z0-9-]+)$",
          mediaAPI: {
            resources: ["albums"],
          },
        },
        {
          feature: "library-album-song",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/library/albums?/(?:[^/]+/)?(?<album>(?:l).[a-zA-Z0-9-]+)$",
          requiredQueryParams: {
            i: "(?<identifier>i\\.[a-zA-Z0-9-]+)",
          },
          mediaAPI: {
            resources: ["songs"],
          },
        },
        {
          feature: "library-playlists",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/library/playlists?/(?:[^/]+/)?(?<identifier>(?:p).[a-zA-Z0-9-]+)$",
          mediaAPI: {
            resources: ["playlists"],
          },
        },
        {
          feature: "music-videos",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/music-videos?/(?:[^/]+/)?(?<identifier>\\d+)$",
          mediaAPI: {
            resources: ["musicVideos"],
          },
        },
        {
          feature: "personal-general-radio",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/stations?/me$",
          mediaAPI: {
            resources: ["stations"],
            parameters: {
              "filter[identity]": "personal",
            },
          },
        },
        {
          feature: "personal-mixes",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/(?:personal-)?mix/(?:[^/]+/)?(?<identifier>mx.(?:\\d{1,2}|rp-\\d{4}))$",
          mediaAPI: {
            resources: ["playlists"],
          },
        },
        {
          feature: "playlists",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/playlists?/(?:[^/]+/)?(?<identifier>(?:pl).[a-zA-Z0-9-]+)$",
          mediaAPI: {
            resources: ["playlists"],
          },
        },
        {
          feature: "song",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/songs?/(?:[^/]+/)?(?<identifier>\\d+)$",
          mediaAPI: {
            resources: ["songs"],
          },
        },
        {
          feature: "steering-request",
          regex:
            "http(?:s)?://(?<realm>itunes|music).apple.com/me/stations?/change-station/?$",
          mediaAPI: {
            resources: ["stations"],
          },
        },
      ].map(
        (e) => (
          (e.regex = new RegExp(e.regex)),
          e.requiredQueryParams &&
            (e.requiredQueryParams = Object.keys(e.requiredQueryParams).reduce(
              (n, d) => ((n[d] = new RegExp(e.requiredQueryParams[d])), n),
              {},
            )),
          e
        ),
      );
      return Promise.resolve(e);
    })).apply(this, arguments);
  }

  function meetsLinkRequirements(e, n, d = {}) {
    const [p] = e.split(/\?|\#|\&/),
      h = n.regex.test(p);
    return h && n.requiredQueryParams
      ? Object.keys(n.requiredQueryParams).every((e) => {
          const p = d[e];
          return n.requiredQueryParams[e].test(p);
        })
      : h;
  }

  function filterLinks(e) {
    return _filterLinks.apply(this, arguments);
  }

  function _filterLinks() {
    return (_filterLinks = _async_to_generator$1(function* (e) {
      const n = yield loadLinksData(),
        d = parseQueryParams(e);
      return n.reduce((n, p) => {
        if (meetsLinkRequirements(e, p, d)) {
          if (n.length > 0)
            if (p.requiredQueryParams)
              n = n.filter((e) => e.requiredQueryParams);
            else if (n.some((e) => e.requiredQueryParams)) return n;
          p.requiredQueryParams
            ? (p.mediaAPI.parameters = Object.keys(
                p.requiredQueryParams,
              ).reduce((e, n) => ((e[n] = d[n]), e), {}))
            : p.mediaAPI.parameterMapping &&
              (p.mediaAPI.parameters = transform$9(
                p.mediaAPI.parameterMapping,
                d,
                true,
              )),
            n.push(p);
        }
        return n;
      }, []);
    })).apply(this, arguments);
  }

  function _resolveCanonical() {
    return (_resolveCanonical = _async_to_generator$1(function* (e) {
      return {
        results: {
          links: yield filterLinks(e),
        },
        meta: {
          originalUrl: e,
          originalQueryParams: parseQueryParams(e),
        },
      };
    })).apply(this, arguments);
  }

  function asyncGeneratorStep(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (V) {
      return void d(V);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }

  function _async_to_generator(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);

        function _next(e) {
          asyncGeneratorStep(y, p, h, _next, _throw, "next", e);
        }

        function _throw(e) {
          asyncGeneratorStep(y, p, h, _next, _throw, "throw", e);
        }
        _next(void 0);
      });
    };
  }

  function configure(e) {
    return _configure.apply(this, arguments);
  }

  function _configure() {
    return (_configure = _async_to_generator(function* (e) {
      it.linkChild(Je),
        it.linkChild(Qe),
        it.linkChild(Re),
        it.linkChild(Xe),
        (e.playActivityAPI = [new MPAFTracker(), new LyricsTracker()]);
      let n = MusicKitInstance;
      return yield configure$1(
        e,
        n,
        (function () {
          var n = _async_to_generator(function* (n) {
            let d = {
              apiType: ta.MEDIA_API,
              options: {},
            };
            yield n.configure([d]),
              e.declarativeMarkup &&
                "undefined" != typeof console &&
                console.warn &&
                console.warn(
                  "The declarativeMarkup configuration option has been removed in MusicKit JS V3",
                );
          });
          return function (e) {
            return n.apply(this, arguments);
          };
        })(),
      );
    })).apply(this, arguments);
  }
  if (Pa) {
    const e = (function () {
        function meta(e) {
          if (detectNodeEnvironment()) return;
          const n = document.head.querySelector(`meta[name=${e}]`);
          return (null == n ? void 0 : n.content) || void 0;
        }
        const e = meta("apple-music-developer-token") || meta("JWT"),
          n = meta("apple-music-app-build") || meta("version"),
          d = meta("apple-music-app-name"),
          p = meta("apple-music-app-version");
        let h;
        return (
          (e || n || d || p) &&
            ((h = {}),
            e && (h.developerToken = e),
            (n || d || p) &&
              ((h.app = {}),
              n && (h.app.build = n),
              d && (h.app.name = d),
              p && (h.app.version = p))),
          h
        );
      })(),
      n = /interactive|complete|loaded/.test(document.readyState);
    e &&
      e.developerToken &&
      0 === getInstances().length &&
      (n
        ? asAsync(configure(e))
        : document.addEventListener("DOMContentLoaded", () => configure(e)));
  }
  (e.Events = ao),
    (e.MKError = MKError),
    (e.MediaItem = MediaItem),
    (e.VideoTypes = {
      movie: true,
      musicVideo: true,
      musicMovie: true,
      trailer: true,
      tvEpisode: true,
      uploadedVideo: true,
      "uploaded-videos": true,
      "music-videos": true,
      "music-movies": true,
      "tv-episodes": true,
      Bonus: true,
      Extra: true,
      Episode: true,
      Movie: true,
      Preview: true,
      Promotional: true,
      Season: true,
      Show: true,
      Vod: true,
      EditorialVideoClip: true,
      RealityVideo: true,
      SportingEvent: true,
      LiveService: true,
    }),
    (e.configure = configure),
    (e.enableMultipleInstances = function () {
      Sa = true;
    }),
    (e.formatArtworkURL = formatArtworkURL),
    (e.formatMediaTime = function (e, n = ":") {
      const { hours: d, minutes: p } = formattedSeconds(e);
      e = Math.floor((e % 3600) % 60);
      const h = [];
      return (
        d
          ? (h.push("" + d), h.push(p < 10 ? "0" + p : "" + p))
          : h.push("" + p),
        h.push(e < 10 ? "0" + e : "" + e),
        h.join(n)
      );
    }),
    (e.formattedMediaURL = formattedMediaURL),
    (e.formattedMilliseconds = function (e) {
      return formattedSeconds(e / 1e3);
    }),
    (e.formattedSeconds = formattedSeconds),
    (e.generateEmbedCode = function (
      e,
      n = {
        height: "450",
        width: "660",
      },
    ) {
      if (!p.test(e)) throw new Error("Invalid content url");
      var d;
      let _ = null !== (d = n.height) && void 0 !== d ? d : "450";
      var m;
      let g = null !== (m = n.width) && void 0 !== m ? m : "660";
      const { kind: b, isUTS: P } = formattedMediaURL(e),
        S = "post" === b || "musicVideo" === b || P;
      "song" === b || "episode" === b
        ? (_ = "175")
        : S && (_ = "" + Math.round(0.5625 * parseInt(g, 10))),
        (_ = ("" + _).replace(/(\d+)px/i, "$1")),
        (g = ("" + g).replace(/^(\d+)(?!px)%?$/i, "$1px"));
      const E =
        (S ? "width:" + g : "width:100%;" + (g ? "max-width:" + g : "")) +
        ";overflow:hidden;border-radius:10px;";
      return `<iframe ${[
        `allow="${y.join("; ")}"`,
        'frameborder="0"',
        _ ? `height="${_}"` : "",
        `style="${E}"`,
        `sandbox="${h.join(" ")}"`,
        `src="${e.replace(p, "https://embed.music.apple.com")}"`,
      ].join(" ")}></iframe>`;
    }),
    (e.getHlsJsCdnConfig = getHlsJsCdnConfig),
    (e.getInstance = function (e) {
      if (0 !== Ea.length)
        return void 0 === e ? Ea[Ea.length - 1] : Ea.find((n) => n.id === e);
    }),
    (e.getInstances = getInstances),
    (e.getPlayerType = function (e) {
      var n, d;
      return (null == e ? void 0 : e.isUTS) ||
        Y.includes(null == e ? void 0 : e.type)
        ? "video"
        : null !==
              (d =
                null == e || null === (n = e.attributes) || void 0 === n
                  ? void 0
                  : n.mediaKind) && void 0 !== d
          ? d
          : "audio";
    }),
    (e.resolveCanonical = function (e) {
      return _resolveCanonical.apply(this, arguments);
    }),
    Object.defineProperty(e, "__esModule", {
      value: true,
    });
});
