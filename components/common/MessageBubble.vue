<template>
  <div
    v-animation="{ add: 'active' }"
    :class="`message-item message-item--${direction}`"
  >
    <div :class="`message message--${color}`">
      <p class="typography-imessage-text message-copy">
        <span class="visuallyhidden">Text message reading:&nbsp;</span> One sec.
        <br class="small" >Moving to my iPhone.
      </p>
      <svg
        :class="`message-tail message-tail--${
          direction === 'left' ? '1' : '2'
        }`"
        viewBox="0 0 87 106"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="direction === 'left'"
          d="m32.84 55v-55h54v25.13c0 20.56-3.25 33.65-9.35 45.05-6.1 11.41-15.05 20.36-26.46 26.46s-24.5 9.35-45.05 9.35h-5.98c19.37-8.81 32.84-28.33 32.84-51z"
          fill="var(--bg-color)"
        />
        <path
          v-else
          d="m54 55v-55h-54v25.13c0 20.56 3.25 33.65 9.35 45.05 6.1 11.41 15.05 20.36 26.46 26.46s24.5 9.35 45.05 9.35h5.98c-19.37-8.81-32.84-28.33-32.84-51z"
          fill="var(--bg-color)"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: "gray" | "blue" | "green";
    direction?: "left" | "right";
  }>(),
  {
    color: "gray",
    direction: "left",
  },
);
</script>

<style scoped>
.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

p {
  margin: 0;
  padding: 0;
}
:focus {
  outline: 4px solid rgba(0, 125, 250, 0.6);
  outline-offset: 1px;
}
p + * {
  margin-top: 0.8em;
}
.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}
br.small {
  display: none;
}
@media only screen and (max-width: 1068px) {
  br.small {
    display: none;
  }
}
@media only screen and (max-width: 734px) {
  br.small {
    display: block;
  }
}
.typography-imessage-text {
  font-size: 49px;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-imessage-text {
    font-size: 34px;
    font-weight: 400;
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
@media only screen and (max-width: 734px) {
  .typography-imessage-text {
    font-size: 19px;
    font-weight: 400;
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

.awy-messages p {
  color: #6e6e73;
}
.message-item {
  --first-item-total-duration: 2.65s;
  --second-item-total-duration: 1.9s;
  --half-pseudoelement-height: 30px;
  --content-wrapper-tile-width: 1120px;
  display: flex;
  align-items: center;
  max-width: var(--content-wrapper-tile-width);
}
.message-item {
  opacity: 0;
  will-change: transform, opacity;
}
@media only screen and (max-width: 1068px) {
  .message-item {
    --half-pseudoelement-height: 22px;
  }
}
@media only screen and (max-width: 734px) {
  .message-item {
    --half-pseudoelement-height: 15px;
  }
  .message-item {
    position: absolute;
    top: 0;
  }
}
.message-item .memoji {
  --memoji-enter-translate-x: -50%;
}
@media only screen and (max-width: 734px) {
  .message-item .memoji {
    --memoji-enter-translate-x: -15px;
  }
}
@media only screen and (max-width: 350px) {
  .message-item .memoji,
  .message-item .memoji img {
    max-width: calc(var(--p-width) - 20px);
    height: auto;
    display: flex;
  }
}
.message-item .message {
  transform-origin: left;
  --message-memoji-gap: 60px;
  margin-left: var(--message-memoji-gap);
}
@media only screen and (max-width: 1068px) {
  .message-item .message {
    --message-memoji-gap: 40px;
  }
}
@media only screen and (max-width: 734px) {
  .message-item .message {
    --message-memoji-gap: 30px;
  }
}
@media only screen and (max-width: 350px) {
  .message-item .message {
    --message-memoji-gap: 20px;
  }
}
.message-item--left {
  padding-right: var(--half-pseudoelement-height);
}
.message-item--right {
  justify-content: flex-end;
  flex-direction: row-reverse;
  margin-top: 30px;
  padding-left: var(--half-pseudoelement-height);
}
@media only screen and (max-width: 734px) {
  .message-item--right {
    padding-left: 0;
  }
}
.message-item--right {
  margin-top: 0px;
  position: absolute;
  top: 0;
}
.message-item--right .memoji {
  --memoji-enter-translate-x: 50%;
}
@media only screen and (max-width: 734px) {
  .message-item--right .memoji {
    --memoji-enter-translate-x: 15px;
  }
}
@media only screen and (max-width: 350px) {
  .message-item--right .memoji {
    --memoji-enter-translate-x: 5px;
  }
}
.message-item--right .message {
  transform-origin: right;
  margin-right: var(--message-memoji-gap);
  margin-left: 0;
}
@media only screen and (max-width: 734px) {
  .message-item--right .message {
    --message-memoji-gap: 5px;
  }
}
.message {
  --message-flex-scale: 1.1;
  --message-height-en: 100px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background: var(--bg-color);
  min-height: var(--message-height-en);
}
@media only screen and (max-width: 1068px) {
  .message {
    border-radius: 15px;
  }
}
@media only screen and (max-width: 734px) {
  .message {
    --message-flex-scale: 1.05;
  }
}
.message--gray {
  --bg-color: var(--color-system-gray-5);
}
.message--blue {
  --bg-color: var(--color-system-blue);
}
.message--green {
  --bg-color: var(--color-system-green);
}
@media only screen and (max-width: 734px) {
  .message--blue,
  .message--green {
    border-radius: 18px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .message--blue,
  .message--green {
    z-index: auto;
  }
}
@media only screen and (max-width: 350px) {
  .message--blue,
  .message--green {
    padding-left: 10px;
    padding-right: 10px;
  }
}
@media only screen and (max-width: 734px) {
  .message--gray {
    min-height: 50px;
  }
  .message--blue:after,
  .message--green:after,
  .message--blue:before,
  .message--green:before {
    display: none;
  }
}
.message--gray p {
  color: var(--color-code-plain);
}
.message--blue p,
.message--green p {
  color: #fff;
}
.message:after,
.message:before {
  content: "";
  position: absolute;
  top: 50%;
  aspect-ratio: 1/1;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-color);
  z-index: -1;
}
.message:before {
  left: 0;
  transform: translate(-30%, -50%);
}
.message:after {
  right: 0;
  transform: translate(30%, -50%);
}
@media only screen and (max-width: 734px) {
  .message--gray p {
    margin: 0 10px;
  }
}
@media only screen and (max-width: 350px) {
  .message--gray p {
    margin: 0;
  }
}
.message p {
  white-space: nowrap;
}
.message-tail {
  margin: 0;
  position: absolute;
  bottom: 0px;
  z-index: -2;
  --tail-x-pos: -46px;
  height: 50px;
  width: 42px;
}
@media only screen and (max-width: 1068px) {
  .message-tail {
    height: 32px;
    width: 26px;
    --tail-x-pos: -31px;
  }
}
@media only screen and (max-width: 734px) {
  .message-tail {
    height: 25px;
    width: 22px;
    --tail-x-pos: -10px;
  }
}
.message-tail--1 {
  left: var(--tail-x-pos);
  transform: matrix(1, 0, 0, 1, 0.2, 0);
}
.message-tail--2 {
  right: var(--tail-x-pos);
}
@media only screen and (max-width: 1068px) {
  .message-tail--2 {
    transform: matrix(1, 0, 0, 1, -0.1, 0);
  }
}
@media only screen and (max-width: 734px) {
  .message-tail--1 {
    transform: matrix(1, 0, 0, 1, -13.7, 0);
  }
  .message-tail--2 {
    transform: matrix(1, 0, 0, 1, -1.4, 0);
    margin-top: 1px;
  }
}
@media only screen and (max-width: 1068px) {
  .message-tail--2 {
    transform: matrix(1, 0, 0, 1, -0.1, 0);
  }
}
.message-item.active {
  opacity: 1;
}
/* .message-item.active:not(.message-item--right) {
  --message-item-exit-distance: -100px;
  animation: message-item-exit 0.75s ease-in-out 1.9s 1 normal forwards;
} */
@media only screen and (max-width: 734px) {
  .message-item.active:not(.message-item--right) {
    --message-item-exit-distance: -15px;
  }
}
@media only screen and (max-width: 350px) {
  .message-item.active:not(.message-item--right) {
    --message-item-exit-distance: -5px;
  }
}
.message-item.active .memoji {
  animation: memoji-enter 0.5s ease-in-out 0s 1;
}
.message-item.active .message {
  animation: message-flex 0.5s ease-in-out 0.4s 1 normal backwards;
}
.overview-awy-messages-memoji-1,
.overview-awy-messages-memoji-2 {
  display: block;
  width: var(--p-width);
  height: var(--p-height);
  --p-width: 108px;
  --p-height: 108px;
}
@media only screen and (max-width: 1068px) and (max-width: 1068px) {
  .overview-awy-messages-memoji-1,
  .overview-awy-messages-memoji-2 {
    --p-width: 76px;
    --p-height: 76px;
  }
}
@media only screen and (max-width: 734px) and (max-width: 734px) {
  .overview-awy-messages-memoji-1,
  .overview-awy-messages-memoji-2 {
    --p-width: 72px;
    --p-height: 82px;
  }
}

@keyframes message-item-exit {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(var(--message-item-exit-distance));
    opacity: 0;
  }
}
@keyframes memoji-enter {
  0% {
    transform: translateX(var(--memoji-enter-translate-x));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes message-flex {
  0% {
    opacity: 0;
  }
  60% {
    transform: scale(var(--message-flex-scale));
    opacity: 1;
  }
}
</style>
