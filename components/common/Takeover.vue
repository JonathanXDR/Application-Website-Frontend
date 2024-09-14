<template>
  <section
    class="takeover theme-dark"
    style="--localnav-theme-start: a0t - 100vh"
  >
    <div class="image event-branding-img" />

    <div class="section-content">
      <div class="event-info" :class="eventState">
        <div class="event-info-heading">
          <h2 class="section-head">September 2024 Keynote</h2>
          <div class="add-to-calendar">
            <a
              href="https://www.apple.com/newsroom/cal/apple-event-1724879336043/apple_event.ics"
              aria-label="add to calendar: September 2024 Keynote"
              class="add-to-calendar__link icon-downloadcircle icon"
              download=""
              role="button"
              tabindex="0"
              >Add to calendar
            </a>
          </div>
        </div>
        <div class="event-info-interactive show-countdown">
          <aside
            v-if="showCountdown && eventState === 'pre-event'"
            aria-label="Countdown:September 2024 Keynote"
            class="countdown"
          >
            <div
              v-for="(value, label) in countdown"
              :key="label"
              class="countdown-zone"
            >
              <span class="countdown-volabel">
                {{ value.prev }}, {{ label }}
              </span>
              <div class="countdown-digitsholder" aria-hidden="true">
                <span class="countdown-prev">{{ value.prev }}</span>
                <span class="countdown-current">{{ value.current }}</span>
              </div>
              <div class="countdown-label" aria-hidden="true">{{ label }}</div>
            </div>
          </aside>
          <div
            v-if="eventState !== 'pre-event'"
            class="event-info-cta-area"
            aria-live="polite"
          >
            <a
              v-if="eventState === 'live'"
              href="https://www.apple.com/apple-events/"
              class="watch-live"
              aria-label="watch live event: September 2024 Keynote"
              aria-hidden="true"
              tabindex="-1"
            >
              Watch live event
            </a>
            <a
              v-if="eventState === 'post-event'"
              href="https://www.apple.com/apple-events/"
              class="watch-event"
              aria-label="watch event: September 2024 Keynote"
              aria-hidden="true"
              tabindex="-1"
            >
              Watch event
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const props = withDefaults(
  defineProps<{
    eventDuration?: {
      start: Date;
      end: Date;
    };
    showCountdown?: boolean;
  }>(),
  {
    eventDuration: () => ({
      start: new Date(2024, 8, 15, 0, 0),
      end: new Date(2024, 8, 15, 6, 0),
    }),
    showCountdown: true,
  },
);

interface CountdownValue {
  prev: string;
  current: string;
}

const eventState = ref<"pre-event" | "live" | "post-event">("pre-event");
const countdown = ref<
  Record<"months" | "days" | "hours" | "minutes" | "seconds", CountdownValue>
