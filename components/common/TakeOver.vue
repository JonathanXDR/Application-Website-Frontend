<template>
  <section
    class="takeover theme-dark"
    style="--localnav-theme-start: a0t - 100vh"
  >
    <div class="image event-branding-img" />

    <div class="section-content">
      <div class="event-info pre-event">
        <div class="event-info-heading">
          <h2 class="section-head">WWDC24</h2>
          <div class="add-to-calendar">
            <a
              href="/web/20240605132002/https://www.apple.com/newsroom/cal/apple-event-1717429718871/wwdc24.ics"
              aria-label="add to calendar: WWDC24"
              class="add-to-calendar__link icon-downloadcircle icon"
              download=""
              role="button"
              tabindex="0"
              >Add to calendar
              <Icon name="arrow.down.circle" class="icon icon-small" />
            </a>
          </div>
        </div>
        <div class="event-info-interactive show-countdown">
          <aside aria-label="Countdown:WWDC24" class="countdown">
            <div class="countdown-zone">
              <span class="countdown-volabel">5, Days</span>
              <div class="countdown-digitsholder" aria-hidden="true">
                <span class="countdown-current">05</span>
              </div>
              <div class="countdown-label" aria-hidden="true">Days</div>
            </div>
            <div class="countdown-zone">
              <span class="countdown-volabel">3, Hours</span>
              <div class="countdown-digitsholder" aria-hidden="true">
                <span class="countdown-current">03</span>
              </div>
              <div class="countdown-label" aria-hidden="true">Hours</div>
            </div>
            <div class="countdown-zone">
              <span class="countdown-volabel">40, Minutes</span>
              <div class="countdown-digitsholder" aria-hidden="true">
                <span class="countdown-current">40</span>
              </div>
              <div class="countdown-label" aria-hidden="true">Minutes</div>
            </div>
          </aside>
          <div class="event-info-cta-area" aria-live="polite">
            <a
              href="https://web.archive.org/web/20240605132002/https://www.apple.com/apple-events/"
              class="watch-live"
              aria-label="watch live event: WWDC24"
              aria-hidden="true"
              tabindex="-1"
              >Watch live event</a
            >
            <a
              href="https://web.archive.org/web/20240605132002/https://www.apple.com/apple-events/"
              class="watch-event"
              aria-label="watch event: WWDC24"
              aria-hidden="true"
              tabindex="-1"
              >Watch event</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.event-branding-img {
  background: url(https://web.archive.org/web/20240605132002im_/https://www.apple.com/newsroom/images/2024/06/wwdc/Apple-WWDC24-event-branding.jpg.branding-large.jpg)
    no-repeat top;
  background-size: cover;
  width: 100%;
  height: 320px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-resolution: 1.5dppx),
  (-webkit-min-device-pixel-ratio: 1.5),
  (min-resolution: 144dpi) {
  .event-branding-img {
    background-image: url(https://web.archive.org/web/20240605132002im_/https://www.apple.com/newsroom/images/2024/06/wwdc/Apple-WWDC24-event-branding.jpg.branding-large_2x.jpg);
  }
}
@media only screen and (min-width: 735px) and (max-width: 1068px) {
  .event-branding-img {
    background-image: url(https://web.archive.org/web/20240605132002im_/https://www.apple.com/newsroom/images/2024/06/wwdc/Apple-WWDC24-event-branding.jpg.branding-medium.jpg);
    height: 227px;
  }
}
@media only screen and (min-width: 735px) and (max-width: 1068px) and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-width: 735px) and (max-width: 1068px) and (min-resolution: 1.5dppx),
  (min-width: 735px) and (max-width: 1068px) and (-webkit-min-device-pixel-ratio: 1.5),
  (min-width: 735px) and (max-width: 1068px) and (min-resolution: 144dpi) {
  .event-branding-img {
    background-image: url(https://web.archive.org/web/20240605132002im_/https://www.apple.com/newsroom/images/2024/06/wwdc/Apple-WWDC24-event-branding.jpg.branding-medium_2x.jpg);
  }
}
@media only screen and (max-width: 734px) {
  .event-branding-img {
    background-image: url(https://web.archive.org/web/20240605132002im_/https://www.apple.com/newsroom/images/2024/06/wwdc/Apple-WWDC24-event-branding.jpg.branding-small.jpg);
    height: 210px;
  }
}
@media only screen and (max-width: 734px) and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (max-width: 734px) and (min-resolution: 1.5dppx),
  (max-width: 734px) and (-webkit-min-device-pixel-ratio: 1.5),
  (max-width: 734px) and (min-resolution: 144dpi) {
  .event-branding-img {
    background-image: url(https://web.archive.org/web/20240605132002im_/https://www.apple.com/newsroom/images/2024/06/wwdc/Apple-WWDC24-event-branding.jpg.branding-small_2x.jpg);
  }
}

/*! CSS Used from:
https://web.archive.org/web/20240605132002cs_/https://www.apple.com/api-www/global-elements/global-header/v1/assets/globalheader.css
*/
.theme-dark {
  --sk-glyph: rgb(255, 255, 255);
  --sk-glyph-gray: rgb(245, 245, 247);
  --sk-glyph-gray-alpha: rgba(255, 255, 255, 0.92);
  --sk-glyph-gray-secondary: rgb(134, 134, 139);
  --sk-glyph-gray-secondary-alpha: rgba(255, 255, 255, 0.56);
  --sk-glyph-gray-secondary-alt: rgb(210, 210, 215);
  --sk-glyph-gray-secondary-alt-alpha: rgba(255, 255, 255, 0.8);
  --sk-glyph-gray-tertiary: rgb(110, 110, 115);
  --sk-glyph-gray-tertiary-alpha: rgba(255, 255, 255, 0.4);
  --sk-glyph-blue: rgb(41, 151, 255);
  --sk-glyph-orange: rgb(255, 121, 27);
  --sk-glyph-green: rgb(3, 161, 14);
  --sk-glyph-red: rgb(255, 48, 55);
  --sk-fill: rgb(0, 0, 0);
  --sk-fill-secondary: rgb(22, 22, 23);
  --sk-fill-tertiary: rgb(29, 29, 31);
  --sk-fill-gray: rgb(245, 245, 247);
  --sk-fill-gray-alpha: rgba(255, 255, 255, 0.92);
  --sk-fill-gray-secondary: rgb(110, 110, 115);
  --sk-fill-gray-secondary-alpha: rgba(255, 255, 255, 0.4);
  --sk-fill-gray-tertiary: rgb(66, 66, 69);
  --sk-fill-gray-tertiary-alpha: rgba(255, 255, 255, 0.24);
  --sk-fill-gray-quaternary: rgb(51, 51, 54);
  --sk-fill-gray-quaternary-alpha: rgba(255, 255, 255, 0.2);
  --sk-fill-orange-secondary: rgb(41, 13, 0);
  --sk-fill-green-secondary: rgb(0, 43, 3);
  --sk-fill-red: rgb(255, 48, 55);
  --sk-fill-red-secondary: rgb(51, 0, 0);
  --sk-fill-yellow: rgb(173, 130, 0);
  --sk-fill-yellow-secondary: rgb(43, 32, 0);
  --sk-enviro-neutral: rgb(0, 0, 0);
  --sk-body-background-color: rgb(0, 0, 0);
  --sk-body-text-color: rgb(245, 245, 247);
  --sk-headline-text-color: rgb(245, 245, 247);
  --sk-body-link-color: rgb(41, 151, 255);
  --sk-link-disabled-opacity: 0.36;
  --sk-focus-color-alt: rgb(255, 255, 255);
}

.section-head {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 700;
  letter-spacing: 0.004em;
  font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica
Neue', 'Helvetica',
    'Arial', sans-serif;
  margin-bottom: 24px;
}
@media only screen and (max-width: 1068px) {
  .section-head {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    letter-spacing: 0.007em;
    font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .section-head {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 700;
    letter-spacing: 0.009em;
    font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }
}
@media only screen and (max-width: 1068px) {
  .section-head {
    margin-bottom: 16px;
  }
}
.image {
  z-index: 0;
}
@media only screen and (inverted-colors) {
  .image {
    filter: invert(1);
  }
}
.no-touch .image:hover {
  position: relative;
  z-index: 1;
}
.section-content {
  margin-inline-start: auto;
  margin-inline-end: auto;
  width: 980px;
}
@media only screen and (min-width: 1441px) {
  .section-content {
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 980px;
  }
}
@media only screen and (max-width: 1068px) {
  .section-content {
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 692px;
  }
}
@media only screen and (max-width: 734px) {
  .section-content {
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 87.5%;
  }
}
@media only screen and (max-width: 734px) {
  .section-content {
    max-width: 366px;
  }
}
/*! CSS Used from:
https://web.archive.org/web/20240605132002cs_/https://www.apple.com/newsroom/styles/takeover.built.css
*/
.section-head {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 700;
  letter-spacing: 0.004em;
  font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica
Neue', 'Helvetica',
    'Arial', sans-serif;
  margin-bottom: 24px;
}
@media only screen and (max-width: 1068px) {
  .section-head {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    letter-spacing: 0.007em;
    font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .section-head {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 700;
    letter-spacing: 0.009em;
    font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }
}
@media only screen and (max-width: 1068px) {
  .section-head {
    margin-bottom: 16px;
  }
}
.image {
  z-index: 0;
}
@media only screen and (inverted-colors) {
  .image {
    filter: invert(1);
  }
}
.takeover {
  background-color: #161617;
  overflow: hidden;
  margin-top: -52px;
}
.takeover .section-content {
  margin-bottom: 40px;
  margin-top: 92px;
}
@media only screen and (max-width: 1068px) {
  .takeover .section-content {
    margin-bottom: 36px;
  }
}
@media only screen and (max-width: 734px) {
  .takeover .section-content {
    margin-bottom: 32px;
  }
}
@media only screen and (max-width: 734px) {
  .takeover .section-content {
    margin-top: 72px;
  }
}
.takeover .image ~ .section-content {
  margin-top: 40px;
}
@media only screen and (max-width: 1068px) {
  .takeover .image ~ .section-content {
    margin-top: 36px;
  }
}
@media only screen and (max-width: 734px) {
  .takeover .image ~ .section-content {
    margin-top: 32px;
  }
}
.takeover .event-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 40px;
}
@media only screen and (max-width: 734px) {
  .takeover .event-info {
    margin-bottom: 32px;
    justify-content: center;
    flex-direction: column;
  }
}
.takeover .event-info:only-child {
  margin-bottom: 0;
}
.takeover .event-info .countdown {
  margin-top: 0;
  transition: margin-top 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 300ms;
}
@media only screen and (max-width: 734px) {
  .takeover .event-info.pre-event .event-info-interactive {
    margin-top: 16px;
  }
}
@media only screen and (max-width: 734px) {
  .takeover .event-info.pre-event .add-to-calendar {
    margin-bottom: 0;
  }
}
.takeover .event-info:not(.post-event) .watch-event {
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  pointer-events: none;
}
.takeover .event-info:not(.live) .watch-live {
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  pointer-events: none;
}
.takeover .event-info-heading {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 58.3333333333%;
  max-width: 58.3333333333%;
}
@media only screen and (max-width: 734px) {
  .takeover .event-info-heading {
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
    max-width: 100%;
  }
}
.takeover .event-info-heading .section-head {
  color: #fff;
  margin-bottom: 0;
}
.takeover .event-info-heading .add-to-calendar {
  margin-top: 8px;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 300ms,
    margin-top 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
@media only screen and (max-width: 734px) {
  .takeover .event-info-heading .add-to-calendar {
    margin-bottom: 12px;
    margin-top: 12px;
  }
}
.takeover .event-info-heading .add-to-calendar__link {
  border-radius: 30px;
  display: inline-block;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  font-size: 14px;
  line-height: 1.4285914286;
  font-weight: 700;
  letter-spacing: -0.016em;
  font-family: 'SF
Pro Text', 'SF Pro Icons', 'Helvetica
Neue', 'Helvetica',
    'Arial', sans-serif;
  padding: 8px 16px;
  background: #333336;
  color: #f5f5f7;
}
.takeover .event-info-heading .add-to-calendar__link:hover {
  text-decoration: none;
}
.takeover .event-info-heading .add-to-calendar__link::after {
  margin-left: 4px;
}
@media (hover: hover) {
  .takeover .event-info-heading .add-to-calendar__link:hover::after {
    color: inherit;
  }
}
@media (hover: hover) {
  .takeover .event-info-heading .add-to-calendar__link.icon:hover {
    background: #424245;
    color: #f5f5f7;
    text-decoration: none;
  }
}
@media (hover: hover) {
  .takeover .event-info-heading .add-to-calendar__link:hover {
    background: #424245;
    color: #f5f5f7;
    text-decoration: none;
  }
}
.takeover .event-info-heading .add-to-calendar__link::after {
  line-height: 1.4;
}
.takeover .event-info-interactive {
  display: inline-grid;
  justify-items: end;
  align-items: center;
  flex-basis: 33.3333333333%;
  max-width: 33.3333333333%;
}
@media only screen and (max-width: 734px) {
  .takeover .event-info-interactive {
    justify-items: center;
    flex-basis: 100%;
    max-width: 100%;
  }
}
.takeover .event-info-interactive .countdown,
.takeover .event-info-interactive .event-info-cta-area {
  grid-area: 1/1/2/2;
}
.takeover .event-info-cta-area {
  display: inline-grid;
  justify-items: end;
  align-items: center;
}
@media only screen and (max-width: 734px) {
  .takeover .event-info-cta-area {
    justify-items: center;
  }
}
.takeover .event-info-cta-area .watch-live,
.takeover .event-info-cta-area .watch-event {
  border-radius: 30px;
  display: inline-block;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  letter-spacing: -0.022em;
  font-family: 'SF
Pro Text', 'SF Pro Icons', 'Helvetica
Neue', 'Helvetica',
    'Arial', sans-serif;
  border: 2px solid;
  padding: 10px 24px 9px;
  border-color: #f5f5f7;
  color: #f5f5f7;
  transition: border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 300ms;
  background: rgba(0, 0, 0, 0);
  grid-area: 1/1/2/2;
  text-decoration: none;
}
.takeover .event-info-cta-area .watch-live:hover,
.takeover .event-info-cta-area .watch-event:hover {
  text-decoration: none;
}
@media (hover: hover) {
  .takeover .event-info-cta-area .watch-live:hover,
  .takeover .event-info-cta-area .watch-event:hover {
    background: #f5f5f7;
    color: #1d1d1f;
  }
}
.takeover .event-info-cta-area .watch-live {
  display: flex;
  align-items: center;
}
.takeover .event-info-cta-area .watch-live::before {
  content: '';
  display: inline-block;
  width: 0.5882352941em;
  height: 0.5882352941em;
  border-radius: 50%;
  background-color: #ff3037;
  margin-right: 8px;
}
@media only screen and (max-width: 1068px) {
  .takeover .event-info-cta-area .watch-live::before {
    margin-right: 4px;
  }
}
html.no-reduced-motion .takeover .event-info-cta-area .watch-live::before {
  animation-name: blinking-dot;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.4, 0, 0.25, 1);
}
.countdown {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 700;
  letter-spacing: 0.004em;
  font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica
Neue', 'Helvetica',
    'Arial', sans-serif;
  color: var(--sk-body-text-color);
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-end;
}
@media only screen and (max-width: 1068px) {
  .countdown {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    letter-spacing: 0.007em;
    font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .countdown {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 700;
    letter-spacing: 0.009em;
    font-family: 'SF
Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .countdown {
    justify-content: center;
  }
}
.countdown-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 3.2941176471rem;
}
.countdown-zone:not(:first-child) {
  margin-left: 12px;
}
@media only screen and (max-width: 1068px) {
  .countdown-zone:not(:first-child) {
    margin-left: 10px;
  }
}
@media only screen and (max-width: 734px) {
  .countdown-zone:not(:first-child) {
    margin-left: 4px;
  }
}
.countdown-digitsholder {
  height: 1.125em;
  width: 1.34em;
  overflow-y: hidden;
  position: relative;
}
@media only screen and (max-width: 1068px) {
  .countdown-digitsholder {
    height: 1.1428571429em;
  }
}
@media only screen and (max-width: 734px) {
  .countdown-digitsholder {
    height: 1.1666666667em;
  }
}
.countdown-current {
  position: absolute;
  top: 0;
  left: 50%;
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
.countdown-current {
  transform: translate(-50%, 0);
}
.countdown-label {
  font-size: 14px;
  line-height: 1.4285914286;
  font-weight: 700;
  letter-spacing: -0.016em;
  font-family: 'SF
Pro Text', 'SF Pro Icons', 'Helvetica
Neue', 'Helvetica',
    'Arial', sans-serif;
  color: #86868b;
  margin-top: 4px;
}
.countdown-volabel {
  color: rgba(0, 0, 0, 0);
  position: absolute;
  overflow: hidden;
  padding: 0;
  border: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
/*! CSS Used keyframes */
@keyframes blinking-dot {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.4;
  }
}
</style>
