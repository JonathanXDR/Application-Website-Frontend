<template>
  <section
    class="takeover theme-dark"
    :style="{ '--localnav-theme-start': 'a0t - 100vh' }"
  >
    <div class="image event-branding-img" />

    <div class="section-content">
      <div
        class="event-info"
        :class="eventState"
      >
        <div class="event-info-heading">
          <h2 class="section-head">
            {{ eventTitle }}
          </h2>
          <div
            v-if="eventState === 'pre-event'"
            class="add-to-calendar"
          >
            <a
              :href="calendarLink"
              :aria-label="`add to calendar: ${eventTitle}`"
              class="add-to-calendar__link icon-downloadcircle icon"
              download
              role="button"
              tabindex="0"
            >
              Add to calendar
            </a>
          </div>
        </div>
        <div
          class="event-info-interactive"
          :class="{ 'show-countdown': showCountdown }"
        >
          <CountdownTimer
            v-if="showCountdown && eventState === 'pre-event'"
            :end-date="eventDuration.end"
            :aria-label="`Countdown: ${eventTitle}`"
          />
          <div
            v-if="eventState !== 'pre-event'"
            class="event-info-cta-area"
            aria-live="polite"
          >
            <a
              v-if="eventState === 'live'"
              :href="eventLink"
              class="watch-live"
              :aria-label="`watch live event: ${eventTitle}`"
            >
              Watch live event
            </a>
            <a
              v-if="eventState === 'post-event'"
              :href="eventLink"
              class="watch-event"
              :aria-label="`watch event: ${eventTitle}`"
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
import dayjs from 'dayjs'

interface Properties {
  eventTitle: string
  eventDuration: {
    start: Date
    end: Date
  }
  showCountdown?: boolean
  calendarLink: string
  eventLink: string
}

const properties = withDefaults(defineProps<Properties>(), {
  showCountdown: true,
})

type EventState = 'pre-event' | 'live' | 'post-event'
const eventState = ref<EventState>('pre-event')

const calculateEventState = () => {
  const now = dayjs()
  const start = dayjs(properties.eventDuration.start)
  const end = dayjs(properties.eventDuration.end)

  if (now.isBefore(start)) {
    eventState.value = 'pre-event'
  } else if (now.isAfter(end)) {
    eventState.value = 'post-event'
  } else {
    eventState.value = 'live'
  }
}

let timer: NodeJS.Timeout | undefined

onMounted(() => {
  calculateEventState()
  timer = setInterval(calculateEventState, 1000)
})

onUnmounted(() => {
  if (timer !== undefined) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
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
