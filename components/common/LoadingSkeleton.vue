<template>
  <span class="react-loading-skeleton" style="width: 175px"></span>
</template>

<style scoped>
/*! CSS Used from:
https://developer.apple.com/account/_next/static/css/f148b6570a351e02.css */ /*!
@import https://developer.apple.com/assets/styles/global.dist.css */
:focus {
  outline: 4px solid rgba(0, 125, 250, 0.6);
  outline-offset: 1px;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body main ::-webkit-scrollbar {
  width: 16px;
}
body main ::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  border-radius: 9px;
  background-clip: content-box;
  border-color: var(--system-primary);
  background: var(--system-secondary);
}
body main ::-webkit-scrollbar-thumb:hover {
  background: var(--system-tertiary);
}
body main ::-webkit-scrollbar-track {
  background: var(--system-primary);
} /*! end
@import */ /*! CSS Used from:
https://developer.apple.com/account/_next/static/css/381b1f1850fab148.css */
.react-loading-skeleton {
  --animation-duration: 1.5s;
  --animation-direction: normal;
  --pseudo-element-display: block;
  background-color: var(--base-color);
  width: 100%;
  border-radius: 0.25rem;
  display: inline-flex;
  line-height: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.react-loading-skeleton:after {
  content: '';
  display: var(--pseudo-element-display);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--base-color),
    var(--highlight-color),
    var(--base-color)
  );
  transform: translateX(-100%);
  animation-name: react-loading-skeleton;
  animation-direction: var(--animation-direction);
  animation-duration: var(--animation-duration);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
/*! CSS Used keyframes */
@keyframes react-loading-skeleton {
  to {
    transform: translateX(100%);
  }
}
</style>
