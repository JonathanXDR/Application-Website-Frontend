<template>
  <div
    id="replay-container"
    language="en-US"
    class="replay-container svelte-1qkt9rr"
    dir="ltr"
    lang="en-US"
    style="--replay-vh: 934px; --replay-vw: 884px; --replay-full-height: 934px"
  >
    <div class="default-landing-screen no-scroll svelte-mwrat4 embedded">
      <div
        class="animated-landing-wrapper svelte-7qrmk3"
        data-testid="animated-landing"
      >
        <canvas
          id="splash"
          width="800"
          height="800"
          class="skottie-bg animated-landing fade-in"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  box-sizing: border-box;
}
abbr,
blockquote,
body,
button,
dd,
dl,
dt,
fieldset,
figure,
form,
h1,
h2,
h3,
h4,
h5,
h6,
hgroup,
input,
legend,
li,
ol,
p,
pre,
ul {
  margin: 0;
  padding: 0;
}
address,
caption,
code,
figcaption,
pre,
th {
  font-size: 1em;
  font-style: normal;
  font-weight: 400;
}
fieldset,
iframe {
  border: 0;
}
caption,
th {
  text-align: start;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
audio,
canvas,
progress,
video {
  vertical-align: baseline;
}
button {
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: inherit;
  vertical-align: inherit;
}
button:disabled {
  cursor: default;
}
:focus-visible {
  outline: 4px solid var(--sk-focus-color, rgba(var(--keyColor-rgb), 0.6));
  outline-offset: var(--sk-focus-offset, 1px);
}
::-moz-focus-inner {
  border: 0;
  padding: 0;
}
*,
:after,
:before {
  box-sizing: inherit;
}
a,
blockquote,
body,
code,
dd,
div,
dl,
dt,
embed,
fieldset,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
html,
img,
legend,
li,
ol,
p,
pre,
section,
table,
td,
th,
ul {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
[contenteditable] {
  -webkit-user-select: auto !important;
  -moz-user-select: auto !important;
  user-select: auto !important;
}
ul {
  list-style-type: none;
}
svg {
  pointer-events: none;
}
:host {
  --keyline-border-style: 0.5px solid var(--labelDivider);
}
:host {
  --systemRed: #ff3b30;
  --systemRed-vibrant: #f53126;
  --systemRed-default_IC: #d70015;
  --systemRed-vibrant_IC: #c20618;
  --systemOrange: #ff9500;
  --systemOrange-vibrant: #f58b00;
  --systemOrange-default_IC: #c93400;
  --systemOrange-vibrant_IC: #ad3a00;
  --systemYellow: #fc0;
  --systemYellow-vibrant: #f5c200;
  --systemYellow-default_IC: #a05a00;
  --systemYellow-vibrant_IC: #925100;
  --systemGreen: #28cd41;
  --systemGreen-vibrant: #1ec337;
  --systemGreen-default_IC: #007d1b;
  --systemGreen-vibrant_IC: #007018;
  --systemMint: #00c7be;
  --systemMint-vibrant: #00bdb4;
  --systemMint-default_IC: #0c817b;
  --systemMint-vibrant_IC: #0b7570;
  --systemTeal: #59adc4;
  --systemTeal-vibrant: #2ea7bd;
  --systemTeal-default_IC: #008299;
  --systemTeal-vibrant_IC: #00778c;
  --systemCyan: #55bef0;
  --systemCyan-vibrant: #41afdc;
  --systemCyan-default_IC: #0071a4;
  --systemCyan-vibrant_IC: #006796;
  --systemBlue: #007aff;
  --systemBlue-vibrant: #0070f5;
  --systemBlue-default_IC: #0040dd;
  --systemBlue-vibrant_IC: #0040dd;
  --systemBlue-rollover: #0045b7;
  --systemBlue-pressed: #005cd7;
  --systemBlue-deepPressed: #0045b7;
  --systemBlue-disabled: rgba(0, 122, 255, 0.35);
  --systemIndigo: #5856d6;
  --systemIndigo-vibrant: #5452cc;
  --systemIndigo-default_IC: #3634a3;
  --systemIndigo-vibrant_IC: #3634a3;
  --systemPurple: #af52de;
  --systemPurple-vibrant: #9f4bc9;
  --systemPurple-default_IC: #ad44ab;
  --systemPurple-vibrant_IC: #ad44ab;
  --systemPink: #ff2d55;
  --systemPink-vibrant: #f5234b;
  --systemPink-default_IC: #d30f45;
  --systemPink-vibrant_IC: #c11032;
  --systemBrown: #a2845e;
  --systemBrown-vibrant: #987a54;
  --systemBrown-default_IC: #7f6545;
  --systemBrown-vibrant_IC: #775d3b;
  --systemGray: #8e8e93;
  --systemGray-vibrant: #848489;
  --systemGray-default_IC: #69696e;
  --systemGray-vibrant_IC: #616165;
  --systemPrimary: rgba(0, 0, 0, 0.85);
  --systemPrimary-vibrant: #4c4c4c;
  --systemPrimary-onLight: rgba(0, 0, 0, 0.85);
  --systemPrimary-onDark: hsla(0, 0%, 100%, 0.85);
  --systemPrimary-default_IC: #000;
  --systemPrimary-vibrant_IC: #000;
  --systemPrimary-onLight_IC: #000;
  --systemPrimary-onDark_IC: #fff;
  --systemSecondary: rgba(0, 0, 0, 0.5);
  --systemSecondary-vibrant: grey;
  --systemSecondary-onLight: rgba(0, 0, 0, 0.5);
  --systemSecondary-onDark: hsla(0, 0%, 100%, 0.55);
  --systemSecondary-default_IC: rgba(0, 0, 0, 0.76);
  --systemSecondary-vibrant_IC: rgba(0, 0, 0, 0.76);
  --systemSecondary-onLight_IC: rgba(0, 0, 0, 0.76);
  --systemSecondary-onDark_IC: hsla(0, 0%, 100%, 0.7);
  --systemTertiary: rgba(0, 0, 0, 0.25);
  --systemTertiary-vibrant: #bfbfbf;
  --systemTertiary-onLight: rgba(0, 0, 0, 0.25);
  --systemTertiary-onDark: hsla(0, 0%, 100%, 0.25);
  --systemTertiary-default_IC: rgba(0, 0, 0, 0.56);
  --systemTertiary-vibrant_IC: rgba(0, 0, 0, 0.56);
  --systemTertiary-onLight_IC: rgba(0, 0, 0, 0.56);
  --systemTertiary-onDark_IC: hsla(0, 0%, 100%, 0.5);
  --systemQuaternary: rgba(0, 0, 0, 0.1);
  --systemQuaternary-vibrant: #e6e6e6;
  --systemQuaternary-onLight: rgba(0, 0, 0, 0.1);
  --systemQuaternary-onDark: hsla(0, 0%, 100%, 0.1);
  --systemQuaternary-default_IC: rgba(0, 0, 0, 0.35);
  --systemQuaternary-vibrant_IC: rgba(0, 0, 0, 0.35);
  --systemQuaternary-onLight_IC: rgba(0, 0, 0, 0.35);
  --systemQuaternary-onDark_IC: hsla(0, 0%, 100%, 0.3);
  --systemQuinary: rgba(0, 0, 0, 0.05);
  --systemQuinary-vibrant: #f2f2f2;
  --systemQuinary-onLight: rgba(0, 0, 0, 0.05);
  --systemQuinary-onDark: hsla(0, 0%, 100%, 0.05);
  --systemQuinary-default_IC: rgba(0, 0, 0, 0.1);
  --systemQuinary-vibrant_IC: rgba(0, 0, 0, 0.1);
  --systemQuinary-onLight_IC: rgba(0, 0, 0, 0.1);
  --systemQuinary-onDark_IC: hsla(0, 0%, 100%, 0.1);
  --systemGray2: #aeaeb2;
  --systemGray2-onLight: #aeaeb2;
  --systemGray2-onDark: #636366;
  --systemGray2-default_IC: #8e8e93;
  --systemGray2-onLight_IC: #8e8e93;
  --systemGray2-onDark_IC: #7c7c80;
  --systemGray3: #c7c7cc;
  --systemGray3-onLight: #c7c7cc;
  --systemGray3-onDark: #48484a;
  --systemGray3-default_IC: #aeaeb2;
  --systemGray3-onLight_IC: #aeaeb2;
  --systemGray3-onDark_IC: #545456;
  --systemGray4: #d1d1d6;
  --systemGray4-onLight: #d1d1d6;
  --systemGray4-onDark: #3a3a3c;
  --systemGray4-default_IC: #bcbcc0;
  --systemGray4-onLight_IC: #bcbcc0;
  --systemGray4-onDark_IC: #444446;
  --systemGray5: #e5e5ea;
  --systemGray5-onLight: #e5e5ea;
  --systemGray5-onDark: #2c2c2e;
  --systemGray5-default_IC: #d8d8dc;
  --systemGray5-onLight_IC: #d8d8dc;
  --systemGray5-onDark_IC: #363638;
  --systemGray6: #f2f2f7;
  --systemGray6-onLight: #f2f2f7;
  --systemGray6-onDark: #1c1c1e;
  --systemGray6-default_IC: #ebebf0;
  --systemGray6-onLight_IC: #ebebf0;
  --systemGray6-onDark_IC: #242426;
  --keyColor: #fa233b;
  --keyColor-rgb: 250, 35, 59;
  --keyColor-rollover: #c60007;
  --keyColor-rollover-rgb: 198, 0, 7;
  --keyColor-pressed: #e00921;
  --keyColor-pressed-rgb: 224, 9, 33;
  --keyColor-deepPressed: #c60007;
  --keyColor-deepPressed-rgb: 198, 0, 7;
  --keyColor-disabled: rgba(250, 35, 59, 0.35);
  --keyColor-default_IC: #d60017;
  --keyColor-default_IC-rgb: 214, 0, 23;
  --keyColor-rollover_IC: #a20000;
  --keyColor-rollover_IC-rgb: 162, 0, 0;
  --keyColor-pressed_IC: #b00;
  --keyColor-pressed_IC-rgb: 187, 0, 0;
  --keyColor-deepPressed_IC: #a20000;
  --keyColor-deepPressed_IC-rgb: 162, 0, 0;
  --keyColor-disabled_IC: rgba(214, 0, 23, 0.25);
  --systemStandardUltrathinMaterialSover: hsla(0, 0%, 96%, 0.36);
  --systemStandardUltrathinMaterialSover-inactive: #f0f0f0;
  --systemStandardUltrathinMaterialSover-default_IC: #d2d2d2;
  --systemStandardUltrathinMaterialSover-inactive_IC: #ececec;
  --systemStandardThinMaterialSover: hsla(0, 0%, 96%, 0.48);
  --systemStandardThinMaterialSover-inactive: #f0f0f0;
  --systemStandardThinMaterialSover-default_IC: #dcdcdc;
  --systemStandardThinMaterialSover-inactive_IC: #ececec;
  --systemStandardMediumMaterialSover: hsla(0, 0%, 96%, 0.6);
  --systemStandardMediumMaterialSover-inactive: #f0f0f0;
  --systemStandardMediumMaterialSover-default_IC: #e6e6e6;
  --systemStandardMediumMaterialSover-inactive_IC: #ececec;
  --systemStandardThickMaterialSover: hsla(0, 0%, 96%, 0.72);
  --systemStandardThickMaterialSover-inactive: #f0f0f0;
  --systemStandardThickMaterialSover-default_IC: #f0f0f0;
  --systemStandardThickMaterialSover-inactive_IC: #ececec;
  --systemStandardUltrathickMaterialSover: hsla(0, 0%, 96%, 0.84);
  --systemStandardUltrathickMaterialSover-inactive: #f0f0f0;
  --systemStandardUltrathickMaterialSover-default_IC: #fafafa;
  --systemStandardUltrathickMaterialSover-inactive_IC: #ececec;
  --systemHeaderMaterialSover: hsla(0, 0%, 100%, 0.8);
  --systemHeaderMaterialSover-default_IC: #fff;
  --systemToolbarTitlebarMaterialSover: hsla(0, 0%, 99%, 0.8);
  --systemToolbarTitlebarMaterialSover-inactive: #f0f0f0;
  --systemToolbarTitlebarMaterialSover-default_IC: #fff;
  --systemToolbarTitlebarMaterialSover-inactive_IC: #ececec;
  --labelDivider: rgba(0, 0, 0, 0.15);
  --vibrantDivider: rgba(60, 60, 67, 0.29);
  --pageBG: #fffcf1;
  --pageBG-rgb: 255, 252, 241;
  --shelfBG: rgba(0, 0, 0, 0.05);
  --genericJoeColor: #ebebeb;
  --fallbackMaterialBG: hsla(0, 0%, 100%, 0.97);
  --liveBadgePlatterBG: #ff5066;
  --cardHoverColor: hsla(240, 3%, 49%, 0.25);
  --contextMenuBorderColor: rgba(0, 0, 0, 0.15);
  --contextMenuTextColor: rgba(0, 0, 0, 0.85);
  --contextMenuOverrideTextColor: #ff3b30;
  --dialogShadowColor: rgba(0, 0, 0, 0.25);
  --footerBg: #fbfbfb;
  --opaqueShelfBG: #f2f2f2;
  --shelfLockupPlayHover: #69696e;
  --lockupHoverBGColor: rgba(51, 51, 51, 0.3);
  --lockupChinScrim: rgba(0, 0, 0, 0.2);
  --mobileNavigationBG: #fff;
  --miniPlayerBackground: hsla(0, 0%, 100%, 0.9);
  --miniPlayerBackground-default_IC: #fafafa;
  --playerBackgroundFallback: hsla(0, 0%, 100%, 0.97);
  --playerBackgroundFallback-default_IC: #fafafa;
  --playerBackground: hsla(0, 0%, 100%, 0.88);
  --playerBackground-default_IC: #fafafa;
  --navSidebarBG: rgba(60, 60, 67, 0.03);
  --navSidebarBG-default_IC: #fafafa;
  --navSidebarSelectedState: rgba(60, 60, 67, 0.1);
  --searchBoxIconFill: rgba(0, 0, 0, 0.65);
  --bannerDarkGray: #444;
  --dropdownBackground: #575757;
  --dropdownLightGray: #707070;
  --dropdownLightGrayIcon: #999;
  --dropdownActiveOutlineColor: #06c;
  --dropdownActiveOutlineColorShadow: rgba(0, 102, 204, 0.6);
  --radiosityShadowColor: rgba(0, 0, 0, 0.1);
  --searchBarBorderColor: rgba(0, 0, 0, 0.15);
  --modalScrimColor: rgba(0, 0, 0, 0.45);
  --segmentedControlBG: hsla(240, 4%, 48%, 0.12);
  --segmentedControlBG-default_IC: rgba(0, 0, 0, 0.2);
  --segmentedControlSelectedText: rgba(0, 0, 0, 0.85);
  --segmentedControlSelectedText-default_IC: #000;
  --segmentedControlSelectedBG: #fff;
  --segmentedControlActiveBG: hsla(0, 0%, 100%, 0.7);
  --segmentedControlActiveBG-default_IC: #d9d9d9;
  --segmentedControlSelectedShadow1: rgba(0, 0, 0, 0.12);
  --segmentedControlSelectedShadow2: rgba(0, 0, 0, 0.04);
  --segmentedControlSelectedBorder: rgba(0, 0, 0, 0.15);
  --modalCloseButtonBGColor: #e8e8ed;
  --modalCloseButtonBGColor-rollover: #ececf0;
  --modalCloseButtonBGColor-pressed: #dfdfe4;
  --musicKeyColor: #fa233b;
  --musicKeyColor-rollover: #c60007;
  --musicKeyColor-pressed: #e00921;
  --musicKeyColor-deepPressed: #c60007;
  --musicKeyColor-disabled: rgba(250, 35, 59, 0.35);
  --musicKeyColor-default_IC: #d60017;
  --musicKeyColor-rollover_IC: #a20000;
  --musicKeyColor-pressed_IC: #b00;
  --musicKeyColor-deepPressed_IC: #a20000;
  --musicKeyColor-disabled_IC: rgba(214, 0, 23, 0.25);
  --circularArtistHeaderGradientBottom: rgba(0, 0, 0, 0.05);
  --fallbackButtonMaterial: hsla(240, 2%, 57%, 0.8);
  --playerPlatterButtonBGFill: #6c6c6c;
  --playerPlatterButtonIconFill: #fff;
  --shareButtonBackground: rgba(0, 0, 0, 0.3);
  --shareButtonIconFill: #fff;
  --stickyHeaderDropShadow2: rgba(0, 0, 0, 0.07);
  --stickyHeaderInnerShadow: hsla(0, 0%, 100%, 0.45);
  --opaqueText: #000;
  --opaqueText-rgb: 0, 0, 0;
  --opaqueTextInverted: #fff;
  --opaqueTextInverted-rgb: 255, 255, 255;
  --text70: rgba(0, 0, 0, 0.7);
  --text70-default_IC: rgba(0, 0, 0, 0.9);
  --text80: rgba(0, 0, 0, 0.8);
  --text80-default_IC: rgba(0, 0, 0, 0.95);
  --tracklistAltRowColor: rgba(0, 0, 0, 0.015);
  --tracklistAltRowColor-default_IC: rgba(0, 0, 0, 0.05);
  --tracklistHoverColor: rgba(0, 0, 0, 0.06);
  --tracklistHoverColor-default_IC: rgba(0, 0, 0, 0.1);
  --tracklistWorksTrackHoverColor: rgba(0, 0, 0, 0.12);
  --tracklistWorksTrackHoverColor-default_IC: rgba(0, 0, 0, 0.18);
  --trackLockupArtworkOverlay: rgba(51, 51, 51, 0.3);
  --lyricsBg: #fff;
  --searchBarBorderColorSidebarHidden: rgba(0, 0, 0, 0.15);
  --iPhoneNowPlayingBackdropBG: #dbccc4;
  --keyColorBG: #fa233b;
  --keyColorBG-default_IC: #d60017;
  --selectionColor: #dd1f34;
  --selectionColor-default_IC: #d60017;
  --trackBackgroundEven: rgba(0, 0, 0, 0.02);
  --librarySongsTrackInactiveBG: rgba(0, 0, 0, 0.14);
  --profileBadgeBG: #e2e4e7;
  color-scheme: light dark;
}
@supports not (font: -apple-system-body) {
  :host {
    --systemPrimary: rgba(0, 0, 0, 0.88);
    --systemPrimary-vibrant: #1d1d1f;
    --systemPrimary-onLight: rgba(0, 0, 0, 0.88);
    --systemPrimary-onDark: hsla(0, 0%, 100%, 0.92);
    --systemSecondary: rgba(0, 0, 0, 0.56);
    --systemSecondary-vibrant: rgba(0, 0, 0, 0.56);
    --systemSecondary-onLight: rgba(0, 0, 0, 0.56);
    --systemSecondary-onDark: hsla(0, 0%, 100%, 0.64);
    --systemTertiary: rgba(0, 0, 0, 0.48);
    --systemTertiary-vibrant: rgba(0, 0, 0, 0.48);
    --systemTertiary-onLight: rgba(0, 0, 0, 0.48);
    --systemTertiary-onDark: hsla(0, 0%, 100%, 0.4);
    --keyColor: #d60017;
    --keyColor-rgb: 214, 0, 23;
    --keyColor-rollover: #a20000;
    --keyColor-rollover-rgb: 162, 0, 0;
    --keyColor-pressed: #b00;
    --keyColor-pressed-rgb: 187, 0, 0;
    --keyColor-deepPressed: #a20000;
    --keyColor-deepPressed-rgb: 162, 0, 0;
    --keyColor-disabled: rgba(214, 0, 23, 0.25);
    --segmentedControlSelectedText: rgba(0, 0, 0, 0.88);
    --musicKeyColor: #d60017;
    --musicKeyColor-rollover: #a20000;
    --musicKeyColor-pressed: #b00;
    --musicKeyColor-deepPressed: #a20000;
    --musicKeyColor-disabled: rgba(214, 0, 23, 0.25);
    --keyColorBG: #d60017;
    --selectionColor: #d60017;
  }
}
:host .increase-contrast {
  --systemRed: #d70015;
  --systemRed-vibrant: #c20618;
  --systemOrange: #c93400;
  --systemOrange-vibrant: #ad3a00;
  --systemYellow: #a05a00;
  --systemYellow-vibrant: #925100;
  --systemGreen: #007d1b;
  --systemGreen-vibrant: #007018;
  --systemMint: #0c817b;
  --systemMint-vibrant: #0b7570;
  --systemTeal: #008299;
  --systemTeal-vibrant: #00778c;
  --systemCyan: #0071a4;
  --systemCyan-vibrant: #006796;
  --systemBlue: #0040dd;
  --systemBlue-vibrant: #0040dd;
  --systemIndigo: #3634a3;
  --systemIndigo-vibrant: #3634a3;
  --systemPurple: #ad44ab;
  --systemPurple-vibrant: #ad44ab;
  --systemPink: #d30f45;
  --systemPink-vibrant: #c11032;
  --systemBrown: #7f6545;
  --systemBrown-vibrant: #775d3b;
  --systemGray: #69696e;
  --systemGray-vibrant: #616165;
  --systemPrimary: #000;
  --systemPrimary-vibrant: #000;
  --systemPrimary-onLight: #000;
  --systemPrimary-onDark: #fff;
  --systemSecondary: rgba(0, 0, 0, 0.76);
  --systemSecondary-vibrant: rgba(0, 0, 0, 0.76);
  --systemSecondary-onLight: rgba(0, 0, 0, 0.76);
  --systemSecondary-onDark: hsla(0, 0%, 100%, 0.7);
  --systemTertiary: rgba(0, 0, 0, 0.56);
  --systemTertiary-vibrant: rgba(0, 0, 0, 0.56);
  --systemTertiary-onLight: rgba(0, 0, 0, 0.56);
  --systemTertiary-onDark: hsla(0, 0%, 100%, 0.5);
  --systemQuaternary: rgba(0, 0, 0, 0.35);
  --systemQuaternary-vibrant: rgba(0, 0, 0, 0.35);
  --systemQuaternary-onLight: rgba(0, 0, 0, 0.35);
  --systemQuaternary-onDark: hsla(0, 0%, 100%, 0.3);
  --systemQuinary: rgba(0, 0, 0, 0.1);
  --systemQuinary-vibrant: rgba(0, 0, 0, 0.1);
  --systemQuinary-onLight: rgba(0, 0, 0, 0.1);
  --systemQuinary-onDark: hsla(0, 0%, 100%, 0.1);
  --systemGray2: #8e8e93;
  --systemGray2-onLight: #8e8e93;
  --systemGray2-onDark: #7c7c80;
  --systemGray3: #aeaeb2;
  --systemGray3-onLight: #aeaeb2;
  --systemGray3-onDark: #545456;
  --systemGray4: #bcbcc0;
  --systemGray4-onLight: #bcbcc0;
  --systemGray4-onDark: #444446;
  --systemGray5: #d8d8dc;
  --systemGray5-onLight: #d8d8dc;
  --systemGray5-onDark: #363638;
  --systemGray6: #ebebf0;
  --systemGray6-onLight: #ebebf0;
  --systemGray6-onDark: #242426;
  --keyColor: #d60017;
  --keyColor-rgb: 214, 0, 23;
  --keyColor-rollover: #a20000;
  --keyColor-rollover-rgb: 162, 0, 0;
  --keyColor-pressed: #b00;
  --keyColor-pressed-rgb: 187, 0, 0;
  --keyColor-deepPressed: #a20000;
  --keyColor-deepPressed-rgb: 162, 0, 0;
  --keyColor-disabled: rgba(214, 0, 23, 0.25);
  --systemStandardUltrathinMaterialSover: #d2d2d2;
  --systemStandardUltrathinMaterialSover-inactive: #ececec;
  --systemStandardThinMaterialSover: #dcdcdc;
  --systemStandardThinMaterialSover-inactive: #ececec;
  --systemStandardMediumMaterialSover: #e6e6e6;
  --systemStandardMediumMaterialSover-inactive: #ececec;
  --systemStandardThickMaterialSover: #f0f0f0;
  --systemStandardThickMaterialSover-inactive: #ececec;
  --systemStandardUltrathickMaterialSover: #fafafa;
  --systemStandardUltrathickMaterialSover-inactive: #ececec;
  --systemHeaderMaterialSover: #fff;
  --systemToolbarTitlebarMaterialSover: #fff;
  --systemToolbarTitlebarMaterialSover-inactive: #ececec;
  --miniPlayerBackground: #fafafa;
  --playerBackgroundFallback: #fafafa;
  --playerBackground: #fafafa;
  --navSidebarBG: #fafafa;
  --segmentedControlBG: rgba(0, 0, 0, 0.2);
  --segmentedControlSelectedText: #000;
  --segmentedControlActiveBG: #d9d9d9;
  --musicKeyColor: #d60017;
  --musicKeyColor-rollover: #a20000;
  --musicKeyColor-pressed: #b00;
  --musicKeyColor-deepPressed: #a20000;
  --musicKeyColor-disabled: rgba(214, 0, 23, 0.25);
  --text70: rgba(0, 0, 0, 0.9);
  --text80: rgba(0, 0, 0, 0.95);
  --tracklistAltRowColor: rgba(0, 0, 0, 0.05);
  --tracklistHoverColor: rgba(0, 0, 0, 0.1);
  --tracklistWorksTrackHoverColor: rgba(0, 0, 0, 0.18);
  --keyColorBG: #d60017;
  --selectionColor: #d60017;
}
@media (prefers-contrast: more) {
  :host {
    --systemRed: #d70015;
    --systemRed-vibrant: #c20618;
    --systemOrange: #c93400;
    --systemOrange-vibrant: #ad3a00;
    --systemYellow: #a05a00;
    --systemYellow-vibrant: #925100;
    --systemGreen: #007d1b;
    --systemGreen-vibrant: #007018;
    --systemMint: #0c817b;
    --systemMint-vibrant: #0b7570;
    --systemTeal: #008299;
    --systemTeal-vibrant: #00778c;
    --systemCyan: #0071a4;
    --systemCyan-vibrant: #006796;
    --systemBlue: #0040dd;
    --systemBlue-vibrant: #0040dd;
    --systemIndigo: #3634a3;
    --systemIndigo-vibrant: #3634a3;
    --systemPurple: #ad44ab;
    --systemPurple-vibrant: #ad44ab;
    --systemPink: #d30f45;
    --systemPink-vibrant: #c11032;
    --systemBrown: #7f6545;
    --systemBrown-vibrant: #775d3b;
    --systemGray: #69696e;
    --systemGray-vibrant: #616165;
    --systemPrimary: #000;
    --systemPrimary-vibrant: #000;
    --systemPrimary-onLight: #000;
    --systemPrimary-onDark: #fff;
    --systemSecondary: rgba(0, 0, 0, 0.76);
    --systemSecondary-vibrant: rgba(0, 0, 0, 0.76);
    --systemSecondary-onLight: rgba(0, 0, 0, 0.76);
    --systemSecondary-onDark: hsla(0, 0%, 100%, 0.7);
    --systemTertiary: rgba(0, 0, 0, 0.56);
    --systemTertiary-vibrant: rgba(0, 0, 0, 0.56);
    --systemTertiary-onLight: rgba(0, 0, 0, 0.56);
    --systemTertiary-onDark: hsla(0, 0%, 100%, 0.5);
    --systemQuaternary: rgba(0, 0, 0, 0.35);
    --systemQuaternary-vibrant: rgba(0, 0, 0, 0.35);
    --systemQuaternary-onLight: rgba(0, 0, 0, 0.35);
    --systemQuaternary-onDark: hsla(0, 0%, 100%, 0.3);
    --systemQuinary: rgba(0, 0, 0, 0.1);
    --systemQuinary-vibrant: rgba(0, 0, 0, 0.1);
    --systemQuinary-onLight: rgba(0, 0, 0, 0.1);
    --systemQuinary-onDark: hsla(0, 0%, 100%, 0.1);
    --systemGray2: #8e8e93;
    --systemGray2-onLight: #8e8e93;
    --systemGray2-onDark: #7c7c80;
    --systemGray3: #aeaeb2;
    --systemGray3-onLight: #aeaeb2;
    --systemGray3-onDark: #545456;
    --systemGray4: #bcbcc0;
    --systemGray4-onLight: #bcbcc0;
    --systemGray4-onDark: #444446;
    --systemGray5: #d8d8dc;
    --systemGray5-onLight: #d8d8dc;
    --systemGray5-onDark: #363638;
    --systemGray6: #ebebf0;
    --systemGray6-onLight: #ebebf0;
    --systemGray6-onDark: #242426;
    --keyColor: #d60017;
    --keyColor-rgb: 214, 0, 23;
    --keyColor-rollover: #a20000;
    --keyColor-rollover-rgb: 162, 0, 0;
    --keyColor-pressed: #b00;
    --keyColor-pressed-rgb: 187, 0, 0;
    --keyColor-deepPressed: #a20000;
    --keyColor-deepPressed-rgb: 162, 0, 0;
    --keyColor-disabled: rgba(214, 0, 23, 0.25);
    --systemStandardUltrathinMaterialSover: #d2d2d2;
    --systemStandardUltrathinMaterialSover-inactive: #ececec;
    --systemStandardThinMaterialSover: #dcdcdc;
    --systemStandardThinMaterialSover-inactive: #ececec;
    --systemStandardMediumMaterialSover: #e6e6e6;
    --systemStandardMediumMaterialSover-inactive: #ececec;
    --systemStandardThickMaterialSover: #f0f0f0;
    --systemStandardThickMaterialSover-inactive: #ececec;
    --systemStandardUltrathickMaterialSover: #fafafa;
    --systemStandardUltrathickMaterialSover-inactive: #ececec;
    --systemHeaderMaterialSover: #fff;
    --systemToolbarTitlebarMaterialSover: #fff;
    --systemToolbarTitlebarMaterialSover-inactive: #ececec;
    --miniPlayerBackground: #fafafa;
    --playerBackgroundFallback: #fafafa;
    --playerBackground: #fafafa;
    --navSidebarBG: #fafafa;
    --segmentedControlBG: rgba(0, 0, 0, 0.2);
    --segmentedControlSelectedText: #000;
    --segmentedControlActiveBG: #d9d9d9;
    --musicKeyColor: #d60017;
    --musicKeyColor-rollover: #a20000;
    --musicKeyColor-pressed: #b00;
    --musicKeyColor-deepPressed: #a20000;
    --musicKeyColor-disabled: rgba(214, 0, 23, 0.25);
    --text70: rgba(0, 0, 0, 0.9);
    --text80: rgba(0, 0, 0, 0.95);
    --tracklistAltRowColor: rgba(0, 0, 0, 0.05);
    --tracklistHoverColor: rgba(0, 0, 0, 0.1);
    --tracklistWorksTrackHoverColor: rgba(0, 0, 0, 0.18);
    --keyColorBG: #d60017;
    --selectionColor: #d60017;
  }
}
@media (prefers-color-scheme: dark) {
  :host {
    --systemRed: #ff453a;
    --systemRed-vibrant: #ff4f44;
    --systemRed-default_IC: #ff6961;
    --systemRed-vibrant_IC: #ff4136;
    --systemOrange: #ff9f0a;
    --systemOrange-vibrant: #ffa914;
    --systemOrange-default_IC: #ffb340;
    --systemOrange-vibrant_IC: #ffb340;
    --systemYellow: #ffd60a;
    --systemYellow-vibrant: #ffe014;
    --systemYellow-default_IC: #ffd426;
    --systemYellow-vibrant_IC: #ffd426;
    --systemGreen: #32d74b;
    --systemGreen-vibrant: #3ce155;
    --systemGreen-default_IC: #31de4b;
    --systemGreen-vibrant_IC: #31de4b;
    --systemMint: #63e6e2;
    --systemMint-vibrant: #6ce0db;
    --systemMint-default_IC: #63e6e2;
    --systemMint-vibrant_IC: #63e6e2;
    --systemTeal: #6ac4dc;
    --systemTeal-vibrant: #44d4ed;
    --systemTeal-default_IC: #5de6ff;
    --systemTeal-vibrant_IC: #5de6ff;
    --systemCyan: #5ac8f5;
    --systemCyan-vibrant: #5acdfa;
    --systemCyan-default_IC: #70d7ff;
    --systemCyan-vibrant_IC: #70d7ff;
    --systemBlue: #0a84ff;
    --systemBlue-vibrant: #148eff;
    --systemBlue-default_IC: #409cff;
    --systemBlue-vibrant_IC: #409cff;
    --systemBlue-rollover: #47c1ff;
    --systemBlue-pressed: #38b2ff;
    --systemBlue-deepPressed: #47c1ff;
    --systemBlue-disabled: rgba(10, 132, 255, 0.5);
    --systemIndigo: #5e5ce6;
    --systemIndigo-vibrant: #6361f2;
    --systemIndigo-default_IC: #7d7aff;
    --systemIndigo-vibrant_IC: #7d7aff;
    --systemPurple: #bf5af2;
    --systemPurple-vibrant: #cc65ff;
    --systemPurple-default_IC: #da8fff;
    --systemPurple-vibrant_IC: #da8fff;
    --systemPink: #ff375f;
    --systemPink-vibrant: #ff4169;
    --systemPink-default_IC: #ff6482;
    --systemPink-vibrant_IC: #ff3a5f;
    --systemBrown: #ac8e68;
    --systemBrown-vibrant: #b69872;
    --systemBrown-default_IC: #b59469;
    --systemBrown-vibrant_IC: #b59469;
    --systemGray: #98989d;
    --systemGray-vibrant: #a2a2a7;
    --systemGray-default_IC: #98989d;
    --systemGray-vibrant_IC: #98989d;
    --systemPrimary: hsla(0, 0%, 100%, 0.85);
    --systemPrimary-vibrant: #e5e5e5;
    --systemPrimary-onLight: rgba(0, 0, 0, 0.85);
    --systemPrimary-onDark: hsla(0, 0%, 100%, 0.85);
    --systemPrimary-default_IC: #fff;
    --systemPrimary-vibrant_IC: #fff;
    --systemPrimary-onLight_IC: #000;
    --systemPrimary-onDark_IC: #fff;
    --systemSecondary: hsla(0, 0%, 100%, 0.55);
    --systemSecondary-vibrant: #7c7c7c;
    --systemSecondary-onLight: rgba(0, 0, 0, 0.5);
    --systemSecondary-onDark: hsla(0, 0%, 100%, 0.55);
    --systemSecondary-default_IC: hsla(0, 0%, 100%, 0.7);
    --systemSecondary-vibrant_IC: hsla(0, 0%, 100%, 0.7);
    --systemSecondary-onLight_IC: rgba(0, 0, 0, 0.76);
    --systemSecondary-onDark_IC: hsla(0, 0%, 100%, 0.7);
    --systemTertiary: hsla(0, 0%, 100%, 0.25);
    --systemTertiary-vibrant: #414141;
    --systemTertiary-onLight: rgba(0, 0, 0, 0.25);
    --systemTertiary-onDark: hsla(0, 0%, 100%, 0.25);
    --systemTertiary-default_IC: hsla(0, 0%, 100%, 0.5);
    --systemTertiary-vibrant_IC: hsla(0, 0%, 100%, 0.5);
    --systemTertiary-onLight_IC: rgba(0, 0, 0, 0.56);
    --systemTertiary-onDark_IC: hsla(0, 0%, 100%, 0.5);
    --systemQuaternary: hsla(0, 0%, 100%, 0.1);
    --systemQuaternary-vibrant: #232323;
    --systemQuaternary-onLight: rgba(0, 0, 0, 0.1);
    --systemQuaternary-onDark: hsla(0, 0%, 100%, 0.1);
    --systemQuaternary-default_IC: hsla(0, 0%, 100%, 0.3);
    --systemQuaternary-vibrant_IC: hsla(0, 0%, 100%, 0.3);
    --systemQuaternary-onLight_IC: rgba(0, 0, 0, 0.35);
    --systemQuaternary-onDark_IC: hsla(0, 0%, 100%, 0.3);
    --systemQuinary: hsla(0, 0%, 100%, 0.05);
    --systemQuinary-vibrant: #080808;
    --systemQuinary-onLight: rgba(0, 0, 0, 0.05);
    --systemQuinary-onDark: hsla(0, 0%, 100%, 0.05);
    --systemQuinary-default_IC: hsla(0, 0%, 100%, 0.1);
    --systemQuinary-vibrant_IC: hsla(0, 0%, 100%, 0.1);
    --systemQuinary-onLight_IC: rgba(0, 0, 0, 0.1);
    --systemQuinary-onDark_IC: hsla(0, 0%, 100%, 0.1);
    --systemGray2: #636366;
    --systemGray2-onLight: #aeaeb2;
    --systemGray2-onDark: #636366;
    --systemGray2-default_IC: #7c7c80;
    --systemGray2-onLight_IC: #8e8e93;
    --systemGray2-onDark_IC: #7c7c80;
    --systemGray3: #48484a;
    --systemGray3-onLight: #c7c7cc;
    --systemGray3-onDark: #48484a;
    --systemGray3-default_IC: #545456;
    --systemGray3-onLight_IC: #aeaeb2;
    --systemGray3-onDark_IC: #545456;
    --systemGray4: #3a3a3c;
    --systemGray4-onLight: #d1d1d6;
    --systemGray4-onDark: #3a3a3c;
    --systemGray4-default_IC: #444446;
    --systemGray4-onLight_IC: #bcbcc0;
    --systemGray4-onDark_IC: #444446;
    --systemGray5: #2c2c2e;
    --systemGray5-onLight: #e5e5ea;
    --systemGray5-onDark: #2c2c2e;
    --systemGray5-default_IC: #363638;
    --systemGray5-onLight_IC: #d8d8dc;
    --systemGray5-onDark_IC: #363638;
    --systemGray6: #1c1c1e;
    --systemGray6-onLight: #f2f2f7;
    --systemGray6-onDark: #1c1c1e;
    --systemGray6-default_IC: #242426;
    --systemGray6-onLight_IC: #ebebf0;
    --systemGray6-onDark_IC: #242426;
    --keyColor: #fa2d48;
    --keyColor-rgb: 250, 45, 72;
    --keyColor-rollover: #ff5f7a;
    --keyColor-rollover-rgb: 255, 95, 122;
    --keyColor-pressed: #ff4661;
    --keyColor-pressed-rgb: 255, 70, 97;
    --keyColor-deepPressed: #ff5f7a;
    --keyColor-deepPressed-rgb: 255, 95, 122;
    --keyColor-disabled: rgba(250, 45, 72, 0.35);
    --keyColor-default_IC: #fa586a;
    --keyColor-default_IC-rgb: 250, 88, 106;
    --keyColor-rollover_IC: #ff8a9c;
    --keyColor-rollover_IC-rgb: 255, 138, 156;
    --keyColor-pressed_IC: #ff7183;
    --keyColor-pressed_IC-rgb: 255, 113, 131;
    --keyColor-deepPressed_IC: #ff8a9c;
    --keyColor-deepPressed_IC-rgb: 255, 138, 156;
    --keyColor-disabled_IC: rgba(250, 88, 106, 0.35);
    --systemStandardUltrathinMaterialSover: rgba(40, 40, 40, 0.4);
    --systemStandardUltrathinMaterialSover-inactive: #282828;
    --systemStandardUltrathinMaterialSover-default_IC: #000;
    --systemStandardUltrathinMaterialSover-inactive_IC: #141414;
    --systemStandardThinMaterialSover: rgba(40, 40, 40, 0.5);
    --systemStandardThinMaterialSover-inactive: #282828;
    --systemStandardThinMaterialSover-default_IC: #0a0a0a;
    --systemStandardThinMaterialSover-inactive_IC: #141414;
    --systemStandardMediumMaterialSover: rgba(40, 40, 40, 0.6);
    --systemStandardMediumMaterialSover-inactive: #282828;
    --systemStandardMediumMaterialSover-default_IC: #141414;
    --systemStandardMediumMaterialSover-inactive_IC: #141414;
    --systemStandardThickMaterialSover: rgba(40, 40, 40, 0.7);
    --systemStandardThickMaterialSover-inactive: #282828;
    --systemStandardThickMaterialSover-default_IC: #1e1e1e;
    --systemStandardThickMaterialSover-inactive_IC: #141414;
    --systemStandardUltrathickMaterialSover: rgba(40, 40, 40, 0.8);
    --systemStandardUltrathickMaterialSover-inactive: #282828;
    --systemStandardUltrathickMaterialSover-default_IC: #282828;
    --systemStandardUltrathickMaterialSover-inactive_IC: #141414;
    --systemHeaderMaterialSover: rgba(30, 30, 30, 0.8);
    --systemHeaderMaterialSover-default_IC: #1e1e1e;
    --systemToolbarTitlebarMaterialSover: rgba(60, 60, 60, 0.8);
    --systemToolbarTitlebarMaterialSover-inactive: #282828;
    --systemToolbarTitlebarMaterialSover-default_IC: #262626;
    --systemToolbarTitlebarMaterialSover-inactive_IC: #141414;
    --labelDivider: hsla(0, 0%, 100%, 0.1);
    --vibrantDivider: rgba(235, 235, 245, 0.19);
    --pageBG: #0e0e0e;
    --pageBG-rgb: 14, 14, 14;
    --shelfBG: hsla(0, 0%, 100%, 0.05);
    --genericJoeColor: #323232;
    --fallbackMaterialBG: rgba(31, 31, 31, 0.97);
    --liveBadgePlatterBG: #ff5066;
    --cardHoverColor: hsla(240, 3%, 49%, 0.41);
    --contextMenuBorderColor: hsla(0, 0%, 100%, 0.1);
    --contextMenuTextColor: hsla(0, 0%, 100%, 0.85);
    --contextMenuOverrideTextColor: #ff3b30;
    --dialogShadowColor: rgba(0, 0, 0, 0.55);
    --footerBg: #323232;
    --opaqueShelfBG: #2b2b2b;
    --shelfLockupPlayHover: #aeaeb2;
    --lockupHoverBGColor: rgba(51, 51, 51, 0.3);
    --lockupChinScrim: rgba(0, 0, 0, 0.2);
    --mobileNavigationBG: #2e2e2e;
    --miniPlayerBackground: rgba(37, 37, 37, 0.9);
    --miniPlayerBackground-default_IC: #282828;
    --playerBackgroundFallback: rgba(45, 45, 45, 0.97);
    --playerBackgroundFallback-default_IC: #282828;
    --playerBackground: rgba(45, 45, 45, 0.88);
    --playerBackground-default_IC: #282828;
    --navSidebarBG: rgba(235, 235, 245, 0.03);
    --navSidebarBG-default_IC: #282828;
    --navSidebarSelectedState: rgba(235, 235, 245, 0.1);
    --searchBoxIconFill: hsla(0, 0%, 100%, 0.9);
    --bannerDarkGray: #444;
    --dropdownBackground: #575757;
    --dropdownLightGray: #707070;
    --dropdownLightGrayIcon: #999;
    --dropdownActiveOutlineColor: #06c;
    --dropdownActiveOutlineColorShadow: rgba(0, 102, 204, 0.6);
    --radiosityShadowColor: rgba(0, 0, 0, 0.3);
    --searchBarBorderColor: rgba(0, 0, 0, 0.15);
    --modalScrimColor: rgba(0, 0, 0, 0.45);
    --segmentedControlBG: hsla(240, 4%, 48%, 0.24);
    --segmentedControlBG-default_IC: hsla(0, 0%, 100%, 0.24);
    --segmentedControlSelectedText: hsla(0, 0%, 100%, 0.85);
    --segmentedControlSelectedText-default_IC: #000;
    --segmentedControlSelectedBG: #636366;
    --segmentedControlSelectedBG-default_IC: #fff;
    --segmentedControlActiveBG: #747477;
    --segmentedControlActiveBG-default_IC: rgba(255, 255, 240, 0.9);
    --segmentedControlSelectedShadow1: transparent;
    --segmentedControlSelectedShadow2: transparent;
    --modalCloseButtonBGColor: #333336;
    --modalCloseButtonBGColor-rollover: #37373a;
    --modalCloseButtonBGColor-pressed: #2f2f32;
    --musicKeyColor: #fa2d48;
    --musicKeyColor-rollover: #ff5f7a;
    --musicKeyColor-pressed: #ff4661;
    --musicKeyColor-deepPressed: #ff5f7a;
    --musicKeyColor-disabled: rgba(250, 45, 72, 0.35);
    --musicKeyColor-default_IC: #fa586a;
    --musicKeyColor-rollover_IC: #ff8a9c;
    --musicKeyColor-pressed_IC: #ff7183;
    --musicKeyColor-deepPressed_IC: #ff8a9c;
    --musicKeyColor-disabled_IC: rgba(250, 88, 106, 0.35);
    --circularArtistHeaderGradientBottom: hsla(0, 0%, 100%, 0.03);
    --fallbackButtonMaterial: hsla(240, 2%, 61%, 0.8);
    --playerPlatterButtonBGFill: #fff;
    --playerPlatterButtonIconFill: rgba(0, 0, 0, 0.7);
    --shareButtonBackground: #fff;
    --shareButtonIconFill: #000;
    --stickyHeaderDropShadow2: rgba(0, 0, 0, 0.1);
    --stickyHeaderInnerShadow: hsla(0, 0%, 100%, 0.1);
    --opaqueText: #fff;
    --opaqueText-rgb: 255, 255, 255;
    --opaqueTextInverted: #000;
    --opaqueTextInverted-rgb: 0, 0, 0;
    --text70: hsla(0, 0%, 100%, 0.7);
    --text70-default_IC: hsla(0, 0%, 100%, 0.9);
    --text80: hsla(0, 0%, 100%, 0.8);
    --text80-default_IC: hsla(0, 0%, 100%, 0.95);
    --tracklistAltRowColor: hsla(0, 0%, 100%, 0.015);
    --tracklistAltRowColor-default_IC: hsla(0, 0%, 100%, 0.05);
    --tracklistHoverColor: hsla(0, 0%, 100%, 0.06);
    --tracklistHoverColor-default_IC: hsla(0, 0%, 100%, 0.1);
    --tracklistWorksTrackHoverColor: hsla(0, 0%, 100%, 0.12);
    --tracklistWorksTrackHoverColor-default_IC: hsla(0, 0%, 100%, 0.18);
    --trackLockupArtworkOverlay: rgba(51, 51, 51, 0.3);
    --lyricsBg: #2d2d2d;
    --searchBarBorderColorSidebarHidden: hsla(0, 0%, 100%, 0.15);
    --iPhoneNowPlayingBackdropBG: #dbccc4;
    --keyColorBG: #fa233b;
    --keyColorBG-default_IC: #d60017;
    --selectionColor: #c11b2e;
    --selectionColor-default_IC: #a60012;
    --trackBackgroundEven: hsla(0, 0%, 100%, 0.05);
    --librarySongsTrackInactiveBG: rgba(255, 255, 240, 0.12);
    --profileBadgeBG: #e2e4e7;
  }
  @supports not (font: -apple-system-body) {
    :host {
      --systemPrimary: hsla(0, 0%, 100%, 0.92);
      --systemPrimary-vibrant: #f5f5f7;
      --systemPrimary-onLight: rgba(0, 0, 0, 0.88);
      --systemPrimary-onDark: hsla(0, 0%, 100%, 0.92);
      --systemSecondary: hsla(0, 0%, 100%, 0.64);
      --systemSecondary-vibrant: #a1a1a6;
      --systemSecondary-onLight: rgba(0, 0, 0, 0.56);
      --systemSecondary-onDark: hsla(0, 0%, 100%, 0.64);
      --systemTertiary: hsla(0, 0%, 100%, 0.4);
      --systemTertiary-vibrant: #6e6e73;
      --systemTertiary-onLight: rgba(0, 0, 0, 0.48);
      --systemTertiary-onDark: hsla(0, 0%, 100%, 0.4);
      --keyColor: #fa586a;
      --keyColor-rgb: 250, 88, 106;
      --keyColor-rollover: #ff8a9c;
      --keyColor-rollover-rgb: 255, 138, 156;
      --keyColor-pressed: #ff7183;
      --keyColor-pressed-rgb: 255, 113, 131;
      --keyColor-deepPressed: #ff8a9c;
      --keyColor-deepPressed-rgb: 255, 138, 156;
      --keyColor-disabled: rgba(250, 88, 106, 0.35);
      --musicKeyColor: #fa586a;
      --musicKeyColor-rollover: #ff8a9c;
      --musicKeyColor-pressed: #ff7183;
      --musicKeyColor-deepPressed: #ff8a9c;
      --musicKeyColor-disabled: rgba(250, 88, 106, 0.35);
      --keyColorBG: #d60017;
      --selectionColor: #a60012;
    }
  }
  :host .increase-contrast {
    --systemRed: #ff6961;
    --systemRed-vibrant: #ff4136;
    --systemOrange: #ffb340;
    --systemOrange-vibrant: #ffb340;
    --systemYellow: #ffd426;
    --systemYellow-vibrant: #ffd426;
    --systemGreen: #31de4b;
    --systemGreen-vibrant: #31de4b;
    --systemMint: #63e6e2;
    --systemMint-vibrant: #63e6e2;
    --systemTeal: #5de6ff;
    --systemTeal-vibrant: #5de6ff;
    --systemCyan: #70d7ff;
    --systemCyan-vibrant: #70d7ff;
    --systemBlue: #409cff;
    --systemBlue-vibrant: #409cff;
    --systemIndigo: #7d7aff;
    --systemIndigo-vibrant: #7d7aff;
    --systemPurple: #da8fff;
    --systemPurple-vibrant: #da8fff;
    --systemPink: #ff6482;
    --systemPink-vibrant: #ff3a5f;
    --systemBrown: #b59469;
    --systemBrown-vibrant: #b59469;
    --systemGray: #98989d;
    --systemGray-vibrant: #98989d;
    --systemPrimary: #fff;
    --systemPrimary-vibrant: #fff;
    --systemPrimary-onLight: #000;
    --systemPrimary-onDark: #fff;
    --systemSecondary: hsla(0, 0%, 100%, 0.7);
    --systemSecondary-vibrant: hsla(0, 0%, 100%, 0.7);
    --systemSecondary-onLight: rgba(0, 0, 0, 0.76);
    --systemSecondary-onDark: hsla(0, 0%, 100%, 0.7);
    --systemTertiary: hsla(0, 0%, 100%, 0.5);
    --systemTertiary-vibrant: hsla(0, 0%, 100%, 0.5);
    --systemTertiary-onLight: rgba(0, 0, 0, 0.56);
    --systemTertiary-onDark: hsla(0, 0%, 100%, 0.5);
    --systemQuaternary: hsla(0, 0%, 100%, 0.3);
    --systemQuaternary-vibrant: hsla(0, 0%, 100%, 0.3);
    --systemQuaternary-onLight: rgba(0, 0, 0, 0.35);
    --systemQuaternary-onDark: hsla(0, 0%, 100%, 0.3);
    --systemQuinary: hsla(0, 0%, 100%, 0.1);
    --systemQuinary-vibrant: hsla(0, 0%, 100%, 0.1);
    --systemQuinary-onLight: rgba(0, 0, 0, 0.1);
    --systemQuinary-onDark: hsla(0, 0%, 100%, 0.1);
    --systemGray2: #7c7c80;
    --systemGray2-onLight: #8e8e93;
    --systemGray2-onDark: #7c7c80;
    --systemGray3: #545456;
    --systemGray3-onLight: #aeaeb2;
    --systemGray3-onDark: #545456;
    --systemGray4: #444446;
    --systemGray4-onLight: #bcbcc0;
    --systemGray4-onDark: #444446;
    --systemGray5: #363638;
    --systemGray5-onLight: #d8d8dc;
    --systemGray5-onDark: #363638;
    --systemGray6: #242426;
    --systemGray6-onLight: #ebebf0;
    --systemGray6-onDark: #242426;
    --keyColor: #fa586a;
    --keyColor-rgb: 250, 88, 106;
    --keyColor-rollover: #ff8a9c;
    --keyColor-rollover-rgb: 255, 138, 156;
    --keyColor-pressed: #ff7183;
    --keyColor-pressed-rgb: 255, 113, 131;
    --keyColor-deepPressed: #ff8a9c;
    --keyColor-deepPressed-rgb: 255, 138, 156;
    --keyColor-disabled: rgba(250, 88, 106, 0.35);
    --systemStandardUltrathinMaterialSover: #000;
    --systemStandardUltrathinMaterialSover-inactive: #141414;
    --systemStandardThinMaterialSover: #0a0a0a;
    --systemStandardThinMaterialSover-inactive: #141414;
    --systemStandardMediumMaterialSover: #141414;
    --systemStandardMediumMaterialSover-inactive: #141414;
    --systemStandardThickMaterialSover: #1e1e1e;
    --systemStandardThickMaterialSover-inactive: #141414;
    --systemStandardUltrathickMaterialSover: #282828;
    --systemStandardUltrathickMaterialSover-inactive: #141414;
    --systemHeaderMaterialSover: #1e1e1e;
    --systemToolbarTitlebarMaterialSover: #262626;
    --systemToolbarTitlebarMaterialSover-inactive: #141414;
    --miniPlayerBackground: #282828;
    --playerBackgroundFallback: #282828;
    --playerBackground: #282828;
    --navSidebarBG: #282828;
    --segmentedControlBG: hsla(0, 0%, 100%, 0.24);
    --segmentedControlSelectedText: #000;
    --segmentedControlSelectedBG: #fff;
    --segmentedControlActiveBG: rgba(255, 255, 240, 0.9);
    --musicKeyColor: #fa586a;
    --musicKeyColor-rollover: #ff8a9c;
    --musicKeyColor-pressed: #ff7183;
    --musicKeyColor-deepPressed: #ff8a9c;
    --musicKeyColor-disabled: rgba(250, 88, 106, 0.35);
    --text70: hsla(0, 0%, 100%, 0.9);
    --text80: hsla(0, 0%, 100%, 0.95);
    --tracklistAltRowColor: hsla(0, 0%, 100%, 0.05);
    --tracklistHoverColor: hsla(0, 0%, 100%, 0.1);
    --tracklistWorksTrackHoverColor: hsla(0, 0%, 100%, 0.18);
    --keyColorBG: #d60017;
    --selectionColor: #a60012;
  }
}
@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  :host {
    --systemRed: #ff6961;
    --systemRed-vibrant: #ff4136;
    --systemOrange: #ffb340;
    --systemOrange-vibrant: #ffb340;
    --systemYellow: #ffd426;
    --systemYellow-vibrant: #ffd426;
    --systemGreen: #31de4b;
    --systemGreen-vibrant: #31de4b;
    --systemMint: #63e6e2;
    --systemMint-vibrant: #63e6e2;
    --systemTeal: #5de6ff;
    --systemTeal-vibrant: #5de6ff;
    --systemCyan: #70d7ff;
    --systemCyan-vibrant: #70d7ff;
    --systemBlue: #409cff;
    --systemBlue-vibrant: #409cff;
    --systemIndigo: #7d7aff;
    --systemIndigo-vibrant: #7d7aff;
    --systemPurple: #da8fff;
    --systemPurple-vibrant: #da8fff;
    --systemPink: #ff6482;
    --systemPink-vibrant: #ff3a5f;
    --systemBrown: #b59469;
    --systemBrown-vibrant: #b59469;
    --systemGray: #98989d;
    --systemGray-vibrant: #98989d;
    --systemPrimary: #fff;
    --systemPrimary-vibrant: #fff;
    --systemPrimary-onLight: #000;
    --systemPrimary-onDark: #fff;
    --systemSecondary: hsla(0, 0%, 100%, 0.7);
    --systemSecondary-vibrant: hsla(0, 0%, 100%, 0.7);
    --systemSecondary-onLight: rgba(0, 0, 0, 0.76);
    --systemSecondary-onDark: hsla(0, 0%, 100%, 0.7);
    --systemTertiary: hsla(0, 0%, 100%, 0.5);
    --systemTertiary-vibrant: hsla(0, 0%, 100%, 0.5);
    --systemTertiary-onLight: rgba(0, 0, 0, 0.56);
    --systemTertiary-onDark: hsla(0, 0%, 100%, 0.5);
    --systemQuaternary: hsla(0, 0%, 100%, 0.3);
    --systemQuaternary-vibrant: hsla(0, 0%, 100%, 0.3);
    --systemQuaternary-onLight: rgba(0, 0, 0, 0.35);
    --systemQuaternary-onDark: hsla(0, 0%, 100%, 0.3);
    --systemQuinary: hsla(0, 0%, 100%, 0.1);
    --systemQuinary-vibrant: hsla(0, 0%, 100%, 0.1);
    --systemQuinary-onLight: rgba(0, 0, 0, 0.1);
    --systemQuinary-onDark: hsla(0, 0%, 100%, 0.1);
    --systemGray2: #7c7c80;
    --systemGray2-onLight: #8e8e93;
    --systemGray2-onDark: #7c7c80;
    --systemGray3: #545456;
    --systemGray3-onLight: #aeaeb2;
    --systemGray3-onDark: #545456;
    --systemGray4: #444446;
    --systemGray4-onLight: #bcbcc0;
    --systemGray4-onDark: #444446;
    --systemGray5: #363638;
    --systemGray5-onLight: #d8d8dc;
    --systemGray5-onDark: #363638;
    --systemGray6: #242426;
    --systemGray6-onLight: #ebebf0;
    --systemGray6-onDark: #242426;
    --keyColor: #fa586a;
    --keyColor-rgb: 250, 88, 106;
    --keyColor-rollover: #ff8a9c;
    --keyColor-rollover-rgb: 255, 138, 156;
    --keyColor-pressed: #ff7183;
    --keyColor-pressed-rgb: 255, 113, 131;
    --keyColor-deepPressed: #ff8a9c;
    --keyColor-deepPressed-rgb: 255, 138, 156;
    --keyColor-disabled: rgba(250, 88, 106, 0.35);
    --systemStandardUltrathinMaterialSover: #000;
    --systemStandardUltrathinMaterialSover-inactive: #141414;
    --systemStandardThinMaterialSover: #0a0a0a;
    --systemStandardThinMaterialSover-inactive: #141414;
    --systemStandardMediumMaterialSover: #141414;
    --systemStandardMediumMaterialSover-inactive: #141414;
    --systemStandardThickMaterialSover: #1e1e1e;
    --systemStandardThickMaterialSover-inactive: #141414;
    --systemStandardUltrathickMaterialSover: #282828;
    --systemStandardUltrathickMaterialSover-inactive: #141414;
    --systemHeaderMaterialSover: #1e1e1e;
    --systemToolbarTitlebarMaterialSover: #262626;
    --systemToolbarTitlebarMaterialSover-inactive: #141414;
    --miniPlayerBackground: #282828;
    --playerBackgroundFallback: #282828;
    --playerBackground: #282828;
    --navSidebarBG: #282828;
    --segmentedControlBG: hsla(0, 0%, 100%, 0.24);
    --segmentedControlSelectedText: #000;
    --segmentedControlSelectedBG: #fff;
    --segmentedControlActiveBG: rgba(255, 255, 240, 0.9);
    --musicKeyColor: #fa586a;
    --musicKeyColor-rollover: #ff8a9c;
    --musicKeyColor-pressed: #ff7183;
    --musicKeyColor-deepPressed: #ff8a9c;
    --musicKeyColor-disabled: rgba(250, 88, 106, 0.35);
    --text70: hsla(0, 0%, 100%, 0.9);
    --text80: hsla(0, 0%, 100%, 0.95);
    --tracklistAltRowColor: hsla(0, 0%, 100%, 0.05);
    --tracklistHoverColor: hsla(0, 0%, 100%, 0.1);
    --tracklistWorksTrackHoverColor: hsla(0, 0%, 100%, 0.18);
    --keyColorBG: #d60017;
    --selectionColor: #a60012;
  }
}
:host {
  --viewport-grid-layout: 'grid-layout:xs-1';
  --viewport-sidebar: 'sidebar:hidden';
  --viewport-search-landing-grid: 'search-landing-grid:1';
  --viewport-default: 'xsmall';
  --viewport-lyrics-fullscreen: 'lyrics-fullscreen:xsmall';
  --viewport-text-fullscreen: 'text-fullscreen:xsmall';
}
@media (min-width: 415px) {
  :host {
    --viewport-grid-layout: 'grid-layout:xs-2';
  }
}
@media (min-width: 484px) {
  :host {
    --viewport-sidebar: 'sidebar:visible';
  }
}
@media (min-width: 484px) {
  :host {
    --viewport-grid-layout: 'grid-layout:xs-1-sidebar';
  }
}
@media (min-width: 607px) {
  :host {
    --viewport-search-landing-grid: 'search-landing-grid:2';
  }
}
@media (min-width: 484px) {
  :host {
    --viewport-sidebar: 'sidebar:constrained-visible';
  }
}
@media (min-width: 767.32px) {
  :host {
    --viewport-sidebar: 'sidebar:large-visible';
  }
}
@media (min-width: 1000px) {
  :host {
    --viewport-default: 'small';
  }
}
@media (min-width: 1260px) {
  :host {
    --viewport-default: 'medium';
  }
}
@media (min-width: 1580px) {
  :host {
    --viewport-default: 'large';
  }
}
@media (min-width: 1940px) {
  :host {
    --viewport-default: 'xlarge';
  }
}
@media (min-width: 484px) {
  :host {
    --viewport-search-landing-grid: 'search-landing-grid:1-sidebar';
  }
}
@media (min-width: 980px) {
  :host {
    --viewport-lyrics-fullscreen: 'lyrics-fullscreen:small';
  }
}
@media (min-width: 1320px) {
  :host {
    --viewport-lyrics-fullscreen: 'lyrics-fullscreen:medium';
  }
}
@media (min-width: 1680px) {
  :host {
    --viewport-lyrics-fullscreen: 'lyrics-fullscreen:large';
  }
}
@media (min-width: 2000px) {
  :host {
    --viewport-lyrics-fullscreen: 'lyrics-fullscreen:xlarge';
  }
}
@media (min-width: 2561px) {
  :host {
    --viewport-lyrics-fullscreen: 'lyrics-fullscreen:xxlarge';
  }
}
@media (min-width: 980px) {
  :host {
    --viewport-text-fullscreen: 'text-fullscreen:small';
  }
}
@media (min-width: 1320px) {
  :host {
    --viewport-text-fullscreen: 'text-fullscreen:medium';
  }
}
@media (min-width: 1680px) {
  :host {
    --viewport-text-fullscreen: 'text-fullscreen:large';
  }
}
@media (min-width: 2000px) {
  :host {
    --viewport-text-fullscreen: 'text-fullscreen:xlarge';
  }
}
@media (min-width: 2561px) {
  :host {
    --viewport-text-fullscreen: 'text-fullscreen:xxlarge';
  }
}
@media (min-width: 739px) {
  :host {
    --viewport-song-shift-layout: 'song-shift-layout:modal';
  }
}
@media (min-width: 484px) {
  :host {
    --viewport-song-shift-layout: 'song-shift-layout:status';
  }
}
:host {
  --sk-body-text-color: var(--bodyTextColor, var(--systemPrimary));
  --sk-headline-text-color: var(--bodyTextColor, var(--systemPrimary));
}
html {
  --font-family: -apple-system, BlinkMacSystemFont, Apple Color Emoji, SF Pro,
    SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Apple Color Emoji,
    SF Pro,
    SF Pro Icons,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 106.25%;
  quotes: '“' '”';
}
html {
  --monogram-font-family: ui-rounded, -apple-system, BlinkMacSystemFont,
    Apple Color Emoji, SF Pro, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  --live-badge-font-family: ui-rounded, -apple-system, BlinkMacSystemFont,
    Apple Color Emoji, SF Pro, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  --live-badge-large-font-family: ui-rounded, -apple-system, BlinkMacSystemFont,
    Apple Color Emoji, SF Pro, SF Pro Icons, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}
:host {
  --headline: 700 13px / var(--headline-line-height, 1.2307692308)
    var(
      --headline-font-family-locale,
      var(--headline-font-family, var(--font-family))
    );
  --callout: 400 12px / var(--callout-line-height, 1.25)
    var(
      --callout-font-family-locale,
      var(--callout-font-family, var(--font-family))
    );
  --body: 400 13px / var(--body-line-height, 1.2307692308)
    var(--body-font-family-locale, var(--body-font-family, var(--font-family)));
  --large-title: 400 26px / var(--large-title-line-height, 1.2307692308)
    var(
      --large-title-font-family-locale,
      var(--large-title-font-family, var(--font-family))
    );
  --title-1: 400 22px / var(--title-1-line-height, 1.1818181818)
    var(
      --title-1-font-family-locale,
      var(--title-1-font-family, var(--font-family))
    );
  --title-2: 400 17px / var(--title-2-line-height, 1.2941176471)
    var(
      --title-2-font-family-locale,
      var(--title-2-font-family, var(--font-family))
    );
  --title-3: 400 15px / var(--title-3-line-height, 1.3333833333)
    var(
      --title-3-font-family-locale,
      var(--title-3-font-family, var(--font-family))
    );
  --subhead: 400 11px / var(--subhead-line-height, 1.2727272727)
    var(
      --subhead-font-family-locale,
      var(--subhead-font-family, var(--font-family))
    );
  --footnote: 400 10px / var(--footnote-line-height, 1.3)
    var(
      --footnote-font-family-locale,
      var(--footnote-font-family, var(--font-family))
    );
  --caption-1: 400 10px / var(--caption-1-line-height, 1.3)
    var(
      --caption-1-font-family-locale,
      var(--caption-1-font-family, var(--font-family))
    );
  --caption-2: 500 10px / var(--caption-2-line-height, 1.3)
    var(
      --caption-2-font-family-locale,
      var(--caption-2-font-family, var(--font-family))
    );
  --large-title-emphasized: 700 26px /
    var(--large-title-emphasized-line-height, 1.2307692308)
    var(
      --large-title-emphasized-font-family-locale,
      var(--large-title-emphasized-font-family, var(--font-family))
    );
  --title-1-emphasized: 700 22px /
    var(--title-1-emphasized-line-height, 1.1818181818)
    var(
      --title-1-emphasized-font-family-locale,
      var(--title-1-emphasized-font-family, var(--font-family))
    );
  --title-2-emphasized: 700 17px /
    var(--title-2-emphasized-line-height, 1.2941176471)
    var(
      --title-2-emphasized-font-family-locale,
      var(--title-2-emphasized-font-family, var(--font-family))
    );
  --title-3-emphasized: 600 15px /
    var(--title-3-emphasized-line-height, 1.3333833333)
    var(
      --title-3-emphasized-font-family-locale,
      var(--title-3-emphasized-font-family, var(--font-family))
    );
  --headline-emphasized: 800 13px /
    var(--headline-emphasized-line-height, 1.2307692308)
    var(
      --headline-emphasized-font-family-locale,
      var(--headline-emphasized-font-family, var(--font-family))
    );
  --body-emphasized: 600 13px / var(--body-emphasized-line-height, 1.2307692308)
    var(
      --body-emphasized-font-family-locale,
      var(--body-emphasized-font-family, var(--font-family))
    );
  --callout-emphasized: 600 12px / var(--callout-emphasized-line-height, 1.25)
    var(
      --callout-emphasized-font-family-locale,
      var(--callout-emphasized-font-family, var(--font-family))
    );
  --subhead-emphasized: 600 11px /
    var(--subhead-emphasized-line-height, 1.2727272727)
    var(
      --subhead-emphasized-font-family-locale,
      var(--subhead-emphasized-font-family, var(--font-family))
    );
  --footnote-emphasized: 600 10px / var(--footnote-emphasized-line-height, 1.3)
    var(
      --footnote-emphasized-font-family-locale,
      var(--footnote-emphasized-font-family, var(--font-family))
    );
  --caption-1-emphasized: 500 10px /
    var(--caption-1-emphasized-line-height, 1.3)
    var(
      --caption-1-emphasized-font-family-locale,
      var(--caption-1-emphasized-font-family, var(--font-family))
    );
  --caption-2-emphasized: 600 10px /
    var(--caption-2-emphasized-line-height, 1.3)
    var(
      --caption-2-emphasized-font-family-locale,
      var(--caption-2-emphasized-font-family, var(--font-family))
    );
  --large-title-tall: 400 26px /
    var(--large-title-tall-line-height, 1.3077523077)
    var(
      --large-title-tall-font-family-locale,
      var(--large-title-tall-font-family, var(--font-family))
    );
  --title-1-tall: 400 22px / var(--title-1-tall-line-height, 1.2727272727)
    var(
      --title-1-tall-font-family-locale,
      var(--title-1-tall-font-family, var(--font-family))
    );
  --title-2-tall: 400 17px / var(--title-2-tall-line-height, 1.4118447059)
    var(
      --title-2-tall-font-family-locale,
      var(--title-2-tall-font-family, var(--font-family))
    );
  --title-3-tall: 400 15px / var(--title-3-tall-line-height, 1.4666666667)
    var(
      --title-3-tall-font-family-locale,
      var(--title-3-tall-font-family, var(--font-family))
    );
  --headline-tall: 700 13px / var(--headline-tall-line-height, 1.3846153846)
    var(
      --headline-tall-font-family-locale,
      var(--headline-tall-font-family, var(--font-family))
    );
  --body-tall: 400 13px / var(--body-tall-line-height, 1.3846153846)
    var(
      --body-tall-font-family-locale,
      var(--body-tall-font-family, var(--font-family))
    );
  --callout-tall: 400 12px / var(--callout-tall-line-height, 1.4166666667)
    var(
      --callout-tall-font-family-locale,
      var(--callout-tall-font-family, var(--font-family))
    );
  --subhead-tall: 400 11px / var(--subhead-tall-line-height, 1.4545454545)
    var(
      --subhead-tall-font-family-locale,
      var(--subhead-tall-font-family, var(--font-family))
    );
  --footnote-tall: 400 10px / var(--footnote-tall-line-height, 1.5)
    var(
      --footnote-tall-font-family-locale,
      var(--footnote-tall-font-family, var(--font-family))
    );
  --caption-1-tall: 400 10px / var(--caption-1-tall-line-height, 1.5)
    var(
      --caption-1-tall-font-family-locale,
      var(--caption-1-tall-font-family, var(--font-family))
    );
  --caption-2-tall: 500 10px / var(--caption-2-tall-line-height, 1.5)
    var(
      --caption-2-tall-font-family-locale,
      var(--caption-2-tall-font-family, var(--font-family))
    );
  --large-title-short: 400 26px /
    var(--large-title-short-line-height, 1.1538461538)
    var(
      --large-title-short-font-family-locale,
      var(--large-title-short-font-family, var(--font-family))
    );
  --title-1-short: 400 22px / var(--title-1-short-line-height, 1.0909090909)
    var(
      --title-1-short-font-family-locale,
      var(--title-1-short-font-family, var(--font-family))
    );
  --title-2-short: 400 17px / var(--title-2-short-line-height, 1.1764805882)
    var(
      --title-2-short-font-family-locale,
      var(--title-2-short-font-family, var(--font-family))
    );
  --title-3-short: 400 15px / var(--title-3-short-line-height, 1.2)
    var(
      --title-3-short-font-family-locale,
      var(--title-3-short-font-family, var(--font-family))
    );
  --headline-short: 700 13px / var(--headline-short-line-height, 1.0769630769)
    var(
      --headline-short-font-family-locale,
      var(--headline-short-font-family, var(--font-family))
    );
  --body-short: 400 13px / var(--body-short-line-height, 1.0769630769)
    var(
      --body-short-font-family-locale,
      var(--body-short-font-family, var(--font-family))
    );
  --callout-short: 400 12px / var(--callout-short-line-height, 1.0833733333)
    var(
      --callout-short-font-family-locale,
      var(--callout-short-font-family, var(--font-family))
    );
  --subhead-short: 400 11px / var(--subhead-short-line-height, 1.0909090909)
    var(
      --subhead-short-font-family-locale,
      var(--subhead-short-font-family, var(--font-family))
    );
  --footnote-short: 400 10px / var(--footnote-short-line-height, 1.1)
    var(
      --footnote-short-font-family-locale,
      var(--footnote-short-font-family, var(--font-family))
    );
  --caption-1-short: 400 10px / var(--caption-1-short-line-height, 1.1)
    var(
      --caption-1-short-font-family-locale,
      var(--caption-1-short-font-family, var(--font-family))
    );
  --caption-2-short: 500 10px / var(--caption-2-short-line-height, 1.1)
    var(
      --caption-2-short-font-family-locale,
      var(--caption-2-short-font-family, var(--font-family))
    );
  --large-title-emphasized-tall: 700 26px /
    var(--large-title-emphasized-tall-line-height, 1.3077523077)
    var(
      --large-title-emphasized-tall-font-family-locale,
      var(--large-title-emphasized-tall-font-family, var(--font-family))
    );
  --title-1-emphasized-tall: 700 22px /
    var(--title-1-emphasized-tall-line-height, 1.2727272727)
    var(
      --title-1-emphasized-tall-font-family-locale,
      var(--title-1-emphasized-tall-font-family, var(--font-family))
    );
  --title-2-emphasized-tall: 700 17px /
    var(--title-2-emphasized-tall-line-height, 1.4118447059)
    var(
      --title-2-emphasized-tall-font-family-locale,
      var(--title-2-emphasized-tall-font-family, var(--font-family))
    );
  --title-3-emphasized-tall: 600 15px /
    var(--title-3-emphasized-tall-line-height, 1.4666666667)
    var(
      --title-3-emphasized-tall-font-family-locale,
      var(--title-3-emphasized-tall-font-family, var(--font-family))
    );
  --headline-emphasized-tall: 800 13px /
    var(--headline-emphasized-tall-line-height, 1.3846153846)
    var(
      --headline-emphasized-tall-font-family-locale,
      var(--headline-emphasized-tall-font-family, var(--font-family))
    );
  --body-emphasized-tall: 600 13px /
    var(--body-emphasized-tall-line-height, 1.3846153846)
    var(
      --body-emphasized-tall-font-family-locale,
      var(--body-emphasized-tall-font-family, var(--font-family))
    );
  --callout-emphasized-tall: 600 12px /
    var(--callout-emphasized-tall-line-height, 1.4166666667)
    var(
      --callout-emphasized-tall-font-family-locale,
      var(--callout-emphasized-tall-font-family, var(--font-family))
    );
  --subhead-emphasized-tall: 600 11px /
    var(--subhead-emphasized-tall-line-height, 1.4545454545)
    var(
      --subhead-emphasized-tall-font-family-locale,
      var(--subhead-emphasized-tall-font-family, var(--font-family))
    );
  --footnote-emphasized-tall: 600 10px /
    var(--footnote-emphasized-tall-line-height, 1.5)
    var(
      --footnote-emphasized-tall-font-family-locale,
      var(--footnote-emphasized-tall-font-family, var(--font-family))
    );
  --caption-1-emphasized-tall: 500 10px /
    var(--caption-1-emphasized-tall-line-height, 1.5)
    var(
      --caption-1-emphasized-tall-font-family-locale,
      var(--caption-1-emphasized-tall-font-family, var(--font-family))
    );
  --caption-2-emphasized-tall: 600 10px /
    var(--caption-2-emphasized-tall-line-height, 1.5)
    var(
      --caption-2-emphasized-tall-font-family-locale,
      var(--caption-2-emphasized-tall-font-family, var(--font-family))
    );
  --large-title-emphasized-short: 700 26px /
    var(--large-title-emphasized-short-line-height, 1.1538461538)
    var(
      --large-title-emphasized-short-font-family-locale,
      var(--large-title-emphasized-short-font-family, var(--font-family))
    );
  --title-1-emphasized-short: 700 22px /
    var(--title-1-emphasized-short-line-height, 1.0909090909)
    var(
      --title-1-emphasized-short-font-family-locale,
      var(--title-1-emphasized-short-font-family, var(--font-family))
    );
  --title-2-emphasized-short: 700 17px /
    var(--title-2-emphasized-short-line-height, 1.1764805882)
    var(
      --title-2-emphasized-short-font-family-locale,
      var(--title-2-emphasized-short-font-family, var(--font-family))
    );
  --title-3-emphasized-short: 600 15px /
    var(--title-3-emphasized-short-line-height, 1.2)
    var(
      --title-3-emphasized-short-font-family-locale,
      var(--title-3-emphasized-short-font-family, var(--font-family))
    );
  --headline-emphasized-short: 800 13px /
    var(--headline-emphasized-short-line-height, 1.0769630769)
    var(
      --headline-emphasized-short-font-family-locale,
      var(--headline-emphasized-short-font-family, var(--font-family))
    );
  --body-emphasized-short: 600 13px /
    var(--body-emphasized-short-line-height, 1.0769630769)
    var(
      --body-emphasized-short-font-family-locale,
      var(--body-emphasized-short-font-family, var(--font-family))
    );
  --callout-emphasized-short: 600 12px /
    var(--callout-emphasized-short-line-height, 1.0833733333)
    var(
      --callout-emphasized-short-font-family-locale,
      var(--callout-emphasized-short-font-family, var(--font-family))
    );
  --subhead-emphasized-short: 600 11px /
    var(--subhead-emphasized-short-line-height, 1.0909090909)
    var(
      --subhead-emphasized-short-font-family-locale,
      var(--subhead-emphasized-short-font-family, var(--font-family))
    );
  --footnote-emphasized-short: 600 10px /
    var(--footnote-emphasized-short-line-height, 1.1)
    var(
      --footnote-emphasized-short-font-family-locale,
      var(--footnote-emphasized-short-font-family, var(--font-family))
    );
  --caption-1-emphasized-short: 500 10px /
    var(--caption-1-emphasized-short-line-height, 1.1)
    var(
      --caption-1-emphasized-short-font-family-locale,
      var(--caption-1-emphasized-short-font-family, var(--font-family))
    );
  --caption-2-emphasized-short: 600 10px /
    var(--caption-2-emphasized-short-line-height, 1.1)
    var(
      --caption-2-emphasized-short-font-family-locale,
      var(--caption-2-emphasized-short-font-family, var(--font-family))
    );
  --header: 400 34px / var(--header-line-height, 1.1764905882)
    var(
      --header-font-family-locale,
      var(--header-font-family, var(--font-family))
    );
  --header-emphasized: 700 34px /
    var(--header-emphasized-line-height, 1.1764905882)
    var(
      --header-emphasized-font-family-locale,
      var(--header-emphasized-font-family, var(--font-family))
    );
  --large-title-medium: 500 26px /
    var(--large-title-medium-line-height, 1.2307692308)
    var(
      --large-title-medium-font-family-locale,
      var(--large-title-medium-font-family, var(--font-family))
    );
  --title-1-medium: 500 22px / var(--title-1-medium-line-height, 1.1818181818)
    var(
      --title-1-medium-font-family-locale,
      var(--title-1-medium-font-family, var(--font-family))
    );
  --title-2-medium: 500 17px / var(--title-2-medium-line-height, 1.2941176471)
    var(
      --title-2-medium-font-family-locale,
      var(--title-2-medium-font-family, var(--font-family))
    );
  --title-3-medium: 500 15px / var(--title-3-medium-line-height, 1.3333833333)
    var(
      --title-3-medium-font-family-locale,
      var(--title-3-medium-font-family, var(--font-family))
    );
  --headline-medium: 500 13px / var(--headline-medium-line-height, 1.2307692308)
    var(
      --headline-medium-font-family-locale,
      var(--headline-medium-font-family, var(--font-family))
    );
  --body-medium: 500 13px / var(--body-medium-line-height, 1.2307692308)
    var(
      --body-medium-font-family-locale,
      var(--body-medium-font-family, var(--font-family))
    );
  --callout-medium: 500 12px / var(--callout-medium-line-height, 1.25)
    var(
      --callout-medium-font-family-locale,
      var(--callout-medium-font-family, var(--font-family))
    );
  --subhead-medium: 500 11px / var(--subhead-medium-line-height, 1.2727272727)
    var(
      --subhead-medium-font-family-locale,
      var(--subhead-medium-font-family, var(--font-family))
    );
  --footnote-medium: 500 10px / var(--footnote-medium-line-height, 1.3)
    var(
      --footnote-medium-font-family-locale,
      var(--footnote-medium-font-family, var(--font-family))
    );
  --caption-1-medium: 500 10px / var(--caption-1-medium-line-height, 1.3)
    var(
      --caption-1-medium-font-family-locale,
      var(--caption-1-medium-font-family, var(--font-family))
    );
  --caption-2-medium: 500 10px / var(--caption-2-medium-line-height, 1.3)
    var(
      --caption-2-medium-font-family-locale,
      var(--caption-2-medium-font-family, var(--font-family))
    );
  --large-title-semibold: 600 26px /
    var(--large-title-semibold-line-height, 1.2307692308)
    var(
      --large-title-semibold-font-family-locale,
      var(--large-title-semibold-font-family, var(--font-family))
    );
  --title-1-semibold: 600 22px /
    var(--title-1-semibold-line-height, 1.1818181818)
    var(
      --title-1-semibold-font-family-locale,
      var(--title-1-semibold-font-family, var(--font-family))
    );
  --title-2-semibold: 600 17px /
    var(--title-2-semibold-line-height, 1.2941176471)
    var(
      --title-2-semibold-font-family-locale,
      var(--title-2-semibold-font-family, var(--font-family))
    );
  --title-3-semibold: 600 15px /
    var(--title-3-semibold-line-height, 1.3333833333)
    var(
      --title-3-semibold-font-family-locale,
      var(--title-3-semibold-font-family, var(--font-family))
    );
  --headline-semibold: 600 13px /
    var(--headline-semibold-line-height, 1.2307692308)
    var(
      --headline-semibold-font-family-locale,
      var(--headline-semibold-font-family, var(--font-family))
    );
  --body-semibold: 600 13px / var(--body-semibold-line-height, 1.2307692308)
    var(
      --body-semibold-font-family-locale,
      var(--body-semibold-font-family, var(--font-family))
    );
  --callout-semibold: 600 12px / var(--callout-semibold-line-height, 1.25)
    var(
      --callout-semibold-font-family-locale,
      var(--callout-semibold-font-family, var(--font-family))
    );
  --subhead-semibold: 600 11px /
    var(--subhead-semibold-line-height, 1.2727272727)
    var(
      --subhead-semibold-font-family-locale,
      var(--subhead-semibold-font-family, var(--font-family))
    );
  --footnote-semibold: 600 10px / var(--footnote-semibold-line-height, 1.3)
    var(
      --footnote-semibold-font-family-locale,
      var(--footnote-semibold-font-family, var(--font-family))
    );
  --caption-1-semibold: 600 10px / var(--caption-1-semibold-line-height, 1.3)
    var(
      --caption-1-semibold-font-family-locale,
      var(--caption-1-semibold-font-family, var(--font-family))
    );
  --caption-2-semibold: 600 10px / var(--caption-2-semibold-line-height, 1.3)
    var(
      --caption-2-semibold-font-family-locale,
      var(--caption-2-semibold-font-family, var(--font-family))
    );
  --large-title-bold: 700 26px /
    var(--large-title-bold-line-height, 1.2307692308)
    var(
      --large-title-bold-font-family-locale,
      var(--large-title-bold-font-family, var(--font-family))
    );
  --title-1-bold: 700 22px / var(--title-1-bold-line-height, 1.1818181818)
    var(
      --title-1-bold-font-family-locale,
      var(--title-1-bold-font-family, var(--font-family))
    );
  --title-2-bold: 700 17px / var(--title-2-bold-line-height, 1.2941176471)
    var(
      --title-2-bold-font-family-locale,
      var(--title-2-bold-font-family, var(--font-family))
    );
  --title-3-bold: 700 15px / var(--title-3-bold-line-height, 1.3333833333)
    var(
      --title-3-bold-font-family-locale,
      var(--title-3-bold-font-family, var(--font-family))
    );
  --headline-bold: 700 13px / var(--headline-bold-line-height, 1.2307692308)
    var(
      --headline-bold-font-family-locale,
      var(--headline-bold-font-family, var(--font-family))
    );
  --body-bold: 700 13px / var(--body-bold-line-height, 1.2307692308)
    var(
      --body-bold-font-family-locale,
      var(--body-bold-font-family, var(--font-family))
    );
  --callout-bold: 700 12px / var(--callout-bold-line-height, 1.25)
    var(
      --callout-bold-font-family-locale,
      var(--callout-bold-font-family, var(--font-family))
    );
  --subhead-bold: 700 11px / var(--subhead-bold-line-height, 1.2727272727)
    var(
      --subhead-bold-font-family-locale,
      var(--subhead-bold-font-family, var(--font-family))
    );
  --footnote-bold: 700 10px / var(--footnote-bold-line-height, 1.3)
    var(
      --footnote-bold-font-family-locale,
      var(--footnote-bold-font-family, var(--font-family))
    );
  --caption-1-bold: 700 10px / var(--caption-1-bold-line-height, 1.3)
    var(
      --caption-1-bold-font-family-locale,
      var(--caption-1-bold-font-family, var(--font-family))
    );
  --caption-2-bold: 700 10px / var(--caption-2-bold-line-height, 1.3)
    var(
      --caption-2-bold-font-family-locale,
      var(--caption-2-bold-font-family, var(--font-family))
    );
  --large-title-heavy: 800 26px /
    var(--large-title-heavy-line-height, 1.2307692308)
    var(
      --large-title-heavy-font-family-locale,
      var(--large-title-heavy-font-family, var(--font-family))
    );
  --title-1-heavy: 800 22px / var(--title-1-heavy-line-height, 1.1818181818)
    var(
      --title-1-heavy-font-family-locale,
      var(--title-1-heavy-font-family, var(--font-family))
    );
  --title-2-heavy: 800 17px / var(--title-2-heavy-line-height, 1.2941176471)
    var(
      --title-2-heavy-font-family-locale,
      var(--title-2-heavy-font-family, var(--font-family))
    );
  --title-3-heavy: 800 15px / var(--title-3-heavy-line-height, 1.3333833333)
    var(
      --title-3-heavy-font-family-locale,
      var(--title-3-heavy-font-family, var(--font-family))
    );
  --headline-heavy: 800 13px / var(--headline-heavy-line-height, 1.2307692308)
    var(
      --headline-heavy-font-family-locale,
      var(--headline-heavy-font-family, var(--font-family))
    );
  --body-heavy: 800 13px / var(--body-heavy-line-height, 1.2307692308)
    var(
      --body-heavy-font-family-locale,
      var(--body-heavy-font-family, var(--font-family))
    );
  --callout-heavy: 800 12px / var(--callout-heavy-line-height, 1.25)
    var(
      --callout-heavy-font-family-locale,
      var(--callout-heavy-font-family, var(--font-family))
    );
  --subhead-heavy: 800 11px / var(--subhead-heavy-line-height, 1.2727272727)
    var(
      --subhead-heavy-font-family-locale,
      var(--subhead-heavy-font-family, var(--font-family))
    );
  --footnote-heavy: 800 10px / var(--footnote-heavy-line-height, 1.3)
    var(
      --footnote-heavy-font-family-locale,
      var(--footnote-heavy-font-family, var(--font-family))
    );
  --caption-1-heavy: 800 10px / var(--caption-1-heavy-line-height, 1.3)
    var(
      --caption-1-heavy-font-family-locale,
      var(--caption-1-heavy-font-family, var(--font-family))
    );
  --caption-2-heavy: 800 10px / var(--caption-2-heavy-line-height, 1.3)
    var(
      --caption-2-heavy-font-family-locale,
      var(--caption-2-heavy-font-family, var(--font-family))
    );
  --large-title-medium-tall: 500 26px /
    var(--large-title-medium-tall-line-height, 1.3077523077)
    var(
      --large-title-medium-tall-font-family-locale,
      var(--large-title-medium-tall-font-family, var(--font-family))
    );
  --title-1-medium-tall: 500 22px /
    var(--title-1-medium-tall-line-height, 1.2727272727)
    var(
      --title-1-medium-tall-font-family-locale,
      var(--title-1-medium-tall-font-family, var(--font-family))
    );
  --title-2-medium-tall: 500 17px /
    var(--title-2-medium-tall-line-height, 1.4118447059)
    var(
      --title-2-medium-tall-font-family-locale,
      var(--title-2-medium-tall-font-family, var(--font-family))
    );
  --title-3-medium-tall: 500 15px /
    var(--title-3-medium-tall-line-height, 1.4666666667)
    var(
      --title-3-medium-tall-font-family-locale,
      var(--title-3-medium-tall-font-family, var(--font-family))
    );
  --headline-medium-tall: 500 13px /
    var(--headline-medium-tall-line-height, 1.3846153846)
    var(
      --headline-medium-tall-font-family-locale,
      var(--headline-medium-tall-font-family, var(--font-family))
    );
  --body-medium-tall: 500 13px /
    var(--body-medium-tall-line-height, 1.3846153846)
    var(
      --body-medium-tall-font-family-locale,
      var(--body-medium-tall-font-family, var(--font-family))
    );
  --callout-medium-tall: 500 12px /
    var(--callout-medium-tall-line-height, 1.4166666667)
    var(
      --callout-medium-tall-font-family-locale,
      var(--callout-medium-tall-font-family, var(--font-family))
    );
  --subhead-medium-tall: 500 11px /
    var(--subhead-medium-tall-line-height, 1.4545454545)
    var(
      --subhead-medium-tall-font-family-locale,
      var(--subhead-medium-tall-font-family, var(--font-family))
    );
  --footnote-medium-tall: 500 10px /
    var(--footnote-medium-tall-line-height, 1.5)
    var(
      --footnote-medium-tall-font-family-locale,
      var(--footnote-medium-tall-font-family, var(--font-family))
    );
  --caption-1-medium-tall: 500 10px /
    var(--caption-1-medium-tall-line-height, 1.5)
    var(
      --caption-1-medium-tall-font-family-locale,
      var(--caption-1-medium-tall-font-family, var(--font-family))
    );
  --caption-2-medium-tall: 500 10px /
    var(--caption-2-medium-tall-line-height, 1.5)
    var(
      --caption-2-medium-tall-font-family-locale,
      var(--caption-2-medium-tall-font-family, var(--font-family))
    );
  --large-title-semibold-tall: 600 26px /
    var(--large-title-semibold-tall-line-height, 1.3077523077)
    var(
      --large-title-semibold-tall-font-family-locale,
      var(--large-title-semibold-tall-font-family, var(--font-family))
    );
  --title-1-semibold-tall: 600 22px /
    var(--title-1-semibold-tall-line-height, 1.2727272727)
    var(
      --title-1-semibold-tall-font-family-locale,
      var(--title-1-semibold-tall-font-family, var(--font-family))
    );
  --title-2-semibold-tall: 600 17px /
    var(--title-2-semibold-tall-line-height, 1.4118447059)
    var(
      --title-2-semibold-tall-font-family-locale,
      var(--title-2-semibold-tall-font-family, var(--font-family))
    );
  --title-3-semibold-tall: 600 15px /
    var(--title-3-semibold-tall-line-height, 1.4666666667)
    var(
      --title-3-semibold-tall-font-family-locale,
      var(--title-3-semibold-tall-font-family, var(--font-family))
    );
  --headline-semibold-tall: 600 13px /
    var(--headline-semibold-tall-line-height, 1.3846153846)
    var(
      --headline-semibold-tall-font-family-locale,
      var(--headline-semibold-tall-font-family, var(--font-family))
    );
  --body-semibold-tall: 600 13px /
    var(--body-semibold-tall-line-height, 1.3846153846)
    var(
      --body-semibold-tall-font-family-locale,
      var(--body-semibold-tall-font-family, var(--font-family))
    );
  --callout-semibold-tall: 600 12px /
    var(--callout-semibold-tall-line-height, 1.4166666667)
    var(
      --callout-semibold-tall-font-family-locale,
      var(--callout-semibold-tall-font-family, var(--font-family))
    );
  --subhead-semibold-tall: 600 11px /
    var(--subhead-semibold-tall-line-height, 1.4545454545)
    var(
      --subhead-semibold-tall-font-family-locale,
      var(--subhead-semibold-tall-font-family, var(--font-family))
    );
  --footnote-semibold-tall: 600 10px /
    var(--footnote-semibold-tall-line-height, 1.5)
    var(
      --footnote-semibold-tall-font-family-locale,
      var(--footnote-semibold-tall-font-family, var(--font-family))
    );
  --caption-1-semibold-tall: 600 10px /
    var(--caption-1-semibold-tall-line-height, 1.5)
    var(
      --caption-1-semibold-tall-font-family-locale,
      var(--caption-1-semibold-tall-font-family, var(--font-family))
    );
  --caption-2-semibold-tall: 600 10px /
    var(--caption-2-semibold-tall-line-height, 1.5)
    var(
      --caption-2-semibold-tall-font-family-locale,
      var(--caption-2-semibold-tall-font-family, var(--font-family))
    );
  --large-title-bold-tall: 700 26px /
    var(--large-title-bold-tall-line-height, 1.3077523077)
    var(
      --large-title-bold-tall-font-family-locale,
      var(--large-title-bold-tall-font-family, var(--font-family))
    );
  --title-1-bold-tall: 700 22px /
    var(--title-1-bold-tall-line-height, 1.2727272727)
    var(
      --title-1-bold-tall-font-family-locale,
      var(--title-1-bold-tall-font-family, var(--font-family))
    );
  --title-2-bold-tall: 700 17px /
    var(--title-2-bold-tall-line-height, 1.4118447059)
    var(
      --title-2-bold-tall-font-family-locale,
      var(--title-2-bold-tall-font-family, var(--font-family))
    );
  --title-3-bold-tall: 700 15px /
    var(--title-3-bold-tall-line-height, 1.4666666667)
    var(
      --title-3-bold-tall-font-family-locale,
      var(--title-3-bold-tall-font-family, var(--font-family))
    );
  --headline-bold-tall: 700 13px /
    var(--headline-bold-tall-line-height, 1.3846153846)
    var(
      --headline-bold-tall-font-family-locale,
      var(--headline-bold-tall-font-family, var(--font-family))
    );
  --body-bold-tall: 700 13px / var(--body-bold-tall-line-height, 1.3846153846)
    var(
      --body-bold-tall-font-family-locale,
      var(--body-bold-tall-font-family, var(--font-family))
    );
  --callout-bold-tall: 700 12px /
    var(--callout-bold-tall-line-height, 1.4166666667)
    var(
      --callout-bold-tall-font-family-locale,
      var(--callout-bold-tall-font-family, var(--font-family))
    );
  --subhead-bold-tall: 700 11px /
    var(--subhead-bold-tall-line-height, 1.4545454545)
    var(
      --subhead-bold-tall-font-family-locale,
      var(--subhead-bold-tall-font-family, var(--font-family))
    );
  --footnote-bold-tall: 700 10px / var(--footnote-bold-tall-line-height, 1.5)
    var(
      --footnote-bold-tall-font-family-locale,
      var(--footnote-bold-tall-font-family, var(--font-family))
    );
  --caption-1-bold-tall: 700 10px / var(--caption-1-bold-tall-line-height, 1.5)
    var(
      --caption-1-bold-tall-font-family-locale,
      var(--caption-1-bold-tall-font-family, var(--font-family))
    );
  --caption-2-bold-tall: 700 10px / var(--caption-2-bold-tall-line-height, 1.5)
    var(
      --caption-2-bold-tall-font-family-locale,
      var(--caption-2-bold-tall-font-family, var(--font-family))
    );
  --large-title-heavy-tall: 800 26px /
    var(--large-title-heavy-tall-line-height, 1.3077523077)
    var(
      --large-title-heavy-tall-font-family-locale,
      var(--large-title-heavy-tall-font-family, var(--font-family))
    );
  --title-1-heavy-tall: 800 22px /
    var(--title-1-heavy-tall-line-height, 1.2727272727)
    var(
      --title-1-heavy-tall-font-family-locale,
      var(--title-1-heavy-tall-font-family, var(--font-family))
    );
  --title-2-heavy-tall: 800 17px /
    var(--title-2-heavy-tall-line-height, 1.4118447059)
    var(
      --title-2-heavy-tall-font-family-locale,
      var(--title-2-heavy-tall-font-family, var(--font-family))
    );
  --title-3-heavy-tall: 800 15px /
    var(--title-3-heavy-tall-line-height, 1.4666666667)
    var(
      --title-3-heavy-tall-font-family-locale,
      var(--title-3-heavy-tall-font-family, var(--font-family))
    );
  --headline-heavy-tall: 800 13px /
    var(--headline-heavy-tall-line-height, 1.3846153846)
    var(
      --headline-heavy-tall-font-family-locale,
      var(--headline-heavy-tall-font-family, var(--font-family))
    );
  --body-heavy-tall: 800 13px / var(--body-heavy-tall-line-height, 1.3846153846)
    var(
      --body-heavy-tall-font-family-locale,
      var(--body-heavy-tall-font-family, var(--font-family))
    );
  --callout-heavy-tall: 800 12px /
    var(--callout-heavy-tall-line-height, 1.4166666667)
    var(
      --callout-heavy-tall-font-family-locale,
      var(--callout-heavy-tall-font-family, var(--font-family))
    );
  --subhead-heavy-tall: 800 11px /
    var(--subhead-heavy-tall-line-height, 1.4545454545)
    var(
      --subhead-heavy-tall-font-family-locale,
      var(--subhead-heavy-tall-font-family, var(--font-family))
    );
  --footnote-heavy-tall: 800 10px / var(--footnote-heavy-tall-line-height, 1.5)
    var(
      --footnote-heavy-tall-font-family-locale,
      var(--footnote-heavy-tall-font-family, var(--font-family))
    );
  --caption-1-heavy-tall: 800 10px /
    var(--caption-1-heavy-tall-line-height, 1.5)
    var(
      --caption-1-heavy-tall-font-family-locale,
      var(--caption-1-heavy-tall-font-family, var(--font-family))
    );
  --caption-2-heavy-tall: 800 10px /
    var(--caption-2-heavy-tall-line-height, 1.5)
    var(
      --caption-2-heavy-tall-font-family-locale,
      var(--caption-2-heavy-tall-font-family, var(--font-family))
    );
  --large-title-medium-short: 500 26px /
    var(--large-title-medium-short-line-height, 1.1538461538)
    var(
      --large-title-medium-short-font-family-locale,
      var(--large-title-medium-short-font-family, var(--font-family))
    );
  --title-1-medium-short: 500 22px /
    var(--title-1-medium-short-line-height, 1.0909090909)
    var(
      --title-1-medium-short-font-family-locale,
      var(--title-1-medium-short-font-family, var(--font-family))
    );
  --title-2-medium-short: 500 17px /
    var(--title-2-medium-short-line-height, 1.1764805882)
    var(
      --title-2-medium-short-font-family-locale,
      var(--title-2-medium-short-font-family, var(--font-family))
    );
  --title-3-medium-short: 500 15px /
    var(--title-3-medium-short-line-height, 1.2)
    var(
      --title-3-medium-short-font-family-locale,
      var(--title-3-medium-short-font-family, var(--font-family))
    );
  --headline-medium-short: 500 13px /
    var(--headline-medium-short-line-height, 1.0769630769)
    var(
      --headline-medium-short-font-family-locale,
      var(--headline-medium-short-font-family, var(--font-family))
    );
  --body-medium-short: 500 13px /
    var(--body-medium-short-line-height, 1.0769630769)
    var(
      --body-medium-short-font-family-locale,
      var(--body-medium-short-font-family, var(--font-family))
    );
  --callout-medium-short: 500 12px /
    var(--callout-medium-short-line-height, 1.0833733333)
    var(
      --callout-medium-short-font-family-locale,
      var(--callout-medium-short-font-family, var(--font-family))
    );
  --subhead-medium-short: 500 11px /
    var(--subhead-medium-short-line-height, 1.0909090909)
    var(
      --subhead-medium-short-font-family-locale,
      var(--subhead-medium-short-font-family, var(--font-family))
    );
  --footnote-medium-short: 500 10px /
    var(--footnote-medium-short-line-height, 1.1)
    var(
      --footnote-medium-short-font-family-locale,
      var(--footnote-medium-short-font-family, var(--font-family))
    );
  --caption-1-medium-short: 500 10px /
    var(--caption-1-medium-short-line-height, 1.1)
    var(
      --caption-1-medium-short-font-family-locale,
      var(--caption-1-medium-short-font-family, var(--font-family))
    );
  --caption-2-medium-short: 500 10px /
    var(--caption-2-medium-short-line-height, 1.1)
    var(
      --caption-2-medium-short-font-family-locale,
      var(--caption-2-medium-short-font-family, var(--font-family))
    );
  --large-title-semibold-short: 600 26px /
    var(--large-title-semibold-short-line-height, 1.1538461538)
    var(
      --large-title-semibold-short-font-family-locale,
      var(--large-title-semibold-short-font-family, var(--font-family))
    );
  --title-1-semibold-short: 600 22px /
    var(--title-1-semibold-short-line-height, 1.0909090909)
    var(
      --title-1-semibold-short-font-family-locale,
      var(--title-1-semibold-short-font-family, var(--font-family))
    );
  --title-2-semibold-short: 600 17px /
    var(--title-2-semibold-short-line-height, 1.1764805882)
    var(
      --title-2-semibold-short-font-family-locale,
      var(--title-2-semibold-short-font-family, var(--font-family))
    );
  --title-3-semibold-short: 600 15px /
    var(--title-3-semibold-short-line-height, 1.2)
    var(
      --title-3-semibold-short-font-family-locale,
      var(--title-3-semibold-short-font-family, var(--font-family))
    );
  --headline-semibold-short: 600 13px /
    var(--headline-semibold-short-line-height, 1.0769630769)
    var(
      --headline-semibold-short-font-family-locale,
      var(--headline-semibold-short-font-family, var(--font-family))
    );
  --body-semibold-short: 600 13px /
    var(--body-semibold-short-line-height, 1.0769630769)
    var(
      --body-semibold-short-font-family-locale,
      var(--body-semibold-short-font-family, var(--font-family))
    );
  --callout-semibold-short: 600 12px /
    var(--callout-semibold-short-line-height, 1.0833733333)
    var(
      --callout-semibold-short-font-family-locale,
      var(--callout-semibold-short-font-family, var(--font-family))
    );
  --subhead-semibold-short: 600 11px /
    var(--subhead-semibold-short-line-height, 1.0909090909)
    var(
      --subhead-semibold-short-font-family-locale,
      var(--subhead-semibold-short-font-family, var(--font-family))
    );
  --footnote-semibold-short: 600 10px /
    var(--footnote-semibold-short-line-height, 1.1)
    var(
      --footnote-semibold-short-font-family-locale,
      var(--footnote-semibold-short-font-family, var(--font-family))
    );
  --caption-1-semibold-short: 600 10px /
    var(--caption-1-semibold-short-line-height, 1.1)
    var(
      --caption-1-semibold-short-font-family-locale,
      var(--caption-1-semibold-short-font-family, var(--font-family))
    );
  --caption-2-semibold-short: 600 10px /
    var(--caption-2-semibold-short-line-height, 1.1)
    var(
      --caption-2-semibold-short-font-family-locale,
      var(--caption-2-semibold-short-font-family, var(--font-family))
    );
  --large-title-bold-short: 700 26px /
    var(--large-title-bold-short-line-height, 1.1538461538)
    var(
      --large-title-bold-short-font-family-locale,
      var(--large-title-bold-short-font-family, var(--font-family))
    );
  --title-1-bold-short: 700 22px /
    var(--title-1-bold-short-line-height, 1.0909090909)
    var(
      --title-1-bold-short-font-family-locale,
      var(--title-1-bold-short-font-family, var(--font-family))
    );
  --title-2-bold-short: 700 17px /
    var(--title-2-bold-short-line-height, 1.1764805882)
    var(
      --title-2-bold-short-font-family-locale,
      var(--title-2-bold-short-font-family, var(--font-family))
    );
  --title-3-bold-short: 700 15px / var(--title-3-bold-short-line-height, 1.2)
    var(
      --title-3-bold-short-font-family-locale,
      var(--title-3-bold-short-font-family, var(--font-family))
    );
  --headline-bold-short: 700 13px /
    var(--headline-bold-short-line-height, 1.0769630769)
    var(
      --headline-bold-short-font-family-locale,
      var(--headline-bold-short-font-family, var(--font-family))
    );
  --body-bold-short: 700 13px / var(--body-bold-short-line-height, 1.0769630769)
    var(
      --body-bold-short-font-family-locale,
      var(--body-bold-short-font-family, var(--font-family))
    );
  --callout-bold-short: 700 12px /
    var(--callout-bold-short-line-height, 1.0833733333)
    var(
      --callout-bold-short-font-family-locale,
      var(--callout-bold-short-font-family, var(--font-family))
    );
  --subhead-bold-short: 700 11px /
    var(--subhead-bold-short-line-height, 1.0909090909)
    var(
      --subhead-bold-short-font-family-locale,
      var(--subhead-bold-short-font-family, var(--font-family))
    );
  --footnote-bold-short: 700 10px / var(--footnote-bold-short-line-height, 1.1)
    var(
      --footnote-bold-short-font-family-locale,
      var(--footnote-bold-short-font-family, var(--font-family))
    );
  --caption-1-bold-short: 700 10px /
    var(--caption-1-bold-short-line-height, 1.1)
    var(
      --caption-1-bold-short-font-family-locale,
      var(--caption-1-bold-short-font-family, var(--font-family))
    );
  --caption-2-bold-short: 700 10px /
    var(--caption-2-bold-short-line-height, 1.1)
    var(
      --caption-2-bold-short-font-family-locale,
      var(--caption-2-bold-short-font-family, var(--font-family))
    );
  --large-title-heavy-short: 800 26px /
    var(--large-title-heavy-short-line-height, 1.1538461538)
    var(
      --large-title-heavy-short-font-family-locale,
      var(--large-title-heavy-short-font-family, var(--font-family))
    );
  --title-1-heavy-short: 800 22px /
    var(--title-1-heavy-short-line-height, 1.0909090909)
    var(
      --title-1-heavy-short-font-family-locale,
      var(--title-1-heavy-short-font-family, var(--font-family))
    );
  --title-2-heavy-short: 800 17px /
    var(--title-2-heavy-short-line-height, 1.1764805882)
    var(
      --title-2-heavy-short-font-family-locale,
      var(--title-2-heavy-short-font-family, var(--font-family))
    );
  --title-3-heavy-short: 800 15px / var(--title-3-heavy-short-line-height, 1.2)
    var(
      --title-3-heavy-short-font-family-locale,
      var(--title-3-heavy-short-font-family, var(--font-family))
    );
  --headline-heavy-short: 800 13px /
    var(--headline-heavy-short-line-height, 1.0769630769)
    var(
      --headline-heavy-short-font-family-locale,
      var(--headline-heavy-short-font-family, var(--font-family))
    );
  --body-heavy-short: 800 13px /
    var(--body-heavy-short-line-height, 1.0769630769)
    var(
      --body-heavy-short-font-family-locale,
      var(--body-heavy-short-font-family, var(--font-family))
    );
  --callout-heavy-short: 800 12px /
    var(--callout-heavy-short-line-height, 1.0833733333)
    var(
      --callout-heavy-short-font-family-locale,
      var(--callout-heavy-short-font-family, var(--font-family))
    );
  --subhead-heavy-short: 800 11px /
    var(--subhead-heavy-short-line-height, 1.0909090909)
    var(
      --subhead-heavy-short-font-family-locale,
      var(--subhead-heavy-short-font-family, var(--font-family))
    );
  --footnote-heavy-short: 800 10px /
    var(--footnote-heavy-short-line-height, 1.1)
    var(
      --footnote-heavy-short-font-family-locale,
      var(--footnote-heavy-short-font-family, var(--font-family))
    );
  --caption-1-heavy-short: 800 10px /
    var(--caption-1-heavy-short-line-height, 1.1)
    var(
      --caption-1-heavy-short-font-family-locale,
      var(--caption-1-heavy-short-font-family, var(--font-family))
    );
  --caption-2-heavy-short: 800 10px /
    var(--caption-2-heavy-short-line-height, 1.1)
    var(
      --caption-2-heavy-short-font-family-locale,
      var(--caption-2-heavy-short-font-family, var(--font-family))
    );
  --monogram: 500 310px / var(--monogram-line-height, 0.0032258065)
    var(
      --monogram-font-family-locale,
      var(--monogram-font-family, var(--font-family))
    );
  --live-badge: 600 10px / var(--live-badge-line-height, 1)
    var(
      --live-badge-font-family-locale,
      var(--live-badge-font-family, var(--font-family))
    );
  --live-badge-large: 600 15px / var(--live-badge-large-line-height, 1)
    var(
      --live-badge-large-font-family-locale,
      var(--live-badge-large-font-family, var(--font-family))
    );
  --subhead-emphasized_title-3-emphasized_title-2-emphasized: 600 11px /
    var(
      --subhead-emphasized_title-3-emphasized_title-2-emphasized-line-height,
      1.2727272727
    )
    var(
      --subhead-emphasized_title-3-emphasized_title-2-emphasized-font-family-locale,
      var(
        --subhead-emphasized_title-3-emphasized_title-2-emphasized-font-family,
        var(--font-family)
      )
    );
  --title3tall_bodytall_Title3Tall: 400 15px /
    var(--title3tall_bodytall_Title3Tall-line-height, 1.4666666667)
    var(
      --title3tall_bodytall_Title3Tall-font-family-locale,
      var(--title3tall_bodytall_Title3Tall-font-family, var(--font-family))
    );
  --body-reduced-semibold: 600 14px /
    var(--body-reduced-semibold-line-height, 1.4285914286)
    var(
      --body-reduced-semibold-font-family-locale,
      var(--body-reduced-semibold-font-family, var(--font-family))
    );
}
@media (min-width: 1580px) {
  :host {
    --headline-standalone: 600 96px /
      var(--headline-standalone-line-height, 1.0416666667)
      var(
        --headline-standalone-font-family-locale,
        var(--headline-standalone-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --headline-standalone: 600 80px /
      var(--headline-standalone-line-height, 1.05)
      var(
        --headline-standalone-font-family-locale,
        var(--headline-standalone-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --headline-standalone: 600 48px /
      var(--headline-standalone-line-height, 1.0834933333)
      var(
        --headline-standalone-font-family-locale,
        var(--headline-standalone-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --headline-super: 600 80px / var(--headline-super-line-height, 1.05)
      var(
        --headline-super-font-family-locale,
        var(--headline-super-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --headline-super: 600 64px / var(--headline-super-line-height, 1.0625)
      var(
        --headline-super-font-family-locale,
        var(--headline-super-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --headline-super: 600 48px / var(--headline-super-line-height, 1.0834933333)
      var(
        --headline-super-font-family-locale,
        var(--headline-super-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --headline-elevated: 600 64px / var(--headline-elevated-line-height, 1.0625)
      var(
        --headline-elevated-font-family-locale,
        var(--headline-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --headline-elevated: 600 48px /
      var(--headline-elevated-line-height, 1.0834933333)
      var(
        --headline-elevated-font-family-locale,
        var(--headline-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --headline-elevated: 600 40px / var(--headline-elevated-line-height, 1.1)
      var(
        --headline-elevated-font-family-locale,
        var(--headline-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --headline-reduced: 600 40px / var(--headline-reduced-line-height, 1.1)
      var(
        --headline-reduced-font-family-locale,
        var(--headline-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --headline-reduced: 600 32px / var(--headline-reduced-line-height, 1.125)
      var(
        --headline-reduced-font-family-locale,
        var(--headline-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --headline-reduced: 600 28px /
      var(--headline-reduced-line-height, 1.1428571429)
      var(
        --headline-reduced-font-family-locale,
        var(--headline-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --eyebrow-super: 600 32px / var(--eyebrow-super-line-height, 1.125)
      var(
        --eyebrow-super-font-family-locale,
        var(--eyebrow-super-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --eyebrow-super: 600 28px / var(--eyebrow-super-line-height, 1.1428571429)
      var(
        --eyebrow-super-font-family-locale,
        var(--eyebrow-super-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --eyebrow-super: 600 24px / var(--eyebrow-super-line-height, 1.1666666667)
      var(
        --eyebrow-super-font-family-locale,
        var(--eyebrow-super-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --eyebrow-elevated: 600 28px /
      var(--eyebrow-elevated-line-height, 1.1428571429)
      var(
        --eyebrow-elevated-font-family-locale,
        var(--eyebrow-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --eyebrow-elevated: 600 24px /
      var(--eyebrow-elevated-line-height, 1.1666666667)
      var(
        --eyebrow-elevated-font-family-locale,
        var(--eyebrow-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --eyebrow-elevated: 600 21px /
      var(--eyebrow-elevated-line-height, 1.1904761905)
      var(
        --eyebrow-elevated-font-family-locale,
        var(--eyebrow-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --eyebrow: 600 24px / var(--eyebrow-line-height, 1.1666666667)
      var(
        --eyebrow-font-family-locale,
        var(--eyebrow-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --eyebrow: 600 21px / var(--eyebrow-line-height, 1.1904761905)
      var(
        --eyebrow-font-family-locale,
        var(--eyebrow-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --eyebrow-reduced: 600 21px /
      var(--eyebrow-reduced-line-height, 1.1904761905)
      var(
        --eyebrow-reduced-font-family-locale,
        var(--eyebrow-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --eyebrow-reduced: 600 19px /
      var(--eyebrow-reduced-line-height, 1.2105263158)
      var(
        --eyebrow-reduced-font-family-locale,
        var(--eyebrow-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --intro-elevated: 400 24px / var(--intro-elevated-line-height, 1.3334133333)
      var(
        --intro-elevated-font-family-locale,
        var(--intro-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --intro-elevated: 400 21px / var(--intro-elevated-line-height, 1.381002381)
      var(
        --intro-elevated-font-family-locale,
        var(--intro-elevated-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --intro: 400 21px / var(--intro-line-height, 1.381002381)
      var(
        --intro-font-family-locale,
        var(--intro-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --intro: 400 19px / var(--intro-line-height, 1.4211026316)
      var(
        --intro-font-family-locale,
        var(--intro-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --quote: 400 40px / var(--quote-line-height, 1.2)
      var(
        --quote-font-family-locale,
        var(--quote-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --quote: 400 32px / var(--quote-line-height, 1.25)
      var(
        --quote-font-family-locale,
        var(--quote-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --quote: 400 28px / var(--quote-line-height, 1.2858342857)
      var(
        --quote-font-family-locale,
        var(--quote-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --quote-reduced: 400 32px / var(--quote-reduced-line-height, 1.25)
      var(
        --quote-reduced-font-family-locale,
        var(--quote-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --quote-reduced: 400 28px / var(--quote-reduced-line-height, 1.2858342857)
      var(
        --quote-reduced-font-family-locale,
        var(--quote-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --quote-reduced: 400 24px / var(--quote-reduced-line-height, 1.3334133333)
      var(
        --quote-reduced-font-family-locale,
        var(--quote-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --manifesto: 600 32px / var(--manifesto-line-height, 1.25)
      var(
        --manifesto-font-family-locale,
        var(--manifesto-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --manifesto: 600 28px / var(--manifesto-line-height, 1.2858342857)
      var(
        --manifesto-font-family-locale,
        var(--manifesto-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --manifesto: 600 24px / var(--manifesto-line-height, 1.3334133333)
      var(
        --manifesto-font-family-locale,
        var(--manifesto-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --label: 600 24px / var(--label-line-height, 1.1666666667)
      var(
        --label-font-family-locale,
        var(--label-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --label: 600 21px / var(--label-line-height, 1.1904761905)
      var(
        --label-font-family-locale,
        var(--label-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --tout: 600 19px / var(--tout-line-height, 1.2105263158)
      var(
        --tout-font-family-locale,
        var(--tout-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --body-tight: 400 17px / var(--body-tight-line-height, 1.2353641176)
      var(
        --body-tight-font-family-locale,
        var(--body-tight-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --body-reduced: 400 14px / var(--body-reduced-line-height, 1.4285914286)
      var(
        --body-reduced-font-family-locale,
        var(--body-reduced-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --body-reduced-tight: 400 14px /
      var(--body-reduced-tight-line-height, 1.2857742857)
      var(
        --body-reduced-tight-font-family-locale,
        var(--body-reduced-tight-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --caption: 400 12px / var(--caption-line-height, 1.3333733333)
      var(
        --caption-font-family-locale,
        var(--caption-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --sosumi: 400 12px / var(--sosumi-line-height, 1.3333733333)
      var(
        --sosumi-font-family-locale,
        var(--sosumi-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1000px) {
  :host {
    --subhead-emphasized_title-3-emphasized_title-2-emphasized: 600 15px /
      var(
        --subhead-emphasized_title-3-emphasized_title-2-emphasized-line-height,
        1.3333833333
      )
      var(
        --subhead-emphasized_title-3-emphasized_title-2-emphasized-font-family-locale,
        var(
          --subhead-emphasized_title-3-emphasized_title-2-emphasized-font-family,
          var(--font-family)
        )
      );
  }
}
@media (min-width: 1580px) {
  :host {
    --subhead-emphasized_title-3-emphasized_title-2-emphasized: 700 17px /
      var(
        --subhead-emphasized_title-3-emphasized_title-2-emphasized-line-height,
        1.2941176471
      )
      var(
        --subhead-emphasized_title-3-emphasized_title-2-emphasized-font-family-locale,
        var(
          --subhead-emphasized_title-3-emphasized_title-2-emphasized-font-family,
          var(--font-family)
        )
      );
  }
}
@media (min-width: 484px) {
  :host {
    --title3tall_bodytall_Title3Tall: 400 13px /
      var(--title3tall_bodytall_Title3Tall-line-height, 1.3846153846)
      var(
        --title3tall_bodytall_Title3Tall-font-family-locale,
        var(--title3tall_bodytall_Title3Tall-font-family, var(--font-family))
      );
  }
}
@media (min-width: 1260px) {
  :host {
    --title3tall_bodytall_Title3Tall: 400 15px /
      var(--title3tall_bodytall_Title3Tall-line-height, 1.4666666667)
      var(
        --title3tall_bodytall_Title3Tall-font-family-locale,
        var(--title3tall_bodytall_Title3Tall-font-family, var(--font-family))
      );
  }
}
body {
  color: var(--bodyTextColor, var(--systemPrimary));
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Apple Color Emoji,
    SF Pro,
    SF Pro Icons,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.2307692308;
}
body,
button,
input,
select,
textarea {
  -moz-font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis: none;
}
.link,
a {
  color: var(--linkColor, inherit);
  cursor: pointer;
  letter-spacing: inherit;
  text-decoration: none;
}
.link:hover,
a:hover {
  -webkit-text-decoration: var(--linkHoverTextDecoration, underline);
  text-decoration: var(--linkHoverTextDecoration, underline);
}
.link:focus,
.link:hover,
a:focus,
a:hover {
  color: var(--linkHoverColor, var(--linkColor, inherit));
}
.link:disabled,
a:disabled {
  opacity: 0.42;
}
li {
  list-style: none;
}
b,
strong {
  font-weight: 600;
}
cite,
dfn,
em,
i {
  font-style: italic;
}
abbr {
  border: 0;
}
.text-align-center {
  text-align: center;
}
:host {
  --z-unset: unset;
  --z-default: 1;
  --z-bubbles: 50;
  --z-gpu: 1001;
  --z-web-chrome: 9901;
  --z-contextual-menus: 9951;
  --z-modal: 10001;
  --global-transition-property: opacity;
  --global-transition-duration: 0.1s;
  --global-transition-timing-function: ease-in;
  --global-transition: var(--global-transition-property, opacity)
    var(--global-transition-duration, 0.1s)
    var(--global-transition-timing-function, ease-in);
}
body {
  background-color: var(--pageBG);
}
body,
html {
  min-height: 100%;
}
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
[dir='rtl'] address[dir='ltr'],
[dir='rtl'] article[dir='ltr'],
[dir='rtl'] blockquote[dir='ltr'],
[dir='rtl'] dd[dir='ltr'],
[dir='rtl'] details[dir='ltr'],
[dir='rtl'] dialog[dir='ltr'],
[dir='rtl'] div[dir='ltr'],
[dir='rtl'] dl[dir='ltr'],
[dir='rtl'] dt[dir='ltr'],
[dir='rtl'] fieldset[dir='ltr'],
[dir='rtl'] form[dir='ltr'],
[dir='rtl'] h1[dir='ltr'],
[dir='rtl'] h2[dir='ltr'],
[dir='rtl'] h3[dir='ltr'],
[dir='rtl'] h4[dir='ltr'],
[dir='rtl'] h5[dir='ltr'],
[dir='rtl'] h6[dir='ltr'],
[dir='rtl'] nav[dir='ltr'],
[dir='rtl'] ol[dir='ltr'],
[dir='rtl'] p[dir='ltr'],
[dir='rtl'] pre[dir='ltr'],
[dir='rtl'] section[dir='ltr'],
[dir='rtl'] table[dir='ltr'],
[dir='rtl'] ul[dir='ltr'] {
  direction: ltr;
  text-align: initial;
}
[dir='ltr'] address[dir='rtl'],
[dir='ltr'] article[dir='rtl'],
[dir='ltr'] blockquote[dir='rtl'],
[dir='ltr'] dd[dir='rtl'],
[dir='ltr'] details[dir='rtl'],
[dir='ltr'] dialog[dir='rtl'],
[dir='ltr'] div[dir='rtl'],
[dir='ltr'] dl[dir='rtl'],
[dir='ltr'] dt[dir='rtl'],
[dir='ltr'] fieldset[dir='rtl'],
[dir='ltr'] form[dir='rtl'],
[dir='ltr'] h1[dir='rtl'],
[dir='ltr'] h2[dir='rtl'],
[dir='ltr'] h3[dir='rtl'],
[dir='ltr'] h4[dir='rtl'],
[dir='ltr'] h5[dir='rtl'],
[dir='ltr'] h6[dir='rtl'],
[dir='ltr'] nav[dir='rtl'],
[dir='ltr'] ol[dir='rtl'],
[dir='ltr'] p[dir='rtl'],
[dir='ltr'] pre[dir='rtl'],
[dir='ltr'] section[dir='rtl'],
[dir='ltr'] table[dir='rtl'],
[dir='ltr'] ul[dir='rtl'] {
  direction: rtl;
  text-align: initial;
}
[dir='rtl'] bdo[dir='ltr'],
[dir='rtl'] span[dir='ltr'] {
  direction: ltr;
  unicode-bidi: bidi-override;
}
[dir='ltr'] bdo[dir='rtl'],
[dir='ltr'] span[dir='rtl'] {
  direction: rtl;
  unicode-bidi: bidi-override;
}
:focus {
  outline: 4px solid var(--sk-focus-color, rgba(var(--keyColor-rgb), 0.6));
  outline-offset: var(--sk-focus-offset, 1px);
}
.js-focus-visible :focus:not(.focus-visible) {
  box-shadow: none;
  outline: none;
}
@supports selector(: focus-visible) {
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 4px solid var(--sk-focus-color, rgba(var(--keyColor-rgb), 0.6));
    outline-offset: var(--sk-focus-offset, 1px);
  }
}
[type='button']:focus,
button:focus {
  box-shadow: 0 0 0 4px rgba(var(--keyColor-rgb), 0.6);
  outline: none;
}
@supports selector(: focus-visible) {
  [type='button']:focus,
  a:focus,
  button:focus {
    box-shadow: none;
    outline: none;
  }
  [type='button']:focus-visible,
  a:focus-visible,
  button:focus-visible {
    box-shadow: 0 0 0 4px rgba(var(--keyColor-rgb), 0.6);
    outline: none;
  }
}
[draggable='true'] {
  -webkit-user-drag: element;
}
[data-drop-area]:not(.drop-reset).is-drag-over {
  box-shadow: inset 0 0 0 4px rgba(var(--keyColor-rgb), 0.6);
  outline: none;
}
[data-drop-area]:not(.drop-reset).is-drag-over-bottom,
[data-drop-area]:not(.drop-reset).is-drag-over-left,
[data-drop-area]:not(.drop-reset).is-drag-over-right,
[data-drop-area]:not(.drop-reset).is-drag-over-top {
  position: relative;
}
[data-drop-area]:not(.drop-reset).is-drag-over-bottom:after,
[data-drop-area]:not(.drop-reset).is-drag-over-left:after,
[data-drop-area]:not(.drop-reset).is-drag-over-right:after,
[data-drop-area]:not(.drop-reset).is-drag-over-top:after {
  background-color: var(--keyColor);
  content: '';
  position: absolute;
  z-index: calc(var(--z-default) + 3);
}
[data-drop-area]:not(.drop-reset).is-drag-over-bottom:after,
[data-drop-area]:not(.drop-reset).is-drag-over-top:after {
  height: 2px;
  inset-inline-start: 0;
  width: 100%;
}
[data-drop-area]:not(.drop-reset).is-drag-over-top:after {
  top: 0;
  transform: translateY(-1px);
}
[data-drop-area]:not(.drop-reset).is-drag-over-bottom:after {
  bottom: 0;
  transform: translateY(1px);
}
[data-drop-area]:not(.drop-reset).is-drag-over-left:after,
[data-drop-area]:not(.drop-reset).is-drag-over-right:after {
  height: 100%;
  top: 0;
  width: 2px;
}
[data-drop-area]:not(.drop-reset).is-drag-over-right:after {
  inset-inline-end: -1px;
}
[data-drop-area]:not(.drop-reset).is-drag-over-left:after {
  inset-inline-start: -1px;
}
:host {
  --web-navigation-width: 164px;
}
:host #ck-container iframe {
  z-index: var(--z-modal);
}
@media (min-width: 484px) {
  :host {
    --web-navigation-width: 33.8842975207vw;
  }
}
@media (min-width: 767.32px) {
  :host {
    --web-navigation-width: 260px;
  }
}
:host {
  --bodyGutter: 25px;
  color-scheme: inherit;
}
@media (min-width: 1000px) {
  :host {
    --bodyGutter: 40px;
  }
}
#replay-container {
  --replay-background-color-initial: var(--pageBG);
  --replay-text-color-initial: var(--opaqueText);
  --replay-text-rgb-values-initial: var(--opaqueText-rgb);
  --replay-background-rgb-values-initial: var(--pageBG-rgb);
  --replay-background-color: var(--pageBG);
  --replay-background-rgb-values: var(--pageBG-rgb);
  --replay-text-color: var(--opaqueText);
  --replay-text-rgb-values: var(--opaqueText-rgb);
  --replay-number-shadow-visible: 0 0 100px rgba(0, 0, 0, 0.24);
  --replay-number-shadow-invisible: 0 0 100px transparent;
  --replay-number-shadow: var(--replay-number-shadow-visible);
  --replay-highlight-color: #5360ea;
  --replay-blue-active: #4e94e2;
  --replay-blue-2022: #5360ea;
  --replay-blue-2023: #30afef;
  --replay-green-2024: #39d8c1;
  --replay-blue-bg: var(--replay-blue-2023);
  --replay-green-bg: var(--replay-green-2024);
  --replay-footer-background-color: #f4f4f4;
}
@media (prefers-color-scheme: dark) {
  #replay-container {
    --replay-footer-background-color: #1d1d1f;
  }
}
html {
  --replay-direction-modifier: 1;
}
#replay-container {
  --replay-direction-modifier: 1;
}
*,
:after,
:before {
  padding: 0;
}
#replay-container {
  background: var(--replay-background-color);
  color: var(--replay-text-color);
  transition:
    fill 0.25s ease,
    border-color 0.25s ease;
}
:focus-visible {
  outline: 4px solid var(--sk-focus-color, rgba(var(--keyColor-rgb), 0.6));
  outline-offset: var(--sk-focus-offset, 1px);
}
::-moz-focus-inner {
  border: 0;
  padding: 0;
}
[type='button']:focus-visible,
button:focus-visible {
  box-shadow: 0 0 0 4px rgba(var(--keyColor-rgb), 0.6);
  outline: none;
}
a,
button {
  position: relative;
}
#replay-container button:after,
a:after {
  content: '';
  height: 100%;
  left: 50%;
  min-height: 44px;
  min-width: 44px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
#replay-container button.contextual-menu__trigger {
  inset: 0;
  position: absolute;
  z-index: var(--z-default);
}
em {
  font-style: normal;
}
canvas,
img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}
button,
input,
select,
textarea {
  color: inherit;
  font: inherit;
}
input {
  border-radius: 0;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  overflow-wrap: break-word;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  overflow-wrap: break-word;
}
button {
  background-color: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  padding: 0;
}
.scrollable-page.noscroll,
html.noscroll {
  height: var(--replay-vh);
  overflow: hidden;
  touch-action: none;
}
.scrollable-page.noscroll {
  height: calc(var(--replay-vh) + 70px);
}
html.no-smooth-scroll {
  scroll-behavior: auto;
}
#replay-container[dir='rtl'],
html[dir='rtl'] {
  --replay-direction-modifier: -1;
}
.noscroll {
  overflow: hidden;
}

.default-landing-screen.svelte-mwrat4.svelte-mwrat4 {
  background-color: var(--replay-background-color-initial);
  color: var(--opaqueText);
  height: 100dvh;
  overflow-y: hidden;
  width: 100%;
  z-index: 650;
}
@supports not (height: 100dvh) {
  .default-landing-screen.svelte-mwrat4.svelte-mwrat4 {
    height: var(--replay-full-height, 100%);
  }
}
.default-landing-screen.embedded.svelte-mwrat4.svelte-mwrat4 {
  height: calc(var(--replay-vh, 100vh) * 100 / 100);
  width: calc(var(--replay-vw, 100vw) * 100 / 100);
}
.header.svelte-mwrat4.svelte-mwrat4 {
  display: flex;
  flex-direction: column;
  margin-top: 47px;
  padding: 0 20px;
  position: relative;
  width: 100%;
  z-index: var(--z-default);
}
@media (min-width: 1260px) {
  .header.svelte-mwrat4.svelte-mwrat4 {
    padding-inline: calc(var(--replay-vw, 100vw) / 12 + 1.66667px);
  }
}
@supports (background-image: -webkit-named-image(apple-pay-logo-black)) or
  (-webkit-appearance: -apple-pay-button) {
  @supports not (margin-trim: initial) {
    .header.svelte-mwrat4.svelte-mwrat4 {
      -webkit-transform: translate(0);
    }
  }
}
.logos.svelte-mwrat4.svelte-mwrat4 {
  align-items: center;
  color: var(--replay-text-color);
  display: flex;
  justify-content: space-between;
  width: 100%;
}
@media (max-width: 743px) {
  .logos.svelte-mwrat4.svelte-mwrat4 {
    margin-top: 14px;
  }
}
@media (max-width: 1259px) {
  .highlights-run-in .logos.svelte-mwrat4.svelte-mwrat4 {
    animation: animate-logo 1s linear;
  }
}
.logos.svelte-mwrat4 .replay-logo-wrapper.svelte-mwrat4 svg {
  transform: translateY(1px);
  width: 54px;
}
@media (min-width: 1260px) {
  .logos.svelte-mwrat4 .replay-logo-wrapper.svelte-mwrat4 svg {
    width: 148px;
  }
}
.logos.svelte-mwrat4 .apple-music-logo-wrapper.svelte-mwrat4 svg {
  height: 13px;
  width: 56px;
}
@media (min-width: 1260px) {
  .logos.svelte-mwrat4 .apple-music-logo-wrapper.svelte-mwrat4 svg {
    height: 20px;
    width: 82px;
  }
}
.replay-logo-wrapper.svelte-mwrat4 svg {
  width: 54px;
}
.content.svelte-mwrat4.svelte-mwrat4 {
  align-items: center;
  display: flex;
  flex-direction: column;
  inset-block-end: 0;
  inset-block-start: 0;
  inset-inline-end: 0;
  inset-inline-start: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: var(--z-default);
}
@supports (background-image: -webkit-named-image(apple-pay-logo-black)) or
  (-webkit-appearance: -apple-pay-button) {
  @supports not (margin-trim: initial) {
    .content.svelte-mwrat4.svelte-mwrat4 {
      -webkit-transform: translate(0);
    }
  }
}
.button-wrapper.svelte-mwrat4 .button .content {
  flex-direction: row-reverse;
  gap: 8px;
}
.error-message.svelte-mwrat4.svelte-mwrat4 {
  bottom: 32px;
  color: var(--replay-text-color);
  padding: 0 20px;
  position: absolute;
  text-align: center;
}
@media (min-width: 1260px) {
  .error-message.svelte-mwrat4.svelte-mwrat4 {
    bottom: 72px;
    padding: 0 80px;
  }
}

.animated-landing-wrapper.svelte-7qrmk3 {
  display: contents;
}
.animated-landing-wrapper.svelte-7qrmk3 .animated-landing {
  height: auto;
  min-height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  opacity: 0;
  position: fixed;
  width: 100%;
  z-index: 0;
}
.animated-landing-wrapper.svelte-7qrmk3 .fade-in {
  opacity: 1;
  transition: opacity 1.5s ease-in-out;
}
</style>