>({
  months: { prev: "00", current: "00" },
  days: { prev: "00", current: "00" },
  hours: { prev: "00", current: "00" },
  minutes: { prev: "00", current: "00" },
  seconds: { prev: "00", current: "00" },
});
const isTransitioning = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const updateCountdown = () => {
  const now = dayjs();
  const end = dayjs(props.eventDuration.end);
  const diff = dayjs.duration(end.diff(now));

  const newCountdown = {
    months: {
      prev: countdown.value.months.current,
      current: diff.months().toString().padStart(2, "0"),
    },
    days: {
      prev: countdown.value.days.current,
      current: diff.days().toString().padStart(2, "0"),
    },
    hours: {
      prev: countdown.value.hours.current,
      current: diff.hours().toString().padStart(2, "0"),
    },
    minutes: {
      prev: countdown.value.minutes.current,
      current: diff.minutes().toString().padStart(2, "0"),
    },
    seconds: {
      prev: countdown.value.seconds.current,
      current: diff.seconds().toString().padStart(2, "0"),
    },
  };

  isTransitioning.value = true;
  countdown.value = newCountdown;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const calculateEventState = () => {
  const now = dayjs();
  const start = dayjs(props.eventDuration.start);
  const end = dayjs(props.eventDuration.end);

  if (now.isBefore(start)) {
    eventState.value = "pre-event";
  } else if (now.isAfter(end)) {
    eventState.value = "post-event";
  } else {
    eventState.value = "live";
  }
};

const queueNextTick = () => {
  timer = setTimeout(() => {
    updateCountdown();
    calculateEventState();
    queueNextTick();
  }, 1000);
};

onMounted(() => {
  calculateEventState();
  updateCountdown();
  queueNextTick();
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<style scoped>
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
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  margin-bottom: 24px;
}
@media only screen and (max-width: 1023px) {
  .section-head {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 767px) {
  .section-head {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 1023px) {
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
@media only screen and (min-width: 1536px) {
  .section-content {
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 980px;
  }
}
@media only screen and (max-width: 1023px) {
  .section-content {
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 692px;
  }
}
@media only screen and (max-width: 767px) {
  .section-content {
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 87.5%;
  }
}
@media only screen and (max-width: 767px) {
  .section-content {
    max-width: 366px;
  }
}
.section-head {
  font-size: 32px;
  line-height: 1.125;
  font-weight: 700;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  margin-bottom: 24px;
}
@media only screen and (max-width: 1023px) {
  .section-head {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 767px) {
  .section-head {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 1023px) {
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
  background-color: var(--color-fill-secondary);
  overflow: hidden;
  margin-top: -52px;
}
.takeover .section-content {
  margin-bottom: 40px;
  margin-top: 92px;
}
@media only screen and (max-width: 1023px) {
  .takeover .section-content {
    margin-bottom: 36px;
  }
}
@media only screen and (max-width: 767px) {
  .takeover .section-content {
    margin-bottom: 32px;
  }
}
@media only screen and (max-width: 767px) {
  .takeover .section-content {
    margin-top: 72px;
  }
}
.takeover .image ~ .section-content {
  margin-top: 40px;
}
@media only screen and (max-width: 1023px) {
  .takeover .image ~ .section-content {
    margin-top: 36px;
  }
}
@media only screen and (max-width: 767px) {
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
@media only screen and (max-width: 767px) {
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
  transition:
    margin-top 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 300ms;
}
@media only screen and (max-width: 767px) {
  .takeover .event-info.pre-event .event-info-interactive,
  .takeover .event-info.post-event .event-info-interactive,
  .takeover .event-info.live .event-info-interactive {
    margin-top: 16px;
  }
}
@media only screen and (max-width: 767px) {
  .takeover .event-info.pre-event .add-to-calendar,
  .takeover .event-info.post-event .add-to-calendar,
  .takeover .event-info.live .add-to-calendar {
    margin-bottom: 0;
  }
}
@media only screen and (max-width: 767px) {
  .takeover .event-info.post-event .add-to-calendar,
  .takeover .event-info.live .add-to-calendar {
    margin-bottom: 0;
  }
}
.takeover .event-info-heading {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 58.3333333333%;
  max-width: 58.3333333333%;
}
@media only screen and (max-width: 767px) {
  .takeover .event-info-heading {
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
    max-width: 100%;
  }
}
.takeover .event-info-heading .section-head {
  color: var(--color-syntax-marks);
  margin-bottom: 0;
}
@media only screen and (max-width: 767px) {
  .takeover .event-info-heading .section-head {
    text-align: center;
  }
}
.takeover .event-info-heading .add-to-calendar {
  margin-top: 8px;
  transition:
    opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 300ms,
    margin-top 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
@media only screen and (max-width: 767px) {
  .takeover .event-info-heading .add-to-calendar {
    margin-bottom: 12px;
    margin-top: 12px;
  }
}
.takeover .event-info-heading .add-to-calendar__link {
  border-radius: 30px;
  display: inline-block;
  transition:
    background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  font-size: 14px;
  line-height: 1.4285914286;
  font-weight: 700;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  padding: 8px 16px;
  background: var(--color-fill-gray-quaternary);
  color: var(--color-figure-gray);
}
.takeover .event-info-heading .add-to-calendar__link:hover {
  text-decoration: none;
}
.takeover .event-info-heading .add-to-calendar__link::after {
  margin-inline-start: 4px;
}
@media (hover: hover) {
  .takeover .event-info-heading .add-to-calendar__link:hover::after {
    color: inherit;
  }
}
@media (hover: hover) {
  .takeover .event-info-heading .add-to-calendar__link.icon:hover {
    background: var(--color-fill-gray-tertiary);
    color: var(--color-figure-gray);
    text-decoration: none;
  }
}
@media (hover: hover) {
  .takeover .event-info-heading .add-to-calendar__link:hover {
    background: var(--color-fill-gray-tertiary);
    color: var(--color-figure-gray);
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
@media only screen and (max-width: 767px) {
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
@media only screen and (max-width: 767px) {
  .takeover .event-info-cta-area {
    justify-items: center;
  }
}
.takeover .event-info-cta-area .watch-live,
.takeover .event-info-cta-area .watch-event {
  border-radius: 30px;
  display: inline-block;
  transition:
    background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  padding: 10px 24px 9px;
  background: var(--color-fill-gray-quaternary);
  color: var(--color-figure-gray);
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  padding: 12px 24px 11px;
  transition:
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    opacity 300ms cubic-bezier(0.4, 0, 0.25, 1) 300ms;
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
    background: var(--color-fill-gray-tertiary);
    color: var(--color-figure-gray);
    text-decoration: none;
  }
}
.takeover .event-info-cta-area .watch-live {
  display: flex;
  align-items: center;
}
.takeover .event-info-cta-area .watch-live::before {
  content: "";
  display: inline-block;
  width: 0.5882352941em;
  height: 0.5882352941em;
  border-radius: 50%;
  background-color: var(--color-figure-red);
  margin-right: 8px;
}
@media only screen and (max-width: 1023px) {
  .takeover .event-info-cta-area .watch-live::before {
    margin-right: 4px;
  }
}
.takeover .event-info-cta-area .watch-live::before {
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
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: var(--sk-body-text-color);
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-end;
}
@media only screen and (max-width: 1023px) {
  .countdown {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 767px) {
  .countdown {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 700;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 767px) {
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
@media only screen and (max-width: 1023px) {
  .countdown-zone:not(:first-child) {
    margin-left: 10px;
  }
}
@media only screen and (max-width: 767px) {
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
@media only screen and (max-width: 1023px) {
  .countdown-digitsholder {
    height: 1.1428571429em;
  }
}
@media only screen and (max-width: 767px) {
  .countdown-digitsholder {
    height: 1.1666666667em;
  }
}
.countdown-prev,
.countdown-current {
  position: absolute;
  top: 0;
  left: 50%;
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
.countdown-prev {
  transform: translate(-50%, -100%);
}
.countdown-current {
  transform: translate(-50%, 0);
}
.countdown-label {
  font-size: 14px;
  line-height: 1.4285914286;
  font-weight: 700;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: var(--color-figure-gray-secondary);
  margin-top: 4px;
}
.countdown-volabel {
  color: transparent;
  position: absolute;
  overflow: hidden;
  padding: 0;
  border: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.event-branding-img {
  background: url(https://www.apple.com/newsroom/images/2024/09/keynote/Apple-Fall-event-240909.jpg.branding-large.jpg)
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
    background-image: url(https://www.apple.com/newsroom/images/2024/09/keynote/Apple-Fall-event-240909.jpg.branding-large_2x.jpg);
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .event-branding-img {
    background-image: url(https://www.apple.com/newsroom/images/2024/09/keynote/Apple-Fall-event-240909.jpg.branding-medium.jpg);
    height: 227px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-width: 768px) and (max-width: 1023px) and (min-resolution: 1.5dppx),
  (min-width: 768px) and (max-width: 1023px) and (-webkit-min-device-pixel-ratio: 1.5),
  (min-width: 768px) and (max-width: 1023px) and (min-resolution: 144dpi) {
  .event-branding-img {
    background-image: url(https://www.apple.com/newsroom/images/2024/09/keynote/Apple-Fall-event-240909.jpg.branding-medium_2x.jpg);
  }
}
@media only screen and (max-width: 767px) {
  .event-branding-img {
    background-image: url(https://www.apple.com/newsroom/images/2024/09/keynote/Apple-Fall-event-240909.jpg.branding-small.jpg);
    height: 210px;
  }
}
@media only screen and (max-width: 767px) and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (max-width: 767px) and (min-resolution: 1.5dppx),
  (max-width: 767px) and (-webkit-min-device-pixel-ratio: 1.5),
  (max-width: 767px) and (min-resolution: 144dpi) {
  .event-branding-img {
    background-image: url(https://www.apple.com/newsroom/images/2024/09/keynote/Apple-Fall-event-240909.jpg.branding-small_2x.jpg);
  }
}
@keyframes blinking-dot {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.4;
  }
}
</style>
