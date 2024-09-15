<template>
  <aside class="countdown" :aria-label="ariaLabel">
    <div
      v-for="(value, label) in countdown"
      :key="label"
      class="countdown-zone"
    >
      <span class="countdown-volabel">{{ value.current }}, {{ label }}</span>
      <div class="countdown-digitsholder" aria-hidden="true">
        <transition name="countdown">
          <span :key="value.current" class="countdown-current">
            {{ value.current }}
          </span>
        </transition>
        <span class="countdown-prev">{{ value.prev }}</span>
      </div>
      <div class="countdown-label" aria-hidden="true">{{ label }}</div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

interface Props {
  endDate: Date;
  ariaLabel: string;
}

const props = defineProps<Props>();

interface CountdownValue {
  prev: string;
  current: string;
}

type CountdownUnits = "months" | "days" | "hours" | "minutes" | "seconds";

const countdown = ref<Record<CountdownUnits, CountdownValue>>({
  months: { prev: "00", current: "00" },
  days: { prev: "00", current: "00" },
  hours: { prev: "00", current: "00" },
  minutes: { prev: "00", current: "00" },
  seconds: { prev: "00", current: "00" },
});

const updateCountdown = () => {
  const now = dayjs();
  const end = dayjs(props.endDate);
  const diff = dayjs.duration(end.diff(now));

  const newCountdown: Record<CountdownUnits, CountdownValue> = {
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

  countdown.value = newCountdown;
};

let timer: NodeJS.Timeout | null = null;

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer);
  }
});
</script>

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
  transform: translate(-50%, 0);
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
.countdown-prev {
  transform: translate(-50%, -100%);
}
.countdown-current {
  transform: translate(-50%, 0);
}
.countdown,
.countdown-leave-active {
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
}
.countdown-enter-from {
  transform: translate(-50%, 100%);
}

.countdown-leave-to {
  transform: translate(-50%, -100%);
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
