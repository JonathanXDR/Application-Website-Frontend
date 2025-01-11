<script setup lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

interface Props {
  endDate: Date
}

const props = defineProps<Props>()

interface CountdownValue {
  prev: string
  current: string
  transition: boolean
}

type CountdownUnits = 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

const countdown = ref<Record<CountdownUnits, CountdownValue>>({
  months: { prev: '00', current: '00', transition: false },
  days: { prev: '00', current: '00', transition: false },
  hours: { prev: '00', current: '00', transition: false },
  minutes: { prev: '00', current: '00', transition: false },
  seconds: { prev: '00', current: '00', transition: false },
})

const updateCountdown = () => {
  const now = dayjs()
  const end = dayjs(props.endDate)
  const diff = dayjs.duration(end.diff(now))

  const countdownNew: Record<CountdownUnits, CountdownValue> = {
    months: {
      prev: countdown.value.months.current,
      current: diff.months().toString().padStart(2, '0'),
      transition: false,
    },
    days: {
      prev: countdown.value.days.current,
      current: diff.days().toString().padStart(2, '0'),
      transition: false,
    },
    hours: {
      prev: countdown.value.hours.current,
      current: diff.hours().toString().padStart(2, '0'),
      transition: false,
    },
    minutes: {
      prev: countdown.value.minutes.current,
      current: diff.minutes().toString().padStart(2, '0'),
      transition: false,
    },
    seconds: {
      prev: countdown.value.seconds.current,
      current: diff.seconds().toString().padStart(2, '0'),
      transition: false,
    },
  }

  for (const key of Object.keys(countdownNew)) {
    const unit = key as CountdownUnits
    if (countdownNew[unit].current !== countdown.value[unit].current) {
      countdownNew[unit].transition = true
    }
  }

  countdown.value = countdownNew

  setTimeout(() => {
    for (const key of Object.keys(countdown.value)) {
      const unit = key as CountdownUnits
      countdown.value[unit].transition = false
    }
  }, 400)
}

let timer: NodeJS.Timeout | undefined

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer === undefined) return
  clearInterval(timer)
})
</script>

<template>
  <aside
    class="countdown"
    aria-label="Countdown"
  >
    <div
      v-for="(value, label) in countdown"
      :key="label"
      class="countdown-zone"
    >
      <span class="countdown-volabel">{{ value.current }}, {{ label }}</span>
      <div
        class="countdown-digitsholder"
        aria-hidden="true"
      >
        <Transition enter-active-class="countdown-current">
          <span
            v-if="value.transition"
            :key="value.prev"
            class="countdown-prev"
          >
            {{ value.prev }}
          </span>
        </Transition>
        <Transition
          enter-active-class="countdown-next"
          leave-active-class="countdown-prev"
        >
          <span
            :key="value.current"
            class="countdown-current"
          >
            {{ value.current }}
          </span>
        </Transition>
      </div>
      <div
        class="countdown-label"
        aria-hidden="true"
      >
        {{ label }}
      </div>
    </div>
  </aside>
</template>

<style scoped>
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
  color: var(--color-fill-gray);
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
  min-width: 56px;
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
.countdown-next,
.countdown-current {
  position: absolute;
  top: 0;
  left: 50%;
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
.countdown-prev {
  transform: translate(-50%, -100%);
}
.countdown-current.countdown-next {
  transform: translate(-50%, 100%);
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
</style>
